# Queue (FIFO)

A Queue is a linear data structure that follows the **First-In, First-Out (FIFO)** principle. It provides a physical implementation of the Queue Abstract Data Type (ADT) and defines the relationships where elements are added at the rear and removed from the front.



Queues are the backbone of efficient software, determining how data is stored in memory and how quickly it can be accessed for task scheduling or data buffering.

---

# Why Queues Are Important

Data structures like the Queue are the foundation of efficient software engineering. They determine:

* **Access Speed:** How fast data can be enqueued or dequeued ($O(1)$ access).
* **Memory Efficiency:** How much space is required to store waiting information.
* **Algorithm Performance:** Many algorithms, like Breadth-First Search (BFS), only work efficiently with this structure.
* **Data Integrity:** Ensuring relationships between data points remain consistent with the order of arrival.

---

# Classification of Queue Operations

## Linear Data Structures
Elements are arranged sequentially, where each element is connected to its previous and next adjacent elements.

* **Enqueue:** Adds an element to the rear of the queue ($O(1)$ complexity).
* **Dequeue:** Removes the front element from the queue ($O(1)$ complexity).
* **Front/Peek:** Retrieves the first element without removing it from the structure.

---

# Complexity Analysis (Average Case)

| Data Structure | Access | Search | Insertion | Deletion |
| :--- | :--- | :--- | :--- | :--- |
| **Queue** | $O(n)$ | $O(n)$ | $O(1)$
