import assert from 'assert'

import indexById from './indexById'

describe('indexById', ()=> {
  it('should index by id', ()=> {
    const input = [
      {id: 10, name: 'wow'},
      {id: 11, name: 'ok'},
      {id: 12, name: 'honk'},
      {id: 10, name: 'wow2'}
    ];
    const output = indexById(input);
    assert.deepEqual(output, {
      10: input[0],
      11: input[1],
      12: input[2]
    });
  });
});