const createError = require("http-errors");

module.exports.errorHandler = (error, req, res, next) => {
  // logs every error
  // console.log({ error, req, res });

  // sends generic response to the client
  const genericResponse = {
    status: error.status || 500,
    message:
      error.status == 404
        ? "Unable to find the requested resource"
        : "Something went wrong",
  };

  res.status(genericResponse.status).send(genericResponse);
};

module.exports.routeNotFoundHandler = (req, res, next) => {

  // invokes the next middleware with create error response
  next(createError(404));
}
