import { InternalServerError, MethodNotAllowedError } from "./errors.js";

function onErrorHandler(error, request, response) {
  const publicError = new InternalServerError({
    cause: error,
    statusCode: error.statusCode,
  });
  console.error(publicError);
  response.status(publicError.statusCode).json(publicError);
}

function onNoMatchHandler(request, response) {
  const publicError = new MethodNotAllowedError();
  response.status(publicError.statusCode).json(publicError);
}

const controller = {
  errorHandlers: {
    onError: onErrorHandler,
    onNoMatch: onNoMatchHandler,
  },
};

export default controller;
