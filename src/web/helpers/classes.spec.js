import assert from 'assert'

import { classes as c } from './classes'

describe('classes', ()=> {
  it('should work for the simple case of one class string', ()=> {
    const classes = c('Honk')
    assert(classes.toString() === 'Honk')
  })

  it('should work for conditionally adding class', ()=> {
    const classes = c('Honk')
    if (1 + 1 === 2) {
      classes('Donk')
    }
    assert(classes.toString() === 'Honk Donk')
  })

  it('should work for passing object', ()=> {
    const classes = c('Honk Donk!')({
      Funk: true,
      Dirk: 1 > 0,
      No: null,
      Nope: undefined,
      Narp: ()=> {
        return false
      },
      'Derp?!': ()=> {
        return true
      }
    })
    assert(classes.toString() === 'Honk Donk! Funk Dirk Derp?!')
  })

  it('should return empty string when object with no true values', ()=> {
    const classes = c({
      wow: false
    })
    assert(classes.toString() === '')
  })

  it('should handle no initial arg', ()=> {
    const classes = c()
    assert(classes.toString() === '')
    classes('Ok')
    assert(classes.toString() === 'Ok')
  })

  it('should work for passing an array', ()=> {
    const classes = c(['Ok', 'Wow'])
    classes('Something')
    classes({
      Donk: true,
      Wonk: false
    })
    classes(['Woah', 'Hmm'])
    assert(classes.toString() === 'Ok Wow Something Donk Woah Hmm')
  })

  it('should handle just an object', ()=> {
    const classes = c({
      Yep: true,
      Nope: false,
      Uhuh: 1 > 0
    })
    assert(classes.toString() === 'Yep Uhuh')
  })

  it('should filter falsy values from array', ()=> {
    const classes = c([
      'Foo',
      false,
      'Bar'
    ])
    assert(classes.toString() === 'Foo Bar')
  })

  it('should filter falsy values from array', ()=> {
    const classes = c([
      'Foo',
      false,
      'Bar'
    ])
    assert(classes.toString() === 'Foo Bar')
  })

  it('should allow passing array directly as multiple arguments', ()=> {
    const classes = c(
      'Foo',
      false,
      'Bar',
      ()=> 'funkdunk',
      {
        barf: true,
        narf: false
      }
    )
    assert(classes.toString() === 'Foo Bar funkdunk barf')
  })

  it('should handle booleans', ()=> {
    const classes = c(true, 'a', false, true, 10)
    assert(classes.toString() === 'a 10')
  })

  it('should handle symbols', ()=> {
    const classes = c(Symbol('a'), Symbol('bcd'))
    assert(classes.toString() === 'a bcd')
  })

  it('should handle examples `classnames` npm package', ()=> {
    const expectations = [
      [
        ['a', ['b', { c: true, d: false }]],
        'a b c'
      ],
      [
        ['foo', 'bar'],
        'foo bar'
      ],
      [
        ['foo', { bar: true }],
        'foo bar'
      ],
      [
        [{ 'foo-bar': true }],
        'foo-bar'
      ],
      [
        [{ 'foo-bar': false }],
        ''
      ],
      [
        [{ foo: true }, { bar: true }],
        'foo bar'
      ],
      [
        [{ foo: true, bar: true }],
        'foo bar'
      ],
      [
        ['foo', { bar: true, duck: false }, 'baz', { quux: true }],
        'foo bar baz quux'
      ],
      [
        [null, false, 'bar', undefined, 0, 1, { baz: null }, ''],
        'bar 1'
      ]
    ]
    for (const [input, expectation] of expectations) {
      const output = c(input).toString()
      assert.equal(output, expectation)
    }
  })
})