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
                const rawConfigs = JSON.parse(data);
                this.endpointConfigs = this.migrateConfigFormat(rawConfigs);
                console.log('Loaded endpoint configurations from file');
            }
        } catch (error) {
            console.error('Error loading configurations:', error);
        }
    }

    // Migrate old configuration format to new format for backward compatibility
    migrateConfigFormat(configs) {
        const migratedConfigs = {};
        
        for (const [endpoint, config] of Object.entries(configs)) {
            migratedConfigs[endpoint] = {
                method: config.method || 'GET', // Default to GET for backward compatibility
                statusCode: config.statusCode,
                delay: config.delay,
                body: config.body,
                ...(config.expectedFields && { expectedFields: config.expectedFields }),
                ...(config.requestSchema && { requestSchema: config.requestSchema })
            };
        }
        
        return migratedConfigs;
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
        
        const validatedConfig = this.validateEndpointConfig(config);
        this.endpointConfigs[endpoint] = validatedConfig;
        this.saveConfigurations();
        return this.endpointConfigs;
    }

    // Update endpoint configuration
    updateEndpoint(endpoint, config) {
        if (!this.endpointConfigs[endpoint]) {
            throw new Error('Endpoint not found');
        }
        
        const mergedConfig = { ...this.endpointConfigs[endpoint], ...config };
        const validatedConfig = this.validateEndpointConfig(mergedConfig);
        this.endpointConfigs[endpoint] = validatedConfig;
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

    // Validate endpoint configuration
    validateEndpointConfig(config) {
        const validatedConfig = {
            method: config.method || 'GET',
            statusCode: config.statusCode || 200,
            delay: config.delay || 0,
            body: config.body || {}
        };

        // Validate method
        const validMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
        if (!validMethods.includes(validatedConfig.method)) {
            throw new Error(`Method must be one of: ${validMethods.join(', ')}`);
        }

        // Validate status code
        if (typeof validatedConfig.statusCode !== 'number' || validatedConfig.statusCode < 100 || validatedConfig.statusCode > 599) {
            throw new Error('Status code must be a number between 100 and 599');
        }

        // Validate delay
        if (typeof validatedConfig.delay !== 'number' || validatedConfig.delay < 0) {
            throw new Error('Delay must be a non-negative number');
        }

        // Add expectedFields for POST endpoints if provided
        if (config.expectedFields) {
            if (!Array.isArray(config.expectedFields)) {
                throw new Error('expectedFields must be an array');
            }
            validatedConfig.expectedFields = config.expectedFields;
        }

        // Add requestSchema for POST endpoints if provided
        if (config.requestSchema) {
            if (typeof config.requestSchema !== 'object') {
                throw new Error('requestSchema must be an object');
            }
            validatedConfig.requestSchema = config.requestSchema;
        }

        return validatedConfig;
    }

    // Get default method configuration
    getDefaultMethodConfig() {
        return {
            method: 'GET',
            statusCode: 200,
            delay: 0,
            body: {}
        };
    }
}

module.exports = ConfigService;
