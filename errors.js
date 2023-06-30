exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    // contains an error code in the example of 22P02
    res.status(400).send({ message: "Bad Request" });
  } else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.message) {
    res.status(err.status).send({ message: err.message });
  } else next(err);
};

exports.handleServersErrors = (err, req, res, next) => {
  res.status(500).send({ message: "Errors with the internal server!" });
};
