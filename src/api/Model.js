export class Model {
  constructor({ prismaClient }) {
    this.prismaClient = prismaClient
  }

  get table() {
    throw new Error('Child class must implement .table');
  }

  async findById({ id, assert = false, ...options }) {
    const row = await this.table.findUnique({
      where: { id },
      ...options,
    });
    if (assert && !row) {
      throw new Error('Row not found');
    }
    return row;
  }
}

for (const methodName of ['create', 'update', 'count', 'findFirst', 'findMany', 'updateMany']) {
  Model.prototype[methodName] = function (args) {
    const { table } = this
    return table[methodName](args);
  }
}

export default Model