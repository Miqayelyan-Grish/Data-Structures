class Node {
    #value;
    #next = null;

    constructor(val = 0){
        this.#value = val;
    }

    get value(){
        return this.#value;
    }

    set value(val){
        if(val === undefined){
            throw new Error("there must be any value.");
        }
        this.#value = val;
    }

    get next(){
        if(!this.#next){
            return null;
        }
        return this.#next;
    }

    set next(val){
        if(val !== null && !(val instanceof Node)){
            throw new Error("there must be any value.");
        }
        this.#next = val;
    }
}

class SinglyLinkedList {
    #head = null;
    #size = 0;

    constructor(iterable = null){
        if(iterable === null){
            return;
        }
        if(typeof iterable === "string"){
            throw new Error("iterable must not be a string");
        }
        if(typeof iterable[Symbol.iterator] === "function"){
            for(const item of iterable){
                this.push_back(item);
            }
        }
        else{
            this.push_front(iterable);
        }
    }

    /* ================= Size & State ================= */

    size(){
        return this.#size;
    }

    isEmpty(){
        return this.#size === 0;
    }

    clear(){
        this.#size = 0;
        this.#head = null;
    }

    /* ================= Front Access ================= */

    front(){
        return this.#size === 0 ? undefined : this.#head.value;
    }

    push_front(val){
        let newNode = new Node(val);
        const current = this.#head
        newNode.next = current;
        this.#head = newNode; 
        this.#size++
    }

    push_back(val){
        if(this.#size === 0){
            this.#head = new Node(val);
            this.#size++;
            return;
        }
        let current = this.#head;

        while(current.next != null){
            
            current = current.next;
        }
        let newNode = new Node(val);
        current.next = newNode;
        newNode.next = null;
        this.#size++;
    }

    pop_front(){
        if(this.#size === 0){
            return undefined;
        }
        let current = this.#head;
        this.#head = this.#head.next;
        this.#size--;
        return current.value;
    }

    pop_back(){
        if(this.#size === 0){
            return undefined;
        }
        
        if(this.#size === 1){
            let val = this.#head.value;
            this.#head = null;
            this.#size = 0;
            return val;
        }
        let prev = null;
        let current = this.#head;

        while(current.next != null){
            prev = current;
            current = current.next;
        }
        prev.next = null; 
        this.#size--;
        
        return current.value;
    }

    /* ================= Random-like Access ================= */

    at(index) {
        if(!Number.isInteger(index) || index < 0 || index >= this.#size){
            throw new Error("index must be an integer");
        }
        let current = this.#head;
        let i = 0;

        while(i < index){
            current = current.next;
            i++;
        }
        return current.value;
    }

    insert(index, val) {
        if(!Number.isInteger(index)){
            throw new Error("index must be an integer");
        }
        if(index === 0){
            return this.push_front(val);
        }
        if(index === this.#size){
            return this.push_back(val);
        }
        let current = this.#head;
        let i = 0;

        while(i < index - 1){
            current = current.next;
            i++;
        }
        const nextVal = current.next;
        const newNode = new Node(val);
        current.next = newNode;
        newNode.next = nextVal;
        this.#size++;
    }

    erase(index) {
         if(!Number.isInteger(index)){
            throw new Error("index must be an integer");
        }
        if(index === 0){
            return this.pop_front();
        }
        if(index === this.#size - 1){
            return this.pop_back();
        }   
        let current = this.#head;
        let i = 0;

        while(i < index - 1){
            current = current.next;
            i++;
        }
        current.next = current.next.next;
        this.#size--;
    }

    
    remove(value, equals){        
        let count = 0;
        let current = this.#head;
        let i = 0;

        if(equals === undefined){
            while(current.next != null){
                if(current.value === value){
                    this.erase(i++);
                    count++;
                }
                current = current.next;
            }
        }
        while(current.next != null){
            if(equals(current.value, value)){
                this.erase(i++);
                count++;
            }
            current = current.next;
            }
        return count;
    }

    /* ================= Algorithms ================= */

