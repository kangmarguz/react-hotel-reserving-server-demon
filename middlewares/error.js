const handleError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        code: statusCode,
        message: err.message || 'Internal Server Error.',
    });
};

export default handleError;
