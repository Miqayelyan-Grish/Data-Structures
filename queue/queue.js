class Queue {
    #queue;
    #front;
    #back;
    #size;
    #cap;

    constructor(capacity = 5){
        if(typeof capacity != "number" && capacity <= 0){
            throw new Error("cap must be a positive number");
        }
        this.#queue = new Array(capacity);
        this.#cap = capacity;
        this.#size = 0;
        this.#back = -1;
        this.#front = 0; 
    }

    /* ================= Basic State ================= */

    size(){
        return this.#size;
    }

    capacity(){
        return this.#cap;
    }

    is_empty(){
        return this.#size === 0;
    }

    is_full(){
        return this.#size === this.#cap;
    }

    clear(){
        this.#size = 0;
        this.#queue = new Array(this.#cap);
        this.#front = 0;
        this.#back = -1;
    }

    /* ================= Core Queue Operations ================= */

    enqueue(value){
        if(this.is_full()){
            throw new Error("Queue is full, overflow!!!");
        }
        this.#back = (this.#back + 1) % this.#cap;
        this.#queue[this.#back] = value;
        this.#size++;
    }

    dequeue(){
        if(this.is_empty()){
            throw new Error("Queue is empty, underflow!!!");
        }
        let value = this.#queue[this.#front];
        this.#front = (this.#front + 1) % this.#cap;
        this.#size--;
        return value;
    }

    peek(){
        if(this.is_empty()){
            throw new Error("Queue is empty, underflow!!!");
        }
        return this.#queue[this.#front];
    }

    back(){
        if(this.is_empty()){
            throw new Error("Queue is empty, underflow!!!");
        }
        return this.#queue[this.#back];
    }

    print(){
        for(let i = 0; i < this.#size; ++i){
            let index = [this.#front = (this.#front + i) % this.#cap];
            console.log(this.#queue[index]);
        }
    }

}