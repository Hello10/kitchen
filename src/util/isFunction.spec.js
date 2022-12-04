import assert from 'assert'

import isFunction from './isFunction'

describe('isFunction', ()=> {
  function expect (expected) {
    return (vals)=> {
      for (const val of vals) {
        const is_fn = isFunction(val);
        assert.equal(is_fn, expected, val);
      }
    };
  }

  it('should test true for functions', ()=> {
    expect(true)([
      function derp1 () { return 'derp'; },
      ()=> {},
      async function derp2 () { return 'derp2'; },
      async ()=> {}
    ]);
  });

  it('should test false for non functions', ()=> {
    expect(false)([
      false,
      null,
      undefined,
      10,
      new (class Derp {})(),
      'what'
    ]);
  });
});