Sure! Here's a complete explanation of **Insertion Sort** in the same detailed format I provided for **Bubble Sort** and **Selection Sort** — including the fixed version of your code, an algorithm breakdown, and key revision points.

---

## 🔢 **Insertion Sort Explained**

### 🧠 What is Insertion Sort?

Insertion Sort builds the **final sorted array one element at a time** by comparing the current element with elements in the sorted portion and inserting it in the correct position.

It’s similar to how you **sort playing cards in your hand** — by inserting each new card into its proper place among the cards you’re already holding.

---

## ✅ Use-Cases:

* Best suited for **small or nearly sorted arrays**
* It’s a **stable**, in-place sorting algorithm
* Simpler and faster for **small datasets**

---

### 📌 Insertion Sort Algorithm:

1. Start from the **second element** (index `1`), as the first element is trivially sorted.
2. Store the current element in a temporary variable `numberToInsert`.
3. Compare `numberToInsert` with elements in the sorted part (from right to left).
4. Shift elements to the right until you find the correct position.
5. Insert `numberToInsert` at that position.
6. Repeat this process for all elements.

---

## ✅ Corrected Code with Comments

```js
function insertionSort(arr) {
  // Start from the second element
  for (let i = 1; i < arr.length; i++) {
    let numberToInsert = arr[i]; // Current element to insert
    let j = i - 1;

    // Shift elements of the sorted part to the right if they are greater than numberToInsert
    while (j >= 0 && arr[j] > numberToInsert) {
      arr[j + 1] = arr[j]; // Move the larger element one step to the right
      j--;
    }

    // Insert the element at the correct position
    arr[j + 1] = numberToInsert;
  }

  return arr; // Return the sorted array
}
```


---

## 🧠 Key Properties for Revision

| Aspect           | Detail                                            |
| ---------------- | ------------------------------------------------- |
| Time Complexity  | Worst: `O(n²)`<br>Best: `O(n)` (already sorted)   |
| Space Complexity | `O(1)` (in-place)                                 |
| Stable?          | ✅ Yes                                             |
| Adaptive?        | ✅ Performs well on sorted or nearly sorted arrays |
| In-place?        | ✅ Yes                                             |
| Type             | Comparison-based                                  |

---

## 🔁 Example Walkthrough

Given `arr = [5, 3, 8, 4, 2]`:

1. Compare 3 with 5 → Insert 3 before 5 → `[3, 5, 8, 4, 2]`
2. Compare 8 → No change → `[3, 5, 8, 4, 2]`
3. Compare 4 with 8 and 5 → Insert between → `[3, 4, 5, 8, 2]`
4. Compare 2 with all → Insert at start → `[2, 3, 4, 5, 8]`

---

## 🧪 Use Insertion Sort When:

* You're working with **small arrays**
* You want a **simple, readable algorithm**
* The array is **nearly sorted**
* You need a **stable** sorting algorithm

---

Let me know if you’d like to see a **descending order version**, a **dry run with steps**, or visual diagrams.
