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

const levelOrder = (root) => {
  if (!root) return [];
  const queue = [root];
  const result = [];
  while (queue.length) {
    const level = [];
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      if (node) {
        level.push(node.val);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
    result.push(level);
  }
  return result;
};

const head1 = createBinaryTree([3, 9, 20, null, null, 15, 7]);
const head2 = createBinaryTree([1]);
const head3 = createBinaryTree([]);

for (const head of [head1, head2, head3]) {
  console.log("level order: ", levelOrder(head));
}
