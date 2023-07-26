/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-namespace */

import { assert } from 'chai';

export namespace BinaryTools {
  // Convert a character to binary
  function char2Binary(input: string) {
    const binary = input.charCodeAt(0).toString(2);
    if (binary.length < 8) {
      return '0'.repeat(8 - binary.length) + binary;
    } else {
      return binary;
    }
  }

  // Convert message to binary
  export function text2Binary(text: string) {
    const myArray = text.split('');
    let result = '';
    for (let i = 0; i < myArray.length; i++) {
      result += char2Binary(myArray[i]);
    }
    return result;
  }

  // Convert decimal number to binary
  export function dec2Bin(dec: number) {
    const bin = (dec >>> 0).toString(2);
    return '0'.repeat(64 - bin.length) + bin;
  }

  // Convert hexadecimal number to binary
  export function hex2Bin(hex: string) {
    const result = parseInt(hex, 16).toString(2).padStart(8, '0');
    return '0'.repeat(32 - result.length) + result;
  }

  // Convert Binary to Hexadecimal number
  export function bin2Hex(x: string) {
    let result = '';
    for (let i = 0; i < x.length; i += 4) {
      result += parseInt(x.substring(i, i + 4), 2).toString(16);
    }
    return result;
  }

  // Count a letter occurence in a string
  export function countString(str: string, letter: string) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) == letter) {
        count += 1;
      }
    }
    return count;
  }

  // Bitwise addition modulo 2^32 of n numbers
  export function bam32_n(...args: string[]) {
    let s = 0;
    for (let i = 0; i < args.length; i++) {
      s += parseInt(args[i], 2);
    }

    while (s > Math.pow(2, 32)) {
      s = s - Math.pow(2, 32);
    }
    const result = (s >>> 0).toString(2);
    return '0'.repeat(32 - result.length) + result;
  }
}

export namespace BinaryOperations {
  // Bitwise Rotate Right Operation
  export function RotR(x: string, n: number): string {
    return x.substring(x.length - n, x.length) + x.substring(0, x.length - n);
  }

  //Bitwise Right Shift Operation
  export function Shift(x: string, n: number) {
    return '0'.repeat(n) + RotR(x, n).substring(n, x.length);
  }

  //Bitwise XOR operation for 2 inputs
  export function XOR(x: string, y: string) {
    const result = [];
    for (let i = 0; i < x.length; i++) {
      if (x[i] == y[i]) {
        result[i] = '0';
      } else {
        result[i] = '1';
      }
    }
    return result.join('');
  }
}
export namespace Preprocessing {
  // Padding the message to obtain a 512-bit number according to the standards of SHA-256
  export function padding(input: string) {
    let input_binary = BinaryTools.text2Binary(input);
    const ld = BinaryTools.dec2Bin(input_binary.length);
    input_binary += '1';
    let k = (448 - input_binary.length) % 512;
    while (k < 0) {
      k += 512;
    }
    const result = input_binary + '0'.repeat(k) + ld;
    assert(result.length % 512 === 0);
    return result;
  }

  // Parsing the message to obtain N-512 bit blocks
  export function parsing(text: string): string[] {
    const N = [];
    for (let i = 0; i < text.length; i += 512) {
      const M: string = text.substring(i, i + 512);
      N.push(M);
    }
    assert(N.length === text.length / 512, 'block length error');
    return N;
  }

  // Parsing the message to obtain 16 32-bit blocks
  export function M_op(bin: string) {
    const arr = [];
    for (let i = 0; i < 512; i += 32) {
      const M: string = bin.substring(i, i + 32);
      arr.push(M);
    }
    return arr;
  }

  export function setInitialHash() {
    return Constants.H.map((h) => BinaryTools.hex2Bin(h));
  }
}

