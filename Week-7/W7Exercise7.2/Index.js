const { createSLL, getSize, traverse } = require("../Helper");

const rotateLinkedList = (head, k) => {
  if (k === 0 || k > getSize(head)) return head;
  let current = head;
  let prev = null;
  while (k && current !== null) {
    prev = current;
    current = current.next;
    k--;
  }
  if (current === null) return head;
  let newHead = current;
  prev.next = null;
  while (current.next) {
    current = current.next;
  }
  current.next = head;
  return newHead;
};

const arr1 = [2, 4, 7, 8, 9],
  arr2 = [1, 2, 3, 4, 5, 6, 7, 8];

for (const obj of [
  { arr: arr1, k: 3 },
  { arr: arr2, k: 4 },
]) {
  let head = createSLL(obj.arr);
  head = rotateLinkedList(head, obj.k);
  traverse(head);
  console.log("\n==============================\n");
}
