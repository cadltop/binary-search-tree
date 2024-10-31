export default class {
    constructor(data) {
        this.root = this.buildTree(data);
    }    
    buildTree(data) {
        const cleanData = this.#clean(data);
        const sortedData = this.#sort(cleanData);
    }

    #clean(data) {
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
    #sort(data) {

    }
}