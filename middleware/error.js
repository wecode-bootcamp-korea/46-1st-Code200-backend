const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res).catch((error) => next(error));
  };
};

const globalHanderError = (err, req, res, next) => {
  console.error(err.stack);
  console.log(err);
  return res.status(err.statusCode || 500).json({ message: err.message });
};

module.exports = {
  catchAsync,
  globalHanderError,
};
