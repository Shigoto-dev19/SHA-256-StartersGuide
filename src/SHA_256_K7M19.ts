
//  Convert character to binary
function Char2Binary(inp:string) {

    let Binary = inp.charCodeAt(0).toString(2);
    if (Binary.length < 8) {
        return '0'.repeat(8-Binary.length) + Binary;
    } else {
        return Binary;
    }
}

// Convert message to binary
function Text2Binary(text: string) {

    let myArray = text.split('');
    let result = '';
    for(let i = 0; i < myArray.length; i++){ 
    result = result + Char2Binary(myArray[i]);}
    return result;
}

// Convert decimal number to binary
function dec2bin(dec:number) { return (dec >>> 0).toString(2); }

// Padding the message to obtain a 512-bit number according to the standards of SHA-256
function appending(text: string){

    let ld = dec2bin(text.length);
    let text1 = text + '1';
    let l = 512 - text1.length -ld.length;
    return text1 + '0'.repeat(l) + ld ;
    }
    
// Parsing the message to obtain 16 32-bit blocks
function M_op(bin:string){

    let arr = [];
    for (let i=0; i<512;i+=32){
        let M:string = bin.substring(i,i+32);
        arr.push(M);
    }
    return arr;
}

// Convert hexadecimal number to binary
function hex2bin(hex:string){

    let result = (parseInt(hex, 16).toString(2)).padStart(8, '0');
    return '0'.repeat(32-result.length) + result;
}

// Bitwise Rotate Right Operation
function RotR(x: string, n: number): string{
    return x.substring(x.length - n, x.length) + x.substring(0,x.length - n);
}

//Bitwise Right Shift Operation
function Shift(x:string,n:number){
    return '0'.repeat(n) + RotR(x,n).substring(n, x.length);
}

// Count a letter occurence in a string
function countString(str:string, letter:string) {

    let count = 0;
    for (let i = 0; i < str.length; i++) {

        if (str.charAt(i) == letter) {
            count += 1;
        }
    }
    return count;
}

//Bitwise XOR operation for 2 inputs
function XOR(x:string, y:string){

    let result = [];
    for (let i=0; i<x.length; i++){
        if (x[i]==y[i]){
            result[i] = '0'
        } else {
            result[i] = '1'
        }
    } return result.join('');
}
// Modulo 2 operation or XOR for 3 inputs
function Sigma (x:string, y:string, z:string){
    
    let result = [];
    for (let i=0; i< x.length; i++) {
        let comp = x[i] + y[i] + z[i];
        if (countString(comp,'1') == 1 || countString(comp,'1') == 3  ) {
            result[i] = '1';
        } else {
            result[i] = '0';
        }
    }
    return result.join('');
}

//// Lowercase sigma functions according to the SHA-256 standards

function sigma0 (x:string){
    return XOR( XOR( RotR(x,7), RotR(x,18) ),Shift(x,3));
    }

function sigma1 (x:string){
    return XOR( XOR( RotR(x,17), RotR(x,19) ),Shift(x,10));
}

// function sigma1 (x:string){
//     let s1 = ((parseInt(RotR(x,17),2) ^ parseInt(RotR(x,19),2) ^ parseInt(Shift(x,10),2) )>>>0).toString(2);
//     return '0'.repeat(32-s1.length) + s1;
// }

//function Sigma0 (x:string) {return Sigma(RotR(x,7),RotR(x,18),Shift(x,3));}
//function Sigma1 (x:string) {return Sigma(RotR(x,17),RotR(x,19),Shift(x,10));}

function Reverse( str: string) {
    
    let rev = '';
    for (let i=0; i<str.length;i++){
        rev = str[i] + rev;
    }
    return rev+'0';
}

//// Manual function for bitwise addition modulo 2^32 of two numbers
function BAM32(x:string,y:string){

    x = Reverse(x) + '0';
    y = Reverse(y) + '0';
    let arr = ['0'];
    let result = [];
    for (let i=0; i < x.length-1; i++){
        let comp = x[i] + y[i] + arr[i];
        if (countString(comp,'1') == 1) {
            arr[i+1] = '0';
            result[i] = '1';

        } else if (countString (comp,'1')== 2) {
            arr[i+1] = '1';
            result[i] = '0';
        } else if (countString(comp,'1') == 3  ){
            arr[i+1] = '1';
            result[i] = '1';
        
        } else {
            arr[i+1] = '0';
            result [i] = '0';
        }
    }
    return Reverse(result.join('').substring(0,result.length-1)).substring(0,32);
}

function BAM32_2(x:string, y:string){
    let s = parseInt(x,2) + parseInt(y,2);
    while( s > Math.pow(2,32)) {
        s = s - Math.pow(2,32)
    }
    const result = (s>>>0).toString(2);
    return '0'.repeat(32-result.length) + result;
}

