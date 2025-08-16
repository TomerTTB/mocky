const cors = require('cors');
const { CORS_ORIGIN, CORS_METHODS } = require('../config/constants');

const corsMiddleware = cors({
    origin: CORS_ORIGIN,
    methods: CORS_METHODS
});

module.exports = corsMiddleware;
