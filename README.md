# 🚀 Mocky: Dynamic Mock Server with Web UI

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4.18+-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7+-010101?style=flat&logo=socket.io&logoColor=white)](https://socket.io/)
[![HTML5](https://img.shields.io/badge/HTML5-5.0+-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-3.0+-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.0+-7952B3?style=flat&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

## Overview

**Mocky** is a powerful and intuitive mock server designed to simplify API development and testing. It provides a real-time web interface that allows you to effortlessly create, manage, and simulate HTTP endpoints with custom responses, status codes, and delays. Whether you're a frontend developer needing a stable API during backend development, a QA engineer testing various API scenarios, or a full-stack developer streamlining your workflow, Mocky offers a flexible and efficient solution.

## Key Features

- **Dynamic Endpoint Management**: Add, update, and remove API endpoints on the fly via a user-friendly web interface or a dedicated REST API.
- **Real-time Configuration**: Instantly see changes reflected in the web UI thanks to real-time communication powered by WebSockets.
- **Persistent Storage**: All endpoint configurations are automatically saved to `endpoints.json`, ensuring your mock setups are preserved across sessions.
- **Customizable Responses**: Define custom HTTP status codes, JSON response bodies, and introduce delays to simulate various network conditions.
- **Integrated Testing**: Test your mocked endpoints directly from the web interface to verify their behavior.
- **RESTful API for Automation**: Programmatically manage your mock server using a dedicated REST API, perfect for CI/CD pipelines and automated testing.

## Potential Uses for a Mock Server

A mock server is an invaluable tool in various development scenarios:

- **Frontend Development**: Proceed with frontend development without waiting for the backend API to be ready. Simulate different API responses (success, error, loading states) to build a robust UI.
- **Unit and Integration Testing**: Create predictable test environments for your applications by controlling API responses, making tests reliable and repeatable.
- **API Design and Prototyping**: Quickly prototype API designs and get feedback from stakeholders before the actual backend implementation begins.
- **Demonstrations and Presentations**: Showcase application functionality even when external APIs are unavailable or unreliable.
- **Offline Development**: Work on your application without an active internet connection by mocking external API dependencies.
- **Fault Injection Testing**: Simulate various error conditions (e.g., 404, 500 errors, network delays) to test your application's resilience and error handling.

## Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone or download this project
2. Open a terminal in the project directory
3. Run the startup script:

**Windows (PowerShell):**
```powershell
.\start.ps1
```

**Manual installation:**
```bash
npm install
npm start
```

### Access the Application

- **Mock Server**: `http://localhost:3003`
- **Web Interface**: `http://localhost:3003` (same URL)

## Usage

### Web Interface

1. **View Existing Endpoints**: The interface shows all configured endpoints with their current settings.
2. **Add New Endpoint**: Use the form at the top to create new endpoints.
   - Enter endpoint name (e.g., "users", "products")
   - Set status code (e.g., 200, 404, 500)
   - Set delay in milliseconds (optional)
   - Enter JSON response body (or upload a JSON file)
3. **Update Endpoints**: Modify existing endpoint configurations and click "Update".
4. **Test Endpoints**: Click "Test" to verify endpoint responses.
5. **Remove Endpoints**: Click the "×" button to delete endpoints.

### REST API

The server also provides REST endpoints for programmatic access:

- `GET /api/endpoints` - Get all endpoint configurations
- `POST /api/endpoints` - Create a new endpoint
- `DELETE /api/endpoints/:endpoint` - Remove an endpoint

#### Example: Create endpoint via API

```bash
curl -X POST http://localhost:3003/api/endpoints \
  -H "Content-Type: application/json" \
  -d '{
    "endpoint": "users",
    "config": {
      "statusCode": 200,
      "delay": 100,
      "body": {"users": [{"id": 1, "name": "John"}]}
    }
  }'
```

#### Example: Test an endpoint

```bash
curl http://localhost:3003/users
```

## Configuration

Endpoint configurations are automatically saved to `endpoints.json` in the project root. The file structure looks like:

```json
{
  "users": {
    "statusCode": 200,
    "delay": 100,
    "body": {"message": "Users endpoint"}
  },
  "products": {
    "statusCode": 404,
    "delay": 0,
    "body": {"error": "Not found"}
  }
}
```

## Default Endpoints

The server starts with three default endpoints:
- `/a` - Returns a simple message
- `/b` - Returns a simple message  
- `/c` - Returns a simple message

These can be modified or removed as needed.

## Project Architecture

The application has been refactored into a modular, maintainable structure following best practices:

### Directory Structure

```
Mocky/
├── src/
│   ├── config/                    # Configuration constants and settings
│   │   └── constants.js           # Server ports, file paths, default endpoints
│   ├── middleware/                # Express middleware
│   │   └── cors.js                # CORS configuration
│   ├── routes/                    # API route definitions
│   │   └── api.js                 # REST API endpoints for managing mock endpoints
│   ├── services/                  # Business logic services
│   │   ├── configService.js       # Configuration file operations
│   │   ├── routeService.js        # Dynamic route management
│   │   └── socketService.js       # WebSocket event handling
│   ├── server.js                  # Main server setup and initialization
│   └── index.js                   # Application entry point
├── public/
│   └── index.html                 # Web interface
├── package.json                   # Dependencies and scripts
├── package-lock.json              # Dependency lock file
├── start.ps1                      # Windows PowerShell startup script
└── README.md                      # Project documentation
```

### Architecture Overview

#### Services Layer
- **ConfigService**: Handles reading/writing endpoint configurations to/from JSON files
- **RouteService**: Manages dynamic Express route registration and unregistration
- **SocketService**: Handles real-time WebSocket communication with clients

#### Routes Layer
- **ApiRoutes**: REST API endpoints for programmatic access to mock server management

#### Middleware Layer
- **CORS**: Cross-origin resource sharing configuration

#### Configuration Layer
- **Constants**: Centralized configuration values and default settings

## Development

### Scripts

- `npm start` - Start the server
- `npm run dev` - Start with nodemon for development (automatic restarts on file changes)

### Dependencies

- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **cors**: Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- **socket.io**: Enables real-time, bidirectional and event-based communication.
- **nodemon**: (Development dependency) A tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

## Troubleshooting

### Port Already in Use

If port 3003 is already in use, you can modify the port in `src/config/constants.js`:

```javascript
API_PORT: 3004, // Change to any available port
```

## License

This project is open source and available under the MIT License.
