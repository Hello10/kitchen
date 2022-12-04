import assert from 'assert'

import charkeys from './charkeys'

describe('charkeys', ()=> {
  it('should flatten obj keys to single char', ()=> {
    const input = {
      xylophone: 1,
      yams: 2,
      zebra: 3
    };
    const output = charkeys(input);
    assert.deepEqual(output, {x: 1, y: 2, z: 3});
  });
});