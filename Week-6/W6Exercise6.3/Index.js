const sortArr = (arr) => {
    let low = 0, high = arr.length - 1, mid = 0, temp = 0;
    while (mid <= high) {
        if (arr[mid] === 0) {
            temp = arr[mid];
            arr[mid] = arr[low];
            arr[low] = temp;
            low++;
            mid++;
        }
        else if (arr[mid] === 1) {
            mid++;
        }
        else {
            temp = arr[mid];
            arr[mid] = arr[high];
            arr[high] = temp;
            high--;
        }
    }
    return arr;
};
console.log(sortArr([0, 2, 1, 2, 0]));
console.log(sortArr([0, 1, 0]));
console.log(sortArr([0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1]));
