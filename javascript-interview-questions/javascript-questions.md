Certainly! Let's delve into each question with detailed explanations, incorporating insights from [The Modern JavaScript Tutorial](https://javascript.info/).

***JavaScript Basics (15 Questions)***

**1\. What are the Key Features of JavaScript?**

JavaScript is a versatile, high-level programming language primarily used for web development. Its key features include:

-   **Dynamic Typing**: Variables in JavaScript are not bound to a specific data type, allowing for flexibility in assigning different types of values to the same variable.

-   **Prototype-Based Object-Oriented Programming**: Unlike classical inheritance in languages like Java, JavaScript uses prototypes. This means objects can inherit properties and methods directly from other objects, facilitating flexible and dynamic object creation.

-   **First-Class Functions**: Functions in JavaScript are treated as first-class citizens, meaning they can be assigned to variables, passed as arguments to other functions, and returned from functions. This feature enables functional programming paradigms.

-   **Asynchronous and Event-Driven**: JavaScript supports asynchronous programming through callbacks, promises, and the async/await syntax. This allows for non-blocking operations, essential for tasks like handling I/O operations or fetching data from a server.

-   **Interpreted Language**: JavaScript is executed line-by-line, making it flexible and adaptable to different environments without the need for prior compilation.

For a comprehensive introduction, refer to [An Introduction to JavaScript](https://javascript.info/intro).

**2\. Explain the Difference Between `undefined` and `null`.**

In JavaScript:

-   **`undefined`**: This value is automatically assigned to variables that have been declared but not yet assigned a value. It indicates the absence of a value.

    ```
    let a;
    console.log(a); // Output: undefined

    ```

-   **`null`**: This is an assignment value that represents the intentional absence of any object value. Developers explicitly assign `null` to a variable to indicate that it should be empty.

    ```
    let b = null;
    console.log(b); // Output: null

    ```

While both represent the absence of value, `undefined` is typically used by the JavaScript engine, whereas `null` is used by developers to signify an intentional lack of value.


Here's a clear comparison between **ES5** and **ES6 (ES2015)** — the two major versions of ECMAScript (JavaScript) that introduced major differences in syntax, features, and programming style.

---

## 🔁 ES5 vs ES6 — At a Glance

| Feature                   | ES5                                 | ES6 (ES2015)                                            |    |                                   |
| ------------------------- | ----------------------------------- | ------------------------------------------------------- | -- | --------------------------------- |
| **Variables**             | `var`                               | `let`, `const`                                          |    |                                   |
| **Functions**             | `function` keyword                  | Arrow functions `() => {}`                              |    |                                   |
| **Classes**               | Function-based inheritance          | Native `class` syntax                                   |    |                                   |
| **Modules**               | No built-in module system           | `import` / `export`                                     |    |                                   |
| **Templates**             | String concatenation                | Template literals using backticks `` `Hello ${name}` `` |    |                                   |
| **Default Params**        | Manual check or \`                  |                                                         | \` | Built-in default parameter values |
| **Destructuring**         | Not available                       | Object & array destructuring                            |    |                                   |
| **Spread/Rest**           | Not available                       | `...` syntax for arrays, objects, and function args     |    |                                   |
| **Promises**              | Callback-based async                | Native `Promise` support                                |    |                                   |
| **For..of loop**          | Not available                       | Iterates over iterable objects                          |    |                                   |
| **Block scoping**         | Not supported                       | Supported with `let`/`const`                            |    |                                   |
| **Arrow Function `this`** | Lexical scoping needs `.bind(this)` | Lexical `this` automatically                            |    |                                   |

---

## 🧱 Code Examples

### 1. 🔐 Variable Declarations

```js
// ES5
var name = "John";

// ES6
let age = 30;
const country = "India";
```

---

### 2. 🔁 Functions

```js
// ES5
function greet(name) {
  return "Hello " + name;
}

// ES6
const greet = (name) => `Hello ${name}`;
```

---

### 3. 🧱 Classes

```js
// ES5
function Person(name) {
  this.name = name;
}
Person.prototype.sayHi = function() {
  console.log("Hi " + this.name);
};

// ES6
class Person {
  constructor(name) {
    this.name = name;
  }

 
```
No problem! Continuing from **Modules**:

---

### 4. 📦 Modules

```js
// ES5 - No native module system
// Simulated using CommonJS (Node.js)
var math = require('./math');
math.add(2, 3);

// ES6 - Native module syntax (works in browsers with `type="module"` or in modern Node.js)
import { add } from './math.js';
add(2, 3);
```

---

### 5. 🧩 Template Literals

```js
// ES5
var name = 'John';
var greeting = 'Hello, ' + name + '!';

// ES6
const name = 'John';
const greeting = `Hello, ${name}!`;
```

---

### 6. 🧮 Destructuring

```js
// ES5
var person = { name: 'Alice', age: 25 };
var name = person.name;
var age = person.age;

// ES6
const { name, age } = person;
```

---

### 7. 🚀 Spread & Rest

```js
// ES5 - Manual concat
var arr = [1, 2];
var newArr = arr.concat([3, 4]);

// ES6
const arr = [1, 2];
const newArr = [...arr, 3, 4];
```

```js
// Rest parameters in functions
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
```

---

### 8. 📜 Promises

```js
// ES5
function getData(callback) {
  setTimeout(function () {
    callback('Data received');
  }, 1000);
}

// ES6
const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Data received'), 1000);
  });
};
```

---

### 9. 🔄 Loops

```js
// ES5
var arr = [1, 2, 3];
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// ES6
for (let value of arr) {
  console.log(value);
}
```

---

### 10. 🎯 Arrow Functions and Lexical `this`

```js
// ES5
function Timer() {
  var self = this;
  this.seconds = 0;
  setInterval(function () {
    self.seconds++;
    console.log(self.seconds);
  }, 1000);
}

// ES6
function Timer() {
  this.seconds = 0;
  setInterval(() => {
    this.seconds++;
    console.log(this.seconds);
  }, 1000);
}
```

---

## 🧠 Summary: When to Use ES6?

| ES6 Feature               | When to Use                       |
| ------------------------- | --------------------------------- |
| `let`/`const`             | Always (avoid `var`)              |
| Arrow Functions           | Short, lexical-scope functions    |
| Destructuring             | Clean object/array handling       |
| Template Literals         | Dynamic strings                   |
| Modules (`import/export`) | Modern app structure              |
| Classes                   | Object-oriented design            |
| Promises                  | Async operations                  |
| Spread/Rest               | Cleaner argument & array handling |

---

Let me know if you’d like a **cheat sheet**, ES6 to ES5 **migration guide**, or want this in a PDF!



**3\. What are Primitive vs. Reference Types in JavaScript?**

JavaScript categorizes data types into:

-   **Primitive Types**: These include `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, and `bigint`. Primitives are immutable and are compared by their value.

    ```
    let x = 10;
    let y = x;
    y = 20;
    console.log(x); // Output: 10

    ```

    In this example, `x` remains `10` because primitives are copied by value.

-   **Reference Types**: These primarily include objects, arrays, and functions. Reference types are mutable and are compared by their reference in memory.

    ```
    let obj1 = { name: "Alice" };
    let obj2 = obj1;
    obj2.name = "Bob";
    console.log(obj1.name); // Output: Bob

    ```

    Here, both `obj1` and `obj2` reference the same object in memory. Modifying `obj2` affects `obj1` because they share the same reference.

