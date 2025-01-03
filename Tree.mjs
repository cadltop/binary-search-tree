import Node from './Node.mjs';
export default class {
    constructor(data) {
        this.root = this.buildTree(data);
    }    
    buildTree(data) {
        data = this.#clean(data);
        data = this.#sort(data);
        return this.#build(data);
    }
    insert(value) {
        traverse(this.root, value);
        function traverse(currentNode, val) {
            if (currentNode === null) {
                return new Node(val);
            }
            if (currentNode.data === val) {
                console.log("this value exists already.");
                return currentNode;
            }

            if (val < currentNode.data) currentNode.leftChild = traverse(currentNode.leftChild, val);
            if (val > currentNode.data) currentNode.rightChild = traverse(currentNode.rightChild, val);
            
            return currentNode;
        }
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