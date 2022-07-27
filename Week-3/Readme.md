# Pesto Week 3 assignments

Following are the files added according to the assignments

- W3Exercise3.1
  - index.js
- W3Exercise3.2
  - index.js
- W3Exercise3.3
  - index.js
- W3Exercise3.4
  - index.js

All JS files can run with

```
node path-to-file
```

## Exercise 3.1

Create a `memoize` function that remembers previous inputs and stores them in cache so that it won’t have to compute the same inputs more than once. The function will take an unspecified number of integer inputs and a `reducer` method.

## Exercise 3.2

Create 3 simple functions where `call`, `bind` and `apply` are used. The intention of this exercise is to understand how they work and their differences.

## Exercise 3.3

What is the output of the below problem and why

```javascript
function createIncrement() {
  var count = 0;

  function increment() {
    count++;
  }

  var message = `Count is${count}`;

  function log() {
    console.log(message);
  }

  return [increment, log];
}
const [increment, log] = createIncrement();

increment();
increment();
increment();
log();
```

## Exercise 3.4

Refactor the stack implementation, using the concept of closure, such that there is no way to access items array outside of `createStack()` function scope

```javascript
function createStack() {
  return {
    items: [],
    push(item) {
      this.items.push(item);
    },
    pop() {
      return this.items.pop();
    },
  };
}
const stack = createStack();
stack.push(10);
stack.push(5);
stack.pop(); // => 5
stack.items; // => [10]
stack.items = [10, 100, 1000]; //Encapsulationbroken!

function createStack() {
  // Write your code here...
}
conststack = createStack();
stack.push(10);
stack.push(5);
stack.pop(); // => 5
stack.items; // => undefined
```
