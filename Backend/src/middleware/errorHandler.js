const errorHandler = (err, req, res, next) => {
  console.error('Server error:', err);

  // Avoid leaking raw database errors to client (Specs #92)
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Unable to process your request. Please try again.',
    errorCode: err.code || 'INTERNAL_SERVER_ERROR'
  });
};

module.exports = errorHandler;
