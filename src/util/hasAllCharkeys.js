import charkeys from './charkeys';
import hasAllKeys from './hasAllKeys';

export function hasAllCharkeys (keys) {
  return function has (obj) {
    obj = charkeys(obj);
    return hasAllKeys(keys)(obj);
  };
}

export default hasAllCharkeys