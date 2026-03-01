# Binary Search Tree (BST)

A Binary Search Tree is a specialized node-based binary tree data structure. It provides a physical implementation of ordered Abstract Data Types (ADTs) and defines the relationships between parent and child nodes.


BSTs are the backbone of efficient searching and sorting, determining how data is ordered in memory and how quickly it can be located or traversed.

---

# Why Binary Search Trees Are Important

Data structures like BST are the foundation of efficient software engineering. They determine:

* **Access Speed:** How fast a specific key can be retrieved (logarithmic time).
* **Memory Efficiency:** How nodes are dynamically allocated in non-contiguous memory.
* **Algorithm Performance:** Enables efficient binary search and sorted traversals.
* **Data Integrity:** Ensuring the relative order between elements remains consistent.

---

# Classification of BST Operations

## Core Operations
Elements are processed based on the BST property: $Value(Left) < Value(Node) < Value(Right)$.

* **Search:** Traverses the tree by comparing target values and branching left or right ($O(\log n)$).
* **Insertion:** Finding the correct leaf position to maintain the structural property.
* **Deletion:** Removing nodes while restructuring (handling leaf, single-child, or two-child cases).

---

# Tree Traversals

Elements are visited in a specific order to retrieve or process information.


* **In-Order:** Left → Root → Right (Returns elements in sorted, ascending order).
* **Pre-Order:** Root → Left → Right (Used to create a clone or prefix expression of the tree).
* **Post-Order:** Left → Right → Root (Used for deleting the tree or postfix expressions).

---

# Complexity Analysis (Average Case)

| Operation | Average Case | Worst Case (Skewed) |
| :--- | :--- | :--- |
| **Access** | $O(\log n)$ | $O(n)$ |
| **Search** | $O(\log n)$ | $O(n)$ |
| **Insertion** | $O(\log n)$ | $O(n)$ |
| **Deletion** | $O(\log n)$ | $O(n)$ |

---

# Key Concepts

* **Balanced vs. Skewed:** Balanced trees (like AVL) stay at $O(\log n)$, while skewed trees degrade to linear time.
* **Memory Allocation:** BSTs use non-contiguous memory (nodes and pointers) unlike standard arrays.
* **Abstract Data Types (ADT):** The logical description of a "Sorted Set," where BST is the "how" it is built.

---

# Key Takeaways

* Choosing a BST can reduce time complexity from $O(n)$ to $O(\log n)$ for search operations.
* Data structures and algorithms are inseparable; the BST structure allows the Binary Search algorithm to function.
* Understanding tree height management is essential for implementing efficient custom structures.
