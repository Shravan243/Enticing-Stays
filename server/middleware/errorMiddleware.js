module.exports = (err, req, res, next) => {
  console.log(err);
  res.status(res.statusCode || 500).json({
    message: err.message || "Server Error",
  });
};
