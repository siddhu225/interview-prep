Sure! Let’s write a **complete note on Merge Sort in JavaScript** — including what it is, how it works, an example with step-by-step explanation, and the code with comments for revision.

---

## 🔷 What is Merge Sort?

**Merge Sort** is a **Divide and Conquer** sorting algorithm that:

1. **Divides** the array into halves,
2. **Sorts** each half recursively,
3. Then **merges** them in a sorted manner.

It guarantees a time complexity of **O(n log n)** in all cases — best, average, and worst.

---

## ✅ Merge Sort JavaScript Code

```js
function mergeSort(arr) {
  // Base case: array with 0 or 1 element is already sorted
  if (arr.length < 2) {
    return arr;
  }

  // Step 1: Divide the array into two halves
  const mid = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, mid);
  const rightArr = arr.slice(mid);

  // Step 2: Recursively sort and merge
  return merge(mergeSort(leftArr), mergeSort(rightArr));
}

// Helper function to merge two sorted arrays
function merge(leftArr, rightArr) {
  const sorted = [];
  let i = 0, j = 0;

  // Step 3: Compare and merge values from both arrays
  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] < rightArr[j]) {
      sorted.push(leftArr[i]);
      i++;
    } else {
      sorted.push(rightArr[j]);
      j++;
    }
  }

  // Add any remaining elements
  return [...sorted, ...leftArr.slice(i), ...rightArr.slice(j)];
}
```

---

## 📌 Example: Sorting `[6, 3, 9, 5]`

### Step-by-step Breakdown:

```txt
Input: [6, 3, 9, 5]

Split into:     [6, 3]       and       [9, 5]
               /     \               /     \
             [6]     [3]          [9]     [5]

Now merge:
[6] + [3] => [3, 6]
[9] + [5] => [5, 9]

Final merge:
[3, 6] + [5, 9] => [3, 5, 6, 9]
```

Output: `[3, 5, 6, 9]`

---

## ⏱️ Time & Space Complexity

| Complexity | Value      | Explanation                                       |
| ---------- | ---------- | ------------------------------------------------- |
| Time       | O(n log n) | Each split = log n levels, and merging takes O(n) |
| Space      | O(n)       | Because of the extra arrays created               |

---

## 📘 Summary / Key Notes for Revision

* **Divide and Conquer** algorithm.
* Always **O(n log n)** — even in the worst case.
* **Stable sort** — maintains relative order of equal elements.
* Not in-place (uses additional memory).
* Good for large datasets or **linked lists** (where merge sort is O(1) space).

---

Let me know if you’d like:

* Merge sort in descending order
* In-place merge sort (advanced)
* Merge sort with custom comparator (like for objects)
  I'm happy to help further!
