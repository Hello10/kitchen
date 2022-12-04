import assert from 'assert'

import mapo from './mapo'

describe('mapo', ()=> {
  it('should map objects', ()=> {
    const upkeys = mapo({
      key: ({key})=> key.toUpperCase()
    });
    assert.deepEqual(upkeys({x: 10, yyy: 11}), {X: 10, YYY: 11});

    const double = mapo({
      value: ({value})=> value * 2
    });
    assert.deepEqual(double({z: 12}), {z: 24});

    const doubledouble = mapo({
      key: ({key})=> `${key}${key}`,
      value: ({value})=> value * 2
    });
    assert.deepEqual(doubledouble({z: 12}), {zz: 24});
  });
});