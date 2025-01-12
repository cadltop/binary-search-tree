import Node from './Node.mjs';
export default class {
    constructor(data) {
        if (data) this.root = this.buildTree(data);
    }    
    buildTree(data) {
        data = clean(data);
        data = sort(data);
        return build(data);

        function clean(data = []) {
            const clean = [];
            for (let dIndex = 0; dIndex < data.length; dIndex++) {
                if (clean.length === 0) clean.push(data[0]);
                else {
                    let duplicate = false;
                    for (let cIndex = 0; cIndex < clean.length; cIndex++) {
                        if (data[dIndex] === clean[cIndex]) {
                            duplicate = true;
                            break;
                        }
                    } 
                    if (duplicate === false) clean.push(data[dIndex]);
                }
            }
            return clean;
        }
        function sort(data = []) {
            if (data.length === 1) return data;
            
            const midIndex = Math.floor(data.length / 2);
            let left = [], right = [];
            
            for (let i = 0; i < data.length; i++) {
                if (i < midIndex) left.push(data[i]);
                if (i >= midIndex) right.push(data[i]);
            }
            
            left = sort(left);
            right = sort(right);
            
            const sorted = [];
            for (let i = 0; i < data.length; i++) {
                if (left.length === 0) {
                    right.forEach((value) => {
                        sorted.push(value)
                    })
                    break;
                } else if (right.length === 0) {
                    left.forEach((value) => {
                        sorted.push(value)
                    })
                    break;
                } else {
                    if (left[0] < right[0]) sorted.push(left.shift());
                    else sorted.push(right.shift());
                }
            }
            return sorted;
        }
        function build(data = []) {
            if (data.length === 0) return null;
            if (data.length === 1) return new Node(data[0]);
        
            const midIndex = Math.floor(data.length / 2);
            let left = [], right = [];
        
            for (let i = 0; i < data.length; i++) {
                if (i < midIndex) left.push(data[i]);
                if (i > midIndex) right.push(data[i]);
            }
        
            const node = new Node(data[midIndex]);
            node.left = build(left);
            node.right = build(right);
            return node;
        }
    }
    insert(value) {
        if (!this.root)
            this.root = new Node(value);
        else {
            traverse(this.root, value);
            function traverse(node = new Node(), val) {
                if (node === null) 
                    return new Node(val);
                if (node.data === val)
                    throw new Error("this value exists already.");
                
                if (val < node.data) 
                    node.left = traverse(node.left, val);
                if (val > node.data) 
                    node.right = traverse(node.right, val);
                
                return node;
            }
        }
    }
    delete(value) {
        traverse(this.root, value);
        function traverse(node = new Node(), val) {
            if (node === null)
                throw new Error("this value does not exists.");
            if (node.data === val) {
                if (node.left === null && node.right === null)
                    return null;
                else if (node.left !== null && node.right !== null) {
                    const successor = findMin(node);
                    if (successor.right.data === node.data) 
                        successor.right = node.right;
                    return successor;
                    
                    function findMin(node = new Node()) {
                        if (node.left.left !== null) {
                            const min = findMin(node.left);
                            min.right.right = node.right;
                            node.left = null;
                            return min;
                        } else {
                            const min = node.left;
                            node.left = null;
                            min.right = node;
                            return min;
                        }
                    }
                }
                else if (node.left !== null || node.right !== null) 
                    return node.left || node.right;
            }
            
            if (val < node.data) node.left = traverse(node.left, val);
            if (val > node.data) node.right = traverse(node.right, val);
            
            return node;
        }
    }
    find(value) {
        let searchedNode;
        this.levelOrder(callback);
        function callback(node) {
            if (node.data === value)
                searchedNode = node;
        }
        return searchedNode || new Error("this value does not exists.");
    }
    levelOrder(callback) {
        if (callback instanceof(Function) === false)
            throw new Error("please provide a callback function");
        let queue = [this.root];
        while (queue.length !== 0) {
            const node = queue.shift();
            callback(node);
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }
    }
    inOrder(callback) {
        if (callback instanceof(Function) === false)
            throw new Error("please provide a callback function");
        
        traverse(this.root);
        function traverse(node = new Node()) {
            if (node === null) return node;
            traverse(node.left); 
            callback(node);
            traverse(node.right); 
            return node;
        }
    }
    preOrder(callback) {
        if (callback instanceof(Function) === false)
            throw new Error("please provide a callback function");
        
        traverse(this.root);
        function traverse(node = new Node()) {
            if (node === null) return node;
            callback(node);
            traverse(node.left); 
            traverse(node.right); 
            return node;
        }
    }
    postOrder(callback) {
        if (callback instanceof(Function) === false)
            throw new Error("please provide a callback function");
        
        traverse(this.root);
        function traverse(node = new Node()) {
            if (node === null) return node;
            traverse(node.left); 
            traverse(node.right); 
            callback(node);
            return node;
        }
    }
    height(node = new Node()) {
        const heights = {
            left: traverse(node.left),
            right: traverse(node.right)
        }
        return (heights.left > heights.right) ? heights.left : heights.right;
        
        function traverse(node = new Node()) {
            let height = 0;
            let queue = [node];
            while (queue.length !== 0) {
                const node = queue.shift();
                if (node === null) break;
                if (node.left !== null) queue.push(node.left);
                else if (node.right !== null) queue.push(node.right);

                height++;
            }
            return height;
        }
    }
    depth(node = new Node()) {
        let height = 0;
        let currentNode = this.root;
        
        while (currentNode.data !== node.data) {
            if (currentNode.data > node.data) currentNode = currentNode.left;
            else if (currentNode.data < node.data) currentNode = currentNode.right;
            else throw new Error("this value does not exists.");
            height++;
        }
        return height;
    }
    isBalanced() {
        let queue = [this.root];
        while (queue.length !== 0) {
            const node = queue.shift();
            let left, right;

            if (node.left !== null) {
                queue.push(node.left);
                left = this.height(node.left);
            } else left = 0;
            if (node.right !== null) {
                queue.push(node.right);
                right = this.height(node.right);
            } else right = 0;

            const diff = (left > right) ? left - right: right - left;
            if (diff > 1) return false;
        }
        return true;
    }
    rebalance() {
        let queue = [this.root];
        let newData = [];
        while (queue.length !== 0) {
            const node = queue.shift();
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
            newData.push(node.data);
        }
        this.root = this.buildTree(newData);
    }
}