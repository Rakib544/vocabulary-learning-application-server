import { HttpStatusCode } from 'axios';

export interface IApiError extends Error {
  statusCode: number;
  errors?: string[];
}

export class ApiError extends Error implements IApiError {
  statusCode: number;
  errors: string[];
  constructor(statusCode: number, message: string, errors?: string[]) {
    super(message);
    this.statusCode = statusCode;
    if (errors) {
      this.errors = errors;
    }
    Error.captureStackTrace(this, this.constructor);
  }
}

export class HttpBadRequestError extends ApiError {
  constructor(message: string, errors: string[]) {
    super(HttpStatusCode.BadRequest, message, errors);
  }
}

export class HttpInternalServerError extends ApiError {
  constructor(message: string, errors?: string[]) {
    super(HttpStatusCode.InternalServerError, message, errors);
  }
}

export class HttpUnAuthorizedError extends ApiError {
  constructor(message: string) {
    super(HttpStatusCode.Unauthorized, message);
  }
}

export class HttpNotFoundError extends ApiError {
  constructor(message: string, errors?: string[]) {
    super(HttpStatusCode.NotFound, message, errors);
  }
}

export class HttpForbiddenError extends ApiError {
  constructor(message: string, errors?: string[]) {
    super(HttpStatusCode.Forbidden, message, errors);
  }
}

export class HttpConflictError extends ApiError {
  constructor(message: string, errors?: string[]) {
    super(HttpStatusCode.Conflict, message, errors);
  }
}
