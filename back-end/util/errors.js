class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class NotAuthError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class ValidationError extends Error {
  constructor ({message, cause, requiredField}) {
    super(message);
    this.name = 'ValidationError';
    this.cause = cause;
    this.status = 400;
    this.requiredField = requiredField
  }
}

class ServerError extends Error {
  constructor (message) {
    super(message);
    this.status = 500;
  }
}

exports.NotFoundError = NotFoundError;
exports.NotAuthError = NotAuthError;
exports.ValidationError = ValidationError;
exports.ServerError = ServerError;