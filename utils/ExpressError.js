class ExpressError extends Error {
  constructor(statusCode, message) {  // <-- Note the parameter order
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
module.exports = ExpressError;