class PriorityQueue {
    #heap;
    #cmp;
    #size;
    #type;

    constructor(cmp = (a,b) => a - b) {
        if(typeof cmp != "function") {
            throw new Error("cmp must be a function.");
        }
        this.#heap = [];
        this.#cmp = cmp;
        if(this.#cmp(1, 2) <= 0) {
            this.#type = "min";
        }
        else{
            this.#type = "max";
        }
        this.#size = 0;
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
    }

    is_empty() {
        return this.#size == 0;
    }

    clear() {
        this.#heap = [];
        this.#size = 0;
    }

    comparator() {
        return this.#cmp;
    }

    /* ================= Access Operations ================= */

    peek() {
        if(this.is_empty()) {
            return undefined;
        }
        return this.#heap[0];
    }

    /* ================= Modification Operations ================= */

    add(value) {
        this.#heap.push(value);

        ++this.#size;
        if(this.#type == "min") {
            this.#shiftUpForMin(this.#size - 1);
        }
        else {
            this.#shiftUpForMax(this.#size - 1);
        }
    }

    pop() {
        if(this.is_empty()) return;
        this.#swap(0, this.#size - 1);
        let val =this.#heap.pop();
        if(this.#type == "min") {
            this.#shiftDownForMin(0);
        }
        if(this.#type == "max") {
            this.#shiftDownForMax(0);
        }
        this.#size--;

        return val;
    }

    remove(value) {
        const idx = this.#indexOf(value);
        if(idx >= 0) {
            this.#swap(idx, this.#size - 1);
            this.pop();
        }
    }

    /* ================= Heap Utilities ================= */

    toArray() {
        return [...this.#heap];
    }

    /* ================= Index Helpers ================= */

    #getParent(index) {
        return Math.floor((index - 1) / 2);
    }

    #getLeftChild(index) {
        return 2 * index + 1;
    }

    #getRightChild(index) {
        return 2 * index + 2;
    }

    #swap(i, j){
        [this.#heap[i], this.#heap[j]] = [this.#heap[j], this.#heap[i]]; 
    }

    /* ================= Heap Maintenance ================= */

    #shiftUpForMin(index) {
        if(index === 0) return;
        let parent = this.#getParent(index);   
        if(this.#heap[parent] > this.#heap[index]) {   
            this.#swap(parent, index);
            this.#shiftUpForMin(parent);        
        }
    }

    #shiftUpForMax(index) {
        if(index === 0) return;

        let parent = this.#getParent(index);   
        if(this.#heap[parent] < this.#heap[index]) {   
            this.#swap(parent, index);
            this.#shiftUpForMax(parent);        
        }
    }

    #shiftDownForMin(index) {
        const leftChild = this.#getLeftChild(index);
        const rightChild = this.#getRightChild(index);
        let min = index;
        if(this.#heap[leftChild] < this.#heap[min]) {
            min = leftChild;
        }
        if(this.#heap[rightChild] < this.#heap[min]) {
            min = rightChild;
        }
        if(min != index) {
            this.#swap(min, index);
            this.#shiftDownForMin(min);
        }
    }

    #shiftDownForMax(index) {
        const leftChild = this.#getLeftChild(index);
        const rightChild = this.#getRightChild(index);
        let max = index;
        if(this.#heap[leftChild] > this.#heap[max]) {
            max = leftChild;
        }
        if(this.#heap[rightChild] > this.#heap[max]) {
            max = rightChild;
        }
        if(max != index) {
            this.#swap(max, index);
            this.#shiftDownForMax(max);
        }
    }

    /* ================= Search Utility ================= */ 

    #indexOf(value) {
        for(let i = 0; i < this.#size; i++) {
            if(this.#heap[i] == value) {
                return i;
            }
        }
        return -1;
    }

    /* ================= Advanced Heap Operations ================= */

    heapify(array) {
        this.#heap = [...array];
        this.#size = array.length;
        
        const lastParent = Math.floor((this.#size - 2) / 2);
        
        for (let i = lastParent; i >= 0; i--) {
            if (this.#type === "min") {
                this.#shiftDownForMin(i);
            } else {
                this.#shiftDownForMax(i);
            }
        }
    }

    replace(value) {
        if (this.is_empty()) {
            this.add(value);
            return undefined;
        }
        const val = this.#heap[0];
        this.#heap[0] = value;

        if (this.#type === "min") {
                this.#shiftDownForMin(0);
        }else {
            this.#shiftDownForMax(0);
        }
        return val;
    }

    contains(value) {
        return this.#indexOf(value) >= 0;
    }

    /* ================= Iteration ================= */

    [Symbol.iterator](){
        let i = 0;
        return {
            next:() => {
                if(i < this.#size) {
                    return {
                        value: this.#heap[i++],
                        done: false
                    }
                }
                return{
                    value: undefined,
                    done: true
                }
            }
        }
    }

    *values() {
        for (let i = 0; i < this.#size; i++) {
            yield this.#heap[i];
        }
    }

    *entries() {
        for(let i = 0; i < this.#size; i++) {
            yield [i, this.#heap[i]];
        }
    }
}

const heap = new PriorityQueue();

heap.add(10);
heap.add(14);
heap.add(3);
heap.add(5);
heap.add(1);
heap.add(0);


console.log(heap.toArray());
console.log(heap.pop());
console.log(heap.pop());
console.log(heap.pop());
console.log(heap.pop());
console.log(heap.pop());
console.log(heap.pop());


