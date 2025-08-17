// Error handling middleware for JSON parsing and other errors
const errorHandler = (err, req, res, next) => {
    // Handle JSON parsing errors
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            error: 'Invalid JSON in request body'
        });
    }

    // Handle other errors
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal server error'
    });
};

module.exports = errorHandler;