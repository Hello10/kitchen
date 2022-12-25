import assert from 'assert'

import { times } from './iter'

describe('times', ()=> {
  it('should call a function repeatedly with index', ()=> {
    const squares = times(9)((i)=> i * i);
    assert.deepEqual(squares, [0, 1, 4, 9, 16, 25, 36, 49, 64]);
  });
});