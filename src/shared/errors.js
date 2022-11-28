import { GraphQLError } from 'graphql'

export const ErrorCode = {
  DataTimeout: 'DataTimeout',
  DataConstraint: 'DataConstraint',
  DataFormat: 'DataFormat',
  DataNotFound: 'DataNotFound',
  NotAuthorized: 'NotAuthorized'
};

export class GqlError extends GraphQLError {
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

export function isPublicError(error) {
  return error instanceof GqlError;
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

export class NotAuthorizedError extends GqlError {
  constructor(opts = {}) {
    return super({ code: ErrorCode.NotAuthorized, ...opts })
  }
}