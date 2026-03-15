class Node {
    constructor(key, value){
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class HashTable {
    #table;
    #cap;
    #size;
    #loadFac;

    constructor(cap = 17, loadFac = 1.0) {
        if(cap < 0 || typeof cap != "number"){
            throw new Error("cap must be a number and positive");
        }
        if(loadFac < 0 || typeof loadFac != "number"){
            throw new Error("Load factor must be a number and positive");
        }
        this.#table = new Array(cap).fill(null);
        this.#cap = cap;
        this.#size = 0;
        this.#loadFac = loadFac;
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
    }

    capacity() {
        return this.#cap;
    }

    isEmpty() {
        return this.#size == 0;
    }

    clear() {
        this.#table = new Array(this.#cap).fill(null);
        this.#size = 0;
    }

    /* ================= Hashing ================= */

    #hash(key) {
        let total = 0;
        if(typeof key == "string"){
            for(let ch of key) {
                total = (total * this.#cap + ch.charCodeAt(0))
            }
        }
        else if (typeof key == "number") {
            total = key % this.#cap;
        }
        return Math.floor(total % this.#cap); 
    }

    /* ================= Core Operations ================= */

    put(key, value) {
        let idx = this.#hash(key);
        let node = this.#table[idx];

        while(node) {
            if(node.key === key) {
                node.value = value;
                return;
            }
            node = node.next;
        }
        const newNode = new Node(key, value);
        newNode.next = this.#table[idx];
        this.#table[idx] = newNode;
        this.#size++;

        if(this.#loadFactor() > this.#loadFac) {
            this.#resize(this.#cap * 2);
        }
    }

    get(key) {
        let idx = this.#hash(key);
        let node = this.#table[idx];

        while(node) {
            if(node.key == key) {
                return node.val;
            } 
            node = node.next;
        }
        return undefined;
    }

    remove(key) {
        let idx = this.#hash(key);
        let node = this.#table[idx];
        let prev = null;
        let val = null;

        while(node) {
            if(key === node.key) {
                val = node.val;
                if(prev) {
                    prev.next = node.next;
                    node.next = null;
                    this.#size--;
                    return val;
                }
                this.#table[idx] = node.next;
                val = this.#table[idx].value;
                node.next = null;
                this.#size--;
                return val;
            }
            prev = node;
            node = node.next;
        }
    }
    
    containsKey(key) {
        let idx = this.#hash(key);
        let node = this.#table[idx];
            while(node){
                if(node.key == key) {
                    return true;
                }
                node = node.next;
            }
    }

    containsValue(value) {
        for(let i = 0; i < this.#cap; ++i) {
            let node = null;
            if(this.#table[i]) {
                node = this.#table[i];
            }else{
                continue;
            }
            while(node){
                if(node.value == value) {
                    return true;
                }
                node = node.next;
            }
        }
        return false;
    }


    /* ================= Resize / Rehash ================= */
    #resize(newCapacity) {
        const old = this.#table;
        const newCap = this.#nextPrime(newCapacity);
        const bucket = new Array(newCap).fill(null);
        this.#table = bucket;
        this.#cap = newCap;

        for(let head of old) {
            let node = head;
            while(node) {
                this.put(node.key, node.value);
                node = node.next;
            }
        }
    }

    #isPrime(dig) {
        if(dig < 2) return false;
        if(dig == 2) return true;
        for(let i = 3; i < dig; ++i) {
            if(dig % i == 0) return false;
        }
        return true;
    }

    #nextPrime(dig){
        while(!this.#isPrime(dig)){
            dig++;
        }
        return dig;
    }

    #loadFactor() {
        return this.#size / this.#cap;
    }

    /* ================= Entry Views ================= */

    keys() {
        const res = [];
        for(let i = 0; i < this.#cap; ++i) {
            let node = null;
            if(this.#table[i]){
                node = this.#table[i];
            }else{
                continue;
            }
            while(node){
                res.push(node.key);
                node = node.next;
            }
        }
        return res;
    }

    values() {
        const res = [];
        for(let i = 0; i < this.#cap; ++i) {
            let node = null;
            if(this.#table[i]){
                node = this.#table[i];
            }else{
                continue;
            }
            while(node){
                res.push(node.value);
                node = node.next;
            }
        }
        return res;
    }

    entries() {
        const res = [];
        for(let i = 0; i < this.#cap; ++i) {
            let node = null;
            if(this.#table[i]){
                node = this.#table[i];
            }else{
                continue;
            }
            while(node){
                res.push([node.key, node.value]);
                node = node.next;
            }
        }
        return res;
    }

    [Symbol.iterator]() {
        const res = this.entries();
        let i = 0;
        return {
            next: () => {
                if(res[i]){
                    return {
                        value:res[i++],
                        done: false,
                    }
                }
                return{
                    value: undefined,
                    done: true,
                }
            }
        }
    }

    toObject() {
        let map = new Map();
        let res = this.entries();
        for(let i = 0; i < res.length; ++i) {
            map.set(res[i][0], res[i][1]);
        }
        return map;
    }

    clone() {
        const clone = new HashTable();
        const node = null;
        for(let item of this.#table) {
            node = item;
            while(node) {
                clone.put(node.key, node.value);
                node = node.next;
            }
        }
    }

    equals(otherTable) {
        if((otherTable.size() != this.size()) || otherTable.capacity() != this.capacity()) {
            return false;
        }
        else if (!(otherTable instanceof HashTable)) {
            return false;
        }
        const table = this.entries();
        const other = otherTable.entries();

        for(let i = 0; i < this.#size; ++i){
            if((table[i][0] != other[i][0]) || (table[i][1] != other[i][1])) {
                return false;
            }
        }
        return true;
    }

    /* ================= Debug / Visualization ================= */

    bucketSizes() {
        const res = [];
        let count = 0;
        for(let i = 0; i < this.#cap;++i){
            count = 0;
            let node = null;
            if(this.#table[i]){
                node = this.#table[i];
            }
            else{
                res.push([0]);
                continue;
            }
            while(node) {
                count++;
                node = node.next;
            }
            res.push([count]);
        }
        return res;
    }

    print() {
        for (let i = 0; i < this.#cap; i++) {
        let node = this.#table[i];
        let output = `Bucket ${i}: `;

        while (node) {
            output += `(${node.key}: ${node.value}) -> `;
            node = node.next;
        }

        console.log(output + 'null');
        }
    }
}


const hash = new HashTable();

hash.put('aper', 22);
hash.put('aperik', 23);
hash.put('apero', 24);

const another = new HashTable();


// another.put('aper', 22);
// another.put('aperik', 23);
// another.put('apero', 24);

// console.log(hash.toObject());
// console.log(another.toObject());
console.log(hash.print());

// let next = hash[Symbol.iterator]();
// console.log(next.next());
// console.log(next.next());
// console.log(next.next());
// console.log(next.next());
