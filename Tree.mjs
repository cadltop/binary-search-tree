import Node from './Node.mjs';
export default class {
    constructor(data) {
        if (data) this.root = this.buildTree(data);
    }    
    buildTree(data) {
        data = this.#clean(data);
        data = this.#sort(data);
        return this.#build(data);
    }
    insert(value) {
        if (!this.root)
            this.root = new Node(value);
        else {
            traverse(this.root, value);
            function traverse(currentNode, val) {
                if (currentNode === null) 
                    return new Node(val);
                if (currentNode.data === val)
                    throw new Error("this value exists already.");
                
                if (val < currentNode.data) 
                    currentNode.leftChild = traverse(currentNode.leftChild, val);
                if (val > currentNode.data) 
                    currentNode.rightChild = traverse(currentNode.rightChild, val);
                
                return currentNode;
            }
        }
    }
    delete(value) {
        traverse(this.root, value);
        function traverse(currentNode, val) {
            if (currentNode === null)
                throw new Error("this value does not exists.");
            if (currentNode.data === val) {
                if (currentNode.leftChild === null && currentNode.rightChild === null)
                    return null;
                else if (currentNode.leftChild !== null && currentNode.rightChild !== null) {
                    const successor = findMin(currentNode);
                    if (successor.rightChild.data === currentNode.data) 
                        successor.rightChild = currentNode.rightChild;
                    return successor;
                    
                    function findMin(node) {
                        if (node.leftChild.leftChild !== null) {
                            const suc = findMin(node.leftChild);
                            suc.rightChild.rightChild = node.rightChild;
                            node.leftChild = null;
                            return suc;
                        } else {
                            const min = node.leftChild;
                            node.leftChild = null;
                            min.rightChild = node;
                            return min;
                        }
                    }
                }
                else if (currentNode.leftChild !== null || currentNode.rightChild !== null) 
                    return currentNode.leftChild || currentNode.rightChild;
            }
            
            if (val < currentNode.data) currentNode.leftChild = traverse(currentNode.leftChild, val);
            if (val > currentNode.data) currentNode.rightChild = traverse(currentNode.rightChild, val);
            
            return currentNode;
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
            if (node.leftChild !== null) queue.push(node.leftChild);
            if (node.rightChild !== null) queue.push(node.rightChild);
        }
    }
    inOrder(callback) {
        if (callback instanceof(Function) === false)
            throw new Error("please provide a callback function");
        
        traverse(this.root);
        function traverse(currentNode) {
            if (currentNode === null) return currentNode;
            traverse(currentNode.leftChild); 
            callback(currentNode);
            traverse(currentNode.rightChild); 
            return currentNode;
        }
    }
    preOrder(callback) {
        if (callback instanceof(Function) === false)
            throw new Error("please provide a callback function");
        
        traverse(this.root);
        function traverse(currentNode) {
            if (currentNode === null) return currentNode;
            callback(currentNode);
            traverse(currentNode.leftChild); 
            traverse(currentNode.rightChild); 
            return currentNode;
        }
    }
    postOrder(callback) {
        if (callback instanceof(Function) === false)
            throw new Error("please provide a callback function");
        
        traverse(this.root);
        function traverse(currentNode) {
            if (currentNode === null) return currentNode;
            traverse(currentNode.leftChild); 
            traverse(currentNode.rightChild); 
            callback(currentNode);
            return currentNode;
        }
    }
    height(node) {
        const heights = {
            left: 0,
            right: 0
        }
        let height = 0;

        traverse(node.leftChild);
        heights.left = height
        height = 0;
        traverse(node.rightChild);
        heights.right = height

        return (heights.left > heights.right) ? heights.left : heights.right;
        
        function traverse(node) {
            let queue = [node];
            while (queue.length !== 0) {
                const node = queue.shift();
                if (node === null) break;

                if (node.leftChild !== null) queue.push(node.leftChild);
                else if (node.rightChild !== null) queue.push(node.rightChild);

                height++;
            }
        }
    }
    depth(node) {
        let height = 0;
        let currentNode = this.root;
        
        while (currentNode.data !== node.data) {
            if (currentNode.data > node.data) currentNode = currentNode.leftChild;
            else if (currentNode.data < node.data) currentNode = currentNode.rightChild;
            else throw new Error("this value does not exists.");
            height++;
        }
        return height;
    }
    #clean(data = []) {
        const cleanData = [];
        
        for (let i1 = 0; i1 < data.length; i1++) {
            if (cleanData.length === 0) cleanData.push(data[0]);
            else {
                let duplicate = false;
                for (let i2 = 0; i2 < cleanData.length; i2++) {
                    if (data[i1] === cleanData[i2]) {
                        duplicate = true;
                        break;
                    }
                } 
                if (duplicate === false) cleanData.push(data[i1]);
            }
        }
        
        return cleanData;
    }
    #sort(data = []) {
        if (data.length === 1) return data;
        
        const middle = Math.floor(data.length / 2);
        let left = [], right = [];
        
        for (let i = 0; i < middle; i++) {
            left.push(data[i]);
        }
        for (let i = middle; i < data.length; i++) {
            right.push(data[i]);
        }
        
        left = this.#sort(left);
        right = this.#sort(right);
        
        const sortedData = [];
        for (let i = 0; i < data.length; i++) {
            if (left[0] === undefined) {
                right.forEach((value) => {
                    sortedData.push(value)
                })
                break;
            } else if (right[0] === undefined) {
                left.forEach((value) => {
                    sortedData.push(value)
                })
                break;
            } else {
                if (left[0] < right[0]) sortedData.push(left.shift());
                else sortedData.push(right.shift());
            }
        }
        return sortedData;
    }
    #build(data = []) {
        if (data[0] === undefined) return null;
        if (Math.floor(data.length / 2) < 1) return new Node(data[0]);
    
        const middle = Math.floor(data.length / 2);
        let left = [], right = [];
    
        for (let i = 0; i < middle; i++) {
            left.push(data[i]);
        }
        for (let i = middle + 1; i < data.length; i++) {
            right.push(data[i]);
        }
    
        const treeNode = new Node(data[middle]);
        treeNode.leftChild = this.#build(left);
        treeNode.rightChild = this.#build(right);
        return treeNode;
    }
}