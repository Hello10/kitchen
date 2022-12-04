import assert from 'assert'

import hasAllKeys from './hasAllKeys'

describe('hasAllKeys', ()=> {
  it('should check whether all keys exists', ()=> {
    const xyz = hasAllKeys(['x', 'y', 'z']);
    assert.equal(xyz({}), false);
    assert.equal(xyz({x: 10, y: 11}), false);
    assert.equal(xyz({w: 10, x: 1, y: 2, z: 3}), true);
  });
});