const findNextGreaterElement = (arr) => {
  let _arr = [];
  let found = false;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < arr[i + 1]) {
      _arr.push(arr[i + 1]);
    } else {
      for (let j = i; j < arr.length; j++) {
        if (arr[i] < arr[j]) {
          _arr.push(arr[j]);
          found = true;
          break;
        }
      }
      if (!found) {
        _arr.push(-1);
        found = false;
      }
    }
  }
  _arr.push(-1);
  return _arr;
};

console.log(findNextGreaterElement([1, 3, 2, 4]));
console.log(findNextGreaterElement([6, 8, 0, 1, 3]));
