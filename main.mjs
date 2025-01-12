import Tree from "./Tree.mjs";

const tree =  new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);
console.log(tree.isBalanced());

console.log("level");
tree.levelOrder(printNode);
console.log("pre");
tree.preOrder(printNode);
console.log("post");
tree.postOrder(printNode);
console.log("in");
tree.inOrder(printNode);

console.log("grow");
growTree(90, 100);
prettyPrint(tree.root);
console.log(tree.isBalanced());

console.log("rebalance");
tree.rebalance();
prettyPrint(tree.root);
console.log(tree.isBalanced());

console.log("level");
tree.levelOrder(printNode);
console.log("pre");
tree.preOrder(printNode);
console.log("post");
tree.postOrder(printNode);
console.log("in");
tree.inOrder(printNode);

// callback
function printNode(node) {
  console.log(node.data);
}
// print
function prettyPrint(node = new Node(), prefix = "", isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
// grow
function growTree(size, range = 100) {
  for (let i = 0; i <= size; i++) {
    try {
      tree.insert(randomNumber(range));
    } catch (error) {
      i--;
      continue;
    }
  }
  function randomNumber(range) {
    return Math.round(Math.random() * range) + 1;
  } 
}