    reverse(){
        let prev = null;
        let current = this.#head;
        let next = null;

        while(current != null){

            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        this.#head = prev;
    }

    sort(){
        this.#head = this.#mergeSort(this.#head);
    }

    #mergeSort(head){
        if(!head || !head.next) return head;   

        let slow = head;
        let fast = head.next;

        while(fast && fast.next){
            slow = slow.next;
            fast = fast.next.next;
        }

        let mid = slow.next;
        slow.next = null;

        const left = this.#mergeSort(head);
        const right = this.#mergeSort(mid);

        return this.merge(left, right);
    }


    merge(l1,l2){
        let dummy = new Node();
        let current = dummy;

        while(l1 && l2) {
            if(l1.value <= l2.value){
                current.next = l1;
                l1 = l1.next;
            }
            else{
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }
    
        current.next = l1 || l2;

        return dummy.next;
    }  

    /* ================= Utilities ================= */

    toArray() {

        let current = this.#head;
        const arr = new Array(this.#size);
        let i = 0;

        while(current != null){
            arr[i++] = current.value;
            current = current.next;
        }
        return arr;
    }

    static fromArray(arr){
        let newList = new SinglyLinkedList(arr);

        return newList;
    }

    [Symbol.iterator](){
        let current = this.#head;

        return {    
            next() {
                if(current === null){
                    return {
                        value: undefined,
                        done: true,
                    }
                }
                let val = current.value;
                current = current.next;

                return {
                    value: val,
                    done: false,
                }
            }
        }
    } 
}

// function cmp (a,b) {
//     if(a <= b){
//         return a;
//     }
//     return b;
// } 



// let list = new SinglyLinkedList([1,2,3,4]);

// console.log(list.isEmpty()); // true
// console.log(list.size()); // 0
// console.log(list.toArray()); // []
// let list2 = new SinglyLinkedList();
// list2.push_front(1);
// list2.push_front(2);
// list2.push_front(3);

// console.log(list2.toArray()); // [3, 2, 1]
// console.log(list2.size()); // 3
// let list3 = new SinglyLinkedList();
// list3.push_front(1);
// list3.push_front(2);
// list3.push_front(3);

// let a = list3.pop_front();
// console.log(a); // 3
// console.log(list3.toArray()); // [2, 1]
// let list4 = new SinglyLinkedList();
// list4.push_front(1);
// list4.push_front(2);
// list4.push_front(3);

// let b = list4.pop_back();
// console.log(b); // 1
// console.log(list4.toArray()); // [3, 2]
// let list5 = new SinglyLinkedList();
// list5.push_front(10);
// list5.push_front(20);
// list5.push_front(30); // [30,20,10]

// console.log(list5.at(1)); // 20
// let list6 = new SinglyLinkedList();
// list6.push_front(1);
// list6.push_front(2);
// list6.push_front(3); // [3,2,1]

// list6.reverse();
// console.log(list6.toArray()); // [1,2,3]
// let list7 = new SinglyLinkedList();
// list7.push_front(1);
// list7.push_front(2);
// list7.push_front(3);

// console.log(list7.remove(2)); // 1
// console.log(list7.toArray()); // [3,1]


// 1️⃣ Empty list
let list1 = new SinglyLinkedList();
list1.sort();
console.log(list1.toArray()); // []

// 2️⃣ One element
let list2 = new SinglyLinkedList([5]);
list2.sort();
console.log(list2.toArray()); // [5]

// 3️⃣ Already sorted
let list3 = new SinglyLinkedList([1, 2, 3, 4]);
list3.sort();
console.log(list3.toArray()); // [1, 2, 3, 4]

// 4️⃣ Reverse sorted
let list4 = new SinglyLinkedList([4, 3, 2, 1]);
list4.sort();
console.log(list4.toArray()); // [1, 2, 3, 4]

// 5️⃣ Random order
let list5 = new SinglyLinkedList([4, 1, 3, 2]);
list5.sort();
console.log(list5.toArray()); // [1, 2, 3, 4]
