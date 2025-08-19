# Mock Server Startup Script
Write-Host "Starting Mock Server..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Cyan
} catch {
    Write-Host "Error: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check if dependencies are installed
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Start the server
Write-Host "Starting Mock Server..." -ForegroundColor Green

# Check for PUBLIC_IP environment variable
if ($env:PUBLIC_IP) {
    Write-Host "Using PUBLIC_IP from environment: $env:PUBLIC_IP" -ForegroundColor Cyan
} else {
    Write-Host "Auto-detecting IP address..." -ForegroundColor Cyan
    Write-Host "Tip: Set PUBLIC_IP environment variable for cloud deployments" -ForegroundColor Yellow
    Write-Host "Example: `$env:PUBLIC_IP = '34.59.48.42'; .\start.ps1`" -ForegroundColor Yellow
}
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow

npm start