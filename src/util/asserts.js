import assert from 'assert'

import buildEnum from './buildEnum'

const Mode = buildEnum(['All', 'Some', 'None'])

// Todo: async and non-all stuff
function assertMany({ fn, equals, tests, mode }) {
  if (equals) {
    if (!Array.isArray(equals)) {
      equals = Object.entries(equals)
    }
    tests = equals.map(([input, expected]) => {
      return ()=> {
        const output = fn ? fn(input) : input
        assert(output === expected)
      }
    })
  }
  if (mode !== Mode.All) {
    throw new Error('Some not supported')
  }
  for (const test of tests) {
    test()
  }
}

export function assertAll(args) {
  assertMany({ ...args, mode: Mode.All })
}

export function assertSome(args) {
  assertMany({ ...args, mode: Mode.Some })
}
