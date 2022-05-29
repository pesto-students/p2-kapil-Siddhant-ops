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
log(); // What is logged?

// Count is0  is being logged
// Explanation:
// createIncrement() contains
// 1> var count which has an initial value 0
// 2> increment() which increases the count'd value by 1
// 3> var message which has the initial value of "Count is${count}", which in turn is "Count is0".
//    since, count has initial value of 0 so when concatenated within the string, message value becomes "Count is0"
// 4> log() which console logs the message variable
// createIncrement() returns increment and log function in the form of an array
// The script is proceesed in the following manner
// increment() is invoked thrice and then log() is invoked
// Since at the beginning the message value is set Count is0 and never later being changed anywhere the log() prints its initial value
