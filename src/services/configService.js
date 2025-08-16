const fs = require('fs');
const { CONFIG_FILE, DEFAULT_ENDPOINTS } = require('../config/constants');

class ConfigService {
    constructor() {
        this.endpointConfigs = { ...DEFAULT_ENDPOINTS };
        this.loadConfigurations();
    }

    // Load configurations from file if it exists
    loadConfigurations() {
        try {
            if (fs.existsSync(CONFIG_FILE)) {
                const data = fs.readFileSync(CONFIG_FILE, 'utf8');
                this.endpointConfigs = JSON.parse(data);
                console.log('Loaded endpoint configurations from file');
            }
        } catch (error) {
            console.error('Error loading configurations:', error);
        }
    }

    // Save configurations to file
    saveConfigurations() {
        try {
            fs.writeFileSync(CONFIG_FILE, JSON.stringify(this.endpointConfigs, null, 2));
            console.log('Saved endpoint configurations to file');
        } catch (error) {
            console.error('Error saving configurations:', error);
        }
    }

    // Get all configurations
    getAllConfigs() {
        return this.endpointConfigs;
    }

    // Get specific endpoint configuration
    getEndpointConfig(endpoint) {
        return this.endpointConfigs[endpoint];
    }

    // Add new endpoint configuration
    addEndpoint(endpoint, config) {
        if (this.endpointConfigs[endpoint]) {
            throw new Error('Endpoint already exists');
        }
        
        this.endpointConfigs[endpoint] = config;
        this.saveConfigurations();
        return this.endpointConfigs;
    }

    // Update endpoint configuration
    updateEndpoint(endpoint, config) {
        if (!this.endpointConfigs[endpoint]) {
            throw new Error('Endpoint not found');
        }
        
        this.endpointConfigs[endpoint] = { ...this.endpointConfigs[endpoint], ...config };
        this.saveConfigurations();
        return this.endpointConfigs;
    }

    // Remove endpoint configuration
    removeEndpoint(endpoint) {
        if (!this.endpointConfigs[endpoint]) {
            throw new Error('Endpoint not found');
        }
        
        delete this.endpointConfigs[endpoint];
        this.saveConfigurations();
        return this.endpointConfigs;
    }

    // Rename endpoint
    renameEndpoint(oldName, newName) {
        if (!this.endpointConfigs[oldName]) {
            throw new Error('Source endpoint not found');
        }
        
        if (this.endpointConfigs[newName]) {
            throw new Error('Target endpoint name already exists');
        }
        
        // Copy configuration to new name
        this.endpointConfigs[newName] = { ...this.endpointConfigs[oldName] };
        
        // Remove old endpoint
        delete this.endpointConfigs[oldName];
        
        this.saveConfigurations();
        return this.endpointConfigs;
    }
}

module.exports = ConfigService;
