class TreeNode {
  val;
  left;
  right;
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const getDepth = (root) => {
  if (!root) return 0;
  return Math.max(getDepth(root.left), getDepth(root.right)) + 1;
};

const createBinaryTree = (arr) => {
  if (!arr.length) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift();
    if (arr[i]) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    if (arr[i + 1]) {
      node.right = new TreeNode(arr[i + 1]);
      queue.push(node.right);
    }
    i += 2;
  }
  return root;
};

const showBinaryTree = (root) => {
  if (!root) return;
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    if (node) {
      console.log(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
};

const head1 = createBinaryTree([3, 9, 20, null, null, 15, 7]);
const head2 = createBinaryTree([1, null, 2]);
const head3 = createBinaryTree([2, 1, 3]);

for (const head of [head1, head2, head3]) {
  showBinaryTree(head);
  console.log("max depth: ", getDepth(head));
  console.log("\n==============================\n");
}
