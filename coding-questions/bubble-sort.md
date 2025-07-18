Absolutely! Here's your `bubbleSort` function with a **clear algorithm first**, followed by the **code with detailed comments** — perfect for revision later.

---

### 📌 **Algorithm for Bubble Sort** (Optimized Version)

1. **Start a loop** that runs from `i = 0` to `n - 1`:

   * Assume the array is already sorted (`isSwapped = false`).
2. **For each pass**, loop from `j = 0` to `n - i - 2`:

   * Compare adjacent elements `arr[j]` and `arr[j+1]`.
   * If `arr[j] > arr[j+1]`, **swap them** and set `isSwapped = true`.
3. **If no swaps** happened in a full pass, the array is sorted → **break early**.
4. Return the sorted array.

---

### ✅ Bubble Sort Code with Comments

```js
function bubbleSort(arr) {
  let isSwapped;

  // Outer loop - runs once for each element in the array
  for (let i = 0; i < arr.length; i++) {
    
    isSwapped = false; // Reset swap flag for each pass
    
    // Inner loop - compare and swap adjacent elements
    for (let j = 0; j < arr.length - i - 1; j++) {
      
      // If current element is greater than next, swap them
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Destructuring swap
        isSwapped = true; // Mark as swapped
      }
    }

    // If no elements were swapped in this pass, array is sorted
    if (!isSwapped) {
      break; // Exit early to optimize performance
    }
  }

  return arr; // Return the sorted array
}
```

---

### 🧠 Key Points to Remember:

* **Time Complexity:**

  * Worst case: `O(n^2)` (unsorted)
  * Best case: `O(n)` (already sorted, due to early exit)
* **Space Complexity:** `O(1)` → in-place sorting
* **Stable sort:** Yes (preserves order of equal elements)
* **Use when:** Small datasets or when stability matters and performance isn't critical

Let me know if you want a version that sorts in **descending** order or tracks number of passes/swaps.
