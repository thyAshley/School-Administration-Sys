import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import ErrorCodes from '../const/ErrorCodes';
import ErrorBase from '../errors/ErrorBase';
import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  // Handling of body-parser content malformed error
  if (err.type === 'entity.parse.failed') {
    return res.status(BAD_REQUEST).send({
      errorCode: ErrorCodes.MALFORMED_JSON_ERROR_CODE,
      message: 'Malformed json'
    });
  }

  if (err instanceof ErrorBase) {
    const error = err;

    return res.status(error.getHttpStatusCode()).send({
      errorCode: error.getErrorCode(),
      message: error.getMessage()
    });
  } else {
    return res.status(INTERNAL_SERVER_ERROR).send({
      errorCode: ErrorCodes.RUNTIME_ERROR_CODE,
      message: 'Internal Server Error'
    });
  }
}

export default globalErrorHandler;
