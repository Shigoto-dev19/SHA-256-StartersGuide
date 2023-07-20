import { BinaryTools, Constants, Functions, Preprocessing } from './utils';

// Initialize the first 16 32-bit blocks and calculate the the remaining 48 blocks according to SHA-256 Standards
function W_op(M: string[]) {
  const W = [...M];
  for (let t = 16; t <= 63; t++) {
    W[t] = BinaryTools.bam32_n(
      Functions.sigma1(W[t - 2]),
      W[t - 7],
      Functions.sigma0(W[t - 15]),
      W[t - 16],
    );
  }
  return W;
}

// The SHA-256 function of a message containing no more that 512 bits (N=1)
export function my_sha256(input: string = '') {
  const H = Preprocessing.setInitialHash();
  // pad & parse input
  const padded_input = Preprocessing.padding(input);
  const N = Preprocessing.parsing(padded_input);

  const N_blocks = N.length;

  for (let i = 1; i <= N_blocks; i++) {
    const M = Preprocessing.M_op(N[i - 1]);
    const W = W_op(M);

    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];
    let f = H[5];
    let g = H[6];
    let h = H[7];

    for (let t = 0; t < 64; t++) {
      const T1 = BinaryTools.bam32_n(
        h,
        Functions.SIGMA1(e),
        Functions.ch(e, f, g),
        Constants.K[t],
        W[t],
      );
      const T2 = BinaryTools.bam32_n(
        Functions.SIGMA0(a),
        Functions.Maj(a, b, c),
      );
      h = g;
      g = f;
      f = e;
      e = BinaryTools.bam32_n(d, T1);
      d = c;
      c = b;
      b = a;
      a = BinaryTools.bam32_n(T1, T2);
    }

    H[0] = BinaryTools.bam32_n(a, H[0]);
    H[1] = BinaryTools.bam32_n(b, H[1]);
    H[2] = BinaryTools.bam32_n(c, H[2]);
    H[3] = BinaryTools.bam32_n(d, H[3]);
    H[4] = BinaryTools.bam32_n(e, H[4]);
    H[5] = BinaryTools.bam32_n(f, H[5]);
    H[6] = BinaryTools.bam32_n(g, H[6]);
    H[7] = BinaryTools.bam32_n(h, H[7]);
  }

  let hash_binary = '';

  for (let i = 0; i < 8; i++) {
    hash_binary += H[i];
  }

  const hash_hex = BinaryTools.bin2Hex(hash_binary);
  return hash_hex;
}
