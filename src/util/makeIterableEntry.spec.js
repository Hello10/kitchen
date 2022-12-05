import assert from 'assert'

import makeIterableEntry from './makeIterableEntry'

describe('makeIterableEntry', ()=> {
  it('should allow iteration', ()=> {
    const entry = ['what', 'why']
    const iter = makeIterableEntry(entry)
    const [k, v, ...rest] = iter
    assert(k === entry[0])
    assert(v === entry[1])
    assert(rest.length === 0)
  })

  it('should allow spread', ()=> {
    const entry = ['what', 'why']
    const iter = makeIterableEntry(entry)
    const { key, k, value, val, v } = iter

    assert(k === entry[0])
    assert(key === entry[0])

    assert(v === entry[1])
    assert(val === entry[1])
    assert(value === entry[1])

    assert(entry[2] === undefined)
  })
})