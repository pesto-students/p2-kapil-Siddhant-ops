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

const isBinarySearchTree = (root) => {
  if (!root) return false;
  const queue = [root];
  let node;
  while (queue.length) {
    node = queue.shift() ?? null;
    if (node) {
      if (node.left)
        if (node.left.val < node.val) queue.push(node.left);
        else return false;
      if (node.right)
        if (node.right.val > node.val) queue.push(node.right);
        else return false;
    }
  }
  return true;
};

const head1 = new TreeNode(2);
head1.left = new TreeNode(1);
head1.right = new TreeNode(3);

const head2 = new TreeNode(5);
head2.left = new TreeNode(1);
head2.right = new TreeNode(4);
head2.right.left = new TreeNode(3);
head2.right.right = new TreeNode(6);

for (const head of [head1, head2]) {
  console.log("is valid BST: ", isBinarySearchTree(head));
}
