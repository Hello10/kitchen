import assert from 'assert'

import hasAllCharkeys from './hasAllCharkeys'

describe('hasAllCharkeys', ()=> {
  it('should check whether all charkeys exists', ()=> {
    const hasAbc = hasAllCharkeys(['a', 'b', 'c']);
    const yes = {axe: 1, animal: 2, arp: 3, bug: 4, channel: 5};
    const no = {car: 10};
    assert(hasAbc(yes));
    assert(!hasAbc(no));
  });
});