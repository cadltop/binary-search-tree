import Tree from "./Tree.mjs";

const tree =  new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// const tree =  new Tree();

// insert
// tree.insert(1000);
// tree.insert(9);
// delete
// tree.insert(999);
// tree.insert(1001);
// tree.delete(4);
// find
// console.log(tree.find(23));
// level order
// tree.levelOrder(printNode);
// in order
// tree.inOrder(printNode);
// pre order
// tree.preOrder(printNode);
// post order
// tree.postOrder(printNode);
// callback
// function printNode(node) {
//   console.log(node.data);
// }
// height
// console.log(tree.height(tree.find(10)));
// depth
// console.log(tree.depth(tree.find(10)));

// print
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
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

// post process
// growTree(50, 60);
prettyPrint(tree.root);

console.log(tree.isBalanced());