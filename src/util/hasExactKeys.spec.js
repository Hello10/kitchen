import assert from 'assert'

import hasExactKeys from './hasExactKeys'

describe('hasExactKeys', ()=> {
  it('should check whether has only specified keys', ()=> {
    const xyz = hasExactKeys(['x', 'y', 'z']);
    assert.equal(xyz({}), false);
    assert.equal(xyz({x: 10, y: 11}), false);
    assert.equal(xyz({w: 10, x: 1, y: 2, z: 3}), false);
    assert.equal(xyz({x: 0, y: 2, z: 3}), true);
  });
});