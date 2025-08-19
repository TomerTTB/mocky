// Main application entry point
import { initializeAddEndpoint } from './addEndpoint.js';
import { renderEndpoints } from './endpointCard.js';
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

    console.log('Mock Server UI initialized successfully');
});