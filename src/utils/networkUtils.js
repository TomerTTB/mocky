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
 * Try to get public IP from cloud metadata services
 * @returns {Promise<string|null>} Public IP or null if not available
 */
async function getPublicIPFromMetadata() {
    const metadataServices = [
        // Google Cloud Platform
        {
            url: 'http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/access-configs/0/external-ip',
            headers: { 'Metadata-Flavor': 'Google' }
        },
        // AWS
        {
            url: 'http://169.254.169.254/latest/meta-data/public-ipv4',
            headers: {}
        },
        // Azure
        {
            url: 'http://169.254.169.254/metadata/instance/network/interface/0/ipv4/ipAddress/0/publicIpAddress?api-version=2021-02-01',
            headers: { 'Metadata': 'true' }
        }
    ];

    for (const service of metadataServices) {
        try {
            const ip = await fetchMetadata(service.url, service.headers);
            if (ip && ip.match(/^\d+\.\d+\.\d+\.\d+$/)) {
                console.log(`Detected public IP from cloud metadata: ${ip}`);
                return ip;
            }
        } catch (error) {
            // Continue to next service
        }
    }

    return null;
}

/**
 * Fetch metadata from cloud service
 * @param {string} url - Metadata URL
 * @param {object} headers - Request headers
 * @returns {Promise<string>} Response data
 */
function fetchMetadata(url, headers) {
    return new Promise((resolve, reject) => {
        const request = require('http').get(url, { headers, timeout: 2000 }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data.trim()));
        });

        request.on('error', reject);
        request.on('timeout', () => {
            request.destroy();
            reject(new Error('Timeout'));
        });
    });
}

/**
 * Get the best available IP address for the server
 * @returns {Promise<string>} The IP address to use
 */
async function getBestIP() {
    // 1. Check for explicit environment variable
    if (process.env.PUBLIC_IP) {
        console.log(`Using PUBLIC_IP from environment: ${process.env.PUBLIC_IP}`);
        return process.env.PUBLIC_IP;
    }

    if (process.env.SERVER_IP) {
        console.log(`Using SERVER_IP from environment: ${process.env.SERVER_IP}`);
        return process.env.SERVER_IP;
    }

    // 2. Try to get public IP from cloud metadata
    const publicIP = await getPublicIPFromMetadata();
    if (publicIP) {
        return publicIP;
    }

    // 3. Fall back to local IP
    const localIP = getLocalIP();
    console.log(`Using local IP: ${localIP}`);
    return localIP;
}

/**
 * Get the base URL for the server
 * @param {number} port - The port number
 * @returns {Promise<string>} The complete base URL
 */
async function getBaseURL(port = 3003) {
    const ip = await getBestIP();
    return `http://${ip}:${port}`;
}

module.exports = {
    getLocalIP,
    getBestIP,
    getBaseURL
};