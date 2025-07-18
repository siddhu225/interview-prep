Here are **detailed, easy-to-revise notes** on the **Template Design Pattern** in JavaScript — with real-world analogy, examples, use cases, and interview-style explanations.

---

# ✅ Template Design Pattern in JavaScript

## 🔹 What is the Template Pattern?

The **Template Design Pattern** is a **behavioral pattern** that defines the **skeleton of an algorithm** in a base class (or prototype), while allowing subclasses to **override certain steps** of the algorithm without changing its overall structure.

---

## 🔹 Real-world Analogy

Think of a **coffee-making process**:

* Boil water → Brew coffee → Pour into cup → Add sugar/milk

This is a **template** for making coffee. Different types of drinks (e.g., tea, black coffee) can **customize** the brewing or final step, but the structure stays the same.

---

## 🔹 When to Use It

* You want to **reuse common logic** but allow specific parts to be customized.
* You want to **enforce a fixed process**, but allow **certain steps** to vary.
* Good for **frameworks**, **UI flows**, or **business processes**.

---

## 🔹 Key Concepts

| Term            | Meaning                                      |
| --------------- | -------------------------------------------- |
| Template Method | The method that defines the algorithm flow   |
| Hook Methods    | Steps that can be overridden in subclasses   |
| Invariant Steps | Steps that stay constant across all versions |

---

## 🔹 Example in JavaScript

Let’s create a base class for a generic **data exporter**.

```js
class DataExporter {
  export() {
    this.fetchData();
    this.formatData();
    this.saveToFile();
  }

  fetchData() {
    console.log("Fetching data from database...");
  }

  // Hook method — meant to be overridden
  formatData() {
    throw new Error("formatData() must be implemented");
  }

  saveToFile() {
    console.log("Saving formatted data to file...");
  }
}
```

---

### 🔸 Subclass 1: CSV Exporter

```js
class CSVExporter extends DataExporter {
  formatData() {
    console.log("Formatting data as CSV...");
  }
}
```

---

### 🔸 Subclass 2: JSON Exporter

```js
class JSONExporter extends DataExporter {
  formatData() {
    console.log("Formatting data as JSON...");
  }
}
```

---

### 🔸 Client Code

```js
const csv = new CSVExporter();
csv.export();
// Output:
// Fetching data from database...
// Formatting data as CSV...
// Saving formatted data to file...

const json = new JSONExporter();
json.export();
// Output:
// Fetching data from database...
// Formatting data as JSON...
// Saving formatted data to file...
```

---

## 🔹 Benefits of Template Pattern

* ✅ Promotes **code reuse** for the common steps.
* ✅ Enforces a **consistent structure** or process.
* ✅ Allows **custom behavior** for specific parts.
* ✅ Easier to **extend functionality**.

---

## 🔹 Drawbacks

* ❌ Rigid structure — may be **too restrictive** for dynamic flows.
* ❌ Overuse can lead to **tight coupling** between base and subclasses.

---

## 🔹 Use Cases

* UI lifecycle (e.g., mount, render, update, destroy).
* Exporters (CSV, Excel, PDF).
* Form submissions with pre-validation and post-processing.
* Game engines (game loop template).
* Web request processing pipelines (middleware-like behavior).

---

## 🔹 Template Pattern vs Strategy Pattern

| Feature     | Template Pattern                | Strategy Pattern                 |
| ----------- | ------------------------------- | -------------------------------- |
| Structure   | Defines algorithm structure     | Selects algorithm dynamically    |
| Inheritance | Yes (extends base class)        | Not required                     |
| Reusability | High (for process flows)        | High (for interchangeable logic) |
| Flexibility | Less flexible due to fixed flow | More flexible                    |

---

## ✅ Quick Revision Snippet

```js
class Meal {
  prepareMeal() {
    this.prepareIngredients();
    this.cook();
    this.serve();
  }

  prepareIngredients() {
    throw new Error("prepareIngredients() must be implemented");
  }

  cook() {
    throw new Error("cook() must be implemented");
  }

  serve() {
    console.log("Meal is served!");
  }
}

class Pasta extends Meal {
  prepareIngredients() {
    console.log("Getting pasta, sauce, and cheese...");
  }

  cook() {
    console.log("Boiling pasta and adding sauce...");
  }
}

const dinner = new Pasta();
dinner.prepareMeal();
// Output:
// Getting pasta, sauce, and cheese...
// Boiling pasta and adding sauce...
// Meal is served!
```

---

## 🧠 Summary for Interviews

* The **Template Pattern** defines the **framework of an algorithm** in a base class.
* Lets subclasses **override specific steps** while preserving the overall flow.
* Common in UI components, workflows, and data pipelines.
* Promotes **consistency** and **code reuse**.

---

Let me know if you want a visual or PDF-style revision sheet for this pattern too!
