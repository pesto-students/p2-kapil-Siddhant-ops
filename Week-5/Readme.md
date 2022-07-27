# Pesto Week 5 assignments

Following are the files added according to the assignments

- W3Exercise5.1
  - index.js
- W3Exercise5.2
  - index.js
- W3Exercise5.3
  - index.js
- W3Exercise5.4
  - index.js
  - index.test.js
  - package.json

All JS files can run with

```
node path-to-file
```

Instructions for Exercise 5.4

```
cwd \W3Exercise5.4
```

Install dependencies

```
npm i
```

Start testing

```
npm run test
```

## Exercise 5.1

Using Async/Await and Generators, create separate functions and achieve the samefunctionality.

Execute 3 callback functions asynchronously, for example doTask1(), doTask2() and doTask3().

## Exercise 5.2

Write a function called vowelCount which accepts a string and returns a map where the keys arenumbers and the values are the count of the vowels in the string.

Reference

```javascript
function isVowel(char) {
  return "aeiou".includes(char);
}

function vowelCount(str) {
  const vowelMap = newMap();

  for (let char of str) {
    let lowerCaseChar = char.toLowerCase();

    if (isVowel(lowerCaseChar)) {
      if (vowelMap.has(lowerCaseChar)) {
        vowelMap.set(lowerCaseChar, vowelMap.get(lowerCaseChar) + 1);
      } else {
        vowelMap.set(lowerCaseChar, 1);
      }
    }
  }
  return vowelMap;
}
```

## Exercise 5.3

Write a function called hasDuplicate which accepts an array and returns true or false if that arraycontains a duplicate

Reference

```javascript
hasDuplicate([1, 5, -1, 4]); // false
const hasDuplicate = (arr) => new Set(arr).size !== arr.length;
```

## Exercise 5.4

Create a simple Javascript function code for addition, subtraction, and multiplication of 2 numbers and write the corresponding Jest based tests for it.

```javascript
const mathOperations = {
  sum: function (a, b) {
    return a + b;
  },
  diff: function (a, b) {
    return a - b;
  },
  product: function (a, b) {
    return a * b;
  },
};
module.exports = mathOperations;
```