export namespace Constants {
  //These hex words represent the first thirty-two bits of the fractional parts of the cube roots of the first sixty-four prime numbers
  export const K = [
    '428a2f98', '71374491', 'b5c0fbcf', 'e9b5dba5', '3956c25b', '59f111f1',
    '923f82a4', 'ab1c5ed5', 'd807aa98', '12835b01', '243185be', '550c7dc3',
    '72be5d74', '80deb1fe', '9bdc06a7', 'c19bf174', 'e49b69c1', 'efbe4786',
    '0fc19dc6', '240ca1cc', '2de92c6f', '4a7484aa', '5cb0a9dc', '76f988da',
    '983e5152', 'a831c66d', 'b00327c8', 'bf597fc7', 'c6e00bf3', 'd5a79147',
    '06ca6351', '14292967', '27b70a85', '2e1b2138', '4d2c6dfc', '53380d13',
    '650a7354', '766a0abb', '81c2c92e', '92722c85', 'a2bfe8a1', 'a81a664b',
    'c24b8b70', 'c76c51a3', 'd192e819', 'd6990624', 'f40e3585', '106aa070',
    '19a4c116', '1e376c08', '2748774c', '34b0bcb5', '391c0cb3', '4ed8aa4a',
    '5b9cca4f', '682e6ff3', '748f82ee', '78a5636f', '84c87814', '8cc70208',
    '90befffa', 'a4506ceb', 'bef9a3f7', 'c67178f2',
  ].map((k) => BinaryTools.hex2Bin(k));
  //These words were obtained by taking the first thirty-two bits of the fractional parts of the square roots of the first eight prime numbers.
  export const H = [
    '6a09e667',
    'bb67ae85',
    '3c6ef372',
    'a54ff53a',
    '510e527f',
    '9b05688c',
    '1f83d9ab',
    '5be0cd19',
  ];
}

export namespace Functions {
  // Ch(x, y, z) = (x ^ y) XOR (-x ^ z)
  export function ch(e: string, f: string, g: string) {
    const result = [];
    for (let i = 0; i < e.length; i++) {
      if (e[i] == '0') {
        result[i] = g[i];
      } else {
        result[i] = f[i];
      }
    }
    return result.join('');
  }

  // Maj(x, y, z) = (x ^ y) XOR (x ^ z) XOR (y ^ z)
  export function Maj(a: string, b: string, c: string) {
    const result = [];
    for (let i = 0; i < a.length; i++) {
      const fbit = a[i] + b[i] + c[i];
      if (BinaryTools.countString(fbit, '1') >= 2) {
        result[i] = '1';
      } else {
        result[i] = '0';
      }
    }
    return result.join('');
  }

  /// Uppercase sigma functions according to the SHA-256 standards
  export function SIGMA0(x: string) {
    const S0 = (
      (parseInt(BinaryOperations.RotR(x, 2), 2) ^
        parseInt(BinaryOperations.RotR(x, 13), 2) ^
        parseInt(BinaryOperations.RotR(x, 22), 2)) >>>
      0
    ).toString(2);
    return '0'.repeat(32 - S0.length) + S0;
  }

  export function SIGMA1(x: string) {
    const S1 = (
      (parseInt(BinaryOperations.RotR(x, 6), 2) ^
        parseInt(BinaryOperations.RotR(x, 11), 2) ^
        parseInt(BinaryOperations.RotR(x, 25), 2)) >>>
      0
    ).toString(2);
    return '0'.repeat(32 - S1.length) + S1;
  }
  /// Lowercase sigma functions according to the SHA-256 standards
  export function sigma0(x: string) {
    return BinaryOperations.XOR(
      BinaryOperations.XOR(
        BinaryOperations.RotR(x, 7),
        BinaryOperations.RotR(x, 18),
      ),
      BinaryOperations.Shift(x, 3),
    );
  }

  export function sigma1(x: string) {
    return BinaryOperations.XOR(
      BinaryOperations.XOR(
        BinaryOperations.RotR(x, 17),
        BinaryOperations.RotR(x, 19),
      ),
      BinaryOperations.Shift(x, 10),
    );
  }
}
