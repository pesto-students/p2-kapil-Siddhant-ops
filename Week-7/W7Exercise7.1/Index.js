const { createSLL, traverse } = require("../Helper");
const reverse = (head) => {
  let current = head;
  let prev = null;
  while (current) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
};
const arr1 = [2, 8, 10, 15, 33, 45, 60];
const arr2 = [2, 7, 8, 9, 10];
for (const arr of [arr1, arr2]) {
  let head = createSLL(arr);
  console.log("Before Reverse");
  traverse(head);
  console.log("\n==============================\n");
  head = reverse(head);
  console.log("After Reverse");
  traverse(head);
  console.log("\n==============================\n");
}
