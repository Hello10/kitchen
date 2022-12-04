export function type (obj) {
  if ((obj === null) || (obj === undefined)) {
    return obj
  } else {
    return obj.constructor
  }
}

function isBuiltIn (obj) {
  const builtIns = [
    Object,
    Function,
    Array,
    String,
    Boolean,
    Number,
    Date,
    RegExp,
    Error
  ];
  return is(builtIns)(obj)
}

function string (obj) {
  const _toString = ({}).toString

  // [object Blah] -> Blah
  const stype = _toString.call(obj).slice(8, -1)

  if ((obj === null) || (obj === undefined)) {
    return stype.toLowerCase()
  }

  const ctype = type(obj)
  const useName = ctype && isBuiltIn(ctype)

  return useName ? ctype.name : stype
}

function is (...types) {
  return function any(obj) {
    return types.flat(100).some((t)=> {
      if (type(t) === String) {
        return string(obj) === t
      } else {
        return type(obj) === t
      }
    })
  }
}

type.is = is
type.string = string
type.isBuiltIn = isBuiltIn

export default type