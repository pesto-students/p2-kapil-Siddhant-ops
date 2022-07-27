const findPairWithDifference = (arr, difference) => {
    const map = new Map();
    for (let i = 0; i < arr.length; i++) {
        const diff = arr[i] - difference;
        if (map.has(diff)) {
            console.log("The Pair is: ", arr[i], " and ", diff);
            return 1;
        }
        map.set(arr[i], i);
    }
    return 0;
};
console.log(findPairWithDifference([5, 20, 3, 2, 50, 80], 78));
console.log("\n==============================\n");
console.log(findPairWithDifference([1, 2, 3, 6, 9, 8, 7, 4, 5], 30));
console.log("\n==============================\n");
console.log(findPairWithDifference([-6, 70, -14, 50], -8));
console.log("\n==============================\n");
console.log(findPairWithDifference([-10, 20], 30));
