import assert from 'assert'

import capitalize from './capitalize'

describe('capitalize', ()=> {
  it('should capitalize', ()=> {
    assert.equal(capitalize('donkey'), 'Donkey');
  });
});