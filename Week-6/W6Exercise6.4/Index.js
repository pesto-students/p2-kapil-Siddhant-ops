const maxProfit1 = (arr) => {
    let maxProfit = 0;
    let minPrice = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < minPrice) {
            minPrice = arr[i];
        }
        if (arr[i] - minPrice > maxProfit) {
            maxProfit = arr[i] - minPrice;
        }
    }
    return maxProfit;
};
const arr1 = [7, 1, 5, 3, 6, 4];
const arr2 = [7, 6, 4, 3, 1];
console.log(maxProfit1(arr1));
console.log(maxProfit1(arr2));
