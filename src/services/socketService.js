class SocketService {
    constructor(io, configService, routeService) {
        this.io = io;
        this.configService = configService;
        this.routeService = routeService;
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        this.io.on('connection', (socket) => {
            console.log('Client connected');
            
            // Send current configurations to new clients
            socket.emit('configUpdate', this.configService.getAllConfigs());

            // Handle configuration updates from clients
            socket.on('updateConfig', (newConfig) => this.handleUpdateConfig(socket, newConfig));

            // Handle endpoint removal
            socket.on('removeEndpoint', (endpoint) => this.handleRemoveEndpoint(socket, endpoint));

            // Handle endpoint addition
            socket.on('addEndpoint', (endpointData) => this.handleAddEndpoint(socket, endpointData));

            // Handle endpoint renaming
            socket.on('renameEndpoint', (renameData) => this.handleRenameEndpoint(socket, renameData));

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    handleUpdateConfig(socket, newConfig) {
        console.log('Received new configuration:', newConfig);
        console.log('[DEBUG] Before update - endpointConfigs:', this.configService.getAllConfigs());
        
        try {
            // Update configurations
            Object.entries(newConfig).forEach(([endpoint, config]) => {
                this.configService.updateEndpoint(endpoint, config);
                this.routeService.updateEndpoint(endpoint, config);
            });
            
            const updatedConfigs = this.configService.getAllConfigs();
            console.log('[DEBUG] After update - endpointConfigs:', updatedConfigs);
            
            // Broadcast the new configuration to all clients
            this.io.emit('configUpdate', updatedConfigs);
            
            // Send success confirmation to the updating client
            socket.emit('updateSuccess', { 
                endpoint: Object.keys(newConfig)[0],
                timestamp: new Date().toLocaleTimeString()
            });
        } catch (error) {
            console.error('Error updating configuration:', error);
            socket.emit('updateError', { 
                message: error.message 
            });
        }
    }

    handleRemoveEndpoint(socket, endpoint) {
        console.log('Removing endpoint:', endpoint);
        
        try {
            this.configService.removeEndpoint(endpoint);
            this.routeService.unregisterEndpoint(endpoint);
            
            // Broadcast the updated configuration to all clients
            this.io.emit('configUpdate', this.configService.getAllConfigs());
            
            socket.emit('removeSuccess', { 
                endpoint: endpoint,
                timestamp: new Date().toLocaleTimeString()
            });
        } catch (error) {
            socket.emit('removeError', { 
                endpoint: endpoint,
                message: error.message
            });
        }
    }

    handleAddEndpoint(socket, endpointData) {
        const { endpoint, config } = endpointData;
        console.log('Adding new endpoint:', endpoint);
        
        try {
            this.configService.addEndpoint(endpoint, config);
            this.routeService.registerEndpoint(endpoint, config);
            
            // Broadcast the updated configuration to all clients
            this.io.emit('configUpdate', this.configService.getAllConfigs());
            
            socket.emit('addSuccess', { 
                endpoint: endpoint,
                timestamp: new Date().toLocaleTimeString()
            });
        } catch (error) {
            socket.emit('addError', { 
                endpoint: endpoint,
                message: error.message
            });
        }
    }

    handleRenameEndpoint(socket, renameData) {
        const { oldName, newName } = renameData;
        console.log('Renaming endpoint:', oldName, 'to', newName);
        
        try {
            const config = this.configService.getEndpointConfig(oldName);
            this.configService.renameEndpoint(oldName, newName);
            
            // Unregister old route and register new one
            this.routeService.unregisterEndpoint(oldName);
            this.routeService.registerEndpoint(newName, config);
            
            // Broadcast the updated configuration to all clients
            this.io.emit('configUpdate', this.configService.getAllConfigs());
            
            socket.emit('renameSuccess', { 
                oldName: oldName,
                newName: newName,
                timestamp: new Date().toLocaleTimeString()
            });
        } catch (error) {
            socket.emit('renameError', { 
                oldName: oldName,
                newName: newName,
                message: error.message
            });
        }
    }

    // Broadcast configuration updates to all clients
    broadcastConfigUpdate() {
        this.io.emit('configUpdate', this.configService.getAllConfigs());
    }
}

module.exports = SocketService;
