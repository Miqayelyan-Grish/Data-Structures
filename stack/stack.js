class Stack {
    #stack;
    #size;
    #cap;

    constructor(capacity = 5){
        if(typeof capacity != "number" && capacity <= 0){
            throw new Error("cap must be a positive number");
        }
        this.#stack = new Array(capacity);
        this.#size = 0;
        this.#cap = capacity;
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
        this.#stack = new Array(this.#cap);
        this.#size = 0;
    }

    /* ================= Core Stack Operations ================= */

    push(value){
        if(this.is_full()){
            throw new Error("Stack is full ,overflow!!!");
        }
        this.#stack[this.#size++] = value;
    }

    pop() {
        if(this.is_empty()){
            throw new Error("Stack is empty, underflow!!!");
        }
        let value = this.#stack.pop();
        this.#size--;
        return value;
    }

    peek(){
        if(this.is_empty()){
            throw new Error("Stack is empty, underflow!!!");
        }
        return this.#stack[this.#stack.length - 1];
    }
}

