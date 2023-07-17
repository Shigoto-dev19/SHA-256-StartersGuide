import { sha256 } from 'js-sha256';
import { My_SHA256 } from './my-sha256';

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
const myOutput = My_SHA256(input);
myTimer.end();

const libTimer = new Timer();
libTimer.start();
const libHash = sha256.create();
const libOutput = libHash.update(input).hex();
libTimer.end();

console.log('\nInput: ', input);
console.log('\nMy Hash  => ', myOutput, myTimer.executionTime);
console.log('Lib Hash => ', libOutput, libTimer.executionTime);
