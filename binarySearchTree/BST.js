class Node {

    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BST {
    #root;
    #size;

    constructor(){
        this.#root = null;
        this.#size = 0;
    }

    /* ================= Basic State ================= */

    size(){
        return this.#size;
    }

    is_empty(){
        return this.#size === 0;
    }

    clear(){
        this.#root = null;
        this.#size = 0;
    }

    /* ================= Insert / Delete ================= */

    insert(value){
        this.#root = this.#_insert(this.#root, value);
    }

    delete(value){
        this.#root = this.#_delete(this.#root, value);
    }

    contains(value){
        return this.#_contains(this.#root, value);
    }

    /* ================= Height & Depth ================= */

    get_height(){
        return this.#_get_height();
    }

    get_depth (value){
        if(!this.contains(value)) return -1;
        return this.#_get_depth(this.#root, value);
    }

    /* ================= Min / Max ================= */

    find_min() {
        return this.#_find_min();
    }

    find_max() {
        return this.#_find_max();
    }

    /* ================= Traversals ================= */

    level_order(){
        const result = new Array();
        this.#_level_order(this.#root, 0, result)
        return result;
    }

    preorder_rec(){
        const result = [];
        this.#_preorder(this.#root, result);
        return result;
    }
    
    inorder_rec(){
        const result = [];
        this.#_inorder(this.#root, result);
        return result;
    }

    postorder_rec(){
        const result = [];
        this.#_postorder(this.#root, result);
        return result;
    }

    preorder_itr() {
        const res = [];
        const stack = [this.#root];
        while(stack.length){
            let node = stack.pop();
            res.push(node.value);
            if(node.right){
                stack.push(node.right);
            }
            if(node.left){
                stack.push(node.left);
            }
        }
        return result;
    }

    inorder_itr(){
        const res = [];
        const stack = [];
        const node = this.#root;

        while(node || stack.length){
            while(node){
                stack.push(node)
                node = node.left;
            }
            node = stack.pop();
            res.push(node.value);
            node = node.right;
        }
        return res;
    }

    postorder_itr(){
        if(!this.#root) return [];
        const res = [];
        const stack1 = [this.#root];
        const stack2 = [];

        while(stack1.length){
            let node = stack1.pop();
            stack2.push(node);
            if(node.left){
                stack1.push(node.left);
            }
            if(node.right) {
                stack1.push(node.right);
            }
        }
        while(stack2.length){
            res.push(stack2.pop().value);
        }
        return res;
    }

    /* ================= Advanced Operations ================= */

    find_successor(targetNode){
        if(!targetNode) return null;
        let ancestor = null;
        let node = this.#root;
        if(targetNode.right){
            return this.find_min(targetNode.right);
        }
        while(node && targetNode != node){
            if(node.value > targetNode.value){
                ancestor = node;
                node = node.left;
            }
            else{
                node = node.right;
            }
        }
        return ancestor;
    }

    find_predecessor(targetNode){
        if(!targetNode) return null;
        let ancestor = null;
        let node = this.#root;
        if(targetNode.left){
            return this.#_find_max(targetNode.left);
        }
        while(node && targetNode != node){
            if(node.value < targetNode.value){
                ancestor = node;
                node = node.right;
            }
            else{
                node = node.left;
            }
        }
        return ancestor;
    }

    is_balanced(){
        return Math.abs(this.#_get_height(this.#root.left) - this.#_get_height(this.#root.right)) <= 1;
    }

    /* ================= Utilities ================= */

    toArray() {
        const result = [];
        this.#_inorder(this.#root,result);
        return result;
    }

    clone() {
        const newTree = new BST();
        newTree.#root = this.#_clone(this.#root);
        newTree.#size = this.#size;
        return newTree;
    }

    equals(otherTree){
        
        return this.#isEqual(this.#root, otherTree.#root);
    }

    /* ================= Iteration ================= */

    [Symbol.iterator](){
        let root = this.#root;
        const stack = []
        return {
            next: () => {
                while (root) {
                    stack.push(root);
                    root = root.left;
                }
                if(stack.length === 0){
                    return{
                        done: true
                    }
                }
                root = stack.pop();
                const value = root.value;
                root = root.right;
                return {
                    value: value,
                    done: false,
                }
            }
        }
    }
    *values(){
        return this.#values(this.#root);
    }

    *entries(){
        return this.#entries(this.#root)
    }
    
    /* ================= Private Helpers ================= */
    
    #_insert(node, value){
        if(!node){
            this.#size++;
            return new Node(value);
        }
        if(value < node.value){
            node.left = this.#_insert(node.left, value);
        }
        else{
            node.right = this.#_insert(node.right, value);
        }
        return node;
    }

    #_delete(node, value){
        if(!node){
            return node;
        }
        
        if(value < node.value){
            node.left = this.#_delete(node.left, value);
        }
        else if(value > node.value) {
            node.right = this.#_delete(node.right, value);
        }
        else{
            this.#size--;

            if(!node.right || !node.left){
                return node.right || node.left;
            }

            const newRoot = this.#_find_min(node.right);
            node.value = newRoot.value;
            node.right = this.#_delete(node.right, newRoot);
        }
        return node;
    }
    
    #_contains(node, value){
        if(!node) return false;
        if(node.value == value){
            return true;
        }
        if(value < node.value) {
            return this.#_contains(node.left, value);
        }
        else {
            return this.#_contains(node.right, value);
        }
    }
    
    #_find_min(node){
        if(!node.left) return node;
        return this.#_find_min(node.left);
    }
    
    #_find_max(node){
        if(!node.right) return node;
        return  this.#_find_max(node.right);
    }
    
    #_get_height(node){
        if(!node) return 0;
        return Math.max(this.#_get_height(node.left), this.#_get_height(node.right)) + 1;
    }
    
    #_get_depth(node, value){
        if(!node) return -1;
        if(node.value = value) return 0;
        return this.#_get_depth(value < node.value ? node.left : node.right, value) + 1;
    }

    #_preorder(node, result){
        if(!node) return;
        result.push(node.value);
        this.#_preorder(node.left);
        this.#_preorder(node.right);
    }
    
    #_inorder(node, result){
        if(!node) return;
        this.#_inorder(node.left);
        result.push(node.value);
        this.#_inorder(node.right);
    }
    
    #_postorder(node, result){
        if(!node) return;
        this.#_postorder(node.left);
        this.#_postorder(node.right);
        result.push(node.value);
    }
    
    #_level_order(node, lvl, result){
        if(!node) return ;
        if(!result[lvl]) {
            result[lvl] = [];
        }
        result[lvl].push(node.value);
        this.#_level_order(node.left, lvl + 1,result);
        this.#_level_order(node.right,lvl + 1,result);
    }
    
    #_clone(root){
        if(root === null) return;
        const newRoot = new Node(root.value);
        
        newRoot.left = this.#_clone(root.left);
        newRoot.right = this.#_clone(root.right);
        
        return newRoot;
    }
    
    #isEqual(node1, node2) {
        
        if (!node1 && !node2) return true;
        if (!node1 || !node2) return false;
        
        if (node1.value !== node2.value) return false;
        
        return this.#isEqual(node1.left, node2.left) && this.#isEqual(node1.right, node2.right);
    }
    
    *#values(node) {
        if (!node) return;
        
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
}
    

    