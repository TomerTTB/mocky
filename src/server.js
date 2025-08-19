const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Import services and middleware
const errorHandler = require('./middleware/errorHandler');
const ConfigService = require('./services/configService');
const RouteService = require('./services/routeService');
const SocketService = require('./services/socketService');
const ApiRoutes = require('./routes/api');
const serverConfig = require('./config/serverConfig');

async function startServer() {
    // Initialize server configuration
    await serverConfig.initialize();
    const config = serverConfig.getConfig();
    
    // Initialize Express app
    const app = express();
    const server = http.createServer(app);

    // Initialize Socket.IO with CORS configuration
    const io = socketIo(server, {
        cors: {
            origin: config.CORS_ORIGIN,
            methods: config.CORS_METHODS
        }
    });

    // Apply CORS middleware dynamically
    const cors = require('cors');
    app.use(cors({
        origin: config.CORS_ORIGIN,
        methods: config.CORS_METHODS
    }));
    
    app.use(express.json());

    // Initialize services
    const configService = new ConfigService();
    const routeService = new RouteService(app);
    const socketService = new SocketService(io, configService, routeService);

    // Initialize API routes first
    const apiRoutes = new ApiRoutes(configService, routeService, socketService);
    app.use('/api', apiRoutes.getRouter());

    // Initialize endpoints from configuration
    routeService.initializeEndpoints(configService.getAllConfigs());

    // Serve static files after API routes
    app.use(express.static(config.PUBLIC_DIR));

    // Serve index.html for root path (fallback)
    app.get('/', (req, res) => {
        res.sendFile(path.join(config.PUBLIC_DIR, 'index.html'));
    });

    // Add error handling middleware (must be last)
    app.use(errorHandler);

    // Start mock API server
    server.listen(config.API_PORT, () => {
        console.log(`Mock API server running on ${config.BASE_URL}`);
        console.log(`Web interface available at ${config.BASE_URL}`);
        console.log(`Server IP: ${config.LOCAL_IP}`);
    });
}

// Start the server
startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
}); 