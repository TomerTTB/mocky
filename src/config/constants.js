const path = require('path');

module.exports = {
    // Server configuration
    API_PORT: 3003,
    WEB_PORT: 3004,
    
    // File paths
    CONFIG_FILE: path.join(__dirname, '../../endpoints.json'),
    PUBLIC_DIR: path.join(__dirname, '../../public'),
    
    // Default endpoints
    DEFAULT_ENDPOINTS: {
        'a': { 
            method: 'GET',
            statusCode: 200, 
            body: { message: 'Response from http://localhost:3003/a' }, 
            delay: 0 
        },
        'b': { 
            method: 'GET',
            statusCode: 200, 
            body: { message: 'Response from http://localhost:3003/b' }, 
            delay: 0 
        },
        'c': { 
            method: 'GET',
            statusCode: 200, 
            body: { message: 'Response from http://localhost:3003/c' }, 
            delay: 0 
        }
    },
    
    // CORS configuration
    CORS_ORIGIN: "http://localhost:3003",
    CORS_METHODS: ["GET", "POST", "PUT", "PATCH", "DELETE"]
};
