import assert from 'assert'

import { omitter } from './objects'

import {
  capitalize,
  words,
  camelCase,
  snakeCase,
  pascalCase,
  constantCase,
  splitter
} from './strings'

describe('capitalize', ()=> {
  it('should capitalize', ()=> {
    assert.equal(capitalize('donkey'), 'Donkey')
  })
})

const tests = [
  {
    camel: 'somethingElseWow',
    pascal: 'SomethingElseWow',
    snake: 'something_else_wow',
    constant: 'SOMETHING_ELSE_WOW'
  },
  {
    camel: 'okOkOkOk',
    pascal: 'OkOkOkOk',
    snake: 'ok_ok_ok_ok',
    constant: 'OK_OK_OK_OK'
  }
]

for (const name of Object.keys(tests[0])) {
  describe(`${name}Case`, ()=> {
    for (const test of tests) {
      const expected = test[name]
      const fn = {
        camel: camelCase,
        pascal: pascalCase,
        snake: snakeCase,
        constant: constantCase
      }[name]
      const others = omitter([name])(test)

      for (const [oname, value] of Object.entries(others)) {
        it(`should return ${name} case for a ${oname} string`, ()=> {
          const output = fn(value)
          assert(output === expected, `output for ${oname} wrong: ${name}Case(${value}) = ${output} != ${expected}`)
        })
      }
    }
  })
}

describe('words', ()=> {
  it('should split strings into words based on spaces', ()=> {
    let output = words('asdfasdf    sdf sdfsf')
    assert.deepEqual(output, ['asdfasdf', 'sdf', 'sdfsf'])

    output = words('abcdef')
    assert.deepEqual(output, ['abcdef'])
  })
})

describe('splitter', ()=> {
  it('should return function that splits strings', ()=> {
    const splitOnVowelsAndPunctuation = splitter(/[aeiou]/, /[?.!]/)
    let output = splitOnVowelsAndPunctuation('hi how are you? i am just great thanks')
    const joined = output.join('')
    assert.equal(joined, 'h hw r y  m jst grt thnks')
  })
})