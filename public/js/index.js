// Main application entry point
import { initializeAddEndpoint } from './addEndpoint.js';
import { initializeSocketHandlers } from './socketHandlers.js';

// Initialize Socket.IO connection
const socket = io();

// Global state
const statusElements = {};
const endpointElements = {};

// Initialize all modules
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize configuration first
    await window.configManager.initialize();

    // Update template placeholder with actual base URL
    const templateUrl = document.querySelector('.endpoint-url');
    if (templateUrl && templateUrl.textContent.includes('{baseUrl}')) {
        templateUrl.textContent = templateUrl.textContent.replace('{baseUrl}', window.configManager.getBaseUrl());
    }

    // Initialize add endpoint functionality
    initializeAddEndpoint(socket);

    // Initialize socket event handlers
    initializeSocketHandlers(socket, endpointElements, statusElements);

    // Initialize endpoint count (will be updated when configs load)
    updateInitialEndpointCount();

    console.log('Mock Server UI initialized successfully');
});

// Initialize endpoint count display
function updateInitialEndpointCount() {
    const countElement = document.getElementById('endpointCount');
    if (countElement) {
        countElement.textContent = '0 endpoints';
    }
}