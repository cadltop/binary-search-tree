export default class {
    constructor(data) {
        this.root = this.buildTree(data);
    }    
    buildTree(data) {
        const cleanData = this.#clean(data);
        const sortedData = this.#sort(cleanData);
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
        let left = [], rigth = [];

        for (let i = 0; i < middle; i++) {
            left.push(data[i]);
        }
        for (let i = middle; i < data.length; i++) {
            rigth.push(data[i]);
        }

        left = this.#sort(left);
        rigth = this.#sort(rigth);
        
        let merged = [];
        for (let i = 0; i < data.length; i++) {
            if (left[0] === undefined) {
                rigth.forEach((value) => {
                    merged.push(value)
                })
                break;
            } else if (rigth[0] === undefined) {
                left.forEach((value) => {
                    merged.push(value)
                })
                break;
            } else {
                if (left[0] < rigth[0]) merged.push(left.shift());
                else merged.push(rigth.shift());
            }
        }
        return merged;
    }
}