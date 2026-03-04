class TreeNode {

    constructor (value = null, left = null, right = null){
        this.value = value;
        this.left = left;
        this.right = right;
        this.height = 1;
    }
}


class AVL {
    #root;
    #size;

    constructor(){
        this.#root = null;
        this.#size = 0;
    }

    size(){
        return this.#size;
    }

    is_empty(){
        return this.#size == 0; 
    }

    clear() {
        this.#root = null;
        this.#size = 0;
    }

    /* ================= Core AVL Operations ================= */

    insert(value){
        this.#root = this.#insert(this.#root, value);
    }

    delete(value){
        this.#root = this.#delete(this.#root, value);
    }

    search(value){
        return this.#search(this.#root, value);
    }

    /* ================= Height / Min / Max ================= */

    getHeight(){
        return this.#getHeight(this.#root);
    }

    getMin() {
        return this.#getMin(this.#root);
    }

    getMax() {
        return this.#getMax(this.#root);
    }

    /* ================= Traversals ================= */

    levelOrder_rec() {
        const res = [];
        this.#levelOrder_rec(this.#root, res, 0);
        return res;
    }    

    levelOrder_itr() {

    }

    preorder_rec() {
        const res = [];
        this.#preorder_rec(this.#root, res);
        return res;
    }

    preorder_itr() {
        const res = [];
        const stack = [this.#root];
        
        while(stack.length) {
            let node = stack.pop();
            res.push(node.value);
            if(node.right) stack.push(node.right);
            if(node.left) stack.push(node.left);
        }
    }

    inorder_rec() {
        const res = [];
        this.#inorder_rec(this.#root, res);
        return res;
    }

    inorder_itr() {
        const res = [];
        const stack = [];
        let node = this.#root

        while(node || stack.length) {
            while(node) {
                stack.push(node);
                node = node.left;
            }
            node = stack.pop();
            res.push(node.value);
            node = node.right;
        }
        return res;
    }

    postorder_rec() {
        const res = [];
        this.#postorder_rec(this.#root, res);
        return res;
    }

    postorder_itr() {
        const res = [];
        const stack1 = [this.#root];
        const stack2 = [];

        while(stack1.length) {
            const node = stack1.pop();
            stack2.push(node);
            if(node.left) {
                stack1.push(node.left);
            }
            if(node.right) {
                stack1.push(node.right);
            }
        }
        while(stack2.length) {
            res.push(stack2.pop().value);
        }
        return res;
    }

    /* ================= AVL Balancing ================= */

    #insert(node, value) {
        
        if(!node){
            this.#size++;
            return new TreeNode(value);
        } 
        
        if(value < node.value){
            node.left = this.#insert(node.left, value);
        }
        else if(value > node.value){
            node.right = this.#insert(node.right, value);
        }
        else {
            return node;
        }
        
        return this.#reBalance(node, value);
    }

    #delete(node, value) {
        if(!node) return null;

        if(value < node.value) {
            node.left = this.#delete(node.left, value);
        }
        else if(value > node.value) {
            node.right = this.#delete(node.right, value);
        }
        else {
            this.#size--;
            if(!node.left || !node.right) {
                return node.left || node.right;
            }

            const root = this.#findSuccessor(value);
            node.value = root.value;
            node.right = this.#delete(node.right, root.value);
        }

        this.#update(node);

    const BF = this.#balanceFactor(node);

    if (BF > 1) {
        if (this.#balanceFactor(node.left) >= 0) {
            return this.#rotateRight(node);
        }
        else {
            node.left = this.#rotateLeft(node.left);
            return this.#rotateRight(node);
        }
    }

    if (BF < -1) {
        if (this.#balanceFactor(node.right) <= 0) {
            return this.#rotateLeft(node);
        }
        else {
            node.right = this.#rotateRight(node.right);
            return this.#rotateLeft(node);
        }
    }

    return node;
    }

