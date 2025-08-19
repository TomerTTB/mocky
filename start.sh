#!/bin/bash

# Mock Server Startup Script for Linux/Mac
echo "Starting Mock Server..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Show Node.js version
echo "Node.js version: $(node --version)"

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Check for PUBLIC_IP environment variable
if [ -n "$PUBLIC_IP" ]; then
    echo "Using PUBLIC_IP from environment: $PUBLIC_IP"
else
    echo "Auto-detecting IP address..."
    echo "Tip: Set PUBLIC_IP environment variable for cloud deployments"
    echo "Example: PUBLIC_IP=34.59.48.42 ./start.sh"
fi

# Start the server
echo "Starting server..."
npm start