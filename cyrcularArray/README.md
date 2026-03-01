# Deque via Cyclic Array

A Deque (Double-Ended Queue) is a specialized linear data structure that allows for the insertion and deletion of elements from both the front and the rear ends. When implemented using a **Cyclic Array**, it provides a physical implementation of the Deque ADT by treating a static array as a circular buffer to reuse memory efficiently.



Cyclic Deques are the backbone of efficient buffer management, determining how data is stored in contiguous memory and how quickly it can be accessed without shifting elements.

# Why Cyclic Deques Are Important

Data structures like the Circular Deque are the foundation of efficient system-level programming. They determine:

* **Access Speed:** How fast data can be retrieved from the front or rear ($O(1)$ access).
* **Memory Efficiency:** Maximizes the use of a fixed-size array by "wrapping around" pointers to reuse vacated space.
* **Algorithm Performance:** Optimized for sliding window problems, scheduling, and undo operations.
* **Data Integrity:** Ensuring that the front and rear indices remain within bounds using modulo arithmetic.

# Classification of Deque Operations

## Linear Data Structures
Elements are arranged in a logical sequence where each element is connected to its previous and next adjacent elements via index manipulation.

* **pushFront / pushRear:** Inserting an element by decrementing or incrementing pointers in $O(1)$ time.
* **popFront / popRear:** Removing elements from either end by adjusting indices.
* **isEmpty / isFull:** Critical checks that utilize the relationship between the front and rear pointers to determine state.

# Cyclic Navigation

Navigation relies on the capacity of the array to wrap pointers back to the beginning or end using modulo arithmetic.



* **Next Index:** $(i + 1) \pmod{\text{capacity}}$
* **Previous Index:** $(i - 1 + \text{capacity}) \pmod{\text{capacity}}$

# Complexity Analysis (Average Case)

| Data Structure | Access | Search | Insertion | Deletion |
| :--- | :--- | :--- | :--- | :--- |
| **Cyclic Deque** | $O(1)$ | $O(n)$ | $O(1)$ | $O(1)$ |

# Key Concepts

* **Static vs. Dynamic:** Usually implemented with a static array of fixed size, though it can be resized if the array becomes full.
* **Memory Allocation:** Uses **contiguous memory** (Arrays), which provides better cache locality than linked-list deques.
* **Abstract Data Types (ADT):** The Deque ADT defines "what" the structure does, while the **Cyclic Array** is the "how" it achieves constant time performance.

# Key Takeaways

* Choosing a cyclic array reduces insertion/deletion time complexity at the front from $O(n)$ to $O(1)$.
* Data structures and algorithms are inseparable; the cyclic logic allows the Deque to function without the overhead of element shifting.
* Understanding modulo arithmetic is essential for implementing custom cyclic or circular data structures.
