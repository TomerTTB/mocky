// Configuration management for dynamic base URL
class ConfigManager {
    constructor() {
        this.baseUrl = 'http://localhost:3003'; // fallback
        this.initialized = false;
    }

    async initialize() {
        if (this.initialized) return;
        
        try {
            const response = await fetch('/api/config');
            const config = await response.json();
            this.baseUrl = config.baseUrl;
            this.initialized = true;
            console.log('Config loaded:', config);
        } catch (error) {
            console.warn('Failed to load server config, using fallback:', error);
            // Keep fallback baseUrl
        }
    }

    getBaseUrl() {
        return this.baseUrl;
    }

    getEndpointUrl(endpoint) {
        return `${this.baseUrl}/${endpoint}`;
    }
}

// Global config instance
window.configManager = new ConfigManager();