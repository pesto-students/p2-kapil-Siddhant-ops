# Pesto Week 3 assignments

Following are the files added according to the assignments

- W3Exercise4.1
  - index.js
- W3Exercise4.2
  - index.js
- W3Exercise4.3
  - index.js

All JS files can run with

```
node path-to-file
```

## Exercise 4.1

Implement a function named `getNumber` which generates a random number. If randomNumber is divisible by 5 it will reject the promise else it will resolve the promise. Let’s also keep thepromise resolution/rejection time as a variable.

- JS promises should not be used.
- A custom promise function should be created.
- This function should be able to handle all 3 states Resolve, Reject and Fulfilled.
- Should be able to accept callbacks as props.

## Exercise 4.2

Create an object called `Teacher` derived from the Person class, and implement a method called teach which receives a string called subject, and prints out:

`[teacher's name]is now teaching[subject]`

```javascript
var Person = function () {};
Person.prototype.initialize = function (name, age) {
  this.name = name;
  this.age = age;
};
// TODO: create the class Teacher and a method teach
var him = newTeacher();
him.initialize("Adam", 45);
him.teach("Inheritance");
```

## Exercise 4.3

Implement Fibonacci Series with Iterators

Sample output

```javascript
The Fibonacci Series is:
0
1
1
2
3
5
8
```
