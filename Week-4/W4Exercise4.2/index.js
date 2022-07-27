var Person = function () {};

Person.prototype.initialize = function (name, age) {
  this.name = name;
  this.age = age;
};

var Teacher = function () {};

Object.setPrototypeOf(Teacher.prototype, Person.prototype);

Teacher.prototype.teach = function (subject) {
  console.log("".concat(this.name, " is now teaching ").concat(subject));
};

var him = new Teacher();

him.initialize("Steve Jobs", 67);
him.teach("IOS");
