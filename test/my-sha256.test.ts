import { sha256 } from 'js-sha256';
import { my_sha256 } from '../src/my-sha256';
import { assert } from 'chai';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require('lodash');

function getRandom() {
  let arr = [];
  for (let i = 0; i < _.random(20); i++) {
    arr = arr.concat(Math.random().toString(36).substring(2, 10).split(''));
  }
  const randomString = _.shuffle(arr).join('');
  return randomString;
}

function test_hash(input: string, equal = true) {
  const myOutput = my_sha256(input);
  const libHash = sha256.create();
  const libOutput = libHash.update(input).hex();
  const assertion = equal
    ? myOutput === libOutput
    : my_sha256(getRandom()) !== libOutput;
  if (!assertion) console.log(input);
  assert(assertion, 'hashes are different');
}

describe('Testing my SHA256 in comparison to a package imported function', () => {
  it('happy test', () => test_hash('abc'));
  it('unhappy test', () => test_hash('abc', false));
  it('single random test', () => {
    const input = getRandom();
    test_hash(input);
  });
  it('looped random test', () => {
    for (let i = 0; i < 10_000; i++) {
      const input = getRandom();
      test_hash(input);
    }
  });
  it('looped random path: hash of hash', () => {
    for (let i = 0; i < 10_000; i++) {
      const input = my_sha256(getRandom());
      test_hash(input);
    }
  });
});
