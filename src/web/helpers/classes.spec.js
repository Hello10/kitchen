import { expectAll } from '../../shared/expects'

import { classes as c } from './classes'

describe('classes', ()=> {
  it('should work for the simple case of one class string', ()=> {
    const classes = c('Honk')
    expect(`${classes}`).toBe('Honk')
  })

  it('should work for conditionally adding class', ()=> {
    const classes = c('Honk')
    if (1 + 1 === 2) {
      classes('Donk')
    }
    expect(`${classes}`).toBe('Honk Donk')
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
    expect(`${classes}`).toBe('Honk Donk! Funk Dirk Derp?!')
  })

  it('should return empty string when object with no true values', ()=> {
    const classes = c({
      wow: false
    })
    expect(classes.toString()).toBe('')
  })

  it('should handle no initial arg', ()=> {
    const classes = c()
    expect(classes.toString()).toBe('')
    classes('Ok')
    expect(classes.toString()).toBe('Ok')
  })

  it('should work for passing an array', ()=> {
    const classes = c(['Ok', 'Wow'])
    classes('Something')
    classes({
      Donk: true,
      Wonk: false
    })
    classes(['Woah', 'Hmm'])
    expect(`${classes}`).toBe('Ok Wow Something Donk Woah Hmm')
  })

  it('should handle just an object', ()=> {
    const classes = c({
      Yep: true,
      Nope: false,
      Uhuh: 1 > 0
    })
    expect(`${classes}`).toBe('Yep Uhuh')
  })

  it('should filter falsy values from array', ()=> {
    const classes = c([
      'Foo',
      false,
      'Bar'
    ])
    expect(`${classes}`).toBe('Foo Bar')
  })

  it('should filter falsy values from array', ()=> {
    const classes = c([
      'Foo',
      false,
      'Bar'
    ])
    expect(`${classes}`).toBe('Foo Bar')
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
    expect(`${classes}`).toBe('Foo Bar funkdunk barf')
  })

  it('should handle booleans', ()=> {
    const classes = c(true, 'a', false, true, 10)
    expect(`${classes}`).toBe('a 10')
  })

  it('should handle symbols', ()=> {
    const classes = c(Symbol('a'), Symbol('bcd'))
    expect(`${classes}`).toBe('a bcd')
  })

  it('should handle examples `classnames` npm package', ()=> {
    expectAll({
      fn: (val)=> val.toString(),
      toBe: [
        [
          c('a', ['b', { c: true, d: false }]),
          'a b c'
        ],
        [
          c('foo', 'bar'),
          'foo bar'
        ],
        [
          c('foo', { bar: true }),
          'foo bar'
        ],
        [
          c({ 'foo-bar': true }),
          'foo-bar'
        ],
        [
          c({ 'foo-bar': false }),
          ''
        ],
        [
          c({ foo: true }, { bar: true }),
          'foo bar'
        ],
        [
          c({ foo: true, bar: true }),
          'foo bar'
        ],
        [
          c('foo', { bar: true, duck: false }, 'baz', { quux: true }),
          'foo bar baz quux'
        ],
        [
          c(null, false, 'bar', undefined, 0, 1, { baz: null }, ''),
          'bar 1'
        ]
      ]
    })
  })
})