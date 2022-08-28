const { createSLL } = require("../Helper");

// detect loop in a linked list. check if the last node is connected to the xth node from the last.
const detectLoop = (head) => {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
  }
  return false;
};

// create a loop in a linked list from last node to xth node from first node.
const createLoop = (head, x) => {
  if (x === 0) return head;
  let current = head;
  let count = 0;
  while (current && count < x) {
    current = current.next;
    count++;
  }
  if (current === null) return head;
  let temp = current;
  while (temp.next) {
    temp = temp.next;
  }
  temp.next = head;
  return head;
};

const arr1 = [1, 3, 4],
  arr2 = [1, 8, 3, 4];

for (const obj of [
  { arr: arr1, x: 2 },
  { arr: arr2, x: 0 },
]) {
  const head = createSLL(obj.arr);
  createLoop(head, obj.x);
  console.log(detectLoop(head));
  console.log("\n==============================\n");
}
