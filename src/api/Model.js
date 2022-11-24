import * as errors from '../shared/errors'

function getErrorForPrismaError(error) {
  const {code, meta} = error

  const errorsByCode = {
    P1002: errors.DataTimeoutError,
    P1008: errors.DataTimeoutError,
    P2002: errors.DataConstraintError,
    P2003: errors.DataConstraintError,
    P2004: errors.DataConstraintError,
    P2005: errors.DataFormatError,
    P2006: errors.DataFormatError,
    P2007: errors.DataFormatError,
    P2011: errors.DataConstraintError,
    P2012: errors.DataFormatError,
    P2013: errors.DataFormatError,
    P2014: errors.DataFormatError,
    P2015: errors.DataNotFoundError,
    P2018: errors.DataNotFoundError,
    P2019: errors.DataFormatError,
    P2020: errors.DataFormatError,
    P2022: errors.DataFormatError,
    P2023: errors.DataFormatError,
    P2024: errors.DataTimeoutError,
    P2025: errors.DataNotFoundError,
    P2033: errors.DataFormatError,
    P5009: errors.DataTimeoutError
  }

  let Err = errorsByCode[code] ?? Error
  if (!Err) {
    Err = errors.GqlError
  }

  return new Err({ extensions: meta })
}

export class Model {
  constructor({ prismaClient }) {
    this.prismaClient = prismaClient
  }

  get table() {
    throw new Error('Child class must implement .table')
  }

  async findById({ id, assert = false, ...options }) {
    const row = await this.findUnique({
      where: { id },
      ...options,
    })
    if (assert && !row) {
      throw new Error('Row not found')
    }
    return row
  }
}

const prismaMethods = [
  'create',
  'update',
  'count',
  'findFirst',
  'findMany',
  'updateMany',
  'findUnique'
]

for (const method of prismaMethods) {
  Model.prototype[method] = async function (args) {
    const { table } = this
    try {
      return await table[method](args)
    } catch (error) {
      const {code, meta } = error
      if (code && meta) {
        throw getErrorForPrismaError(error)
      }
      throw error
    }
  }
}

export default Model