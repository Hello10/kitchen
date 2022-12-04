function pickerOmitter (omit) {
  return function filterer (args) {
    let test;
    if (Array.isArray(args)) {
      test = (key)=> args.includes(key);
    } else {
      test = args;
    }
    return function filter (obj) {
      return Object.entries(obj).reduce((result, [key, value])=> {
        let keep = test(key, value)
        if (omit) {
          keep = !keep
        }
        return {
          ...result,
          ...(keep ? { [key]: value }: {} )
        }
      }, {});
    };
  }
}

export const picker = pickerOmitter(false)
export const omitter = pickerOmitter(true)