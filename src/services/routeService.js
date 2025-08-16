class RouteService {
    constructor(app) {
        this.app = app;
        this.registeredRoutes = new Map();
    }

    // Dynamic endpoint handler
    createEndpointHandler(endpoint, config) {
        return async (req, res) => {
            if (!config) {
                return res.status(404).json({ error: 'Endpoint not found' });
            }
            
            console.log(`[DEBUG] Endpoint ${endpoint} - Config:`, config);
            console.log(`[DEBUG] Status code being sent: ${config.statusCode} (type: ${typeof config.statusCode})`);
            
            if (config.delay > 0) {
                await new Promise(resolve => setTimeout(resolve, config.delay));
            }
            
            res.status(config.statusCode).json(config.body);
        };
    }

    // Register a new endpoint route
    registerEndpoint(endpoint, config) {
        if (this.registeredRoutes.has(endpoint)) {
            return; // Already registered
        }
        
        const handler = this.createEndpointHandler(endpoint, config);
        const route = this.app.get(`/${endpoint}`, handler);
        this.registeredRoutes.set(endpoint, route);
        console.log(`Registered endpoint: /${endpoint}`);
    }

    // Unregister an endpoint route
    unregisterEndpoint(endpoint) {
        if (!this.registeredRoutes.has(endpoint)) {
            return;
        }
        
        // Remove the route from Express by clearing the router stack
        const router = this.app._router;
        if (router && router.stack) {
            // Find and remove the route for this endpoint
            const routeIndex = router.stack.findIndex(layer => 
                layer.route && layer.route.path === `/${endpoint}`
            );
            
            if (routeIndex !== -1) {
                router.stack.splice(routeIndex, 1);
                console.log(`Removed route for endpoint: /${endpoint}`);
            }
        }
        
        // Remove from our tracking map
        this.registeredRoutes.delete(endpoint);
        console.log(`Unregistered endpoint: /${endpoint}`);
    }

    // Update endpoint route with new configuration
    updateEndpoint(endpoint, config) {
        // Unregister first to remove the old route
        this.unregisterEndpoint(endpoint);
        // Then register again with the new configuration
        this.registerEndpoint(endpoint, config);
    }

    // Initialize endpoints from configuration
    initializeEndpoints(endpointConfigs) {
        Object.entries(endpointConfigs).forEach(([endpoint, config]) => {
            this.registerEndpoint(endpoint, config);
        });
    }

    // Get all registered routes
    getRegisteredRoutes() {
        return Array.from(this.registeredRoutes.keys());
    }
}

module.exports = RouteService;
