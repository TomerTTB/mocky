const os = require('os');

/**
 * Get the machine's local IP address
 * @returns {string} The local IP address or localhost as fallback
 */
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    
    // Look for the first non-internal IPv4 address
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            // Skip internal (loopback) and non-IPv4 addresses
            if (!iface.internal && iface.family === 'IPv4') {
                return iface.address;
            }
        }
    }
    
    // Fallback to localhost if no external IP found
    return 'localhost';
}

/**
 * Get the base URL for the server
 * @param {number} port - The port number
 * @returns {string} The complete base URL
 */
function getBaseURL(port = 3003) {
    const ip = getLocalIP();
    return `http://${ip}:${port}`;
}

module.exports = {
    getLocalIP,
    getBaseURL
};