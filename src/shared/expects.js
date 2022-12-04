// Todo: async and non-all stuff
function expectMany({ fn, toBe, tests, mode }) {
  if (toBe) {
    if (!Array.isArray(toBe)) {
      toBe = Object.entries(toBe)
    }
    tests = toBe.map(([input, expected]) => {
      return ()=> {
        const output = fn ? fn(input) : input
        expect(output).toBe(expected)
      }
    })
  }
  if (mode !== 'All') {
    throw new Error('Some not supported')
  }
  for (const test of tests) {
    test()
  }
}

export function expectAll(args) {
  expectMany({ ...args, mode: 'All' })
}

export function expectSome(args) {
  expectMany({ ...args, mode: 'Some' })
}
