export const bubbleSort=(arr)=>{
        let copy = arr;
        let temp;
        for (let i = 0; i < copy.length ; i++) {
            for(let j = 0 ; j < copy.length - i - 1; j++){
                if (copy[j] > copy[j + 1]) {
                    temp = copy[j];
                    copy[j] = copy[j+1];
                    copy[j + 1] = temp;

                }
            }
        }
        return copy;
};

export const bubbleSort_no_ret=(arr)=>{
    var copy = arr;
    var temp;
    for (var i = 0; i < copy.length ; i++) {
        for(var j = 0 ; j < copy.length - i - 1; j++){ // this was missing
            if (copy[j] > copy[j + 1]) {
                // swap
                temp = copy[j];
                copy[j] = copy[j+1];
                copy[j + 1] = temp;

            }
        }
    }

};