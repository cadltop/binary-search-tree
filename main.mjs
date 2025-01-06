import Tree from "./Tree.mjs";

const tree =  new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

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
tree.postOrder(printNode);
// callback
function printNode(node) {
  console.log(node.data);
}
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

prettyPrint(tree.root);