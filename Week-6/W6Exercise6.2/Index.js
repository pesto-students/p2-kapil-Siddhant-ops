const returnSpiralOrderMatrix = (arr) => {
    let result = [];
    let start = 0;
    let end = arr.length - 1;
    while (start <= end) {
        for (let i = start; i <= end; i++) {
            result.push(arr[start][i]);
        }
        for (let i = start + 1; i <= end; i++) {
            result.push(arr[i][end]);
        }
        for (let i = end - 1; i >= start; i--) {
            result.push(arr[end][i]);
        }
        for (let i = end - 1; i >= start + 1; i--) {
            result.push(arr[i][start]);
        }
        start++;
        end--;
    }
    return result;
};
const arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];
const arr1 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
];
console.log(returnSpiralOrderMatrix(arr));
console.log(returnSpiralOrderMatrix(arr1));