// Bitwise addition modulo 2^32 of n numbers
function BAM32_n(...argumentss:string[]){
    
    let s = 0;
    for (let i=0; i<argumentss.length;i++){
        s+= parseInt(argumentss[i],2);
    }
        
    while( s > Math.pow(2,32)) {
        s = s - Math.pow(2,32);
    }
    const result = (s>>>0).toString(2);
    return '0'.repeat(32-result.length) + result;
}

// Initialize the first 16 32-bit blocks and calculate the the remainding 48 blocks according to SHA-256 Standards
function W_op(M:any[]){

    let W = [...M];
    for (let t=16; t<=63; t++ ){
        W[t] = BAM32_n(sigma1(W[t-2]), W[t-7],sigma0(W[t-15]), W[t-16]);
    } 
    return W;
}

//// Uppercase sigma functions according to the SHA-256 standards
function SIGMA0 (x:string){

    let S0 = ((parseInt(RotR(x,2),2) ^ parseInt(RotR(x,13),2) ^ parseInt(RotR(x,22),2) )>>>0).toString(2);
    return '0'.repeat(32-S0.length) + S0;
}

function SIGMA1 (x:string){

    let S1 = ((parseInt(RotR(x,6),2) ^ parseInt(RotR(x,11),2) ^ parseInt(RotR(x,25),2) )>>>0).toString(2);
    return '0'.repeat(32-S1.length) + S1;
}


//Ch(x, y, z) = (x ^ y) XOR (-x ^ z)
function ch(e:string,f:string,g:string){

    let result = [];
    for (let i=0; i<e.length;i++) {
        if (e[i] == '0') {
            result [i] = g[i];
        } else {
            result [i] = f[i];
        }
        
    }return result.join('');
}

//Maj(x, y, z) = (x ^ y) XOR (x ^ z) XOR (y ^ z)
function Maj(a:string,b:string,c:string){

    let result = [];
    for (let i=0; i<a.length; i++){
        let fbit = a[i] + b[i] + c[i];
        if (countString(fbit, '1') >= 2){
            result[i] = '1'
        } else {
            result[i] = '0'
        }
    }
    return result.join('');
}

// Convert Binary to Hexadecimal number
function Bin2Hex(x:string){
    
    let result = '';
    for (let i=0; i<x.length; i+=4){
    
        result += parseInt(x.substring(i,i+4), 2).toString(16);
        
    }
    return result;
}

// The SHA-256 function of a message containing no more that 512 bits (N=1)
 export function My_SHA256 (inp){
    
    //These words were obtained by taking the first thirty-two bits of the fractional parts of the square roots of the first eight prime numbers.
    const H_hex = ['6a09e667', 'bb67ae85', '3c6ef372', 'a54ff53a', '510e527f', '9b05688c', '1f83d9ab', '5be0cd19'];

    let H = [];
    for (let i=0; i<H_hex.length; i++){
        H[i] = hex2bin(H_hex[i]);
    }

    let a = hex2bin(H_hex[0]);
    let b = hex2bin(H_hex[1]);
    let c = hex2bin(H_hex[2]);
    let d = hex2bin(H_hex[3]);
    let e = hex2bin(H_hex[4]);
    let f = hex2bin(H_hex[5]);
    let g = hex2bin(H_hex[6]);
    let h = hex2bin(H_hex[7]);

    //These hex words represent the first thirty-two bits of the fractional parts of the cube roots of the first sixty-four prime numbers
    const K = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2 ];

    let Kn = [];
    for (let i=0; i< K.length; i++){
        let nbin = K[i].toString(2);
        Kn[i] = '0'.repeat(32-nbin.length)+nbin;
    }
    if (inp != null){
        const BinaryRes = Text2Binary(inp);
        const M = M_op(appending(BinaryRes));
        const W = W_op(M);
        
        for (let t=0; t<64; t++){
            let T1 = BAM32_n(h,SIGMA1(e),ch(e,f,g),Kn[t],W[t]);
            let T2 = BAM32_n(SIGMA0(a),Maj(a,b,c));
            h=g;
            g=f;
            f=e;
            e= BAM32_n(d,T1);
            d=c;
            c=b;
            b=a;
            a= BAM32_n (T1,T2);
        }
    }
    const abcdefgh = [a,b,c,d,e,f,g,h];
    let SHA_256_bin = [];

    for (let i=0; i<H.length; i++){
        SHA_256_bin[i] = BAM32_n(abcdefgh[i],H[i]);
    }

    const SHA_256_BIN = SHA_256_bin.join('');
    const SHA_256_hex = Bin2Hex(SHA_256_BIN);
    return SHA_256_hex;
    }

//let inp = prompt('Input: ') ;
const inp = 'abc';

console.log(`SHA-256 (${inp}): ${My_SHA256(inp)}`);