    #balanceFactor(node) { 
        return this.#getHeight(node.left) - this.#getHeight(node.right);
    }

    #rotateLeft(node) {
        let x = node.right;
        let y = x.left;
        x.left = node;
        node.right = y;

        this.#update(node);
        this.#update(x);

        return x;
    }

    #rotateRight(node) {
        let x = node.left;
        let y = x.right;
        x.right = node;
        node.left = y;

        this.#update(node);
        this.#update(x);

        return x;
    }

    #getHeight(node) {
        if(!node) return 0;
        return node.height;
    }

    #reBalance(node, value) {     
        this.#update(node);

        const BF = this.#balanceFactor(node);

        if(BF > 1 && value < node.left.value) {
            return this.#rotateRight(node);
        }

        if(BF > 1 && value > node.left.value) {
            node.left = this.#rotateLeft(node.left);
            return this.#rotateRight(node);
        }

        if(BF < -1 && value < node.right.value) {
            node.right = this.#rotateRight(node.right);
            return this.#rotateLeft(node);
        }

        if(BF < -1 && value > node.right.value) {
            return this.#rotateLeft(node)
        }
        return node;
    }

    /* ================= BST Helpers ================= */

    #getMin(node) {
        if(!node.left) return node;

        return this.#getMin(node.left);
    }

    #getMax(node) {
        if(!node.right) return node;

        return this.#getMax(node.right);
    }

    #search(node, value) {
        if(!node) return false;

        if(node.value === value){
            return true;
        }
        else if(value < node.value) {
            return this.#search(node.left, value);
        }
        else {
            return this.#search(node.right, value);
        }
    }

    #update(node) {
        node.height = 1 + Math.max(this.#getHeight(node.left), this.#getHeight(node.right));
    };

    /* ================= DFS Helpers ================= */

    #preorder_rec(node, res) {
        if(!node) return;
        res.push(node.value);
        this.#preorder_rec(node.left, res);
        this.#preorder_rec(node.right, res);
    }

    #inorder_rec(node, res) {
        if(!node) return;
        this.#inorder_rec(node.left, res);
        res.push(node.value);
        this.#inorder_rec(node.right, res);
    }

    #postorder_rec(node, res) {
        if(!node) return;
        this.#postorder_rec(node.left, res);
        this.#postorder_rec(node.right, res);
        res.push(node.value);
    }

    #levelOrder_rec(node, res, lvl){
        if(!node) return;
        if(!res[lvl]) res[lvl] = [];

        res[lvl].push(node.value);
        this.#levelOrder_rec(node.left, res , lvl + 1);
        this.#levelOrder_rec(node.right, res, lvl + 1);

        return res;
    }

    #isEqual(node1, node2){

        if (!node1 && !node2) return true;
        if (!node1 || !node2) return false;
        
        if (node1.value !== node2.value) return false;
        
        return this.#isEqual(node1.left, node2.left) && this.#isEqual(node1.right, node2.right);
    }

    #clone(root){
        if(root === null) return;
        const newRoot = new TreeNode(root.value);
        
        newRoot.left = this.#clone(root.left);
        newRoot.right = this.#clone(root.right);
        
        return newRoot;
    }

    *#values(node) {
        if(!node) return;

        yield* this.#values(node.left);
        yield node.value;
        yield* this.#values(node.right);
    }

    *#entries(node) {
        if (!node) return;

        yield* this.#entries(node.left);
        yield [node.value];
        yield* this.#entries(node.right);
    }


    /* ================= Advanced AVL Utilities ================= */

    #findSuccessor(value) {
        if(this.is_empty()) return -1;
        
        let ancestor = null;
        let node = this.#root;
        while(value != node.value){
            if(value < node.value){
                node = node.left;
            }
            else {
                node = node.right;
            }
        }
        if(node.right){
            return this.#getMin(node.right);
        }
        node = this.#root;

        while(node){
            if(node.value > value){
                ancestor = node;
                node = node.left;
            }
            else{
                node = node.right;
            }
        }
        return ancestor;
    }

    findPredecessor(value) {
        if(this.is_empty()) return -1;
        
        let ancestor = null;
        let node = this.#root;
        while(node && value != node.value){
            if(value < node.value){
                node = node.left;
            }
            else {
                node = node.right;
            }
        }
        if(node.left){
            return this.#getMax(node.left);
        }
        node = this.#root;

        while(node){
            if(node.value < value){
                ancestor = node;
                node = node.right;
            }
            else{
                node = node.left;
            }
        }
        return ancestor;
    }

    toArray() {
        const res = [];
        this.#inorder_rec(this.#root,res);
        return res;
    }

    clone() {
        return this.#clone(this.#root);
    }

    IsEquals(otherTree) {
        return this.#isEqual(this.#root, otherTree);
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        let root = this.#root;
        const stack = [];
        return {
            next: () => {
                while(root) {
                    stack.push(root);
                    root = root.left;
                }
                if(stack.length === 0) {
                    return {
                        done: true
                    }
                }
                root = stack.pop();
                const value = root.value;
                root = root.right;
                return {
                    value: value,
                    done: false
                }
            }
        }
    }

    *values() {
        return this.#values(this.#root);
    }

    *entries() {
        return this.#entries(this.#root);
    }
}