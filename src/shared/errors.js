import { GraphQLError } from 'graphql'

export const ErrorCode = {
  DataTimeout: 'DataTimeout',
  DataConstraint: 'DataConstraint',
  DataFormat: 'DataFormat',
  DataNotFound: 'DataNotFound'
};

class GqlError extends GraphQLError {
  constructor({ code, message = null, extensions = {} }) {
    if (!message) {
      message = code
    }
    return super(
      message,
      {
        extensions: {
          code,
          ...extensions
        }
      }
    )
  }
}

export class DataTimeoutError extends GqlError {
  constructor(opts = {}) {
    return super({ code: ErrorCode.DataTimeout, ...opts })
  }
}

export class DataConstraintError extends GqlError {
  constructor(opts = {}) {
    return super({ code: ErrorCode.DataConstraint, ...opts })
  }
}

export class DataFormatError extends GqlError {
  constructor(opts = {}) {
    return super({ code: ErrorCode.DataFormat, ...opts })
  }
}

export class DataNotFoundError extends GqlError {
  constructor(opts = {}) {
    return super({ code: ErrorCode.DataNotFound, ...opts })
  }
}

export function isPublicError(error) {
  return error instanceof GqlError;
}