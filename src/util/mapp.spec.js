import assert from 'assert'

import mapp from './mapp'
import sleep from './sleep'

describe('mapp', ()=> {
  const nums = [1, 2, 3, 4, 5, 6, 7];

  it('should asynchronously map', async ()=> {
    async function sleepySquare (num) {
      await sleep(num);
      return num * num;
    }
    const squares = await mapp(nums, sleepySquare);
    assert.deepEqual(squares, [1, 4, 9, 16, 25, 36, 49]);
  });

  it('should handle throws', async ()=> {
    const gromp = new Error('GROMP');
    async function grumpySquare (num) {
      await sleep(num);
      if (num === 5) {
        throw gromp;
      } else {
        return num * num;
      }
    }

    try {
      await mapp(nums, grumpySquare);
      assert.fail();
    } catch (error) {
      assert.equal(error, gromp);
    }
  });
});