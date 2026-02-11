class dynamicArray{
    #arr;
    #size;
    #capacity;
    #growth = 2;

    constructor(cap, fill = 0,){
        if(cap < 0 || !(Number.isInteger(cap))){
            throw new Error('capacity range must be at least 1');
        }
        if(!(Number.isInteger(fill))){
            throw new Error("you have to fill an array only by integers");
        }
        
        this.#arr = new Int32Array(cap).fill(fill);;
        this.fill = fill;
        this.#capacity = cap;
        this.#size = cap;
    }

    ///* ================= Capacity ================= *///

    size(){
        return this.#size;
    }

    capacity(){
        return this.#capacity;
    }

    empty(){
        return this.#size === 0;
    }

    reserve(n){
        if(n <= this.#capacity){
            return;
        }
        if (!Number.isInteger(n) || n < 0) {
            throw new Error("n must be a non-negative integer");
        }
        if(n > this.#capacity){
            this.#capacity = n;
            const newArr = new Int32Array(n);
            
            for(let i = 0; i < this.#size; ++i){
                newArr[i] = this.#arr[i];
            }
            this.#arr = newArr;
        }
    }
    shrinkToFIt(){
        this.#capacity = this.#size;

        const newArr = new Int32Array(this.#capacity);

        for(let i = 0; i < this.#size; ++i){
            newArr[i] = this.#arr[i];
        }
        this.#arr = newArr;
    }

    clear(){
        this.#size = 0;
    }

    /* ================= Element Access ================= */


    at(i){
        if(i < 0 || i >= this.#size){
            throw new Error("i(index) must be from the range of array size");
        }
        return this.#arr[i];
    }

    set(i, value){
        if(i < 0 || i > this.#size){
            throw new Error('capacity range must be at least 1');
        }
        if(!(Number.isInteger(i))){
            throw new Error("index must be an integer only");
        }
        if(!(Number.isInteger(value))){
            throw new Error("value must be an integer only");
        }
        this.#arr[i] = value;
    }

    front(){
        return this.#arr[0];
    }
    
    back(){
        return this.#arr[this.#size - 1];
    }

    toArray(){
        const newArr = new Int32Array(this.#size);

        for(let i = 0; i < this.#size; ++i){
            newArr[i] = this.#arr[i]; 
        }
        return [...newArr];
    }

    /* ================= Modifiers ================= */

    #resize(n){
        if(!(Number.isInteger(n))){
            throw new Error("value must be an integer only");
        }
        let newCap = this.#capacity === 0 ? 1 :this.#capacity *  this.#growth;
            
            const newArr = new Int32Array(newCap).fill(0);
            if(n < this.#size){
                this.#size = n;
            }
            for(let i = 0; i < this.#size; ++i){
                newArr[i] = this.#arr[i];
            }
            this.#arr = newArr;
            this.#capacity = newCap;
    }

    pushBack(value){
        if(!(Number.isInteger(value))){
            throw new Error("value must be an integer only");
        }
        if(this.#size === this.#capacity){
            this.#resize(this.#capacity);
        }
        this.#arr[this.#size++] = value;
            
    }
    popBack(){
        if(this.empty()){
            throw new Error("array is empty");
        }
        return this.#arr[--this.#size];
    }

    insert(pos, value){
        if (pos < 0 || pos > this.#size) throw new Error('out of range');
        if (!Number.isInteger(pos)) throw new Error('i must be an integer');
        if (!Number.isInteger(value)) throw new Error('value must be an integer');

        if(this.#size === this.#capacity){

            this.#resize(this.#capacity);
        }

        for(let i = this.#size; i > pos;--i){
            this.#arr[i] = this.#arr[i - 1];
        }
        this.#arr[pos] = value;
        this.#size++;
    }


    erase(pos){
        if (pos < 0 || pos > this.#size) throw new Error('out of range');
        if (!Number.isInteger(pos)) throw new Error('i must be an integer');


        for(let i = pos; i < this.#size - 1;++i){
            this.#arr[i] = this.#arr[i + 1];
        }
        this.#size--;
    }

    swap(i , j){
        if (i < 0 || i >= this.#size) throw new Error('i out of range');
        if (j < 0 || j >= this.#size) throw new Error('j out of range');
    
        [this.#arr[i], this.#arr[j]] = [this.#arr[j], this.#arr[i]];
    }

    /* ================= Iteration ================= */

    [Symbol.iterator](){
        let i = 0;

        return {
            next: () => {
                if(i >= this.#size){
                    return{
                        value: undefined,
                        done: true,
                    }
                }
                return{
                    value: this.#arr[i++],
                    done: false,
                }
            }
        }
    }

    *entries() {
        for (let i = 0; i < this.#size; ++i) {
            yield [i, this.#arr[i]];
        }
    }

    *values(){
        for (let i = 0; i < this.#size; ++i) {
            yield this.#arr[i];
        }
    }

    *keys() {
        for (let i = 0; i < this.#size; i++) {
            yield i;
        }
    }

    /* ================= Extensions ================= */

    reverse() {
        let i = 0;
        let j = this.#size - 1;

        while (i < j) {
            this.swap(i, j);
            ++i;
            --j;
        }
    }
        
    clone(){
        const copy = new dynamicArray(this.#capacity);
        copy.#size = this.#size;

        for (let i = 0; i < this.#size; i++) {
            copy.#arr[i] = this.#arr[i];
        }
        return copy;
    }   

    equals(other) {
        if(this.#size != other.length){
            return false;
        }
        for(let i = 0; i < this.#size; ++i) {
            if(this.#arr[i] != other[i]){
                return false;
            }
        }
        return true;
    }

    sort(compareFn) {
        compareFn = typeof compareFn === 'function' ? compareFn : (a, b) => a - b;

        const arr = this.#arr;

        function partition(low, high) {
            let pivot = arr[low];
            let i = low + 1;
            let j = high;

        while (i <= j) {
            while (compareFn(arr[i], pivot) <= 0) {
            ++i;
            }
            while (compareFn(arr[j], pivot) > 0) {
            --j;
            }

            if (i < j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            ++i;
            --j;
            }
        }
            [arr[low], arr[j]] = [arr[j], arr[low]];
            return j;
        }

        function q(low, high) {
            if (low < high) {
                const pi = partition(low, high);
                q(low, pi - 1);
                q(pi + 1, high);
            }
        }

        q(0, this.#size - 1);
    }

    /* ================= High Order ================= */

    forEach(fn) {
        if (typeof fn !== 'function') {
           throw new Error('callback must be a function');
        }
        for (let i = 0; i < this.#size; i++)
        {
            fn(this.#arr[i]);
        }
        return;
    }

    map(fn) {
        if (typeof fn !== 'function') {
           throw new Error('callback must be a function');
        }
        const result = new dynamicArray(this.#size);

        for(let i = 0; i < this.#size; ++i) {
            result.pushBack(fn(this.#arr[i]));
        }
        return result;
    }

    filter(fn) {
        if (typeof fn !== 'function') {
           throw new Error('callback must be a function');
        }
        const result = new dynamicArray(this.#size);

        for (let i = 0; i < this.#size; i++) {
            if (fn(this.#arr[i])) {
                result.pushBack(this.#arr[i]);
            }
        }
        return result;
    }

    some(fn) {
        if (typeof fn !== 'function') {
           throw new Error('callback must be a function');
        }
        for (let i = 0; i < this.#size; i++) {
            if (fn(this.#arr[i], i, this)) {
                return true;
            }
        }
        return false;
    }

    every(fn){
        if (typeof fn !== 'function') {
           throw new Error('callback must be a function');
        }
        for(let i = 0; i < this.#size; i++){
            if(!fn(this.#arr[i], i , this)){
                return false;
            }
        }
        return true;
    }

    find(fn){
        if (typeof fn !== 'function') {
           throw new Error('callback must be a function');
        }
        for(let i = 0; i < this.#size; i++){
            if(fn(this.#arr[i])){
                return this.#arr[i];
            }
        }
    }

    findIndex(fn){
        if (typeof fn !== 'function') {
           throw new Error('callback must be a function');
        }
        for (let i = 0; i < this.#size; i++) {

            if (fn(this.#arr[i])) {
                return i;
            }
        }
        return -1;
    }

    includes(value){
        if(!(Number.isInteger(value))){
            throw new Error("value must be an integer only");
        }
        for(let i = 0; i < this.#size; ++i){
            if(this.#arr[i] === value){
                return true;
            };
        }
        return false;
    }

    reduce(fn, initialValue) {
        if (typeof fn !== 'function') {
            throw new Error('callback must be a function');
        }

        if (this.#size === 0 && arguments.length < 2) {
            throw new Error('reduce of empty dynamicArray with no initial value');
        }

        let acc;
        let startIndex;

        if (arguments.length >= 2) {
            acc = initialValue;
            startIndex = 0;
        } else {
            acc = this.#arr[0];
            startIndex = 1;
        }

        for (let i = startIndex; i < this.#size; i++) {
            acc = fn(acc, this.#arr[i], i, this);
        }

        return acc;
    }
}
        
// const dn = new dynamicArray(4 , 0);
// dn.pushBack(1);
// dn.pushBack(4);
// dn.pushBack(2);
// dn.insert(7, 10);
// dn.erase(5);
// dn.swap(5, 6);
// let gen = dn.values();
// console.log(gen.next());
// console.log(gen.next());
// console.log(dn.equals([0,0,0,0,1,4,2,10]));
// dn.sort();
// console.log(dn.toArray());




