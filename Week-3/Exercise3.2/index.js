function greet(fnName, fnName2, fnName3) {
  console.log(
    ""
      .concat(this.fname, " ")
      .concat(this.lname, " knows what is ")
      .concat(fnName, ", ")
      .concat(fnName2, " & ")
      .concat(fnName3)
  ); // using concat instead of string interpolation to make the program more optimised ( the code actually runs faster with concat )
}
var person = { fname: "Tony", lname: "Stark" };

greet.call(person, "bind", "call", "apply");

greet.apply(person, ["bind", "call", "apply"]);

var bindGreet = greet.bind(person, "bind", "call", "apply");

bindGreet();
// Call and apply are pretty interchangeable.
// Just decide whether it's easier to send in an array or a comma separated list of arguments.
// Call is for comma separated
// Apply is for Array.
// Bind returns a new function.
// Call/apply call the function immediately, whereas bind returns a function that, when later executed, will have the correct context set for calling the original function.
// This way you can maintain context in async callbacks and events.
