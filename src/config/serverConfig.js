const path = require('path');
const { getBestIP, getLocalIP } = require('../utils/networkUtils');

class ServerConfig {
    constructor() {
        this.API_PORT = 3003;
        this.LOCAL_IP = getLocalIP(); // Synchronous fallback
        this.BASE_URL = `http://${this.LOCAL_IP}:${this.API_PORT}`;
        this.initialized = false;
    }

    async initialize() {
        if (this.initialized) return;

        try {
            // Get the best available IP (async)
            const bestIP = await getBestIP();
            this.LOCAL_IP = bestIP;
            this.BASE_URL = `http://${bestIP}:${this.API_PORT}`;
            this.initialized = true;
            
            console.log(`Server configuration initialized with IP: ${bestIP}`);
        } catch (error) {
            console.warn('Failed to get optimal IP, using fallback:', error.message);
            // Keep the synchronous fallback values
        }
    }

    getConfig() {
        return {
            // Server configuration
            API_PORT: this.API_PORT,
            LOCAL_IP: this.LOCAL_IP,
            BASE_URL: this.BASE_URL,
            
            // File paths
            CONFIG_FILE: path.join(__dirname, '../../endpoints.json'),
            PUBLIC_DIR: path.join(__dirname, '../../public'),
            
            // Default endpoints
            DEFAULT_ENDPOINTS: {
                'a': { 
                    method: 'GET',
                    statusCode: 200, 
                    body: { message: `Response from ${this.BASE_URL}/a` }, 
                    delay: 0 
                },
                'b': { 
                    method: 'GET',
                    statusCode: 200, 
                    body: { message: `Response from ${this.BASE_URL}/b` }, 
                    delay: 0 
                },
                'c': { 
                    method: 'GET',
                    statusCode: 200, 
                    body: { message: `Response from ${this.BASE_URL}/c` }, 
                    delay: 0 
                }
            },
            
            // CORS configuration - allow multiple origins for flexibility
            CORS_ORIGIN: [
                this.BASE_URL, 
                `http://localhost:${this.API_PORT}`,
                `http://127.0.0.1:${this.API_PORT}`
            ],
            CORS_METHODS: ["GET", "POST", "PUT", "PATCH", "DELETE"]
        };
    }
}

// Export singleton instance
const serverConfig = new ServerConfig();
module.exports = serverConfig;