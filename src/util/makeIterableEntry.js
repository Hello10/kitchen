export function makeIterableEntry (entry) {
  const [ key, value ] = entry
  return {
    key,
    k: key,
    value,
    val: value,
    v: value,
    [Symbol.iterator]() {
      let index = 0
      return {
        next() {
          if (index < entry.length) {
            return { value: entry[index++], done: false };
          } else {
            return { done: true }
          }
        }
      }
    }
  }
}

export default makeIterableEntry