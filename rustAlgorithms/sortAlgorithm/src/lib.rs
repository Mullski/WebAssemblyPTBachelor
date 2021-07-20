use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn bubble_sort(data: Vec<i32>)-> Vec <i32> {
    let mut copy = data.to_vec();
    let mut temp: i32;

    for i in 0.. copy.len() {
        for j in 0.. copy.len(){
            if copy[j] > copy[i] {
                temp = copy[j];
                copy[j] = copy[i];
                copy[i] = temp;

            }
        }
    }
    return copy;
}

#[wasm_bindgen]
pub fn bubble_sort_no_ret(data: Vec<i32>){
    let mut copy = data.to_vec();
    let mut temp: i32;

    for i in 0.. copy.len() {
        for j in 0.. copy.len(){
            if copy[j] > copy[i] {
                temp = copy[j];
                copy[j] = copy[i];
                copy[i] = temp;

            }
        }
    }

}

