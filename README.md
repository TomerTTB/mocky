# 🚀 Mocky: Advanced Mock Server with Full HTTP Methods Support

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4.18+-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7+-010101?style=flat&logo=socket.io&logoColor=white)](https://socket.io/)
[![HTML5](https://img.shields.io/badge/HTML5-5.0+-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-3.0+-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.0+-7952B3?style=flat&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

## 📋 Table of Contents

- [Overview](#overview)
- [What's New](#-whats-new)
- [Key Features](#-key-features)
- [Use Cases](#-use-cases)
- [Quick Start](#-quick-start)
- [Usage Guide](#-usage-guide)
  - [Web Interface](#web-interface)
  - [HTTP Methods Support](#http-methods-support)
  - [Request Validation](#request-validation)
  - [Testing Endpoints](#testing-endpoints)
  - [REST API](#rest-api)
- [Configuration](#️-configuration)
- [Cloud Deployment](#cloud-deployment)
- [Project Architecture](#️-project-architecture)
- [Development](#️-development)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

## Overview

**Mocky** is a comprehensive and intuitive mock server designed to revolutionize API development and testing. It provides a real-time web interface with full HTTP methods support (GET, POST, PUT, PATCH, DELETE), request validation, and advanced testing capabilities. Whether you're a frontend developer needing a stable API during backend development, a QA engineer testing various API scenarios, or a full-stack developer streamlining your workflow, Mocky offers a flexible, powerful, and efficient solution.

## 🆕 What's New

### Version 2.0 Features
- **Full HTTP Methods Support**: Complete support for GET, POST, PUT, PATCH, and DELETE methods
- **Advanced Request Validation**: Field-level validation for POST, PUT, and PATCH requests with detailed error responses
- **Smart Cloud Deployment**: Auto-detects public IP on GCP, AWS, Azure - deploy anywhere without configuration
- **Enhanced Testing Interface**: Built-in testing with custom request bodies and validation error display
- **Redesigned UI**: Modern, organized interface with logical workflow sections
- **Mobile-Responsive Design**: Optimized for all screen sizes and devices
- **Modular Architecture**: Clean, maintainable codebase with separated concerns
- **Improved Performance**: Faster loading and better user experience

## ✨ Key Features

### Core Functionality
- **Dynamic Endpoint Management**: Add, update, and remove API endpoints on the fly via an intuitive web interface
- **Real-time Configuration**: Instant updates across all connected clients using WebSocket technology
- **Persistent Storage**: Automatic configuration persistence to `endpoints.json` with session recovery
- **Smart Cloud Deployment**: Auto-detects public IP on any cloud platform - deploy once, run anywhere
- **Customizable Responses**: Full control over HTTP status codes, JSON response bodies, and network delays

### HTTP Methods & Validation
- **Complete HTTP Support**: GET, POST, PUT, PATCH, DELETE methods with method-specific behaviors
- **Request Validation**: Field-level validation for body methods with customizable required fields
- **Detailed Error Responses**: Comprehensive validation error messages with field-specific details
- **Smart Request Bodies**: Auto-generated sample request bodies based on expected fields

### Testing & Development
- **Integrated Testing Suite**: Test endpoints directly from the web interface with custom request bodies
- **Response Analysis**: Detailed test results with status codes, response times, and validation errors
- **Method-Specific Testing**: Tailored testing interface for each HTTP method type
- **Cross-Platform Compatibility**: Works seamlessly across different browsers and devices

### User Experience
- **Modern Interface**: Clean, professional design with intuitive workflow organization
- **Mobile-First Design**: Fully responsive interface optimized for all screen sizes
- **Organized Sections**: Logical grouping of configuration, validation, and testing features
- **Fast Performance**: Optimized loading times and smooth interactions

## 🎯 Use Cases

Mocky is an invaluable tool across the entire software development lifecycle:

### 🚀 Development & Prototyping
- **Frontend Development**: Build UIs without waiting for backend APIs - simulate all response scenarios
- **API Design**: Rapidly prototype and iterate on API designs with stakeholder feedback
- **Microservices Development**: Mock service dependencies for isolated development and testing
- **Mobile App Development**: Consistent API responses for iOS/Android development

### 🧪 Testing & Quality Assurance
- **Unit Testing**: Create predictable, controlled test environments with consistent API responses
- **Integration Testing**: Test application behavior with various API response scenarios
- **Load Testing**: Simulate API performance characteristics with configurable delays
- **Error Handling**: Test application resilience with controlled error responses (4xx, 5xx)
- **Edge Case Testing**: Validate application behavior with unusual or malformed responses

### 📋 Business & Collaboration
- **Demonstrations**: Showcase application functionality during presentations and demos
- **Client Previews**: Provide working prototypes to clients before full backend implementation
- **Training**: Create controlled environments for developer training and onboarding
- **Documentation**: Generate interactive API documentation with live examples

### 🔧 DevOps & Automation
- **CI/CD Pipelines**: Integrate mock servers into automated testing workflows
- **Offline Development**: Work without internet connectivity by mocking external dependencies
- **Third-party API Simulation**: Mock external services during development and testing
- **Performance Benchmarking**: Establish baseline performance metrics with controlled responses

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

### Installation

1. **Clone or download** this project to your local machine
2. **Open a terminal** in the project directory
3. **Install dependencies and start** the server:

#### Option 1: Windows PowerShell (Recommended)
```powershell
.\start.ps1
```

#### Option 2: Manual Installation
```bash
# Install dependencies
npm install

# Start the server
npm start
```

#### Option 3: Development Mode (with auto-restart)
```bash
npm run dev
```

### 🌐 Access the Application

Once started, you can access:
- **🖥️ Web Interface**: `http://localhost:3003`
- **🔗 Mock API Endpoints**: `http://localhost:3003/{endpoint-name}`
- **⚙️ REST API**: `http://localhost:3003/api/endpoints`

### ✅ Verify Installation

1. Open your browser to `http://localhost:3003`
2. You should see the Mocky web interface with default endpoints
3. Try testing an endpoint by clicking the "🚀 Test Endpoint" button

## 📖 Usage Guide

### Web Interface

The Mocky web interface provides a comprehensive dashboard for managing your mock API endpoints:

#### 🆕 Adding New Endpoints

1. **Basic Configuration**:
   - **Endpoint Name**: Enter a URL path (e.g., "users", "products", "auth/login")
   - **HTTP Method**: Choose from GET, POST, PUT, PATCH, or DELETE
   - **Status Code**: Set the HTTP response code (200, 201, 404, 500, etc.)
   - **Delay**: Add response delay in milliseconds (0-10000ms)

2. **Response Configuration**:
   - **Response Body**: Enter JSON response data manually
   - **File Upload**: Upload a `.json` file for complex responses
   - **Auto-formatting**: JSON is automatically formatted and validated

3. **Request Validation** (POST, PUT, PATCH only):
   - **Expected Fields**: Define required fields as a JSON array
   - **Validation Rules**: Automatic validation of incoming requests
   - **Error Responses**: Detailed validation error messages

#### 🔧 Managing Existing Endpoints

Each endpoint card is organized into logical sections:

1. **Quick Stats Overview**: Visual summary of method, status, delay, and response type
2. **Configuration Section**: Modify status codes and delays
3. **Response Section**: Edit response bodies and upload files
4. **Request Validation Section**: Configure field validation (body methods only)
5. **Testing Section**: Test endpoints with custom request bodies

### HTTP Methods Support

Mocky supports all common HTTP methods with method-specific behaviors:

#### 🟢 GET Methods
- **Purpose**: Retrieve data from the server
- **Request Body**: Not supported (as per HTTP standards)
- **Validation**: No request validation
- **Use Cases**: Fetching user lists, product catalogs, configuration data

```bash
# Example GET request
curl http://localhost:3003/users
```

#### 🔵 POST Methods
- **Purpose**: Create new resources
- **Request Body**: Full JSON body support with validation
- **Validation**: Field-level validation with detailed error responses
- **Use Cases**: User registration, creating new records, form submissions

```bash
# Example POST request with validation
curl -X POST http://localhost:3003/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

#### 🟡 PUT Methods
- **Purpose**: Update/replace entire resources
- **Request Body**: Full JSON body support with validation
- **Validation**: Field-level validation for complete resource updates
- **Use Cases**: Updating user profiles, replacing configuration settings

```bash
# Example PUT request
curl -X PUT http://localhost:3003/users/123 \
  -H "Content-Type: application/json" \
  -d '{"id": "123", "name": "John Smith", "email": "john.smith@example.com"}'
```

#### 🟠 PATCH Methods
- **Purpose**: Partial resource updates
- **Request Body**: JSON body support with validation
- **Validation**: Field-level validation for partial updates
- **Use Cases**: Updating specific fields, status changes, partial modifications

```bash
# Example PATCH request
curl -X PATCH http://localhost:3003/users/123 \
  -H "Content-Type: application/json" \
  -d '{"status": "active"}'
```

#### 🔴 DELETE Methods
- **Purpose**: Remove resources
- **Request Body**: Not typically used (optional support available)
- **Validation**: No request validation by default
- **Use Cases**: Deleting users, removing records, cleanup operations

```bash
# Example DELETE request
curl -X DELETE http://localhost:3003/users/123
```

### Request Validation

For methods that support request bodies (POST, PUT, PATCH), Mocky provides powerful validation features:

#### ✅ Field Validation
- **Required Fields**: Define which fields must be present in requests
- **Type Checking**: Automatic validation of field presence and non-null values
- **Error Responses**: Detailed error messages with field-specific information

#### 📝 Validation Configuration
```json
{
  "expectedFields": ["name", "email", "phone"]
}
```

#### ❌ Validation Error Response
```json
{
  "error": "Request validation failed",
  "details": [
    {
      "field": "email",
      "message": "Field is required",
      "expectedType": "any"
    }
  ]
}
```

### Testing Endpoints

The built-in testing interface provides comprehensive endpoint testing:

#### 🧪 Test Features
- **Method-Specific Testing**: Tailored interface for each HTTP method
- **Custom Request Bodies**: Full JSON editor for POST, PUT, PATCH requests
- **Response Analysis**: Detailed response information including:
  - HTTP status codes
  - Response times
  - Request/response bodies
  - Validation error details

#### 📊 Test Results Display
- **Success Responses**: Clean formatting with syntax highlighting
- **Error Responses**: Highlighted validation errors with field-specific messages
- **Performance Metrics**: Response time measurement
- **Request Tracking**: Display of sent request bodies for debugging

### REST API

Mocky provides a comprehensive REST API for programmatic management:

#### 📋 Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/endpoints` | Retrieve all endpoint configurations |
| `POST` | `/api/endpoints` | Create a new mock endpoint |
| `DELETE` | `/api/endpoints/:endpoint` | Remove a specific endpoint |

#### 🔧 API Examples

**Create a GET endpoint:**
```bash
curl -X POST http://localhost:3003/api/endpoints \
  -H "Content-Type: application/json" \
  -d '{
    "endpoint": "products",
    "config": {
      "method": "GET",
      "statusCode": 200,
      "delay": 0,
      "body": {"products": [{"id": 1, "name": "Widget"}]}
    }
  }'
```

**Create a POST endpoint with validation:**
```bash
curl -X POST http://localhost:3003/api/endpoints \
  -H "Content-Type: application/json" \
  -d '{
    "endpoint": "users",
    "config": {
      "method": "POST",
      "statusCode": 201,
      "delay": 100,
      "body": {"message": "User created successfully"},
      "expectedFields": ["name", "email"]
    }
  }'
```

**Test the created endpoints:**
```bash
# Test GET endpoint
curl http://localhost:3003/products

# Test POST endpoint (valid request)
curl -X POST http://localhost:3003/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com"}'

# Test POST endpoint (validation error)
curl -X POST http://localhost:3003/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John"}'
```

## ⚙️ Configuration

### Automatic Persistence

All endpoint configurations are automatically saved to `endpoints.json` in the project root. This ensures your mock setups persist across server restarts.

### Configuration File Structure

```json
{
  "users": {
    "method": "GET",
    "statusCode": 200,
    "delay": 100,
    "body": {"users": [{"id": 1, "name": "John"}]}
  },
  "create-user": {
    "method": "POST",
    "statusCode": 201,
    "delay": 0,
    "body": {"message": "User created successfully"},
    "expectedFields": ["name", "email", "phone"]
  },
  "update-user": {
    "method": "PUT",
    "statusCode": 200,
    "delay": 50,
    "body": {"message": "User updated successfully"},
    "expectedFields": ["id", "name", "email"]
  },
  "products": {
    "method": "GET",
    "statusCode": 404,
    "delay": 0,
    "body": {"error": "Products not found"}
  }
}
```

### Configuration Options

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `method` | String | No | HTTP method (GET, POST, PUT, PATCH, DELETE). Defaults to GET |
| `statusCode` | Number | Yes | HTTP status code (100-599) |
| `delay` | Number | Yes | Response delay in milliseconds (0-10000) |
| `body` | Object | Yes | JSON response body |
| `expectedFields` | Array | No | Required fields for request validation (body methods only) |

### Default Endpoints

The server starts with sample endpoints demonstrating different HTTP methods:

| Endpoint | Method | Purpose | Features |
|----------|--------|---------|----------|
| `/a` | GET | Simple GET example | Basic response with delay |
| `/b` | GET | Simple GET example | Basic response |
| `/c` | GET | Simple GET example | Basic response |
| `/test-post` | POST | POST with validation | Field validation example |
| `/test-put` | PUT | PUT with validation | Update operation example |
| `/test-patch` | PATCH | PATCH with validation | Partial update example |
| `/test-delete` | DELETE | DELETE example | Resource deletion example |

These default endpoints can be modified or removed as needed through the web interface.

## ☁️ Cloud Deployment

### Smart IP Detection

Mocky automatically detects the best IP address to use, making it **deploy-anywhere compatible**. The same code works seamlessly across different cloud platforms and VMs without any configuration changes.

**Key Features:**
- **🔍 Auto-Detection**: Automatically detects public IP from cloud metadata services
- **🌐 Multi-Cloud Support**: Works on GCP, AWS, Azure, and private VMs
- **🔧 Manual Override**: Environment variable support for custom configurations
- **🔄 Zero Configuration**: Deploy the same code to any VM - it just works

### Deployment Options

#### Option 1: Automatic Detection (Recommended)

Simply deploy and run - the server automatically detects your environment:

```bash
# Works on any cloud platform
npm start
```

**Supported Platforms:**
- **Google Cloud Platform**: Auto-detects from GCP metadata service
- **AWS EC2**: Auto-detects from EC2 metadata service  
- **Azure VMs**: Auto-detects from Azure instance metadata
- **Private VMs**: Falls back to local network IP

#### Option 2: Manual IP Override

For custom deployments or when auto-detection needs override:

```bash
# Linux/Mac
PUBLIC_IP=34.59.48.42 npm start

# Windows PowerShell
$env:PUBLIC_IP = "34.59.48.42"; npm start

# Alternative environment variable
SERVER_IP=34.59.48.42 npm start
```

#### Option 3: Using Startup Scripts

**Linux/Mac:**
```bash
# Make executable and run
chmod +x start.sh
PUBLIC_IP=34.59.48.42 ./start.sh
```

**Windows:**
```powershell
# Set IP and run
$env:PUBLIC_IP = "34.59.48.42"
.\start.ps1
```

### Real-World Examples

| Deployment Scenario | Command | Result |
|---------------------|---------|--------|
| **GCP VM** | `npm start` | `http://34.59.48.42:3003` |
| **AWS EC2** | `npm start` | `http://52.123.45.67:3003` |
| **Azure VM** | `npm start` | `http://20.98.76.54:3003` |
| **Docker Container** | `PUBLIC_IP=host-ip npm start` | `http://host-ip:3003` |
| **Private Network** | `PUBLIC_IP=192.168.1.100 npm start` | `http://192.168.1.100:3003` |

### IP Detection Priority

The system uses this priority order to determine the best IP:

1. **Environment Variables** (highest priority)
   - `PUBLIC_IP` - Primary override variable
   - `SERVER_IP` - Alternative override variable

2. **Cloud Metadata Services** (automatic)
   - Google Cloud Platform metadata
   - AWS EC2 metadata service
   - Azure instance metadata service

3. **Local Network Interface** (fallback)
   - First non-loopback IPv4 address
   - Falls back to `localhost` if no network interface found

### CORS Configuration

The server automatically configures CORS to allow access from multiple origins:

- **Public IP**: `http://your-public-ip:3003`
- **Localhost**: `http://localhost:3003` 
- **127.0.0.1**: `http://127.0.0.1:3003`

This ensures the web interface works whether accessed via public IP or localhost.

### Verification

After deployment, check the console output to verify correct IP detection:

```bash
Mock API server running on http://34.59.48.42:3003
Web interface available at http://34.59.48.42:3003
Server IP: 34.59.48.42
```

### Troubleshooting Deployment

| Issue | Solution |
|-------|----------|
| **Wrong IP detected** | Set `PUBLIC_IP` environment variable |
| **Can't access from browser** | Check firewall rules for port 3003 |
| **CORS errors** | Server auto-configures CORS - try different browser |
| **Cloud metadata fails** | System falls back to local IP automatically |

## 🏗️ Project Architecture

Mocky follows a clean, modular architecture designed for maintainability, scalability, and ease of development.

### 📁 Directory Structure

```
Mocky/
├── src/                           # Backend source code
│   ├── config/                    # Configuration management
│   │   └── constants.js           # Server settings, ports, defaults
│   ├── middleware/                # Express middleware
│   │   ├── cors.js                # CORS configuration
│   │   └── errorHandler.js        # Global error handling
│   ├── routes/                    # API route definitions
│   │   └── api.js                 # REST API for endpoint management
│   ├── services/                  # Business logic layer
│   │   ├── configService.js       # Configuration file operations
│   │   ├── routeService.js        # Dynamic route management
│   │   └── socketService.js       # WebSocket event handling
│   └── server.js                  # Main server setup and initialization
├── public/                        # Frontend assets
│   ├── css/
│   │   └── common.css             # Styling and responsive design
│   ├── js/                        # Modular JavaScript architecture
│   │   ├── addEndpoint.js         # Add endpoint functionality
│   │   ├── endpointCard.js        # Endpoint management and testing
│   │   ├── socketHandlers.js      # WebSocket event handling
│   │   ├── utils.js               # Shared utilities and constants
│   │   └── index.js               # Main application entry point
│   └── index.html                 # Web interface template
├── endpoints.json                 # Persistent endpoint configurations
├── package.json                   # Dependencies and scripts
├── start.ps1                      # Windows PowerShell startup script
└── README.md                      # Project documentation
```

### 🏛️ Architecture Layers

#### 🔧 Backend Services Layer
- **ConfigService**: Manages endpoint configurations with file I/O operations
- **RouteService**: Handles dynamic Express route registration for all HTTP methods
- **SocketService**: Manages real-time WebSocket communication with clients

#### 🌐 API Layer
- **REST API Routes**: Programmatic endpoint management for automation
- **Dynamic Mock Routes**: Runtime-generated routes for mock endpoints
- **WebSocket Events**: Real-time updates and notifications

#### 🛡️ Middleware Layer
- **CORS Middleware**: Cross-origin resource sharing configuration
- **Error Handler**: Centralized error handling and logging
- **Body Parser**: JSON request body parsing for all HTTP methods

#### ⚙️ Configuration Layer
- **Constants**: Centralized configuration values and environment settings
- **Default Endpoints**: Pre-configured sample endpoints for quick start

#### 🎨 Frontend Architecture
- **Modular JavaScript**: ES6 modules for clean separation of concerns
- **Component-Based UI**: Reusable components for endpoint management
- **Real-time Updates**: WebSocket integration for live configuration changes
- **Responsive Design**: Mobile-first CSS with Bootstrap integration

### 🔄 Data Flow

1. **Configuration Management**: 
   - User interactions → WebSocket events → ConfigService → File persistence
   - File changes → RouteService → Dynamic route updates

2. **Request Processing**:
   - HTTP requests → RouteService → Validation (if applicable) → Mock response
   - Real-time updates → SocketService → All connected clients

3. **Testing Workflow**:
   - UI test requests → Mock endpoints → Response analysis → UI display

### 🚀 Key Architectural Benefits

- **🔧 Modularity**: Clean separation of concerns for easy maintenance
- **📈 Scalability**: Service-based architecture supports feature expansion
- **🔄 Real-time**: WebSocket integration for instant configuration updates
- **🧪 Testability**: Isolated modules enable comprehensive testing
- **📱 Responsiveness**: Mobile-first design with progressive enhancement
- **⚡ Performance**: Optimized loading with modular JavaScript architecture

## 🛠️ Development

### 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Start** | `npm start` | Start the production server |
| **Development** | `npm run dev` | Start with nodemon (auto-restart on changes) |
| **Install** | `npm install` | Install all dependencies |

### 🔧 Development Workflow

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Start development server**: `npm run dev`
4. **Make changes** to source files
5. **Test changes** in the web interface at `http://localhost:3003`

### 📦 Dependencies

#### Production Dependencies
- **express** `^4.18.2`: Fast, unopinionated web framework for Node.js
- **cors** `^2.8.5`: Cross-Origin Resource Sharing middleware
- **socket.io** `^4.7.1`: Real-time bidirectional event-based communication

#### Development Dependencies
- **nodemon** `^2.0.22`: Development tool for automatic server restarts

### 🏗️ Code Structure Guidelines

#### Backend (src/)
- **Services**: Business logic and data management
- **Routes**: API endpoint definitions
- **Middleware**: Request/response processing
- **Config**: Application configuration and constants

#### Frontend (public/js/)
- **Modular Architecture**: ES6 modules for clean separation
- **Component Pattern**: Reusable UI components
- **Event-Driven**: WebSocket-based real-time updates
- **Responsive Design**: Mobile-first CSS approach

### 🧪 Testing Your Changes

1. **Web Interface Testing**:
   - Create endpoints with different HTTP methods
   - Test request validation with various payloads
   - Verify real-time updates across multiple browser tabs

2. **API Testing**:
   ```bash
   # Test REST API endpoints
   curl http://localhost:3003/api/endpoints
   
   # Test mock endpoints
   curl -X POST http://localhost:3003/your-endpoint \
     -H "Content-Type: application/json" \
     -d '{"test": "data"}'
   ```

3. **Cross-Browser Testing**:
   - Chrome, Firefox, Safari, Edge
   - Mobile browsers (responsive design)
   - Different screen sizes and orientations

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 🚫 Port Already in Use
**Problem**: Error message "EADDRINUSE: address already in use :::3003"

**Solutions**:
1. **Change the port** in `src/config/constants.js`:
   ```javascript
   API_PORT: 3004, // Change to any available port
   ```

2. **Kill existing process**:
   ```bash
   # Windows
   netstat -ano | findstr :3003
   taskkill /PID <PID> /F
   
   # macOS/Linux
   lsof -ti:3003 | xargs kill -9
   ```

#### 🌐 CORS Issues
**Problem**: Cross-origin requests blocked

**Solution**: Update CORS settings in `src/config/constants.js`:
```javascript
CORS_ORIGIN: "*", // Allow all origins (development only)
CORS_METHODS: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
```

#### 📱 UI Not Loading
**Problem**: Web interface doesn't load or appears broken

**Solutions**:
1. **Clear browser cache** and refresh
2. **Check browser console** for JavaScript errors
3. **Verify server is running** at `http://localhost:3003`
4. **Try incognito/private browsing** mode

#### 🔧 Module Import Errors
**Problem**: ES6 module import errors in browser

**Solution**: Ensure you're serving files through the HTTP server, not opening HTML files directly in the browser.

#### 💾 Configuration Not Persisting
**Problem**: Endpoint configurations reset after server restart

**Solutions**:
1. **Check file permissions** on `endpoints.json`
2. **Verify write access** to the project directory
3. **Check for file system errors** in server logs

#### 🧪 Testing Issues
**Problem**: Endpoint tests failing or not working

**Solutions**:
1. **Verify endpoint configuration** is saved
2. **Check request body format** (valid JSON)
3. **Confirm expected fields** match request payload
4. **Review browser network tab** for detailed error information

### 📞 Getting Help

If you encounter issues not covered here:

1. **Check the browser console** for error messages
2. **Review server logs** in the terminal
3. **Verify your Node.js version** (16+ required)
4. **Test with default endpoints** first
5. **Try creating a minimal test case**

### 🐛 Reporting Issues

When reporting issues, please include:
- Operating system and version
- Node.js version (`node --version`)
- Browser and version
- Steps to reproduce the issue
- Error messages or screenshots
- Endpoint configuration (if relevant)

## 📄 License

This project is open source and available under the **MIT License**.

### MIT License Summary
- ✅ **Commercial use** allowed
- ✅ **Modification** allowed  
- ✅ **Distribution** allowed
- ✅ **Private use** allowed
- ❌ **Liability** - No warranty provided
- ❌ **Warranty** - Use at your own risk

---

## 🚀 Ready to Get Started?

1. **[Quick Start](#-quick-start)** - Get up and running in minutes
2. **[Usage Guide](#-usage-guide)** - Learn how to use all features
3. **[Examples](#rest-api)** - See practical examples and use cases

**Happy Mocking! 🎉**