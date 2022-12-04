import assert from 'assert'

import upto from './upto'

describe('upto', ()=> {
  it('should call a function repeatedly with index', ()=> {
    const squares = upto(9)((i)=> i * i);
    assert.deepEqual(squares, [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]);
  });
});