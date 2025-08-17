class RouteService {
    constructor(app) {
        this.app = app;
        this.registeredRoutes = new Map();
    }

    // Dynamic endpoint handler that supports both GET and POST
    createEndpointHandler(endpoint, config) {
        return async (req, res) => {
            if (!config) {
                return res.status(404).json({ error: 'Endpoint not found' });
            }
            
            console.log(`[DEBUG] Endpoint ${endpoint} - Config:`, config);
            console.log(`[DEBUG] Status code being sent: ${config.statusCode} (type: ${typeof config.statusCode})`);
            console.log(`[DEBUG] Request method: ${req.method}`);
            
            // Handle request validation for methods that can have request bodies
            const methodsWithBody = ['POST', 'PUT', 'PATCH'];
            if (methodsWithBody.includes(req.method)) {
                const validationResult = this.validateRequestBody(req, config);
                if (!validationResult.isValid) {
                    return res.status(400).json({
                        error: 'Request validation failed',
                        details: validationResult.errors
                    });
                }
            }
            
            if (config.delay > 0) {
                await new Promise(resolve => setTimeout(resolve, config.delay));
            }
            
            res.status(config.statusCode).json(config.body);
        };
    }

    // Register a new endpoint route (supports GET, POST, PUT, PATCH, DELETE)
    registerEndpoint(endpoint, config) {
        if (this.registeredRoutes.has(endpoint)) {
            return; // Already registered
        }
        
        // Default to GET method for backward compatibility
        const method = (config.method || 'GET').toUpperCase();
        const handler = this.createEndpointHandler(endpoint, config);
        
        let route;
        switch (method) {
            case 'POST':
                route = this.app.post(`/${endpoint}`, handler);
                break;
            case 'PUT':
                route = this.app.put(`/${endpoint}`, handler);
                break;
            case 'PATCH':
                route = this.app.patch(`/${endpoint}`, handler);
                break;
            case 'DELETE':
                route = this.app.delete(`/${endpoint}`, handler);
                break;
            case 'GET':
            default:
                route = this.app.get(`/${endpoint}`, handler);
                break;
        }
        
        this.registeredRoutes.set(endpoint, { route, method });
        console.log(`Registered ${method} endpoint: /${endpoint}`);
    }

    // Unregister an endpoint route
    unregisterEndpoint(endpoint) {
        if (!this.registeredRoutes.has(endpoint)) {
            return;
        }
        
        const routeInfo = this.registeredRoutes.get(endpoint);
        const method = routeInfo.method || 'GET';
        
        // Remove the route from Express by clearing the router stack
        const router = this.app._router;
        if (router && router.stack) {
            // Find and remove the route for this endpoint and method
            const routeIndex = router.stack.findIndex(layer => 
                layer.route && 
                layer.route.path === `/${endpoint}` &&
                layer.route.methods[method.toLowerCase()]
            );
            
            if (routeIndex !== -1) {
                router.stack.splice(routeIndex, 1);
                console.log(`Removed ${method} route for endpoint: /${endpoint}`);
            }
        }
        
        // Remove from our tracking map
        this.registeredRoutes.delete(endpoint);
        console.log(`Unregistered ${method} endpoint: /${endpoint}`);
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

    // Validate request body against expected fields (for POST, PUT, PATCH)
    validateRequestBody(req, config) {
        const result = {
            isValid: true,
            errors: []
        };

        // If no expectedFields are configured, accept any valid JSON
        if (!config.expectedFields || !Array.isArray(config.expectedFields)) {
            return result;
        }

        // Check if request body exists
        if (!req.body || typeof req.body !== 'object') {
            result.isValid = false;
            result.errors.push({
                field: 'body',
                message: 'Request body must be a valid JSON object',
                receivedValue: req.body
            });
            return result;
        }

        // Validate each expected field
        config.expectedFields.forEach(fieldName => {
            if (!(fieldName in req.body)) {
                result.isValid = false;
                result.errors.push({
                    field: fieldName,
                    message: 'Field is required',
                    expectedType: 'any'
                });
            } else if (req.body[fieldName] === null || req.body[fieldName] === undefined) {
                result.isValid = false;
                result.errors.push({
                    field: fieldName,
                    message: 'Field cannot be null or undefined',
                    receivedValue: req.body[fieldName]
                });
            }
        });

        return result;
    }

    // Get all registered routes
    getRegisteredRoutes() {
        return Array.from(this.registeredRoutes.keys());
    }
}

module.exports = RouteService;
