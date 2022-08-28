const maxSumContiguousSubArray = (_arr) => {
    let maxSoFar = Number.MIN_VALUE, maxEndingHere = 0, start = 0, end = 0, temp = 0;
    for (let i = 0; i < _arr.length; i++) {
        maxEndingHere = maxEndingHere + _arr[i];
        if (maxSoFar < maxEndingHere) {
            maxSoFar = maxEndingHere;
            start = temp;
            end = i;
        }
        if (maxEndingHere < 0) {
            maxEndingHere = 0;
            temp = i + 1;
        }
    }
    return { maxSoFar, subArray: _arr.slice(start, end) };
};
const arr = [1, 2, 3, 4, -10];
const result1 = maxSumContiguousSubArray(arr);
console.log(result1);
const arr1 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const result2 = maxSumContiguousSubArray(arr1);
console.log(result2);
