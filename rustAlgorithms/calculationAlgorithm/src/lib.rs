use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn calc(data: Vec<i32>) -> i32{
    let mut sum: i32 = 0;
    for i in 0.. data.len() {
        sum=sum+data[i]
    }
    return sum;
}

