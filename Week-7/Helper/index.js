class SLLNode {
  data;
  next;
  constructor(value) {
    this.data = value;
    this.next = null;
  }
}
const createSLL = (arr) => {
  const head = new SLLNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new SLLNode(arr[i]);
    current = current.next;
  }
  return head;
};
const traverse = (head) => {
  let current = head;
  while (current) {
    console.log(current.data);
    current = current.next;
  }
};
const getSize = (head) => {
  let count = 0,
    current = head;
  while (current) {
    current = current.next;
    count++;
  }
  return count;
};
module.exports = { SLLNode, createSLL, traverse, getSize };
