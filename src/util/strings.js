export function capitalize (str) {
  const first = str.charAt(0).toUpperCase();
  const rest = str.slice(1);
  return `${first}${rest}`;
}

export function splitter (...delimiters) {
  return function split (str) {
    return delimiters.flat(10).reduce((strs, delimiter)=> {
      return strs.flatMap((s)=> {
        return s.split(delimiter)
      })
    }, [str]).flat(10)
  }
}

export const words = splitter(/\s+/,)

const splitForCasing = splitter(
  /\s+/,
  /(?<=[a-z])(?=[A-Z])/,
  /_+/
)

export function camelCase (str) {
  const words = splitForCasing(str)
  return words.map((w, i)=> {
    const first = i === 0
    return first ? w.toLowerCase() : capitalize(w.toLowerCase())
  }).join('')
}

export function pascalCase (str) {
  const words = splitForCasing(str)
  return words.map((w)=> capitalize(w.toLowerCase())).join('')
}

export function snakeCase (str) {
  const words = splitForCasing(str)
  return words.map((w)=> w.toLowerCase()).join('_')
}

export function constantCase (str) {
  const words = splitForCasing(str)
  return words.map((w)=> w.toUpperCase()).join('_')
}