import { sha256 } from 'js-sha256';
import { sha256 as sha256_noble } from '@noble/hashes/sha256';
import { bytesToHex as toHex } from '@noble/hashes/utils';
import { my_sha256 } from './my-sha256';

class Timer {
  private startTime: number;
  private endTime: number;
  public executionTime: string;

  start() {
    this.startTime = performance.now();
  }

  end() {
    this.endTime = performance.now();
    this.executionTime = `${this.endTime - this.startTime} ms`;
  }
}

const input = process.argv[2] ?? '';

const myTimer = new Timer();
myTimer.start();
const myOutput = my_sha256(input);
myTimer.end();

const libTimer = new Timer();
libTimer.start();
const libHash = sha256.create();
const libOutput = libHash.update(input).hex();
libTimer.end();

const nobleTimer = new Timer();
nobleTimer.start();
const nobleOutput = toHex(sha256_noble(input));
nobleTimer.end();

console.log('\nInput: ', input);
console.log('\nMy Hash  =>   ', myOutput, myTimer.executionTime);
console.log('Lib Hash =>   ', libOutput, libTimer.executionTime);
console.log('Noble Hash => ', nobleOutput, nobleTimer.executionTime);
