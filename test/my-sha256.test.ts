import { sha256 } from 'js-sha256';
import { My_SHA256 } from '../src/my-sha256';
import { assert } from 'chai';
const _ = require('lodash');

function getRandom() {
  let arr = [];
  for (let i = 0; i < _.random(6); i++) {
    arr = arr.concat(Math.random().toString(36).substring(2, 10).split(''));
  }
  const randomString = _.shuffle(arr).join('');
  return randomString;
}

function test_hash(input: string, equal = true) {
  const libHash = sha256.create();
  const myOutput = My_SHA256(input);
  const libOutput = libHash.update(input).hex();
  const assertion = equal
    ? myOutput === libOutput
    : My_SHA256(getRandom()) !== libOutput;
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
    for (let i = 0; i < 1000; i++) {
      const input = getRandom();
      test_hash(input);
    }
  });
  it('looped random path: hash of hash', () => {
    for (let i = 0; i < 10_000; i++) {
      const input = My_SHA256(getRandom());
      test_hash(input);
    }
  });
});
