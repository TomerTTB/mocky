const path = require('path');
const { getLocalIP, getBaseURL } = require('../utils/networkUtils');

// Get dynamic IP and base URL
const LOCAL_IP = getLocalIP();
const API_PORT = 3003;
const BASE_URL = getBaseURL(API_PORT);

module.exports = {
    // Server configuration
    API_PORT,
    LOCAL_IP,
    BASE_URL,
    
    // File paths
    CONFIG_FILE: path.join(__dirname, '../../endpoints.json'),
    PUBLIC_DIR: path.join(__dirname, '../../public'),
    
    // Default endpoints
    DEFAULT_ENDPOINTS: {
        'a': { 
            method: 'GET',
            statusCode: 200, 
            body: { message: `Response from ${BASE_URL}/a` }, 
            delay: 0 
        },
        'b': { 
            method: 'GET',
            statusCode: 200, 
            body: { message: `Response from ${BASE_URL}/b` }, 
            delay: 0 
        },
        'c': { 
            method: 'GET',
            statusCode: 200, 
            body: { message: `Response from ${BASE_URL}/c` }, 
            delay: 0 
        }
    },
    
    // CORS configuration - allow both localhost and detected IP
    CORS_ORIGIN: [BASE_URL, `http://localhost:${API_PORT}`],
    CORS_METHODS: ["GET", "POST", "PUT", "PATCH", "DELETE"]
};
