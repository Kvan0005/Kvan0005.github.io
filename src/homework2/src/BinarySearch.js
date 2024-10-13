function BinarySearch(lower, upper, callback){
    if (allSame(lower, upper, callback)) {
        return -1;
    }
    if (callback(upper)) {
        return upper;
    }
    // convert the array to a list of booleans using the callback function
    while (lower < upper) {
        let mid = ((lower + upper) / 2) | 0; 
        let close_left = callback(mid);
        let close_right = callback(mid + 1);
        if (close_left ^ close_right) { // either one is true
            return mid;
        }
        else if (close_left && close_right) {
            lower = mid;
        }
        else{
            upper = mid;
        }
    }
    return -1;
}

function allSame(lower, upper, callback){
    let list = [];
    for (let i = lower; i < upper; i++) {
        list.push(callback(i));
    }
    return list.every((val, i, arr) => val === arr[0]);
}



if (window.BinarySearch === undefined) {
    window.BinarySearch = BinarySearch;
}