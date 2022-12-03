export function classes (...args) {
  let classes = []

  function add (...args) {
    if (args.length === 0) {
      return add('')
    }

    if (args.length !== 1) {
      return add(args)
    }

    const arg = args[0]

    let adds
    if (!arg) {
      adds = []
    } else if (Array.isArray(arg)) {
      adds = arg
    } else {
      adds = [arg]
    }

    adds = adds.flatMap((add) => {
      if (!add) {
        return null
      } else if (add.constructor === String) {
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

    classes = [...classes, ...adds]
    return add
  }

  add.toString = function toString () {
    return classes.join(' ')
  }

  return add(...args)
}

export default classes