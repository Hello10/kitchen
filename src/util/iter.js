/// iterable that returns array or function

export function times (n) {
  let i = 0;
  const results = [];
  return function f (fn) {
    while (i < n) {
      results.push(fn(i));
      i++;
    }
    return results;
  };
}