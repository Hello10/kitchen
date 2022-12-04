import assert from 'assert'

import { omitter, picker } from './objects'

describe('omitter', ()=> {
  const obj = {
    a: 1,
    b: 2,
    c: 3
  };

  it('should make function that omits keys from array', ()=> {
    const omit = omitter(['a', 'b']);
    assert.deepEqual(omit(obj), {c: 3});
  });

  it('should make function omits by test', ()=> {
    const omit = omitter((k, v)=> `${k}${v}` === 'b2');
    assert.deepEqual(omit(obj), {a: 1, c: 3});
  });
});

describe('picker', ()=> {
  const obj = {
    a: 1,
    b: 2,
    c: 3
  };

  it('should make function that omits keys from array', ()=> {
    const pick = picker(['a', 'b']);
    assert.deepEqual(pick(obj), {a: 1, b: 2});
  });

  it('should make function omits by test', ()=> {
    const pick = picker((k, v)=> `${k}${v}` === 'b2');
    assert.deepEqual(pick(obj), {b: 2});
  });
});