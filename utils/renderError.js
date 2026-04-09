const renderError = (code, message) => {
    const error = new Error(message);
    error.statusCode = code;
    throw error;
};

export default renderError;
