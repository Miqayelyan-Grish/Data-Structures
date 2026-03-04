# AVL Tree (Self-Balancing Binary Search Tree)

An AVL Tree is a self-balancing node-based binary search tree. It was the first such data structure to be invented. In an AVL tree, the heights of the two child subtrees of any node differ by at most one; if at any time they differ by more than one, rebalancing is performed to restore this property.

AVL trees provide the physical implementation for highly efficient ordered Abstract Data Types (ADTs), ensuring that the tree remains logarithmic even under heavy data insertion or deletion.

## Why AVL Trees Are Important
Standard Binary Search Trees (BST) can become skewed, degrading performance to linear time. AVL trees solve this by enforcing:

*   **Guaranteed Access Speed:** Maintains a height of $O(\log n)$, ensuring rapid key retrieval regardless of input order.
*   **Automatic Structural Integrity:** Uses rotations to prevent the tree from becoming a linked list.
*   **Predictable Performance:** Provides a "worst-case" guarantee for search-intensive applications.
*   **Optimal Searching:** Best suited for databases and look-up tables where searches are more frequent than updates.

## Classification of AVL Operations
AVL trees extend the standard BST property ($Left < Node < Right$) by adding a **Balance Factor** requirement.

### Core Operations
*   **Search:** Standard BST traversal branching left or right ($O(\log n)$).
*   **Insertion:** Standard insertion followed by a "Bottom-Up" check for balance factors and necessary rotations.
*   **Deletion:** Removal of nodes followed by rebalancing of the path back to the root.
*   **Rebalancing (Rotations):** The unique mechanism (LL, RR, LR, RL rotations) that restores the tree’s height balance.

### Tree Traversals
*   **In-Order:** Left → Root → Right (Returns elements in perfectly sorted order).
*   **Pre-Order:** Root → Left → Right (Captures the balanced structure of the tree).
*   **Post-Order:** Left → Right → Root (Efficient for memory deallocation).

## Complexity Analysis
Unlike standard BSTs, the AVL tree's worst case is strictly controlled.


| Operation | Average Case | Worst Case |
| :--- | :--- | :--- |
| **Access** | $O(\log n)$ | $O(\log n)$ |
| **Search** | $O(\log n)$ | $O(\log n)$ |
| **Insertion** | $O(\log n)$ | $O(\log n)$ |
| **Deletion** | $O(\log n)$ | $O(\log n)$ |

## Key Concepts
*   **Balance Factor (BF):** Defined as $Height(Left) - Height(Right)$. In an AVL tree, $BF \in \{-1, 0, 1\}$.
*   **Rotation Logic:** The process of moving nodes to reduce the height of a subtree after an update.
*   **Height-Augmented Nodes:** Each node stores its own height to make balance factor calculations $O(1)$.

## Key Takeaways
*   The AVL Tree is the "strict" sibling of the Red-Black tree, providing faster lookups due to better balancing.
*   It eliminates the risk of $O(n)$ time complexity found in unbalanced BSTs.
*   Understanding AVL rotations is fundamental to mastering complex data structure design and memory management.
