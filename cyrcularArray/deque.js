class Deque {
    #arr;
    #front;
    #size;
    #capacity;

    constructor(capacity = 8) {
        if(capacity < 2){
            throw new Error("cap must be at least 2");
        }
        this.#arr = new Array(capacity).fill(undefined);
        this.#front = 0;
        this.#size = 0; 
        this.#capacity = capacity;
    }

    size(){
        return this.#size;
    }

    capacity(){
        return this.#capacity;
    }

    empty(){
        return this.#size === 0;
    }
    
    full(){
        return this.#size === this.#capacity;
    }

/* ================= Internal Helpers ================= */

    #mod(i){
        return i % this.#capacity;
    }

    #index(i){
        return this.#mod(this.#front + i)
    }

    #ensureCapacityForOneMore(){
        if(this.#size < this.#capacity){
            return;
        }

        if(this.#size === this.#capacity){
            const newCapacity = this.#capacity * 2; 
            let newBuffer = new Array(newCapacity);
            for(let i = 0; i < this.#size; ++i){
                newBuffer[i] = this.#arr[this.#index(i)];
            }
            this.#arr = newBuffer;
            this.#front = 0;
            this.#capacity = newCapacity; 
        } 
    }

/* ================= Element Access ================= */

    front(){
        if(this.empty()){
            throw new Error("Array is empty");
        }
        return this.#arr[this.#front];
    }

    back(){
        if(this.empty()){
            throw new Error("Array is empty");
        }
        let index = (this.#front - 1 + this.#size) % this.#capacity;
        return this.#arr[index];
    }

    at(i){
        if(typeof i !== "number"){
            throw new Error("Index must be a number");
        }
        if(i < 0 || i >= this.#size){
            throw new RangeError("Index out of bounds");
        }
        return this.#arr[this.#index(i)];

    }

/* ================= Modifiers ================= */

    push_back(val){
        this.#ensureCapacityForOneMore();
        let index = this.#index(this.#size);
        this.#arr[index] = val;
        this.#size++; 
    }


    push_front(val){
        this.#ensureCapacityForOneMore();
        this.#front = (this.#front - 1 + this.#capacity) % this.#capacity;
        this.#arr[this.#front] = val;
        this.#size++; 
    }

    pop_front(){
        if(this.empty()){
            throw new Error("Array is empty");
        }
        let val = this.front();
        if(this.#front + 1 === this.#capacity){
            this.#front = 0;
        }
        else{
            this.#front++;
        }
        this.#size--;
        return val;
    }
    
    pop_back(){
        if(this.empty()){
            throw new Error("Array is empty");
        }
        let val = this.back();
        this.#size--;
        
        return val;
    }

    clear(){
        this.#size = 0;
        this.#front = 0;
    }

    /* ================= Extended Professional Methods ================= */


    reserve(newCapacity){
        if(newCapacity > this.#capacity){
            let newBuffer = new Array(newCapacity);
            for(let i = 0; i < this.#size; ++i){
                newBuffer[i] = this.at(i);
            }
            this.#arr = newBuffer;
            this.#front = 0;
        }
    }

    shrinkToFIt(){
        this.#capacity = this.#size;
        newCapacity = this.#size;
        let newBuffer = new Array(newCapacity);
        for(let i = 0; i < this.#size; ++i){
                newBuffer[i] = this.at(i);
        }
        this.#arr = newBuffer;
        this.#capacity = newCapacity;
        this.#front = 0;
    }

    rotateLeft(k = 1){
        if(this.empty()){
            return;
        }
        k %= this.#size;
        
        this.#front = (this.#front + k) % this.#capacity; 
    }

    rotateRight(k = 1){
        if(this.empty()){
            return;
        }
        k %= this.#size;
        
        this.#front = (this.#front - k + this.#capacity) % this.#capacity; 
    }

    swap(i, j){
        if(typeof i !== "number" || typeof j !== "number"){
            throw new Error("type of indexes must be a number");
        }
        let newi = this.#index(i);
        let newj = this.#index(j);

        [this.#arr[newi], this.#arr[newj]] = [this.#arr[newj], this.#arr[newi]];
    }

    /* ================= Search & Utilities ================= */

    find(value){
        for(let i = 0; i < this.#size; ++i){
            if(this.at(i) === value){
                return i;
            }
        }
        return -1;
    }

    includes(value){
        for(let i = 0; i < this.#size; ++i){
            if(this.at(i) === value){
                return true;
            }
        }
        return false;
    }

    toArray(){
        let newBuffer = new Array(this.#size);
            for(let i = 0; i < this.#size; ++i){
                newBuffer[i] = this.at(i);
        }
        return newBuffer;
    }

    static #deepCopyValue(value) {
        if (value === null || typeof value !== 'object') return value;
        if (Array.isArray(value)) return value.map((v) => Deque.#deepCopyValue(v));
        if (value instanceof Deque) return value.clone();

        const copy = {};
        for (const key in value) {
          if (value.hasOwnProperty(key)) {
            copy[key] = Deque.#deepCopyValue(value[key]);
          }
        }
        return copy;
  }

    clone(){
        const clone = new Deque(this.#capacity);
        clone.front = 0;
        clone.size = this.#size;
        
        for(let i = 0; i < this.#size; ++i){
            clone.push_back(Deque.#deepCopyValue(this.at(i)));
        }

        return clone;
    }

    equals(otherDeque){
        if(!(otherDeque instanceof Deque)){
            return false;
        } 
        if(otherDeque.size() !== this.#size){
            return false;
        }
        for(let i = 0; i < this.#size; ++i){
            if(this.at(i) !== otherDeque.at(i)){
                return false;
            };
        }
        return true;
    }

    /* ================= Iteration ================= */

    [Symbol.iterator](){
        let i = 0;
        return {
            next: () => {
                if(i < this.#size){
                    return {
                        value: this.at(i++),
                        done: false,
                    }
                }
                return {   
                    value: undefined,
                    done: true,
                }
            }
        }
    }

    *values(){
        for(let i = 0; i < this.#size; ++i){
            yield this.at(i);
        }
    }

    *keys(){
        for(let i = 0; i < this.#size; ++i){
            yield i;
        }
    }

    *entries(){
        for(let i = 0; i < this.#size; ++i){
            yield [i ,this.at(i)];
        }
    }

    /* ================= Functional Style ================= */

    forEach(fn){
        for(let i = 0; i < this.#size; ++i){
            fn(this.#arr[this.#index(i)], i, this.#arr);
        }
    }

    map(fn){
        const newDeq = new Deque(this.#capacity);

        for(let i = 0; i < this.#size; ++i){
            const val = this.at(i);
            if(fn(val, i)){
                newDeq.push_back(val);
            }
        }
        return newDeq;
    }

    filter(fn){
        const newDeq = new Deque(this.#capacity);

        for(let i = 0; i < this.#size; ++i){
            const val = this.at(i);
            if(fn(val, i)){
                newDeq.push_back(val);
            }
        }
        return newDeq;
    }

    reduce(fn, initialValue) {
        if (this.#size === 0 && initialValue === undefined) {
            throw new Error("Reduce of empty deque with no initial value");
        }
        let acc;
        let startIndex = 0;

        if (initialValue !== undefined) {
            acc = initialValue;
        } else {
            const firstIndex = this.#front;
            acc = this.#arr[firstIndex];
            startIndex = 1;
        }

        for (let i = startIndex; i < this.#size; i++) {
            const value = this.at(i)

            acc = fn(acc, value, i);
        }
        return acc;
    }
}


// let dq = new Deque();

// dq.push_back(1)
// dq.push_back(2)
// dq.push_back(3)
// dq.push_front(10);
// // dq.pop_back();
// dq.swap(2,3);
// console.log(dq.front());
// const dq = new Deque(2);

// dq.push_back(1);
// dq.push_back(2);
// dq.push_back(3);  

// console.log(dq.capacity()); 

// console.log(dq.toArray()); 

// dq.push_back(1);
// dq.push_back(2);
// dq.push_back(3);
// dq.push_back(4);

// dq.pop_front();
// dq.pop_front();

// dq.push_back(5);
// dq.push_back(6);

// console.log(dq.toArray());
// // Expected: [3, 4, 5, 6]

// const dq = new Deque();

// dq.push_back(1);
// dq.push_back(2);
// dq.push_back(3);
// dq.push_back(4);

// dq.rotateLeft(1);
// console.log(dq.toArray());
// // Expected: [2, 3, 4, 1]

// dq.rotateRight(2);
// console.log(dq.toArray());
// // Expected: [4, 1, 2, 3]

// const dq = new Deque();

// dq.push_back(1);
// dq.push_back(2);
// dq.push_back(3);
// dq.push_back(4);

// const mapped = dq.map(x => x * 2);
// console.log(mapped.toArray());
// // Expected: [2, 4, 6, 8]

// const filtered = dq.filter(x => x % 2 === 0);
// console.log(filtered.toArray());
// // Expected: [2, 4]

// const sum = dq.reduce((acc, val) => acc + val, 0);
// console.log(sum);
// // Expected: 10
const dq1 = new Deque();
dq1.push_back({a:1});
dq1.push_back({b:2});

const dq2 = dq1.clone();

console.log(dq1.equals(dq2)); // true ✅