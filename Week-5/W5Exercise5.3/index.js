const hasDuplicates = (arr) => new Set(arr).size !== arr.length;
const arr1 = [1, 2, 3, 4];
const arr2 = [1, -1, 1, 3];
console.log(hasDuplicates(arr1));
console.log(hasDuplicates(arr2));
