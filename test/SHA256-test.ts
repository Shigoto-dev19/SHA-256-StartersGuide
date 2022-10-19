
import { sha256 } from 'js-sha256';
import {My_SHA256} from "../src/SHA_256_K7M19";


function assert(condition: unknown, message: string): asserts condition {
    if (!condition) throw new Error(message);
}


function getrandom(){ return Math.random().toString(36).substring(2,10) };


function happy_path() {
    let LibHash = sha256.create();
    let input = "abc";
    let output = My_SHA256(input);
    assert( LibHash.update(input).hex() == output, "hashes are different" )
}

function unhappy_path() {
    let LibHash = sha256.create();
    let input = "abc";
    let output = My_SHA256(input);
    let input1 = "abcd";

    assert( LibHash.update(input).hex() == output, "hashes are different" );
}


function random_path() {
    let LibHash = sha256.create();
    let input = getrandom();
    let output = My_SHA256(input);
    assert( LibHash.update(input).hex() == output, "hashes are different" );
}

function looped_random_path(){
    for (let i = 0; i < 10000; i++) {
        let rndInput = (Math.random() * 2_000_000).toString();
        //let rndInput = getrandom();
        let hash = My_SHA256(rndInput);
        let hashReference = (sha256.create().update(rndInput).hex()); // the same input for both hashfuntions
        assert( hash === hashReference, "hashes are different");
    }
}

function looped_random_path_Hash_of_hash(){
    for (let i = 0; i < 10000; i++) {
        let rndInput = (Math.random() * 2_000_000).toString();
        //let rndInput = getrandom();
        let hash = My_SHA256(My_SHA256(rndInput));
        let hashReference = (sha256.create().update(rndInput).hex()); // the same input for both hashfuntions
        let hashRefhash = sha256.create().update(hashReference).hex();
        assert( hash === hashRefhash, "hashes are different");
    }
}

it('happy_test',() => happy_path());
it('unhappy_test',() => unhappy_path());
it('random_test',() => random_path());
it("looped_random_test", () => looped_random_path());
it("looped_random_path_Hash_of_hash", () => looped_random_path_Hash_of_hash());
    
   

