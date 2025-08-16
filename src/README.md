# Source Code Structure

This directory contains the modularized source code for the Mocky application.

## Directory Structure

```
src/
├── config/           # Configuration constants and settings
│   └── constants.js  # Server ports, file paths, default endpoints
├── middleware/       # Express middleware
│   └── cors.js      # CORS configuration
├── routes/           # API route definitions
│   └── api.js       # REST API endpoints for managing mock endpoints
├── services/         # Business logic services
│   ├── configService.js  # Configuration file operations
│   ├── routeService.js    # Dynamic route management
│   └── socketService.js   # WebSocket event handling
├── server.js         # Main server setup and initialization
└── index.js          # Application entry point
```

## Architecture Overview

### Services Layer
- **ConfigService**: Handles reading/writing endpoint configurations to/from JSON files
- **RouteService**: Manages dynamic Express route registration and unregistration
- **SocketService**: Handles real-time WebSocket communication with clients

### Routes Layer
- **ApiRoutes**: REST API endpoints for programmatic access to mock server management

### Middleware Layer
- **CORS**: Cross-origin resource sharing configuration

### Configuration Layer
- **Constants**: Centralized configuration values and default settings

## Benefits of This Structure

1. **Separation of Concerns**: Each module has a single, well-defined responsibility
2. **Maintainability**: Easier to locate and modify specific functionality
3. **Testability**: Individual services can be unit tested in isolation
4. **Reusability**: Services can be imported and used by other parts of the application
5. **Scalability**: New features can be added as new services without affecting existing code
6. **Readability**: Smaller, focused files are easier to understand and navigate

## Adding New Features

To add new functionality:
1. Create a new service in the `services/` directory
2. Add any new routes in the `routes/` directory
3. Update the main `server.js` to initialize and use new services
4. Add any new constants to `config/constants.js`
