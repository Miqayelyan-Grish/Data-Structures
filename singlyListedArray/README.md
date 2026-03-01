# Singly Linked List

A Singly Linked List is a linear data structure where elements are not stored in contiguous memory locations. It provides a physical implementation of the List Abstract Data Type (ADT) and defines the relationships between data elements through nodes and pointers.



Linked lists are the backbone of efficient dynamic memory management, determining how data is stored as a collection of nodes and how quickly it can be modified without shifting elements.

---

# Why Linked Lists Are Important

Data structures like the Singly Linked List are the foundation of efficient software engineering. They determine:

* **Access Speed:** How fast data can be retrieved via sequential traversal.
* **Memory Efficiency:** Only the required amount of memory is used at any time.
* **Algorithm Performance:** Enables $O(1)$ insertions and deletions at the head.
* **Data Integrity:** Ensuring that the chain of nodes remains connected via pointers.

---

# Classification of Linked List Operations

## Linear Data Structures
Elements are arranged sequentially, where each node contains data and a pointer to the next adjacent node.

* **Insertion:** Adding a new node by updating the "next" pointer of the previous node.
* **Deletion:** Removing a node by bypassing it in the pointer chain.
* **Traversal:** Visiting each node by following the pointers from the head to the null terminator.

---

# Complexity Analysis (Average Case)

| Data Structure | Access | Search | Insertion | Deletion |
| :--- | :--- | :--- | :--- | :--- |
| **Singly Linked List** | $O(n)$ | $O(n)$ | $O(1)$ | $O(1)$ |

---

# Key Concepts

* **Dynamic vs. Static:** Linked Lists are inherently dynamic; they grow and shrink during execution as nodes are added or removed.
* **Memory Allocation:** Unlike arrays, linked lists use **non-contiguous memory**, connecting nodes scattered in the heap.
* **Abstract Data Types (ADT):** The logical description of a "List," while the Linked List is the "how".

---

# Key Takeaways

* Choosing the right structure can reduce time complexity for insertions at the beginning from $O(n)$ to $O(1)$.
* Data structures and algorithms are inseparable; the linked list defines the "how" for dynamic memory algorithms.
* Understanding pointer management is essential for preventing memory leaks in custom implementations.

# Doubly Linked List

A Doubly Linked List is a complex linear data structure where each node contains a data element and two pointers: one pointing to the next node and one to the previous node. It provides a physical implementation of the List Abstract Data Type (ADT) and defines bidirectional relationships between data elements.



Doubly linked lists are the backbone of efficient navigation, determining how data can be traversed both forwards and backwards in memory without re-starting from the head.

---

# Why Doubly Linked Lists Are Important

Data structures like the Doubly Linked List are the foundation of advanced software engineering. They determine:

* **Access Speed:** How fast data can be retrieved from either the head or the tail.
* **Memory Efficiency:** Uses more space per node (for the extra pointer) to gain flexibility in traversal.
* **Algorithm Performance:** Enables $O(1)$ deletions when the node is already known.
* **Data Integrity:** Ensuring that both forward and backward links remain consistent during modifications.

---

# Classification of Linked List Operations

## Linear Data Structures
Elements are arranged sequentially, where each node is connected to its previous and next adjacent elements.

* **Insertion:** Adding a node by updating four pointers (two for the new node, and one each for its neighbors).
* **Deletion:** Removing a node by connecting its predecessor directly to its successor ($O(1)$).
* **Traversal:** Visiting nodes in either direction (Forward: Head to Tail; Backward: Tail to Head).

---

# Complexity Analysis (Average Case)

| Data Structure | Access | Search | Insertion | Deletion |
| :--- | :--- | :--- | :--- | :--- |
| **Doubly Linked List** | $O(n)$ | $O(n)$ | $O(1)$ | $O(1)$ |

---

# Key Concepts

* **Bidirectional vs. Unidirectional:** Singly lists only move forward, while Doubly lists grow and navigate in both directions.
* **Memory Allocation:** Doubly linked lists use **non-contiguous memory** but require more overhead per node than singly lists.
* **Abstract Data Types (ADT):** The logical description of a "Deque" or "List," while the Doubly Linked List is the "how".

---

# Key Takeaways

* Choosing the right structure can reduce time complexity for deletions from $O(n)$ to $O(1)$ if the node is located.
* Data structures and algorithms are inseparable; the doubly linked structure defines the "how" for browser history or undo/redo features.
* Understanding pointer management is essential for preventing broken links in custom implementations.