For a deeper dive, see [Object references and copying](https://javascript.info/object-copy).

**4\. What is Type Coercion, and How Does JavaScript Handle It?**

Type coercion in JavaScript refers to the automatic or implicit conversion of values from one data type to another. This occurs in contexts like arithmetic operations, comparisons, or function calls.

-   **Implicit Coercion**: JavaScript automatically converts types when necessary.

    ```
    console.log('5' - 2); // Output: 3
    console.log('5' + 2); // Output: '52'

    ```

    In the first example, the string `'5'` is coerced to the number `5` for subtraction. In the second, the number `2` is coerced to the string `'2'` for concatenation.

-   **Explicit Coercion**: Developers manually convert types using functions like `Number()`, `String()`, or `Boolean()`.

    ```
    console.log(Number('5')); // Output: 5
    console.log(String(5));   // Output: '5'

    ```

Understanding type coercion is crucial to avoid unexpected behaviors in your code. For more information, refer to [Type Conversions](https://javascript.info/type-conversions).

**5\. What is the Difference Between Pass-by-Value and Pass-by-Reference?**

In JavaScript:

-   **Pass-by-Value**: Applies to primitive types. When assigning or passing a primitive value, a copy of the value is created. Changes to the copied value do not affect the original variable.

    ```
    let a = 5;
    let b = a;
    b = 10;
    console.log(a); // Output: 5

    ```

    Here, `a` remains `5` because `b` is a copy of `a`, not a reference to it.

-   **Pass-by-Reference**: Applies to reference types. When assigning or passing an object, a reference to the same memory location is used. Changes to the object through any reference affect the original object.

    ```
    let obj1 = { key: 'value' };
    let obj2 = obj1;
    obj2.key = 'newValue';
    console.log(obj1.key); // Output: newValue

    ```

    Both `obj1` and `obj2` point to the same object in memory. Modifying `obj2.key` affects `obj1.key`.

Here are the answers to your questions, following the same detailed format and referencing [The Modern JavaScript Tutorial](https://javascript.info/).

* * * * *

### **6\. How do you check if a variable is an array in JavaScript?**

There are multiple ways to check if a variable is an array:

1.  **Using `Array.isArray()`** (Recommended)

    ```
    console.log(Array.isArray([1, 2, 3])); // true
    console.log(Array.isArray({ key: "value" })); // false

    ```

    This is the best way to check if a variable is an array because it works correctly across different execution contexts.

2.  **Using `instanceof`**

    ```
    console.log([1, 2, 3] instanceof Array); // true
    console.log({ key: "value" } instanceof Array); // false

    ```

    However, this method can fail if an array comes from a different execution context (like an iframe).

3.  **Using `constructor` (Not recommended for safety reasons)**

    ```
    console.log([1, 2, 3].constructor === Array); // true

    ```

    This approach can fail if the `constructor` property is modified.

Reference: [Array methods](https://javascript.info/array-methods)

* * * * *

### **7\. What is the difference between `typeof` and `instanceof`?**

#### **`typeof` Operator**

-   Used to determine the data type of a variable.

-   Returns a string representing the type of the operand.

-   Works for **primitive types** but is limited for complex objects.

    ```
    console.log(typeof "hello"); // "string"
    console.log(typeof 42); // "number"
    console.log(typeof {}); // "object"
    console.log(typeof []); // "object" (Arrays are objects!)
    console.log(typeof null); // "object" (historical mistake in JS)

    ```

#### **`instanceof` Operator**

-   Used to check if an object is an instance of a specific class or constructor.

-   Useful for checking if an object belongs to a certain prototype chain.

    ```
    console.log([] instanceof Array); // true
    console.log({} instanceof Object); // true
    console.log(new Date() instanceof Date); // true
    console.log("hello" instanceof String); // false (primitives are not objects)

    ```

✅ **Key Difference**:

-   `typeof` is good for checking **primitive types**.
-   `instanceof` is better for **checking objects and their prototypes**.

Reference: [Type conversions](https://javascript.info/type-conversions)

* * * * *

### **8\. Explain the difference between `==` and `===`.**

| Operator | Description |
| --- | --- |
| `==` (Abstract Equality) | Checks for **value equality** after performing type conversion if necessary. |
| `===` (Strict Equality) | Checks for **both value and type equality** without type conversion. |

**Example:**

```
console.log(5 == "5"); // true (type coercion happens, string is converted to number)
console.log(5 === "5"); // false (different data types: number vs. string)
console.log(null == undefined); // true (special case where both are considered equal)
console.log(null === undefined); // false (different types)

```

✅ **Best Practice**: Always use `===` to avoid unexpected type coercion.

Reference: [Comparison operators](https://javascript.info/comparison)

* * * * *

### **9\. How does JavaScript handle floating-point arithmetic errors?**

JavaScript uses **IEEE 754 floating-point arithmetic**, which can cause precision errors in calculations due to binary representation limitations.

#### **Example of Floating-Point Precision Issue**

```
console.log(0.1 + 0.2); // 0.30000000000000004

```

This happens because 0.1 and 0.2 cannot be represented exactly in binary, causing rounding errors.

#### **Solutions to Handle Precision Issues**

1.  **Use `toFixed()` for fixed decimal places**

    ```
    console.log((0.1 + 0.2).toFixed(2)); // "0.30"

    ```

    Be careful, as `toFixed()` returns a string.

2.  **Use `Number.EPSILON` for safe comparisons**

    ```
    function isEqual(a, b) {
      return Math.abs(a - b) < Number.EPSILON;
    }
    console.log(isEqual(0.1 + 0.2, 0.3)); // true

    ```

3.  **Use BigInt (for integer operations, not decimals)**

    ```
    console.log(9007199254740991n + 1n); // 9007199254740992n

    ```

For more details, check: [Numbers](https://javascript.info/number)

* * * * *

### **10\. What are Falsy and Truthy Values in JavaScript?**

JavaScript considers some values as **falsy** (evaluated as `false`) and others as **truthy** (evaluated as `true`) in boolean contexts.

#### **Falsy Values (Evaluates to `false` in Boolean Context)**

Only **6 values** are falsy:

```
console.log(Boolean(false)); // false
console.log(Boolean(0)); // false
console.log(Boolean("")); // false (empty string)
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false

```

#### **Truthy Values (Everything Else)**

Any value that is **not falsy** is considered **truthy**, including:

```
console.log(Boolean("hello")); // true (non-empty string)
console.log(Boolean(42)); // true (non-zero number)
console.log(Boolean({})); // true (empty object)
console.log(Boolean([])); // true (empty array)
console.log(Boolean(function() {})); // true (function)

```

✅ **Best Practice**: Use **explicit comparisons** instead of relying on truthy/falsy behavior to avoid unexpected issues.

Reference: [Logical operators](https://javascript.info/logical-operators)

* * * * *

Here are detailed answers to your questions, following the same structured approach and referencing [The Modern JavaScript Tutorial](https://javascript.info/).

* * * * *

### **11\. Explain Short-Circuit Evaluation in JavaScript.**

Short-circuit evaluation means that JavaScript stops evaluating an expression as soon as the result is determined. This applies to logical operators like `&&` (AND) and `||` (OR).

#### **Logical OR (`||`) - Returns the first truthy value**

-   If the first operand is truthy, it **immediately returns it** and stops checking the rest.

-   If the first operand is falsy, it evaluates the next operand.

    ```
    console.log(0 || "Hello"); // "Hello" (0 is falsy, so it returns "Hello")
    console.log("" || 42); // 42 ("" is falsy)
    console.log(null || undefined || "JS"); // "JS" (first truthy value)

    ```

#### **Logical AND (`&&`) - Returns the first falsy value**

-   If the first operand is **falsy**, it immediately returns that value.

-   Otherwise, it evaluates and returns the second operand.

    ```
    console.log(1 && "Hello"); // "Hello" (both truthy, so returns last value)
    console.log(0 && "JS"); // 0 (stops at first falsy value)
    console.log("Text" && null && 42); // null (stops at first falsy)

    ```

#### **Practical Uses**

-   **Default values using `||` (before ES6)**

    ```
    let name = userName || "Guest"; // If userName is falsy, use "Guest"

    ```

-   **Conditional execution using `&&`**

    ```
    isLoggedIn && showDashboard(); // Runs only if isLoggedIn is truthy

    ```

Reference: [Logical operators](https://javascript.info/logical-operators)

* * * * *

### **12\. What is `NaN`, and how do you check if a value is NaN?**

#### **What is `NaN`?**

`NaN` (Not-a-Number) is a special value in JavaScript that represents an invalid number result.

#### **Examples of `NaN` values**

```
console.log(0 / 0); // NaN
console.log(Math.sqrt(-1)); // NaN
console.log(parseInt("Hello")); // NaN

```

#### **How to Check for `NaN`?**

1.  **Using `Number.isNaN()` (Best method)**

    ```
    console.log(Number.isNaN(NaN)); // true
    console.log(Number.isNaN("Hello")); // false
    console.log(Number.isNaN(42)); // false

    ```

    This method correctly identifies `NaN` and does not mistakenly treat other non-numbers as `NaN`.

2.  **Using `isNaN()` (Avoid this, as it converts values to numbers first)**

    ```
    console.log(isNaN("Hello")); // true (Incorrect because "Hello" is not a number)
    console.log(isNaN(NaN)); // true

    ```

✅ **Key Takeaway**: Always use `Number.isNaN()` for accurate checks.

Reference: [Numbers](https://javascript.info/number)

* * * * *

### **13\. How does JavaScript handle big integers?**

JavaScript normally represents numbers using **64-bit floating-point format (IEEE 754)**, which limits precision for very large integers.

#### **Introducing `BigInt`** (ES11/ES2020)

To handle extremely large integers, JavaScript provides **BigInt**, which can store integers beyond `Number.MAX_SAFE_INTEGER`.

#### **How to Use `BigInt`**

1.  **Creating a `BigInt` by adding `n` at the end of a number**

    ```
    let bigNumber = 9007199254740991n; // BigInt
    console.log(bigNumber + 1n); // 9007199254740992n

    ```

2.  **Using `BigInt()` constructor**

    ```
    let bigNum = BigInt("900719925474099123456789");
    console.log(bigNum);

    ```

3.  **Operations on `BigInt`**

    ```
    console.log(100n + 200n); // 300n
    console.log(100n * 5n); // 500n

    ```

#### **Limitations of `BigInt`**

-   Cannot be mixed with regular `Number` types

    ```
    console.log(10n + 5); // TypeError!

    ```

-   Cannot use `Math` functions on `BigInt`

    ```
    console.log(Math.sqrt(16n)); // TypeError!

    ```

Reference: [BigInt](https://javascript.info/bigint)

* * * * *

### **14\. What are global variables, and why should you avoid them?**

#### **What is a Global Variable?**

A **global variable** is a variable declared outside of any function, making it accessible from anywhere in the script.

#### **Example of Global Variable**

```
var globalVar = "I'm global"; // Declared outside any function

function test() {
  console.log(globalVar); // Accessible inside function
}

test();

```

#### **Why Should You Avoid Global Variables?**

1.  **Namespace Pollution**

    -   Global variables can **clash** with other scripts or libraries.
2.  **Difficult to Debug**

    -   Since global variables can be modified from anywhere, tracking changes becomes harder.
3.  **Memory Consumption**

    -   They **stay in memory** as long as the program runs, causing potential memory leaks.
4.  **Encapsulation Violation**

    -   Good programming practice promotes **modular and encapsulated** code to prevent unintended side effects.

#### **Best Practices**

-   Use `let` and `const` **inside functions and blocks** instead of `var`.

-   Use **modules** (ES6 `import/export`) to encapsulate variables.

-   Use **IIFE (Immediately Invoked Function Expressions)** to limit scope.

    ```
    (function() {
      let privateVar = "I'm safe!";
      console.log(privateVar);
    })();
    // console.log(privateVar); // Error: privateVar is not defined

    ```

Reference: [Global object](https://javascript.info/global-object)

* * * * *

### **15\. What are template literals, and how do they work?**

#### **What are Template Literals?**

Template literals (introduced in ES6) allow **easier string manipulation** with embedded expressions.

#### **Basic Syntax**

Template literals use **backticks (`) instead of quotes (" or ')**:

```
let name = "John";
console.log(`Hello, ${name}!`); // Hello, John!

```

#### **Features of Template Literals**

1.  **Multiline Strings**

    ```
    let text = `This is
    a multi-line string`;
    console.log(text);

    ```

2.  **Expression Interpolation (`${}`)**

    ```
    let price = 100;
    let discount = 20;
    console.log(`Total price: ${price - discount}`); // Total price: 80

    ```

3.  **Function Calls Inside Template Literals**

    ```
    function greet(name) {
      return `Hello, ${name}!`;
    }
    console.log(`${greet("Alice")}`); // Hello, Alice!

    ```

4.  **Tagged Template Literals** (Advanced Use Case)

    ```
    function tag(strings, value) {
      return `${strings[0]}${value.toUpperCase()}${strings[1]}`;
    }
    let result = tag`Welcome, ${"john"}!`;
    console.log(result); // Welcome, JOHN!

    ```

✅ **Template literals make string handling more powerful and readable!**

Reference: [Strings](https://javascript.info/string)

* * * * *



***Functions & Scope (15 Questions)***

* * * * *

### **1\. What is the difference between function declaration and function expression?**

#### **Function Declaration**

-   A function declaration **defines a function with a name** and is **hoisted** to the top of its scope.

-   This means it can be used **before its definition** in the code.

    ```
    greet(); // Works fine due to hoisting
    function greet() {
      console.log("Hello!");
    }

    ```

#### **Function Expression**

-   A function expression **assigns a function to a variable**.

-   It is **not hoisted**, meaning it cannot be used before it is defined.

    ```
    greet(); // ❌ Error: Cannot access 'greet' before initialization
    const greet = function() {
      console.log("Hello!");
    };

    ```

#### **Key Differences**

| Feature | Function Declaration | Function Expression |
| --- | --- | --- |
| **Hoisting** | ✅ Yes | ❌ No |
| **Can be called before definition?** | ✅ Yes | ❌ No |
| **Syntax** | `function name() {}` | `const name = function() {}` |

✅ **Function declarations are useful when you want to define reusable functions.**\
✅ **Function expressions are useful when passing functions as arguments or for dynamic function creation.**

Reference: [Function Expressions](https://javascript.info/function-expressions)

* * * * *

### **2\. What is the difference between arrow functions and regular functions?**

#### **Arrow Functions (`=>`)**

Arrow functions are a concise way to define functions in JavaScript, introduced in ES6.

```
const add = (a, b) => a + b;
console.log(add(2, 3)); // 5

```

#### **Key Differences**

| Feature | Regular Function | Arrow Function |
| --- | --- | --- |
| **`this` Binding** | `this` depends on how the function is called. | `this` is lexically inherited (from surrounding scope). |
| **`arguments` Object** | ✅ Exists inside the function. | ❌ Not available in arrow functions. |
| **Usage in Methods** | ✅ Suitable for object methods. | ❌ Not suitable for object methods. |
| **Shorter Syntax** | ❌ No | ✅ Yes |

#### **Example: `this` Behavior**

Arrow functions **inherit** `this` from the surrounding scope, while regular functions define their own `this`.

```
const obj = {
  name: "Alice",
  regularFunction: function() {
    console.log(this.name); // "Alice" (this refers to obj)
  },
  arrowFunction: () => {
    console.log(this.name); // undefined (this refers to global scope)
  }
};
obj.regularFunction();
obj.arrowFunction();

```

✅ **Use arrow functions for shorter syntax and lexical `this` binding.**\
✅ **Use regular functions when working with objects or `this`-dependent logic.**

Reference: [Arrow Functions](https://javascript.info/arrow-functions-basics)

* * * * *

### **3\. Explain the concept of lexical scope.**

**Lexical scope** means that a function **remembers the scope** in which it was defined, even when executed elsewhere.

#### **Example: Nested Functions and Lexical Scope**

```
function outer() {
  let message = "Hello";

  function inner() {
    console.log(message); // Accessing outer()'s variable
  }

  return inner;
}

const fn = outer();
fn(); // "Hello" (inner() remembers message)

```

✅ **Inner functions have access to variables from their outer functions.**\
✅ **This concept is used in closures, ensuring access to an outer function's variables.**

Reference: [Lexical Scope](https://javascript.info/closure)

* * * * *

### **4\. How does the JavaScript execution context work?**

#### **JavaScript Execution Context (Call Stack & Memory Phases)**

When JavaScript runs a script, it follows these steps:

1.  **Creation Phase (Memory Allocation)**

    -   A **Global Execution Context (GEC)** is created.
    -   Variables and functions are stored in memory.
    -   Function declarations are hoisted.
2.  **Execution Phase**

    -   Code is executed line by line.
    -   Function calls create a **new Execution Context** (added to the Call Stack).

#### **Example: Call Stack in Action**

```
function first() {
  console.log("First");
}

function second() {
  first();
  console.log("Second");
}

second();
console.log("Third");

```

#### **Call Stack Process**

| Step | Execution |
| --- | --- |
| 1 | `Global Execution Context (GEC)` created |
| 2 | `second()` is called → `second()` Execution Context is created |
| 3 | `first()` is called inside `second()` → `first()` Execution Context is created |
| 4 | `first()` executes & is removed from Call Stack |
| 5 | `second()` executes & is removed from Call Stack |
| 6 | `console.log("Third")` executes in Global Context |

✅ **Understanding Execution Context helps in debugging call stacks and memory issues.**

Reference: [Execution Context](https://javascript.info/execution-context)

* * * * *

### **5\. What are first-class functions in JavaScript?**

In JavaScript, functions are **first-class citizens**, meaning:

1.  They can be assigned to variables.
2.  They can be passed as arguments to other functions.
3.  They can be returned from functions.

#### **Example 1: Assigning Functions to Variables**

```
const sayHello = function() {
  console.log("Hello!");
};
sayHello(); // "Hello!"

```

#### **Example 2: Passing Functions as Arguments**

```
function greet(callback) {
  callback();
}

greet(function() {
  console.log("Good morning!");
}); // "Good morning!"

```

#### **Example 3: Returning Functions from Functions**

```
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplier(2);
console.log(double(5)); // 10

```

✅ **First-class functions allow JavaScript to support functional programming.**

Reference: [First-Class Functions](https://javascript.info/function-expressions)

* * * * *

### **Summary of Key Takeaways**

| Concept | Key Takeaways |
| --- | --- |
| **Function Declaration vs. Expression** | Declarations are hoisted, expressions are not. |
| **Arrow Functions vs. Regular Functions** | Arrow functions have lexical `this`, regular functions do not. |
| **Lexical Scope** | Inner functions remember the scope they were created in. |
| **Execution Context** | Call stack manages function execution. |
| **First-Class Functions** | Functions can be assigned, passed, and returned. |

These concepts form the **core foundation** of JavaScript functions and scope behavior.

Here are detailed explanations of these JavaScript concepts, referencing [The Modern JavaScript Tutorial](https://javascript.info/).

* * * * *

### **6\. Explain higher-order functions with an example.**

A **higher-order function (HOF)** is a function that **takes another function as an argument or returns a function** as a result.

#### **Example: Function that Accepts Another Function**

```
function operateOnNumbers(a, b, operation) {
  return operation(a, b);
}

const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

console.log(operateOnNumbers(5, 3, add)); // 8
console.log(operateOnNumbers(5, 3, multiply)); // 15

```

Here, `operateOnNumbers` is a higher-order function because it accepts another function (`add` or `multiply`) as an argument.

#### **Example: Function that Returns Another Function**

```
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
console.log(double(5)); // 10

```

✅ **Higher-order functions are useful for writing modular, reusable, and clean code.**

Reference: [Higher-Order Functions](https://javascript.info/arrow-functions-basics#callback-functions)

* * * * *

### **7\. What is the difference between parameters and arguments?**

| Concept | Description | Example |
| --- | --- | --- |
| **Parameters** | Variables listed in a function definition. | `function greet(name) {}` (`name` is a parameter) |
| **Arguments** | Values passed to the function when calling it. | `greet("Alice")` (`"Alice"` is an argument) |

#### **Example**

```
function greet(name) {  // 'name' is a parameter
  console.log("Hello, " + name);
}

greet("Alice"); // "Alice" is the argument

```

✅ **Parameters are placeholders; arguments are actual values.**

Reference: [Function Basics](https://javascript.info/function-basics)

* * * * *

### **8\. How does rest parameters work in JavaScript?**

**Rest parameters (`...`)** allow a function to accept an **indefinite number of arguments** as an array.

#### **Example: Gathering Arguments into an Array**

```
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

console.log(sum(1, 2, 3, 4)); // 10

```

Here, `...numbers` collects all arguments into an array.

#### **Rest Parameters vs. Arguments Object**

| Feature | Rest Parameters (`...args`) | `arguments` Object |
| --- | --- | --- |
| **Type** | Array | Array-like object |
| **Availability in Arrow Functions?** | ✅ Yes | ❌ No |
| **Flexibility** | Can be used anywhere | Always includes all arguments |

✅ **Rest parameters are useful for handling variable-length arguments flexibly.**

Reference: [Rest Parameters](https://javascript.info/rest-parameters-spread)

* * * * *

### **9\. What is function currying, and how do you implement it?**

#### **What is Currying?**

**Currying** is a functional programming technique where a function **does not take all its arguments at once but instead returns a series of functions, each taking a single argument**.

Instead of:

```
function sum(a, b, c) {
  return a + b + c;
}

console.log(sum(1, 2, 3)); // 6

```

We use **currying**, which transforms this function into:

```
function curriedSum(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

console.log(curriedSum(1)(2)(3)); // 6

```

* * * * *

#### **Why Use Currying?**

✅ **Reusability:** Allows partial application of functions.\
✅ **Code Modularity:** Helps create small, reusable functions.\
✅ **Avoids Repetition:** You can fix some arguments and reuse the function.

For example, we can create a function that always adds 10:

```
const addTen = curriedSum(10);
console.log(addTen(5)(2)); // 17

```

* * * * *

#### **Implementing Currying in JavaScript**

1️⃣ **Using Nested Functions (Manual Currying)**

```
function multiply(a) {
  return function(b) {
    return function(c) {
      return a * b * c;
    };
  };
}

console.log(multiply(2)(3)(4)); // 24

```

Each function takes **one** argument and returns another function, until all arguments are provided.

* * * * *

2️⃣ **Using Arrow Functions**

```
const curriedMultiply = a => b => c => a * b * c;
console.log(curriedMultiply(2)(3)(4)); // 24

```

* * * * *

3️⃣ **Using JavaScript's `bind` Method** The `bind` method can be used to partially apply arguments, similar to currying:

```
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
console.log(double(5)); // 10

```

* * * * *

4️⃣ **Converting a Normal Function to a Curried Function** A generic function to curry any function:

```
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

// Example Usage
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6

```

✅ **The `curry` function allows partial application, making it highly reusable.**

* * * * *

#### **Where is Currying Used?**

-   **Event Handling:** Pre-define parameters before event execution.
-   **Functional Composition:** Writing reusable, modular functions.
-   **API Calls:** Pre-fill common arguments (e.g., authentication tokens).

✅ **Currying is widely used in libraries like Lodash and Ramda for functional programming.**

📌 **Reference:** [Currying in JavaScript](https://javascript.info/currying-partials)

* * * * *

### **10\. What is the difference between `call`, `apply`, and `bind`?**

#### **1️⃣ Understanding `this` in JavaScript**

Before we understand `call`, `apply`, and `bind`, let's recall that **functions in JavaScript can have a dynamic `this`**, which depends on how they are called.

Example:

```
const user = {
  name: "Alice",
  greet: function() {
    console.log(`Hello, I am ${this.name}`);
  }
};

user.greet(); // "Hello, I am Alice"

const greetFunc = user.greet;
greetFunc(); // Undefined or "Hello, I am undefined" (depends on strict mode)

```

Since `greetFunc()` is called separately, **`this` is lost**, leading to unexpected results.

✅ **To explicitly set `this`, we use `call`, `apply`, and `bind`.**

* * * * *

### **2️⃣ Differences Between `call`, `apply`, and `bind`**

| Method | Description | Syntax |
| --- | --- | --- |
| **call** | Calls a function with a specific `this` value and arguments passed individually. | `func.call(thisArg, arg1, arg2, ...)` |
| **apply** | Similar to `call`, but arguments are passed as an array. | `func.apply(thisArg, [arg1, arg2, ...])` |
| **bind** | Returns a new function with permanently bound `this`, but does not execute it immediately. | `const newFunc = func.bind(thisArg, arg1, arg2, ...)` |

* * * * *

### **3️⃣ Examples of `call`, `apply`, and `bind`**

#### **Using `call`**

```
const person = { name: "Bob" };

function introduce(city) {
  console.log(`Hi, I'm ${this.name} from ${city}`);
}

introduce.call(person, "New York"); // "Hi, I'm Bob from New York"

```

✅ **`call` executes the function immediately.**

* * * * *

#### **Using `apply`**

```
introduce.apply(person, ["Los Angeles"]); // "Hi, I'm Bob from Los Angeles"

```

✅ **Same as `call`, but arguments are passed as an array.**

* * * * *

#### **Using `bind`**

```
const boundIntroduce = introduce.bind(person, "Chicago");
boundIntroduce(); // "Hi, I'm Bob from Chicago"

```

✅ **`bind` does not execute immediately; instead, it returns a new function.**

* * * * *

### **4️⃣ When to Use Which?**

| Situation | Use |
| --- | --- |
| **Call a function immediately with `this` and individual arguments** | `call` |
| **Call a function immediately with `this` and an array of arguments** | `apply` |
| **Create a new function with permanently bound `this` (use later)** | `bind` |

* * * * *

### **5️⃣ More Advanced Use Cases**

#### **Using `bind` for Event Listeners**

```
const user = {
  name: "Alice",
  showName() {
    console.log(this.name);
  }
};

const button = document.querySelector("button");
button.addEventListener("click", user.showName.bind(user)); // Works correctly!

```

Without `bind`, `this` would refer to the button, not `user`.

* * * * *

#### **Using `apply` for Function Borrowing**

```
const numbers = [1, 2, 3, 4, 5];

const maxNumber = Math.max.apply(null, numbers);
console.log(maxNumber); // 5

```

✅ **Apply is useful when passing an array to a function that expects multiple arguments.**

* * * * *

### **6️⃣ Summary**

| Method | Executes Immediately? | Accepts Arguments? | Binds `this` Permanently? |
| --- | --- | --- | --- |
| **call** | ✅ Yes | ✅ Individual args | ❌ No |
| **apply** | ✅ Yes | ✅ Array | ❌ No |
| **bind** | ❌ No | ✅ Can pass args | ✅ Yes |

✅ **Use `call` and `apply` when you want to execute the function immediately.**\
✅ **Use `bind` when you want to create a new function with a fixed `this`.**

📌 **Reference:** [Call, Apply, and Bind in JavaScript](https://javascript.info/call-apply-decorators)

* * * * *

### **Final Takeaways**

-   **Currying** breaks down functions into smaller functions for **reusability**.
-   **Call, Apply, and Bind** are methods to **control `this` in JavaScript functions**.

### **11\. Explain Closures with an Example**

#### **What is a Closure?**

A **closure** is a function that remembers the variables from its outer scope even after the outer function has finished execution. It allows a function to have **persistent private state**.

* * * * *

#### **Example of Closure**

```
function outerFunction(outerVariable) {
  return function innerFunction(innerVariable) {
    console.log(`Outer: ${outerVariable}, Inner: ${innerVariable}`);
  };
}

const closureFunc = outerFunction("Hello");
closureFunc("World"); // Output: Outer: Hello, Inner: World

```

✅ Even after `outerFunction` has returned, `innerFunction` still remembers `outerVariable`.

* * * * *

#### **Why Are Closures Useful?**

1.  **Data Encapsulation (Private Variables)** -- Variables inside closures are not accessible from the outside.
2.  **Function Factories** -- Helps create specialized functions dynamically.
3.  **Event Handlers & Callbacks** -- Used in asynchronous operations to maintain state.

**Example: Creating a Counter Using Closures**

```
function createCounter() {
  let count = 0; // Private variable
  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

```

📌 **Reference:** [Closures in JavaScript](https://javascript.info/closure)


Closures are a powerful concept in many programming languages (like JavaScript, Python, etc.), but they come with certain **disadvantages and potential pitfalls**, especially if not used carefully:

---

### 🔻 **Disadvantages of Closures**

1. ### **Increased Memory Usage / Potential Memory Leaks**

   * Closures keep variables from their outer scope in memory **even after the outer function has finished executing**.
   * If not managed properly, this can lead to memory leaks, especially in long-running applications or with unintended references.

2. ### **Harder to Debug**

   * Because closures "remember" the environment where they were created, it can be difficult to trace where a variable is coming from, especially if the codebase is large.
   * Debugging becomes trickier when nested scopes are involved.

3. ### **Overhead and Performance**

   * Each closure creates a new function object with a reference to its outer scope, which may incur overhead, particularly if many closures are created dynamically (e.g. inside loops).

4. ### **Unintended Variable Capture**

   * Common mistake: when closures in loops capture the same variable (e.g. in `for` loops in JavaScript), all closures might share the same final value.
   * This leads to bugs that can be hard to spot.

   ```javascript
   const funcs = [];
   for (var i = 0; i < 3; i++) {
       funcs.push(function() { console.log(i); });
   }
   funcs[0](); // 3
   funcs[1](); // 3
   funcs[2](); // 3
   ```

5. ### **Tight Coupling**

   * Closures can tightly bind functions to specific data structures, making code harder to reuse or test in isolation.

6. ### **Complexity and Readability**

   * Nested closures and the use of lexical scope can reduce readability for developers who are not familiar with the concept.
   * It might hide where values are coming from or being changed.

---

### 🔍 Summary

| Disadvantage            | Description                                                 |
| ----------------------- | ----------------------------------------------------------- |
| Memory issues           | Can lead to memory leaks if not handled carefully           |
| Debugging difficulty    | Hard to trace scope and variable sources                    |
| Performance overhead    | Especially when many closures are created                   |
| Variable capture issues | Capturing the wrong value in loops                          |
| Tight coupling          | Makes functions less reusable or harder to test             |
| Reduced readability     | Nested closures can be confusing for others (or future you) |

---

Let me know if you want code examples in a specific language or suggestions on how to **mitigate** these downsides.



* * * * *

### **12\. How Do You Create Private Variables in JavaScript?**

#### **What Are Private Variables?**

Private variables are variables that **cannot be accessed directly from outside a function**. In JavaScript, we achieve this using **closures** or **ES6 private fields in classes**.

* * * * *

#### **1️⃣ Private Variables Using Closures**

```
function BankAccount(initialBalance) {
  let balance = initialBalance; // Private variable

  return {
    deposit(amount) {
      balance += amount;
      console.log(`Deposited: ${amount}, Balance: ${balance}`);
    },
    withdraw(amount) {
      if (amount > balance) {
        console.log("Insufficient funds");
      } else {
        balance -= amount;
        console.log(`Withdrawn: ${amount}, Balance: ${balance}`);
      }
    },
    getBalance() {
      return balance; // Private access
    }
  };
}

const account = BankAccount(100);
account.deposit(50);
console.log(account.getBalance()); // 150
console.log(account.balance); // undefined (private)

```

* * * * *

#### **2️⃣ Private Variables Using ES6 Classes**

```
class BankAccount {
  #balance; // Private field

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const myAccount = new BankAccount(200);
console.log(myAccount.getBalance()); // 200
console.log(myAccount.#balance); // Error (private variable)

```

✅ **Using `#` makes `balance` private, preventing external access.**

📌 **Reference:** [Private Variables in JavaScript](https://javascript.info/private-protected-properties-methods)

* * * * *

### **13\. How Does IIFE (Immediately Invoked Function Expression) Work?**

#### **What is an IIFE?**

An **Immediately Invoked Function Expression (IIFE)** is a function that is **executed immediately after it is defined**. It is used to **create a private scope** and **avoid polluting the global namespace**.

* * * * *

#### **Example of IIFE**

```
(function () {
  console.log("IIFE executed!");
})(); // Output: IIFE executed!

```

✅ **Since the function is wrapped in `()`, it is executed immediately.**

* * * * *

#### **Why Use IIFE?**

1.  **Avoids Global Scope Pollution**
2.  **Creates a Private Scope** -- Useful for keeping variables encapsulated.
3.  **Used in Module Patterns**

* * * * *

#### **Example: Using IIFE to Create a Private Variable**

```
const counter = (function () {
  let count = 0; // Private variable

  return {
    increment() {
      count++;
      console.log(`Count: ${count}`);
    },
    getCount() {
      return count;
    }
  };
})();

counter.increment(); // Count: 1
counter.increment(); // Count: 2
console.log(counter.getCount()); // 2

```

✅ **`count` is private because it is inside the IIFE.**

📌 **Reference:** [IIFE in JavaScript](https://javascript.info/var#immediately-invoked-function-expression)

* * * * *

### **14\. What Are Pure Functions, and Why Are They Important?**

#### **What is a Pure Function?**

A **pure function** is a function that **always returns the same output for the same input and has no side effects**.

* * * * *

#### **Characteristics of Pure Functions**

✅ **Deterministic** -- Given the same input, it always returns the same output.\
✅ **No Side Effects** -- Does not modify external variables, database, or DOM.\
✅ **Immutable Data** -- Works with immutable data instead of modifying variables.

* * * * *

#### **Example of a Pure Function**

```
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5
console.log(add(2, 3)); // 5 (always returns the same result)

```

✅ **`add` is pure because it doesn't modify any external state.**

* * * * *

#### **Example of an Impure Function**

```
let total = 0;

function addToTotal(value) {
  total += value;
  return total;
}

console.log(addToTotal(5)); // 5
console.log(addToTotal(5)); // 10 (different output for same input)

```

❌ **This function is impure because it modifies `total`, which is an external variable.**

* * * * *

#### **Why Are Pure Functions Important?**

1.  **Easier to Test and Debug** -- No dependencies on external state.
2.  **Reusable and Composable** -- Can be combined with other functions easily.
3.  **Used in Functional Programming and Redux** -- Helps in state management.

📌 **Reference:** [Pure Functions in JavaScript](https://javascript.info/function-basics)

* * * * *

### **15\. How Does Function Hoisting Work in JavaScript?**

#### **What is Hoisting?**

**Hoisting** is a behavior in JavaScript where **function declarations and variables are moved to the top of their scope before execution**.

* * * * *

#### **Function Hoisting Example**

```
sayHello();

function sayHello() {
  console.log("Hello!");
}

```

✅ Even though `sayHello()` is called **before it is defined**, the function executes correctly because it is **hoisted**.

* * * * *

#### **Hoisting with Function Expressions**

Unlike function declarations, **function expressions are not hoisted**.

```
greet(); // Error: Cannot access 'greet' before initialization

const greet = function() {
  console.log("Hi!");
};

```

❌ **Only function declarations are hoisted, not function expressions.**

* * * * *

#### **How JavaScript Interprets Hoisting Internally**

When JavaScript compiles the code, it **moves function declarations to the top** but does **not** move function expressions:

```
// Internally, JavaScript does this:
function sayHello() {
  console.log("Hello!");
}

sayHello();

```

✅ This is why function declarations work before they are defined.

* * * * *

#### **Key Takeaways About Hoisting**

| Concept | Hoisted? |
| --- | --- |
| **Function Declarations** (`function myFunc() {}`) | ✅ Yes |
| **Function Expressions** (`const myFunc = function() {};`) | ❌ No |
| **Arrow Functions** (`const myFunc = () => {};`) | ❌ No |

📌 **Reference:** [Hoisting in JavaScript](https://javascript.info/var#var-hoisting)

* * * * *

### **Final Takeaways**

-   **Closures** help retain variables after a function has executed.
-   **Private Variables** can be created using closures or ES6 `#privateFields`.
-   **IIFE** is an immediately executed function to avoid polluting the global scope.
-   **Pure Functions** return the same output for the same input, with no side effects.
-   **Hoisting** moves function declarations to the top but not function expressions.


***3. Objects & Prototypes (15 Questions)***

### **1\. What is the difference between Dot Notation and Bracket Notation?**

In JavaScript, there are two ways to access an object's properties:

1.  **Dot Notation (`object.property`)**
2.  **Bracket Notation (`object["property"]`)**

* * * * *

#### **Dot Notation (`.`)**

✅ The most common and preferred way to access properties.\
✅ Only works when the property name is **a valid identifier** (e.g., no spaces or special characters).

```
const person = {
  name: "John",
  age: 30
};

console.log(person.name); // John
console.log(person.age);  // 30

```

❌ **Not suitable if the property name has spaces or special characters.**

* * * * *

#### **Bracket Notation (`[]`)**

✅ More flexible, works with **dynamic property names** and **special characters**.\
✅ Needed when **accessing properties with variables**.

```
const person = {
  "full name": "John Doe",
  age: 30
};

console.log(person["full name"]); // John Doe

let key = "age";
console.log(person[key]); // 30 (using variable as a key)

```

* * * * *

#### **When to Use Which?**

| Feature | Dot Notation | Bracket Notation |
| --- | --- | --- |
| Readability | ✅ Easier to read | ❌ Less readable |
| Works with special characters | ❌ No | ✅ Yes |
| Supports dynamic property names | ❌ No | ✅ Yes |

📌 **Reference:** [Property Access in JavaScript](https://javascript.info/object#property-access)

* * * * *

### **2\. How Do You Iterate Over an Object's Properties?**

You can iterate over an object using:

1.  **`for...in` loop**
2.  **`Object.keys()`**
3.  **`Object.values()`**
4.  **`Object.entries()`**

* * * * *

#### **1️⃣ `for...in` Loop (Iterates Over Keys)**

✅ Best for iterating over all enumerable properties.\
❌ Includes inherited properties (use `hasOwnProperty` to filter).

```
const person = { name: "John", age: 30 };

for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}
// name: John
// age: 30

```

* * * * *

#### **2️⃣ `Object.keys()` (Returns an Array of Keys)**

```
const keys = Object.keys(person);
console.log(keys); // ["name", "age"]

```

* * * * *

#### **3️⃣ `Object.values()` (Returns an Array of Values)**

```
const values = Object.values(person);
console.log(values); // ["John", 30]

```

* * * * *

#### **4️⃣ `Object.entries()` (Returns an Array of Key-Value Pairs)**

```
const entries = Object.entries(person);
console.log(entries); // [["name", "John"], ["age", 30]]

```

📌 **Reference:** [Looping Through Objects](https://javascript.info/object#property-order)

* * * * *

### **3\. What Are Getters and Setters in JavaScript?**

**Getters (`get`)** and **Setters (`set`)** allow **controlled access** to an object's properties.

* * * * *

#### **Example Using `get` and `set`**

```
const user = {
  firstName: "John",
  lastName: "Doe",

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" ");
  }
};

console.log(user.fullName); // "John Doe"

user.fullName = "Jane Smith";
console.log(user.firstName); // "Jane"
console.log(user.lastName);  // "Smith"

```

✅ **Advantages:**

-   Allows computed properties (e.g., `fullName`).
-   Can add validation or transformations when setting values.

📌 **Reference:** [Getters and Setters](https://javascript.info/property-accessors)

* * * * *

### **4\. What is the Difference Between `Object.freeze()` and `Object.seal()`?**

| Feature | `Object.freeze()` | `Object.seal()` |
| --- | --- | --- |
| Prevents adding new properties | ✅ Yes | ✅ Yes |
| Prevents modifying existing properties | ✅ Yes | ❌ No |
| Prevents deleting properties | ✅ Yes | ✅ Yes |
| Prevents reassigning property values | ✅ Yes | ❌ No |

* * * * *

#### **Example: `Object.freeze()` (Fully Immutable)**

```
const obj = { name: "John" };
Object.freeze(obj);

obj.name = "Doe"; // ❌ No effect (modification prevented)
obj.age = 30;     // ❌ No effect (new property prevented)
delete obj.name;  // ❌ No effect (deletion prevented)

console.log(obj); // { name: "John" }

```

* * * * *

#### **Example: `Object.seal()` (Modifiable but No New Properties)**

```
const obj = { name: "John" };
Object.seal(obj);

obj.name = "Doe"; // ✅ Allowed
obj.age = 30;     // ❌ Not allowed
delete obj.name;  // ❌ Not allowed

console.log(obj); // { name: "Doe" }

```

📌 **Reference:** [Freezing & Sealing Objects](https://javascript.info/property-descriptors#freezing-an-object)

* * * * *

### **5\. How Does `Object.assign()` Work?**

✅ **Copies properties from source objects to a target object.**\
✅ **Shallow copy** (does not clone nested objects).

* * * * *

#### **Example**

```
const target = { a: 1 };
const source = { b: 2, c: 3 };

Object.assign(target, source);
console.log(target); // { a: 1, b: 2, c: 3 }

```

📌 **Reference:** [Object.assign()](https://javascript.info/object#copying-objects)

* * * * *

### **6\. What is the Difference Between `Object.create()` and `new Object()`?**

| Feature | `Object.create(proto)` | `new Object()` |
| --- | --- | --- |
| Creates an object with a specific prototype | ✅ Yes | ❌ No (inherits from `Object.prototype`) |
| More flexible inheritance | ✅ Yes | ❌ No |

* * * * *

#### **Example: `Object.create()` (Custom Prototype)**

```
const animal = {
  makeSound() {
    console.log("Some sound");
  }
};

const dog = Object.create(animal);
dog.makeSound(); // "Some sound"

```

* * * * *

#### **Example: `new Object()` (Default Prototype)**

```
const obj = new Object();
console.log(obj); // {}

```

📌 **Reference:** [Object.create() vs. new Object()](https://javascript.info/prototype-inheritance)

* * * * *

### **7\. What is the Prototype Chain in JavaScript?**

The **prototype chain** is JavaScript's inheritance mechanism.\
Every object **inherits properties and methods from its prototype**.

* * * * *

#### **Example of Prototype Chain**

```
const obj = {};
console.log(obj.toString()); // Inherited from Object.prototype

```

✅ **`obj` does not define `toString()`, but it is inherited from `Object.prototype`.**

* * * * *

#### **Custom Prototype Example**

```
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name}`);
};

const john = new Person("John");
john.greet(); // "Hello, my name is John"

```

✅ **`john` has access to `greet()` because of prototype inheritance.**

📌 **Reference:** [Prototype Chain](https://javascript.info/prototype-inheritance)

* * * * *

### **Final Takeaways**

-   **Dot Notation (`.`) is simpler; Bracket Notation (`[]`) is more flexible.**
-   **Use `for...in`, `Object.keys()`, `Object.values()`, and `Object.entries()` to iterate over objects.**
-   **Getters and Setters allow controlled access to object properties.**
-   **Use `Object.freeze()` for full immutability, `Object.seal()` for preventing new properties.**
-   **`Object.assign()` is used for shallow copying.**
-   **Prototype Chain allows objects to inherit properties and methods.**

🚀 **Mastering these concepts will help in JavaScript interviews and real-world applications!**

### **8\. How Do You Implement Inheritance Using Prototypes?**

**Inheritance using prototypes** allows one object to inherit properties and methods from another object.

* * * * *

#### **Example of Prototype Inheritance**

```
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(`${this.name} makes a noise.`);
};

function Dog(name, breed) {
  Animal.call(this, name); // Call the parent constructor
  this.breed = breed;
}

// Inherit from Animal prototype
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  console.log(`${this.name} barks.`);
};

const myDog = new Dog("Rex", "Labrador");
myDog.speak(); // "Rex makes a noise."
myDog.bark(); // "Rex barks."

```

✅ **Key Steps:**

1.  Use `Object.create()` to set up inheritance.
2.  Call the parent constructor with `call()`.
3.  Set the `constructor` property correctly.

📌 **Reference:** [Prototype Inheritance](https://javascript.info/prototype-inheritance)

* * * * *

### **9\. What Are ES6 Classes, and How Do They Work?**

ES6 introduced **class syntax** for object-oriented programming in JavaScript.\
It's **syntactic sugar** over prototype-based inheritance.

* * * * *

#### **Example of ES6 Class**

```
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

const dog = new Animal("Rex");
dog.speak(); // "Rex makes a noise."

```

✅ **Benefits of ES6 Classes:**

-   More readable and structured.
-   Uses `constructor` method to initialize properties.
-   Supports `extends` for easy inheritance.

📌 **Reference:** [ES6 Classes](https://javascript.info/class)

* * * * *

### **10\. Difference Between ES6 Class Inheritance and Prototype Inheritance?**

| Feature | Prototype Inheritance | ES6 Class Inheritance |
| --- | --- | --- |
| Syntax | Complex, manual | Cleaner, structured |
| `new` keyword | Not required | Required |
| Constructor function | Uses function syntax | Uses `class` keyword |
| Inheritance | Uses `Object.create()` and `call()` | Uses `extends` and `super()` |

📌 **Reference:** [ES6 Class vs Prototype Inheritance](https://javascript.info/class-inheritance)

* * * * *

### **11\. How Do You Clone an Object in JavaScript?**

✅ **Shallow Copy (1 Level Deep)**

```
const obj = { name: "John", age: 30 };
const clone = { ...obj };

console.log(clone); // { name: "John", age: 30 }

```

✅ **Deep Copy (Nested Objects)**

```
const deepClone = JSON.parse(JSON.stringify(obj));

```

📌 **Reference:** [Copying Objects](https://javascript.info/object#copying-objects)

* * * * *

### **12\. How Do You Merge Two Objects in JavaScript?**

✅ **Using `Object.assign()`**

```
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3 };

const merged = Object.assign({}, obj1, obj2);
console.log(merged); // { a: 1, b: 2, c: 3 }

```

✅ **Using Spread Operator (`...`)**

```
const merged = { ...obj1, ...obj2 };

```

📌 **Reference:** [Merging Objects](https://javascript.info/object#merging-objects)

* * * * *

### **13\. What Are WeakMap and WeakSet, and How Are They Different from Map/Set?**

| Feature | `Map` / `Set` | `WeakMap` / `WeakSet` |
| --- | --- | --- |
| Stores | Any type of keys/values | Only objects as keys |
| Garbage Collection | No automatic cleanup | Automatically removes unused objects |
| Iteration | Supports iteration | No iteration |

* * * * *

#### **Example: `WeakMap`**

```
let user = { name: "John" };
let weakMap = new WeakMap();
weakMap.set(user, "User data");

user = null; // Now, WeakMap automatically removes this entry

```

📌 **Reference:** [WeakMap and WeakSet](https://javascript.info/weakmap-weakset)

* * * * *

### **14\. Difference Between `Object.entries()`, `Object.keys()`, and `Object.values()`?**

| Method | Returns |
| --- | --- |
| `Object.keys(obj)` | Array of keys |
| `Object.values(obj)` | Array of values |
| `Object.entries(obj)` | Array of key-value pairs |

* * * * *

#### **Example**

```
const obj = { name: "John", age: 30 };

console.log(Object.keys(obj));   // ["name", "age"]
console.log(Object.values(obj)); // ["John", 30]
console.log(Object.entries(obj));// [["name", "John"], ["age", 30]]

```

📌 **Reference:** [Object Methods](https://javascript.info/object#property-order)

### 🧠 `WeakMap` in JavaScript — What It Is and When to Use It

---

### 📦 What is a `WeakMap`?

A `WeakMap` is a special kind of `Map` where:

* **Keys must be objects** (not primitives)
* The references to those keys are **weak** — meaning they do **not prevent garbage collection**

```js
const wm = new WeakMap();
const obj = { name: "Alice" };

wm.set(obj, "some value");
```

Now if `obj` is no longer referenced elsewhere in your code, both `obj` and `"some value"` can be **garbage collected**.

---

### 📌 When to Use `WeakMap`

Use `WeakMap` when you want to **associate data with objects privately**, and **let them be garbage collected** once they're no longer used.

#### ✅ Ideal Use Cases

---

### 1. **Private Data for Objects (Encapsulation)**

You can use `WeakMap` to store "hidden" data for an object that is inaccessible from outside.

```js
const privateData = new WeakMap();

class Counter {
  constructor() {
    privateData.set(this, { count: 0 });
  }

  increment() {
    const data = privateData.get(this);
    data.count += 1;
  }

  get value() {
    return privateData.get(this).count;
  }
}
```

🔒 `privateData` is **truly private** — cannot be accessed or leaked from outside.

---

### 2. **Caching Computed Results Without Memory Leaks**

```js
const cache = new WeakMap();

function heavyCompute(obj) {
  if (cache.has(obj)) return cache.get(obj);

  const result = expensiveComputation(obj);
  cache.set(obj, result);
  return result;
}
```

When `obj` is no longer used, both `obj` and the cached result are cleaned up automatically.

---

### 3. **DOM Element Metadata**

In UI libraries or DOM manipulation tools, you might attach metadata to DOM elements without modifying them.

```js
const elementMeta = new WeakMap();

function addMeta(el, data) {
  elementMeta.set(el, data);
}

function getMeta(el) {
  return elementMeta.get(el);
}
```

If the DOM node is removed, its metadata is also freed.

---

### ❌ When **NOT** to Use `WeakMap`

* If you need to **iterate** over the contents → `WeakMap` is not iterable.
* If you need to **store primitive keys** like strings, numbers → not allowed.
* If you want to **persist** data or log all keys → not possible with `WeakMap`.

---

### 🔍 Summary Table

| Feature             | `Map`           | `WeakMap`                     |
| ------------------- | --------------- | ----------------------------- |
| Key types           | Any             | Only objects                  |
| Garbage collection  | No              | Yes                           |
| Iteration supported | Yes             | No                            |
| Use case            | General purpose | Private data, caching with GC |

---

Let me know if you want code examples comparing `Map` vs `WeakMap` side by side or a deep dive into garbage collection behavior.


* * * * *

### **15\. How Do You Delete a Property from an Object?**

✅ **Using `delete` Operator**

```
const obj = { name: "John", age: 30 };
delete obj.age;

console.log(obj); // { name: "John" }

```

✅ **Using `Object Destructuring`**

```
const { age, ...rest } = obj;
console.log(rest); // { name: "John" }

```

📌 **Reference:** [Deleting Object Properties](https://javascript.info/object#deleting-properties)

* * * * *

### **Final Takeaways**

-   **Prototype Inheritance**: Use `Object.create()` and `call()`.
-   **ES6 Classes**: Use `class` and `extends`.
-   **Cloning Objects**: Use `{ ...obj }` for shallow copies, `JSON.parse(JSON.stringify(obj))` for deep copies.
-   **Merging Objects**: Use `Object.assign()` or spread (`...`).
-   **WeakMap & WeakSet**: Store only objects and automatically clean up memory.
-   **Deleting Properties**: Use `delete` or destructuring.

***Arrays & Iteration (15 Questions)***

### **1\. What is the difference between `map()`, `filter()`, and `reduce()`?**

These three methods are commonly used for array transformations in JavaScript.

| Method | Purpose | Returns | Mutates Original Array? |
| --- | --- | --- | --- |
| `map()` | Transforms each element | New array with transformed values | ❌ No |
| `filter()` | Filters elements based on a condition | New array with filtered values | ❌ No |
| `reduce()` | Reduces array to a single value | A single value (number, array, object, etc.) | ❌ No |

#### **Example**

```
const numbers = [1, 2, 3, 4, 5];

// map() - squares each number
const squared = numbers.map(num => num * num);
console.log(squared); // [1, 4, 9, 16, 25]

// filter() - filters even numbers
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

// reduce() - sums all numbers
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15

```

📌 **Reference:** [Array Methods](https://javascript.info/array-methods)

* * * * *

### **2\. How Do You Remove Duplicates from an Array?**

✅ **Using `Set` (Most Efficient)**

```
const arr = [1, 2, 3, 4, 4, 5, 5];
const uniqueArr = [...new Set(arr)];
console.log(uniqueArr); // [1, 2, 3, 4, 5]

```

✅ **Using `filter()` and `indexOf()`**

```
const unique = arr.filter((value, index, self) => self.indexOf(value) === index);

```

✅ **Using `reduce()`**

```
const unique = arr.reduce((acc, val) => acc.includes(val) ? acc : [...acc, val], []);

```

📌 **Reference:** [Array Methods](https://javascript.info/array-methods)

* * * * *

### **3\. How Do You Flatten a Multi-Dimensional Array?**

✅ **Using `flat()` (ES6+)**

```
const nestedArr = [1, [2, 3], [[4, 5]]];
console.log(nestedArr.flat(2)); // [1, 2, 3, 4, 5]

```

✅ **Using `reduce()`**

```
const flatArr = (arr) => arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatArr(val) : val), []);
console.log(flatArr(nestedArr)); // [1, 2, 3, 4, 5]

```

📌 **Reference:** [Flattening Arrays](https://javascript.info/array-methods#flat)

* * * * *

### **4\. How Does `Array.prototype.sort()` Work?**

`sort()` **mutates** the original array and sorts elements as **strings** by default.

#### **Example**

```
const numbers = [4, 2, 10, 1];
numbers.sort();
console.log(numbers); // [1, 10, 2, 4] (Wrong order!)

```

❌ **Why?** Because `sort()` treats numbers as strings. `"10"` comes before `"2"`.

✅ **Fix using Compare Function**

```
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 2, 4, 10]

```

📌 **Reference:** [Sorting Arrays](https://javascript.info/array-methods#sort)

* * * * *

### **5\. What is the Difference Between `slice()` and `splice()`?**

| Method | Purpose | Returns | Mutates Original Array? |
| --- | --- | --- | --- |
| `slice()` | Extracts part of an array | New array | ❌ No |
| `splice()` | Adds/removes elements | Removed elements | ✅ Yes |

#### **Example**

```
const arr = [1, 2, 3, 4, 5];

// slice(start, end) (end is exclusive)
console.log(arr.slice(1, 4)); // [2, 3, 4]

// splice(start, deleteCount, item1, item2, ...)
arr.splice(2, 2, 99, 100);
console.log(arr); // [1, 2, 99, 100, 5]

```

📌 **Reference:** [Slice vs. Splice](https://javascript.info/array-methods#splice)

* * * * *

### **6\. How Do You Find the Intersection of Two Arrays?**

✅ **Using `filter()` and `includes()`**

```
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];

const intersection = arr1.filter(num => arr2.includes(num));
console.log(intersection); // [3, 4]

```

✅ **Using `Set` for Faster Lookup**

```
const set2 = new Set(arr2);
const intersection = arr1.filter(num => set2.has(num));

```

📌 **Reference:** [Set Methods](https://javascript.info/map-set#iteration-over-map-and-set)

* * * * *

### **7\. How Do You Shuffle an Array in JavaScript?**

✅ **Using the Fisher-Yates Algorithm (Best Approach)**

```
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap
  }
}

```

✅ **Using `sort()` and `Math.random()` (Less Random)**

```
arr.sort(() => Math.random() - 0.5);

```

📌 **Reference:** [Shuffling Arrays](https://javascript.info/array-methods#shuffle-an-array)

* * * * *

### **Final Takeaways**

-   **Use `map()`, `filter()`, and `reduce()` for array operations**.
-   **Use `Set` to remove duplicates**.
-   **Use `flat()` or recursion to flatten arrays**.
-   **Use a compare function in `sort()` for numeric sorting**.
-   **Use `slice()` to copy, `splice()` to modify**.
-   **Use `Set` for efficient intersections**.
-   **Use Fisher-Yates for shuffling**.

### **8\. What is the Difference Between `forEach()` and `map()`?**

Both methods iterate over an array, but they have key differences:

| Feature | `forEach()` | `map()` |
| --- | --- | --- |
| Return Value | **Undefined** (does not return a new array) | **New array** with modified values |
| Purpose | Used for side effects (e.g., logging, modifying external variables) | Used for transforming data |
| Mutates Original Array? | ❌ No (but can if modifying elements inside) | ❌ No |

#### **Example**

```
const numbers = [1, 2, 3];

// forEach() - Executes a function but does not return a new array
numbers.forEach((num, index) => console.log(`Index ${index}: ${num * 2}`));

// map() - Transforms array and returns a new array
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6]

```

📌 **Use `map()` when you need a new array, `forEach()` when you only need to execute a function.**

📌 **Reference:** [Array Methods](https://javascript.info/array-methods)

* * * * *

### **9\. How Do You Check if an Array Contains a Specific Value?**

✅ **Using `includes()` (Best for Simple Values)**

```
const fruits = ["apple", "banana", "cherry"];
console.log(fruits.includes("banana")); // true
console.log(fruits.includes("grape")); // false

```

✅ **Using `indexOf()`**

```
console.log(fruits.indexOf("banana") !== -1); // true

```

✅ **Using `some()` (For Objects/Custom Conditions)**

```
const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
console.log(users.some(user => user.id === 2)); // true

```

📌 **Reference:** [Searching in Arrays](https://javascript.info/array-methods#searching-in-array)

* * * * *

### **10\. What is the Difference Between `push()`, `pop()`, `shift()`, and `unshift()`?**

| Method | Action | Mutates Array? | Returns |
| --- | --- | --- | --- |
| `push()` | Adds item to the **end** | ✅ Yes | New length |
| `pop()` | Removes **last** item | ✅ Yes | Removed element |
| `shift()` | Removes **first** item | ✅ Yes | Removed element |
| `unshift()` | Adds item to the **start** | ✅ Yes | New length |

#### **Example**

```
const arr = [1, 2, 3];

arr.push(4);
console.log(arr); // [1, 2, 3, 4]

arr.pop();
console.log(arr); // [1, 2, 3]

arr.shift();
console.log(arr); // [2, 3]

arr.unshift(0);
console.log(arr); // [0, 2, 3]

```

📌 **Reference:** [Array Methods](https://javascript.info/array-methods#add-remove-items)

* * * * *

### **11\. How Do You Implement a Deep Copy of an Array?**

✅ **Using `JSON.parse(JSON.stringify())` (For Simple Data)**

```
const arr = [{ name: "Alice" }, { name: "Bob" }];
const deepCopy = JSON.parse(JSON.stringify(arr));

```

✅ **Using `structuredClone()` (Modern & Recommended)**

```
const deepCopy = structuredClone(arr);

```

✅ **Using Recursion (For Custom Needs)**

```
function deepClone(arr) {
  return arr.map(item => (Array.isArray(item) ? deepClone(item) : { ...item }));
}

```

📌 **Reference:** [Deep Copy vs Shallow Copy](https://javascript.info/object-copy)

* * * * *

### **12\. How Do You Check If Two Arrays Are Equal?**

✅ **Using `every()` and `length`**

```
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];

const areEqual = arr1.length === arr2.length && arr1.every((val, i) => val === arr2[i]);
console.log(areEqual); // true

```

📌 **Reference:** [Comparing Objects and Arrays](https://javascript.info/comparison)

* * * * *

### **13\. How Do You Create a Range of Numbers in an Array?**

✅ **Using `Array.from()`**

```
const range = Array.from({ length: 5 }, (_, i) => i + 1);
console.log(range); // [1, 2, 3, 4, 5]

```

✅ **Using `map()`**

```
const range = [...Array(5)].map((_, i) => i + 1);
console.log(range); // [1, 2, 3, 4, 5]

```

📌 **Reference:** [Array Creation](https://javascript.info/array)

* * * * *

### **14\. What is the Difference Between `Array.from()` and `Array.of()`?**

| Method | Purpose | Example | Output |
| --- | --- | --- | --- |
| `Array.from()` | Creates array from iterable or array-like object | `Array.from("hello")` | `['h', 'e', 'l', 'l', 'o']` |
| `Array.of()` | Creates array from given arguments | `Array.of(1, 2, 3)` | `[1, 2, 3]` |

#### **Examples**

```
console.log(Array.from("hello")); // ['h', 'e', 'l', 'l', 'o']
console.log(Array.of(1, 2, 3));   // [1, 2, 3]

```

📌 **Reference:** [Array Methods](https://javascript.info/array)

* * * * *

### **15\. How Do You Convert an Array to an Object?**

✅ **Using `Object.assign()`**

```
const arr = ["name", "age"];
const obj = Object.assign({}, arr);
console.log(obj); // { "0": "name", "1": "age" }

```

✅ **Using `reduce()`**

```
const entries = [["name", "Alice"], ["age", 25]];
const obj = entries.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
console.log(obj); // { name: 'Alice', age: 25 }

```

✅ **Using `Object.fromEntries()` (ES6)**

```
const obj = Object.fromEntries(entries);
console.log(obj); // { name: 'Alice', age: 25 }

```

📌 **Reference:** [Objects from Arrays](https://javascript.info/object)

* * * * *

### **Final Takeaways**

-   **Use `map()` for transformations, `forEach()` for side effects.**
-   **Use `includes()` for checking array elements.**
-   **Use `push/pop` for end, `shift/unshift` for start.**
-   **Deep copy arrays with `structuredClone()` or recursion.**
-   **Compare arrays using `every()`.**
-   **Generate ranges with `Array.from()`**
-   **Use `Object.fromEntries()` to convert an array into an object.**


***5. Strings & Numbers (10 Questions)***

### **1\. How Do You Check if a String Contains a Substring?**

✅ **Using `includes()` (Recommended)**

```
const str = "Hello, world!";
console.log(str.includes("world")); // true
console.log(str.includes("JavaScript")); // false

```

✅ **Using `indexOf()`**

```
console.log(str.indexOf("world") !== -1); // true

```

✅ **Using `RegExp` (Case-Insensitive Search)**

```
console.log(/world/i.test(str)); // true

```

📌 **Reference:** [String Searching](https://javascript.info/string#searching-in-string)

* * * * *

### **2\. How Do You Reverse a String?**

✅ **Using `split()`, `reverse()`, and `join()`**

```
const str = "JavaScript";
const reversed = str.split("").reverse().join("");
console.log(reversed); // "tpircSavaJ"

```

✅ **Using a `for` Loop**

```
function reverseString(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}
console.log(reverseString("JavaScript")); // "tpircSavaJ"

```

📌 **Reference:** [String Methods](https://javascript.info/string)

* * * * *

### **3\. How Do You Capitalize the First Letter of Each Word in a String?**

✅ **Using `split()`, `map()`, and `join()`**

```
function capitalizeWords(str) {
  return str.split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
console.log(capitalizeWords("hello world")); // "Hello World"

```

📌 **Reference:** [String Case Conversion](https://javascript.info/string#changing-the-case)

* * * * *

### **4\. How Do You Remove Whitespace from a String?**

✅ **Using `trim()`**

```
const str = "   Hello, world!   ";
console.log(str.trim()); // "Hello, world!"

```

✅ **Removing All Whitespace (`replace()` + RegEx)**

```
console.log(str.replace(/\s/g, "")); // "Hello,world!"

```

📌 **Reference:** [String Trimming](https://javascript.info/string#trimming)

* * * * *

### **5\. How Do You Replace All Occurrences of a Substring?**

✅ **Using `replaceAll()` (ES2021)**

```
const str = "JavaScript is awesome. JavaScript is powerful.";
console.log(str.replaceAll("JavaScript", "JS"));
// "JS is awesome. JS is powerful."

```

✅ **Using `replace()` with RegEx**

```
console.log(str.replace(/JavaScript/g, "JS"));

```

📌 **Reference:** [String Replacement](https://javascript.info/string#replacing-parts-of-a-string)

* * * * *

### **6\. What is the Difference Between `parseInt()` and `parseFloat()`?**

| Method | Parses | Output Example |
| --- | --- | --- |
| `parseInt()` | Integer only | `parseInt("10.5") → 10` |
| `parseFloat()` | Decimal numbers | `parseFloat("10.5") → 10.5` |

✅ **Example**

```
console.log(parseInt("42.99")); // 42
console.log(parseFloat("42.99")); // 42.99
console.log(parseInt("abc42")); // NaN (not a number)

```

📌 **Reference:** [Parsing Numbers](https://javascript.info/number#parseint-and-parsefloat)

* * * * *

### **7\. How Do You Convert a String to a Number?**

✅ **Using `Number()`**

```
console.log(Number("42")); // 42
console.log(Number("42.5")); // 42.5
console.log(Number("abc")); // NaN

```

✅ **Using `parseInt()` and `parseFloat()`**

```
console.log(parseInt("42")); // 42
console.log(parseFloat("42.5")); // 42.5

```

✅ **Using Unary `+` Operator**

```
console.log(+"42.5"); // 42.5
console.log(+"42"); // 42

```

📌 **Reference:** [Type Conversion](https://javascript.info/type-conversions)

* * * * *

### **8\. How Do You Format a Number to Two Decimal Places?**

✅ **Using `toFixed()`**

```
const num = 5.6789;
console.log(num.toFixed(2)); // "5.68"

```

✅ **Using `Intl.NumberFormat` (For Currency)**

```
const formatter = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
console.log(formatter.format(5.6789)); // "5.68"

```

📌 **Reference:** [Number Formatting](https://javascript.info/number#rounding)

* * * * *

### **9\. How Do You Generate a Random Number Within a Range?**

✅ **Using `Math.random()`**

```
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(getRandom(10, 20)); // Random number between 10 and 20

```

📌 **Reference:** [Random Numbers](https://javascript.info/number#random)

* * * * *

### **10\. How Do You Pad a String with Leading Zeros?**

✅ **Using `padStart()`**

```
const num = "42";
console.log(num.padStart(5, "0")); // "00042"

```

✅ **Using String Concatenation**

```
function padZeroes(num, length) {
  return ("0".repeat(length) + num).slice(-length);
}
console.log(padZeroes(42, 5)); // "00042"

```

📌 **Reference:** [String Padding](https://javascript.info/string)

* * * * *

### **Final Takeaways**

-   **Use `includes()` to check substrings.**
-   **Reverse strings using `split("").reverse().join("")`.**
-   **Capitalize words using `map()` over `split()`.**
-   **Trim whitespace with `trim()`, remove all spaces with `replace(/\s/g, '')`.**
-   **Use `replaceAll()` (or `replace()` with `/g` flag) to replace all occurrences.**
-   **Use `parseInt()` for integers, `parseFloat()` for decimals.**
-   **Convert strings to numbers with `Number()` or unary `+`.**
-   **Format numbers using `toFixed()` or `Intl.NumberFormat`.**
-   **Generate a random number with `Math.random()`.**
-   **Pad numbers with `padStart()` or `repeat()`.**



***ES6+ Features (10 Questions)***

### **1. What is Destructuring, and How Does It Work?**  
Destructuring is an ES6 feature that allows extracting values from arrays or objects into variables in a concise way.  

✅ **Array Destructuring**  
```javascript
const numbers = [1, 2, 3];
const [first, second, third] = numbers;

console.log(first, second, third); // 1 2 3
```

✅ **Object Destructuring**  
```javascript
const user = { name: "Alice", age: 25 };
const { name, age } = user;

console.log(name, age); // "Alice" 25
```

📌 **Reference:** [Destructuring Assignment](https://javascript.info/destructuring-assignment)  

---

### **2. How Do Default Parameters Work in ES6?**  
Default parameters allow setting function parameters with default values when no argument is provided.  

✅ **Example**  
```javascript
function greet(name = "Guest") {
  console.log(`Hello, ${name}!`);
}

greet(); // "Hello, Guest!"
greet("Alice"); // "Hello, Alice!"
```

📌 **Reference:** [Default Parameters](https://javascript.info/function-basics#default-values)  

---

### **3. What is the Difference Between Spread and Rest Operators?**  

| Operator | Usage | Example |
|----------|-------|---------|
| **Spread (`...`)** | Expands elements of an array/object | `const arr2 = [...arr1]` |
| **Rest (`...`)** | Gathers remaining elements into an array | `function sum(...nums) {}` |

✅ **Spread Example**  
```javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]
```

✅ **Rest Example**  
```javascript
function sum(...nums) {
  return nums.reduce((acc, num) => acc + num, 0);
}
console.log(sum(1, 2, 3, 4)); // 10
```

📌 **Reference:** [Rest and Spread](https://javascript.info/rest-parameters-spread)  

---

### **4. What Are Symbol Data Types in JavaScript?**  
`Symbol` is a unique and immutable primitive data type used for creating unique property keys.  

✅ **Example**  
```javascript
const uniqueKey = Symbol("id");
const obj = { [uniqueKey]: 123 };

console.log(obj[uniqueKey]); // 123
```

📌 **Reference:** [Symbol Type](https://javascript.info/symbol)  

---

### **5. What Are Template Literals, and How Do They Work?**  
Template literals allow embedding variables and expressions inside strings using backticks `` ` ``, instead of quotes.  

✅ **Example**  
```javascript
const name = "Alice";
const message = `Hello, ${name}!`;

console.log(message); // "Hello, Alice!"
```

📌 **Reference:** [Template Literals](https://javascript.info/string#quotes)  

---

### **6. How Does Optional Chaining (`?.`) Work?**  
Optional chaining (`?.`) prevents errors when accessing deeply nested properties that might not exist.  

✅ **Example**  
```javascript
const user = { profile: { name: "Alice" } };

console.log(user.profile?.name); // "Alice"
console.log(user.address?.city); // undefined (no error)
```

📌 **Reference:** [Optional Chaining](https://javascript.info/optional-chaining)  

---

### **7. What is Nullish Coalescing (`??`), and How is It Different from `||`?**  
- `??` returns the right-hand value only if the left-hand value is `null` or `undefined`.  
- `||` considers `0`, `""`, and `false` as falsy values.  

✅ **Example**  
```javascript
const a = null ?? "default"; // "default"
const b = 0 || "default"; // "default"
const c = 0 ?? "default"; // 0 (because 0 is not null or undefined)
```

📌 **Reference:** [Nullish Coalescing](https://javascript.info/nullish-coalescing-operator)  

---

### **8. What is the Difference Between `let` and `const`?**  

| Feature | `let` | `const` |
|---------|-------|---------|
| Reassignment | ✅ Yes | ❌ No |
| Block Scope | ✅ Yes | ✅ Yes |
| Hoisting | ✅ Yes (Not initialized) | ✅ Yes (Not initialized) |

✅ **Example**  
```javascript
let age = 30;
age = 31; // ✅ Works

const name = "Alice";
name = "Bob"; // ❌ Error
```

📌 **Reference:** [Let and Const](https://javascript.info/var)  

---

### **9. What is BigInt, and When Should You Use It?**  
`BigInt` is a special type for handling very large numbers beyond `Number.MAX_SAFE_INTEGER`.  

✅ **Example**  
```javascript
const big = 9007199254740991n; // 'n' at the end makes it a BigInt

console.log(big + 1n); // 9007199254740992n
```

📌 **Reference:** [BigInt](https://javascript.info/bigint)  

---

### **10. What Are Dynamic Imports, and How Do They Work?**  
Dynamic imports allow loading modules asynchronously using `import()`.  

✅ **Example**  
```javascript
async function loadModule() {
  const { sayHello } = await import("./module.js");
  sayHello();
}

loadModule();
```

📌 **Reference:** [Dynamic Imports](https://javascript.info/modules-dynamic-imports)  

---

### **Final Takeaways**  
✅ **Destructuring** simplifies extracting values from objects and arrays.  
✅ **Default parameters** provide fallback values in functions.  
✅ **Spread (`...`)** expands elements, while **rest (`...`)** collects remaining elements.  
✅ **Symbols** are unique property keys.  
✅ **Template literals** simplify string interpolation.  
✅ **Optional chaining (`?.`)** prevents errors on missing properties.  
✅ **Nullish coalescing (`??`)** handles `null` and `undefined`, unlike `||`.  
✅ **`let` allows reassignment**, but **`const` does not**.  
✅ **BigInt** handles numbers beyond `Number.MAX_SAFE_INTEGER`.  
✅ **Dynamic imports** enable on-demand loading of modules.  


***7. Memory Management & Performance (10 Questions)***

Here are **detailed explanations** for each question with **in-depth examples** based on JavaScript's memory management and garbage collection.

* * * * *

**1\. What is Garbage Collection, and How Does JavaScript Handle It?**
----------------------------------------------------------------------

### **What is Garbage Collection?**

Garbage collection (GC) is an automatic memory management feature in JavaScript that **frees up memory occupied by objects that are no longer needed**. This helps **prevent memory leaks** and optimizes application performance.

### **How JavaScript Handles Garbage Collection (Mark-and-Sweep Algorithm)**

JavaScript primarily uses the **Mark-and-Sweep Algorithm** for garbage collection.

#### **Steps in the Mark-and-Sweep Algorithm:**

1.  **Identify "Root" Objects:**

    -   The GC starts from global objects like `window` (in browsers) or `globalThis` (in Node.js).
2.  **Mark Reachable Objects:**

    -   It traverses references from the root and marks all objects that are reachable.
3.  **Sweep Unreachable Objects:**

    -   Objects that are no longer reachable are deleted from memory.
4.  **Memory Reallocation:**

    -   Freed-up memory is reused for new objects.

### **Example: Garbage Collection in Action**

```
function createUser() {
    let user = { name: "Alice" }; // Object created in heap memory
    return user;
}

// When createUser() is called, the 'user' object is returned and still accessible
let person = createUser(); // Still referenced, so NOT garbage collected

// If we overwrite the reference, the object becomes unreachable
person = null; // Now the "Alice" object is eligible for garbage collection

```

📌 **Reference:** [JavaScript Garbage Collection](https://javascript.info/garbage-collection)

* * * * *

**2\. What is a Memory Leak, and How Do You Prevent It?**
---------------------------------------------------------

### **What is a Memory Leak?**

A **memory leak** occurs when objects that are **no longer needed remain in memory** because references to them are not removed. This can cause performance issues over time.

### **Common Causes of Memory Leaks and How to Prevent Them**

#### **1\. Unused Global Variables**

If a variable is unintentionally declared without `var`, `let`, or `const`, it becomes a global variable and stays in memory.

❌ **Bad Code (Leads to Memory Leak)**

```
function badFunction() {
    unusedVariable = "I am global!"; // No declaration keyword
}

```

✅ **Fix:** Always use `let`, `const`, or `var`.

```
function goodFunction() {
    let usedVariable = "I am scoped!";
}

```

* * * * *

#### **2\. Forgotten Event Listeners**

Event listeners keep a reference to objects even after they are removed.

❌ **Bad Code (Listener Remains in Memory)**

```
const button = document.getElementById("clickMe");
button.addEventListener("click", () => console.log("Clicked!"));

```

✅ **Fix:** Use `removeEventListener` when an element is removed.

```
button.removeEventListener("click", handler);

```

* * * * *

#### **3\. Detached DOM Elements**

If you remove an element from the DOM but keep a reference to it, it stays in memory.

❌ **Bad Code**

```
let element = document.getElementById("box");
element.remove(); // Still in memory!

```

✅ **Fix:** Set `element = null;`

```
element.remove();
element = null; // Now eligible for garbage collection

```

* * * * *

#### **4\. Unclosed Intervals and Timers**

Timers (`setInterval`) keep references to variables, causing memory leaks if not cleared.

❌ **Bad Code**

```
setInterval(() => console.log("Running"), 1000); // Runs forever

```

✅ **Fix:** Always use `clearInterval`.

```
let interval = setInterval(() => console.log("Running"), 1000);
clearInterval(interval);

```

📌 **Reference:** [Memory Leaks in JavaScript](https://javascript.info/memory-management)

* * * * *

**3\. How Does JavaScript Handle References in Memory?**
--------------------------------------------------------

### **Stack vs. Heap Memory**

JavaScript stores data in two types of memory:

| **Type** | **Stored In** | **Usage** |
| --- | --- | --- |
| **Primitives** (`number`, `string`, `boolean`) | **Stack** | Stored directly |
| **Objects, Arrays, Functions** | **Heap** | Stored by reference |

### **Example: Reference vs. Value Assignment**

```
// Stack Memory (Primitive Type)
let a = 10;
let b = a; // Copy of 'a' is created
b = 20;

console.log(a); // 10 (unchanged)

// Heap Memory (Reference Type)
let obj1 = { name: "Alice" };
let obj2 = obj1; // Reference to the same object

obj2.name = "Bob"; // Modifies original object

console.log(obj1.name); // "Bob" (both obj1 and obj2 point to the same memory)

```

📌 **Reference:** [Object References](https://javascript.info/object-copy)

* * * * *

**4\. What is the Difference Between Stack and Heap Memory?**
-------------------------------------------------------------

| **Feature** | **Stack Memory** | **Heap Memory** |
| --- | --- | --- |
| **Type** | Used for primitives | Used for objects & functions |
| **Storage** | Directly stored | Stored as reference |
| **Access Speed** | Fast | Slower |
| **Lifetime** | Cleared when function exits | Cleared via garbage collection |

✅ **Example: Stack vs. Heap**

```
// Stack Memory
let num1 = 10; // Stored in stack

// Heap Memory
let obj = { name: "Alice" }; // Reference stored in stack, object in heap

```

📌 **Reference:** [Stack vs. Heap](https://javascript.info/memory-management)

* * * * *

**5\. How Does String Interning Optimize Memory Usage?**
--------------------------------------------------------

### **What is String Interning?**

**String interning** is an optimization technique where identical string literals are stored **in the same memory location** to save space.

### **Example: String Interning in JavaScript**

```
let str1 = "hello";
let str2 = "hello";

console.log(str1 === str2); // true (same memory location)

```

### **New String Objects (No Interning)**

If you create a string using `new String()`, it is stored separately.

```
let str1 = new String("hello");
let str2 = new String("hello");

console.log(str1 === str2); // false (different memory locations)

```

📌 **Reference:** [String Interning](https://javascript.info/string)

* * * * *

**Final Takeaways**
-------------------

✅ **Garbage Collection:** JavaScript automatically removes unused objects from memory using the **Mark-and-Sweep algorithm**.\
✅ **Memory Leaks:** Common causes include **global variables, event listeners, detached DOM elements, and unclosed intervals**.\
✅ **JavaScript Memory Model:**

-   **Primitives (Numbers, Strings, Booleans)** are stored in the **Stack**.
-   **Objects, Arrays, and Functions** are stored in the **Heap** and referenced in the **Stack**.\
    ✅ **Stack is Faster** and used for small values, while **Heap is for complex objects**.\
    ✅ **String Interning** optimizes memory by storing identical string literals in a shared memory location.

**9\. How Does Lazy Loading Work in JavaScript?**
-------------------------------------------------

### **What is Lazy Loading?**

Lazy loading is a performance optimization technique that defers the loading of non-essential resources (like images, scripts, and components) until they are needed. Instead of loading everything at once when a webpage is opened, lazy loading improves speed and reduces unnecessary resource consumption.

* * * * *

### **How Lazy Loading Works**

Lazy loading works by:

1.  **Deferring resource loading** until it is needed (e.g., when an image enters the viewport).
2.  **Replacing heavy resources** with placeholders or low-resolution versions until full content is required.
3.  **Reducing the initial load time** and improving perceived performance.

* * * * *

### **Lazy Loading in JavaScript**

#### **1\. Lazy Loading Images using `loading="lazy"` (HTML5 Native Lazy Loading)**

Modern browsers support native lazy loading for images:

```
<img src="image.jpg" loading="lazy" alt="Lazy Loaded Image">

```

✅ **Pros:** Simple, browser-handled, no JavaScript required.\
❌ **Cons:** Limited customization.

* * * * *

#### **2\. Lazy Loading Using JavaScript (`IntersectionObserver API`)**

For older browsers or more control, use the `IntersectionObserver` API:

```
document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
});

```

✅ **Pros:** Efficient, loads images only when visible.\
❌ **Cons:** Requires JavaScript support.

* * * * *

#### **3\. Lazy Loading JavaScript Files (`Dynamic Imports`)**

Instead of loading all scripts at once, dynamically import only when needed:

```
document.getElementById("btn").addEventListener("click", async () => {
  const { someFunction } = await import("./heavyModule.js");
  someFunction();
});

```

✅ **Pros:** Optimizes scripts, reduces blocking.\
❌ **Cons:** Small delay when importing dynamically.

* * * * *

#### **4\. Lazy Loading Components in React**

In React, lazy load components using `React.lazy()`:

```
import React, { Suspense, lazy } from "react";

const LazyComponent = lazy(() => import("./LazyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

```

✅ **Pros:** Great for reducing initial bundle size.\
❌ **Cons:** Requires `Suspense` for error handling.

* * * * *

### **Benefits of Lazy Loading**

✔ Faster initial page load\
✔ Saves bandwidth by loading only necessary resources\
✔ Reduces memory usage and improves user experience\
✔ Optimizes performance, especially for mobile users

* * * * *

**10\. What Are Event Listener Memory Leaks, and How Do You Avoid Them?**
-------------------------------------------------------------------------

### **What is an Event Listener Memory Leak?**

A **memory leak** occurs when JavaScript **retains references to unnecessary objects**, preventing them from being garbage collected.\
When event listeners are not properly removed, they can keep objects in memory longer than necessary, causing performance degradation.

* * * * *

### **Causes of Event Listener Memory Leaks**

1.  **Not Removing Listeners After Use**

    -   Event listeners persist even if the associated element is removed.

    -   Example (❌ BAD PRACTICE):

        ```
        document.getElementById("myButton").addEventListener("click", function () {
          console.log("Clicked!");
        });

        document.getElementById("myButton").remove(); // Listener still exists

        ```

2.  **Listeners Attached to Window/Document**

    -   Global listeners remain active unless explicitly removed.

    -   Example (❌ BAD PRACTICE):

        ```
        window.addEventListener("resize", () => {
          console.log("Resized");
        }); // Never removed!

        ```

3.  **Anonymous Functions in Event Listeners**

    -   You cannot remove an event listener if it was added using an anonymous function.

    -   Example (❌ BAD PRACTICE):

        ```
        document.addEventListener("click", () => console.log("Clicked!"));
        document.removeEventListener("click", () => console.log("Clicked!")); // Won't work!

        ```

* * * * *

### **How to Prevent Event Listener Memory Leaks**

✅ **1\. Always Remove Event Listeners When They Are No Longer Needed**

-   Example (✔ GOOD PRACTICE):

    ```
    function handleClick() {
      console.log("Clicked!");
    }

    document.getElementById("myButton").addEventListener("click", handleClick);

    // Later, remove the listener
    document.getElementById("myButton").removeEventListener("click", handleClick);

    ```

✅ **2\. Remove Listeners When Elements Are Removed from the DOM**

-   Example (✔ GOOD PRACTICE):

    ```
    function handleClick() {
      console.log("Button clicked!");
    }

    const button = document.createElement("button");
    button.innerText = "Click Me";
    document.body.appendChild(button);
    button.addEventListener("click", handleClick);

    // Remove event listener before removing element
    button.removeEventListener("click", handleClick);
    document.body.removeChild(button);

    ```

✅ **3\. Use `once: true` to Automatically Remove the Listener After Execution**

-   Example (✔ GOOD PRACTICE):

    ```
    document.getElementById("myButton").addEventListener("click", function () {
      console.log("This will run once and remove itself.");
    }, { once: true });

    ```

✅ **4\. Avoid Global Event Listeners or Clean Them Up**

-   Example (✔ GOOD PRACTICE):

    ```
    function resizeHandler() {
      console.log("Window resized");
    }

    window.addEventListener("resize", resizeHandler);

    // Later, clean up
    window.removeEventListener("resize", resizeHandler);

    ```

✅ **5\. Use WeakMap for DOM References**

-   **Why?** WeakMap allows garbage collection of elements once they are removed.

-   Example (✔ GOOD PRACTICE):

    ```
    const listenerMap = new WeakMap();

    function addEvent(el, event, handler) {
      el.addEventListener(event, handler);
      listenerMap.set(el, handler);
    }

    function removeEvent(el, event) {
      const handler = listenerMap.get(el);
      if (handler) {
        el.removeEventListener(event, handler);
        listenerMap.delete(el);
      }
    }

    ```

* * * * *

### **Conclusion**

**Lazy Loading** improves performance by delaying resource loading until needed.\
**Event Listener Memory Leaks** happen when listeners are not removed, keeping unused objects in memory. Prevent them by:\
✔ Removing listeners when no longer needed\
✔ Using `{ once: true }` for auto-removal\
✔ Avoiding anonymous functions in listeners\
✔ Cleaning up global event listeners

### **1\. Difference Between Cookies, `sessionStorage`, and `localStorage` in Browsers**

| Feature | **Cookies** 🏠 | **sessionStorage** 📌 | **localStorage** 🔒 |
| --- | --- | --- | --- |
| **Storage Size** | ~4KB | ~5MB | ~5-10MB |
| **Scope** | Sent with requests to the server | Only within the session/tab | Persistent across sessions |
| **Expiration** | Can have an expiry date | Cleared when tab/browser is closed | Never expires (unless manually cleared) |
| **Access** | Accessible via `document.cookie` | Accessible via JavaScript only | Accessible via JavaScript only |
| **Use Case** | Storing small pieces of data that need to be sent to the server, like authentication tokens | Storing temporary session data like form inputs | Storing user preferences, theme settings, and cached data |

👉 **When to Use?**

-   **Cookies**: When data must be sent with every request (e.g., authentication tokens, tracking IDs).
-   **sessionStorage**: When data should persist only while the user is on a specific page/session (e.g., multi-step forms).
-   **localStorage**: When storing persistent data on the client-side without needing to send it to the server (e.g., user preferences, theme selections).

* * * * *

### **2\. What is Event Delegation in JavaScript?**

📌 **Event delegation** is a pattern in JavaScript where instead of adding event listeners to multiple child elements, a single event listener is added to a parent element. This works because of **event bubbling**---where events "bubble up" from child to parent elements.

#### **Example of Event Delegation**

Instead of adding event listeners to multiple buttons:

```
document.getElementById("parent").addEventListener("click", function (event) {
  if (event.target && event.target.matches("button")) {
    console.log("Button clicked:", event.target.textContent);
  }
});

```

✅ **Advantages of Event Delegation:**

-   **Better Performance**: Avoids adding multiple event listeners.
-   **Dynamically Handles New Elements**: Works for elements added later (e.g., AJAX-loaded content).
-   **Cleaner Code**: Easier to manage than multiple event listeners.

* * * * *

### **3\. What's a Typical Use Case for Anonymous Functions in JavaScript?**

An **anonymous function** is a function without a name:

```
const greet = function () {
  console.log("Hello, world!");
};

```

#### **Common Use Cases:**

1.  **Callbacks in Event Listeners**

    ```
    document.getElementById("btn").addEventListener("click", function () {
      console.log("Button clicked!");
    });

    ```

2.  **Passing as Arguments to Higher-Order Functions**

    ```
    const numbers = [1, 2, 3, 4];
    const doubled = numbers.map(function (num) {
      return num * 2;
    });

    ```

3.  **IIFE (Immediately Invoked Function Expressions)**

    ```
    (function () {
      console.log("This runs immediately!");
    })();

    ```

✅ **Why Use Anonymous Functions?**

-   **Avoid unnecessary global variables**
-   **Make code more concise**
-   **Useful for one-time-use functions**

* * * * *

### **4\. What Are JavaScript Polyfills?**

A **polyfill** is a piece of code (usually JavaScript) that **mimics modern features** in older browsers that do not support them.

#### **Example: Polyfill for `Array.includes()`**

Older browsers may not support `includes()`, so we use a polyfill:

```
if (!Array.prototype.includes) {
  Array.prototype.includes = function (element) {
    return this.indexOf(element) !== -1;
  };
}

```

✅ **Use Cases for Polyfills:**

-   Supporting **older browsers** (like IE11) that lack modern JavaScript features.
-   Making sure **ES6+ features** work in older environments.
-   Ensuring **cross-browser compatibility**.

🔹 **Common Polyfill Libraries**:

-   **Babel**: Transpiles modern JavaScript to older versions.
-   **core-js**: Provides polyfills for ES6+ features.

* * * * *

### **Conclusion**

-   **Cookies vs. Storage**: Use **cookies** for server communication, **sessionStorage** for temporary data, and **localStorage**for persistent data.
-   **Event Delegation**: Attach event listeners to parent elements instead of many child elements.
-   **Anonymous Functions**: Used in callbacks, IIFEs, and functional programming.
-   **Polyfills**: Allow modern JavaScript features to work in older browsers.

