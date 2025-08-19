const cors = require('cors');

function createCorsMiddleware() {
    const serverConfig = require('../config/serverConfig');
    const config = serverConfig.getConfig();
    
    return cors({
        origin: config.CORS_ORIGIN,
        methods: config.CORS_METHODS
    });
}

module.exports = createCorsMiddleware;
