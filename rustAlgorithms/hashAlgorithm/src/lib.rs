use wasm_bindgen::prelude::*;
extern crate crypto;
use crypto::digest::Digest;
use crypto::sha2::Sha512;

#[wasm_bindgen]
pub fn crypto_hash(data: &str) -> String{
    let mut sha = Sha512::new();
    sha.input_str(data);
    return sha.result_str();
}



