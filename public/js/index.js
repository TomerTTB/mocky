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
document.addEventListener('DOMContentLoaded', () => {
    // Initialize add endpoint functionality
    initializeAddEndpoint(socket);
    
    // Initialize socket event handlers
    initializeSocketHandlers(socket, endpointElements, statusElements);
    
    console.log('Mock Server UI initialized successfully');
});