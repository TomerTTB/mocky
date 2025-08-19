const express = require('express');
const router = express.Router();

class ApiRoutes {
    constructor(configService, routeService, socketService) {
        this.configService = configService;
        this.routeService = routeService;
        this.socketService = socketService;
        this.setupRoutes();
    }

    setupRoutes() {
        // Get server configuration
        router.get('/config', (req, res) => {
            const serverConfig = require('../config/serverConfig');
            const config = serverConfig.getConfig();
            res.json({ 
                baseUrl: config.BASE_URL,
                localIp: config.LOCAL_IP,
                port: config.API_PORT
            });
        });

        // Get all endpoint configurations
        router.get('/endpoints', (req, res) => {
            res.json(this.configService.getAllConfigs());
        });

        // Create a new endpoint
        router.post('/endpoints', (req, res) => {
            const { endpoint, config } = req.body;
            
            if (!endpoint || !config) {
                return res.status(400).json({ error: 'Missing endpoint or config' });
            }
            
            try {
                this.configService.addEndpoint(endpoint, config);
                this.routeService.registerEndpoint(endpoint, config);
                
                // Broadcast to all connected clients
                this.socketService.broadcastConfigUpdate();
                
                res.status(201).json({ message: 'Endpoint created', endpoint });
            } catch (error) {
                res.status(409).json({ error: error.message });
            }
        });

        // Delete an endpoint
        router.delete('/endpoints/:endpoint', (req, res) => {
            const { endpoint } = req.params;
            
            try {
                this.configService.removeEndpoint(endpoint);
                this.routeService.unregisterEndpoint(endpoint);
                
                // Broadcast to all connected clients
                this.socketService.broadcastConfigUpdate();
                
                res.json({ message: 'Endpoint deleted', endpoint });
            } catch (error) {
                res.status(404).json({ error: error.message });
            }
        });
    }

    getRouter() {
        return router;
    }
}

module.exports = ApiRoutes;
