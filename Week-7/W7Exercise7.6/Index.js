class Queue {
  constructor() {
    this.s1 = [];
    this.s2 = [];
  }

  enqueue(x) {
    while (this.s1.length > 0) {
      this.s2.push(this.s1.pop());
    }
    this.s1.push(x);
    while (this.s2.length > 0) {
      this.s1.push(this.s2.pop());
    }
  }

  dequeue() {
    if (this.s1.length === 0) {
      return -1;
    }
    return this.s1.pop();
  }
}

function queryCaller(queryArray) {
  let queue = new Queue();
  let result = [];
  for (let i = 0; i < queryArray.length; i++) {
    if (queryArray[i] === 1) {
      queue.enqueue(queryArray[i + 1]);
      i++;
    } else if (queryArray[i] === 2) {
      result.push(queue.dequeue());
    }
  }
  return result;
}

let query1 = [1, 2, 1, 3, 2, 1, 4, 2];
let query2 = [1, 2, 2, 2, 1, 4];
console.log(queryCaller(query1));
console.log(queryCaller(query2));
