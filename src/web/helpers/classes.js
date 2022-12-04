export function classes (...args) {
  let _classes = []

  function _adder (...args) {
    if (args.length === 0) {
      return _adder(null)
    }

    if (args.length !== 1) {
      return _adder(args)
    }

    const arg = args[0]

    let adds
    if (!arg) {
      return _adder
    } else if (Array.isArray(arg)) {
      adds = arg
    } else {
      adds = [arg]
    }

    adds = adds.flat(1000).flatMap((add) => {
      const { constructor } = add ?? {}
      if (!add) {
        return null
      } else if (constructor === Boolean) {
        return null
      } else if (constructor === Symbol) {
        return add.toString().slice(7, -1)
      } else if ([Number, String, BigInt].includes(constructor)) {
        return add
      } else if (add.constructor === Function) {
        return add()
      } else {
        return Object.entries(add).map(([k, v]) => {
          if (v?.constructor === Function) {
            v = v()
          }
          return v ? k : null
        })
      }
    }).filter(Boolean)

    _classes = [..._classes, ...adds]
    return _adder
  }

  _adder.toString = function toString () {
    return _classes.join(' ')
  }

  return _adder(...args)
}

export default classes