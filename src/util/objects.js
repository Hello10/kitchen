import makeIterableEntry from './makeIterableEntry'

export function entryReducer(reduce, initial = {}) {
  return function reducer(obj) {
    return Object.entries(obj).reduce((result, entry, ...args)=> {
      entry = makeIterableEntry(entry)
      return reduce(result, entry, ...args)
    }, initial)
  }
}

function pickerOmitter (omit) {
  return function filterer (args) {
    let test;
    if (Array.isArray(args)) {
      test = ({ key })=> args.includes(key);
    } else {
      test = args;
    }
    return function filter (obj) {
      const reducer = entryReducer((result, entry)=> {
        let keep = test(entry)
        if (omit) {
          keep = !keep
        }
        return {
          ...result,
          ...(keep? { [entry.key]: entry.value }: {} )
        }
      });
      return reducer(obj)
    };
  }
}

export const picker = pickerOmitter(false)
export const omitter = pickerOmitter(true)