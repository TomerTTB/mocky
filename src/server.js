const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Import services and middleware
const corsMiddleware = require('./middleware/cors');
const errorHandler = require('./middleware/errorHandler');
const ConfigService = require('./services/configService');
const RouteService = require('./services/routeService');
const SocketService = require('./services/socketService');
const ApiRoutes = require('./routes/api');
const { API_PORT, PUBLIC_DIR, CORS_ORIGIN, CORS_METHODS, BASE_URL, LOCAL_IP } = require('./config/constants');

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS configuration
const io = socketIo(server, {
    cors: {
        origin: CORS_ORIGIN,
        methods: CORS_METHODS
    }
});

// Apply middleware
app.use(corsMiddleware);
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
app.use(express.static(PUBLIC_DIR));

// Serve index.html for root path (fallback)
app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

// Add error handling middleware (must be last)
app.use(errorHandler);

// Start mock API server
server.listen(API_PORT, () => {
    console.log(`Mock API server running on ${BASE_URL}`);
    console.log(`Web interface available at ${BASE_URL}`);
    console.log(`Local IP detected: ${LOCAL_IP}`);
}); 