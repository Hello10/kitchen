import assert from 'assert'

import randomInt from './randomInt'

describe('randomInt', ()=> {
  function assert50 (fn) {
    for (let i = 0; i < 50; i++) {
      assert(fn());
    }
  }
  it('should generate random int', ()=> {
    const one = randomInt({min: 1, max: 1});
    assert.equal(one, 1);
    assert50(()=> {
      const digit = randomInt({min: 0, max: 9});
      return ((digit >= 0) && (digit <= 9));
    });
  });

  it('should accept integer agument', ()=> {
    assert50(()=> {
      const degree = randomInt(360);
      return ((degree >= 0) && (degree <= 360));
    });
  });

  it('should accept array argument', ()=> {
    assert50(()=> {
      const num = randomInt([5, 11]);
      return ((num >= 5) && (num <= 11));
    });
  });

  it('should default to zero and one', ()=> {
    let seen0 = false;
    let seen1 = false;
    for (let i = 0; i < 50; i++) {
      const zeroOrOne = randomInt();
      if (zeroOrOne === 0) {
        seen0 = true;
      }
      if (zeroOrOne === 1) {
        seen1 = true;
      }
      assert([0, 1].includes(zeroOrOne));
    }
    assert(seen0 && seen1);
  });

  it('should throw on bad inputs', ()=> {
    assert.throws(()=> {
      randomInt({min: 100, max: 1});
    });
    assert.throws(()=> {
      randomInt({min: 101.101});
    });
  });
});