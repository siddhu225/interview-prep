Here are **detailed answers** to your **Node.js interview questions** based on the **official Node.js documentation**.

* * * * *

### **1\. What is Node.js, and how does it work?**

**Node.js** is an **open-source, cross-platform runtime** environment that allows JavaScript to be executed **outside the browser**. It is built on **Google's V8 JavaScript engine**, which compiles JavaScript into highly optimized machine code.

#### **How Node.js Works**

-   Uses a **single-threaded, event-driven, non-blocking I/O model** to handle multiple requests efficiently.
-   Leverages **libuv**, a library that provides the event loop and asynchronous I/O operations.
-   Provides a rich set of **built-in modules** (like `fs`, `http`, `events`, etc.) to enable server-side operations.
-   Uses the **event loop** to handle concurrency instead of creating multiple threads (like traditional web servers).
-   Uses **callbacks, Promises, and async/await** to handle asynchronous operations.

✅ **Example: Running a simple Node.js HTTP server**

```
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, Node.js!');
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

```

* * * * *

### **2\. What are the key features of Node.js?**

Node.js has several **powerful features** that make it a great choice for **server-side development**:

1.  **Asynchronous & Event-Driven**

    -   Node.js APIs are **non-blocking**, meaning I/O operations don't pause the execution of other code.
    -   Uses an **event-driven architecture** where actions (like file reads or HTTP requests) trigger events handled by the event loop.
2.  **Single-Threaded with Non-Blocking I/O**

    -   Uses a **single-threaded model** that can handle **multiple concurrent requests** without the need for multiple threads.
    -   Delegates **heavy tasks (I/O, database, file system) to worker threads** using `libuv`.
3.  **Fast Performance (Powered by V8)**

    -   Built on Google Chrome's **V8 engine**, which compiles JavaScript into **machine code** for high-speed execution.
    -   Optimizes code execution using **Just-In-Time (JIT) compilation**.
4.  **Built-in Package Manager (NPM)**

    -   Comes with **Node Package Manager (NPM)**, which provides access to **millions of reusable packages**.
5.  **Cross-Platform Support**

    -   Runs on **Windows, macOS, Linux**, and more.
6.  **Scalability**

    -   Supports **microservices, clustering, and load balancing** to handle large-scale applications.
7.  **Supports Modern JavaScript**

    -   Fully supports ES6+ features like **async/await, classes, template literals, destructuring**, etc.

* * * * *

### **3\. How is Node.js different from JavaScript in the browser?**

| Feature | Node.js | JavaScript in the Browser |
| --- | --- | --- |
| **Environment** | Runs on **server-side** | Runs in **browser (client-side)** |
| **Execution Engine** | Uses **V8 Engine** with Node.js APIs | Uses **V8 Engine** in Chrome |
| **Global Object** | `global` | `window` |
| **APIs Available** | Has `fs`, `http`, `os`, `path` modules | Has **DOM APIs, Fetch API, WebSockets** |
| **Modules** | Uses **CommonJS (require)** & ESM | Uses **ES Modules (import/export)** |
| **Security** | No direct **DOM access**, safer | Can interact with **DOM & user inputs** |

✅ **Example: Global Object Difference**

```
// In Node.js
console.log(global);  // Prints Node.js global object

// In Browser
console.log(window);  // Prints the browser's global window object

```

* * * * *

### **4\. What is the role of V8 in Node.js?**

**V8** is a high-performance **JavaScript engine** developed by Google for **Chrome**. It is responsible for executing JavaScript code in both **browsers and Node.js**.

#### **Why is V8 important for Node.js?**

-   **Compiles JavaScript to machine code** instead of interpreting it line by line, making execution extremely fast.
-   **Optimizes performance using Just-In-Time (JIT) compilation**.
-   Provides **efficient memory management & garbage collection**.
-   Supports **modern JavaScript features** like ES6+, WebAssembly, and more.

✅ **Example: V8 in Action**

```
// Node.js running JavaScript code via V8 engine
console.log('Hello, World!'); // V8 compiles this to machine code and executes it

```

* * * * *

### **5\. How does the Node.js event-driven architecture work?**

Node.js follows an **event-driven, non-blocking I/O model** that allows handling **multiple operations concurrently** with a **single thread**.

#### **How it Works:**

1.  When an **asynchronous operation** (like a file read, HTTP request, or DB query) is triggered, Node.js **does not block execution**.
2.  The operation is delegated to **worker threads** or **the system kernel**.
3.  Once the operation completes, Node.js **emits an event**.
4.  The corresponding **callback function** (or promise) is executed.
5.  The **event loop** ensures that events are processed in an efficient order.

✅ **Example: Non-blocking File Read Using Events**

```
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);  // File content is logged asynchronously
});

console.log('Reading file...');  // This prints first while file is being read

```

**Output:**

```
Reading file...
(file contents appear after a slight delay)

```

➡ **Explanation:** The file is read asynchronously, and `console.log('Reading file...')` runs **before** the file contents are displayed.

✅ **Example: Event Emitter in Action**

```
const EventEmitter = require('events');

const myEmitter = new EventEmitter();

// Define an event listener
myEmitter.on('dataReceived', (message) => {
    console.log(`Received message: ${message}`);
});

// Emit an event
myEmitter.emit('dataReceived', 'Hello, Event-Driven Architecture!');

```

**Output:**

```
Received message: Hello, Event-Driven Architecture!

```

➡ **Explanation:** The event listener is triggered when `emit()` is called, demonstrating how Node.js manages events.

* * * * *

### **Summary**

| **Question** | **Key Takeaways** |
| --- | --- |
| **What is Node.js?** | A **server-side runtime** for executing JavaScript outside the browser using **V8**. |
| **Key Features?** | **Non-blocking I/O, event-driven model, V8 engine, scalability, built-in modules, NPM**. |
| **Node.js vs Browser JavaScript?** | Node.js runs on **servers**, has **global** instead of `window`, and includes **fs, http modules**. |
| **Role of V8?** | **Compiles JavaScript to machine code**, provides **JIT compilation**, and manages **memory efficiently**. |
| **Event-Driven Architecture?** | Uses an **event loop**, handles **I/O operations asynchronously**, and relies on **events and callbacks**. |

* * * * *

Here are **detailed answers** to your **Node.js interview questions**, based on the **official Node.js documentation**.  

---

### **6. What is the difference between CommonJS and ES Modules in Node.js?**  

Node.js supports **two module systems**:  
1. **CommonJS (CJS)** – The default module system in Node.js.  
2. **ES Modules (ESM)** – The newer JavaScript module system, introduced in **ES6**.  

#### **Key Differences**  

| Feature            | CommonJS (CJS)                   | ES Modules (ESM)               |
|--------------------|---------------------------------|--------------------------------|
| **File Extension** | `.js` (default)                 | `.mjs` (or `"type": "module"` in `package.json`) |
| **Import Syntax**  | `const module = require('module')` | `import module from 'module'` |
| **Export Syntax**  | `module.exports = {...}` or `exports.foo = ...` | `export default {...}` or `export const foo = ...` |
| **Execution**      | Synchronous (`require()`)       | Asynchronous (`import`)        |
| **Top-Level `this`** | Refers to `module.exports`     | `undefined`                   |
| **Browser Support** | No                             | Yes                            |

---

✅ **Example: CommonJS (`require` and `module.exports`)**  

**`math.js` (module file)**  
```javascript
function add(a, b) {
    return a + b;
}

// Export using CommonJS
module.exports = { add };
```

**`index.js` (import file)**  
```javascript
const math = require('./math');

console.log(math.add(5, 3)); // Output: 8
```

---

✅ **Example: ES Modules (`import` and `export`)**  

**`math.mjs` (module file)**  
```javascript
export function add(a, b) {
    return a + b;
}
```

**`index.mjs` (import file)**  
```javascript
import { add } from './math.mjs';

console.log(add(5, 3)); // Output: 8
```

📌 **Note:** To use ES Modules in Node.js, either:  
- Use the **`.mjs`** extension, OR  
- Set `"type": "module"` in `package.json`.  

---

### **7. How does the `require()` function work in Node.js?**  

`require()` is a **CommonJS function** used to **import modules** in Node.js.  

#### **How `require()` Works**  
1. **Resolves the module path** (built-in, node_modules, or local file).  
2. **Loads the module** (from cache if previously required).  
3. **Executes the module code** and **exports the values**.  
4. **Returns the `module.exports` object** to the caller.  

✅ **Example: Using `require()`**  

**`utils.js` (module file)**  
```javascript
module.exports.sayHello = function(name) {
    return `Hello, ${name}!`;
};
```

**`index.js` (import file)**  
```javascript
const utils = require('./utils');

console.log(utils.sayHello('Alice')); // Output: Hello, Alice!
```

📌 **Caching Behavior:**  
If the same module is imported multiple times, Node.js **caches the module** and **does not re-execute it**.  

---

### **8. What are the different ways to export and import modules in Node.js?**  

Node.js supports **multiple ways** to **export and import** modules, depending on whether you use **CommonJS (CJS)** or **ES Modules (ESM)**.

#### **CommonJS (CJS) Exports**  
1. **Export a single function or object**  
   ```javascript
   module.exports = function() {
       console.log('Hello World');
   };
   ```
   **Import:**  
   ```javascript
   const greet = require('./module');
   greet(); // Output: Hello World
   ```

2. **Export multiple values as an object**  
   ```javascript
   module.exports = {
       foo: 42,
       greet: function() {
           console.log('Hello');
       }
   };
   ```
   **Import:**  
   ```javascript
   const module = require('./module');
   console.log(module.foo);  // Output: 42
   module.greet();           // Output: Hello
   ```

3. **Using `exports` (Alias for `module.exports`)**  
   ```javascript
   exports.foo = 42;
   exports.bar = function() {
       console.log('Bar');
   };
   ```

---

#### **ES Modules (ESM) Exports**  
1. **Named Exports**  
   ```javascript
   export const foo = 42;
   export function greet() {
       console.log('Hello');
   }
   ```
   **Import:**  
   ```javascript
   import { foo, greet } from './module.mjs';
   console.log(foo);  // Output: 42
   greet();           // Output: Hello
   ```

2. **Default Export**  
   ```javascript
   export default function() {
       console.log('Default Export');
   };
   ```
   **Import:**  
   ```javascript
   import myFunc from './module.mjs';
   myFunc(); // Output: Default Export
   ```

---

### **9. What is the difference between `setImmediate()`, `process.nextTick()`, and `setTimeout()`?**  

| Function            | Execution Timing |
|---------------------|-----------------|
| `setImmediate()`    | Executes **after the current event loop cycle is complete**, before any I/O events. |
| `process.nextTick()` | Executes **before the event loop continues** (highest priority). |
| `setTimeout(fn, 0)` | Executes **after the event loop cycle**, with a minimum delay of **1ms**. |

✅ **Example:**  
```javascript
console.log('Start');

setImmediate(() => console.log('setImmediate'));
process.nextTick(() => console.log('process.nextTick'));
setTimeout(() => console.log('setTimeout'), 0);

console.log('End');
```

**Output:**  
```
Start
End
process.nextTick
setTimeout
setImmediate
```

📌 **Key Takeaways:**  
- `process.nextTick()` executes **before anything else**, even before `setTimeout(0)`.  
- `setTimeout(0)` executes **after the current event loop cycle**.  
- `setImmediate()` executes **after I/O operations**.  

---

### **10. How do you handle command-line arguments in a Node.js application?**  

In Node.js, you can access **command-line arguments** using `process.argv`.  

✅ **Example:**  
Run the script:  
```bash
node script.js hello world
```

**`script.js`**
```javascript
console.log(process.argv);
```

**Output:**  
```
[
  '/path/to/node',
  '/path/to/script.js',
  'hello',
  'world'
]
```

#### **Extracting Arguments**  
```javascript
const args = process.argv.slice(2); // Remove first two elements
console.log(args); // ['hello', 'world']
```

#### **Using `yargs` (Recommended for Complex CLI)**  
Install `yargs`:  
```bash
npm install yargs
```
Usage:  
```javascript
const yargs = require('yargs');
const argv = yargs.argv;

console.log(argv.name); // If run with `node script.js --name=Alice`
```

---

### **Summary**  

| **Question** | **Key Takeaways** |
|-------------|-----------------|
| **CommonJS vs ESM?** | CommonJS uses `require()`, ESM uses `import/export`. |
| **How does `require()` work?** | Resolves, loads, executes, caches the module. |
| **Ways to export/import?** | `module.exports`, `exports.foo`, `export default`, `export {}`. |
| **`setImmediate()` vs `nextTick()` vs `setTimeout()`?** | `nextTick()` is highest priority, `setImmediate()` runs after I/O. |
| **How to handle CLI arguments?** | Use `process.argv` or `yargs`. |

---

### What is an error-first callback? ☆☆

[](https://gist.github.com/paulfranco/9f88a2879b7b7d88de5d1921aef2093b#q5-what-is-an-error-first-callback-)

Answer: *Error-first callbacks* are used to pass errors and data. The first argument is always an error object that the programmer has to check if something went wrong. Additional arguments are used to pass data.

```source-js
fs.readFile(filePath, function(err, data) {
  if (err) {
    //handle the error
  }
  // use the data object
});
```
### Could we run an external process with Node.js? ☆☆

[](https://gist.github.com/paulfranco/9f88a2879b7b7d88de5d1921aef2093b#q14-could-we-run-an-external-process-with-nodejs-)

Answer: Yes. *Child process module* enables us to access operating system functionaries or other apps. Scalability is baked into Node and child processes are the key factors to scale our application. You can use child process to run system commands, read large files without blocking event loop, decompose the application into various "nodes" (That's why it's called Node).

Child process module has following three major ways to create child processes --

-   spawn - child_process.spawn launches a new process with a given command.
-   exec - child_process.exec method runs a command in a shell/console and buffers the output.
-   fork - The child_process.fork method is a special case of the spawn() to create child processes.

### What is REPL in context of Node? ☆☆☆

[](https://gist.github.com/paulfranco/9f88a2879b7b7d88de5d1921aef2093b#q21-what-is-repl-in-context-of-node-)

Answer: REPL stands for Read Eval Print Loop and it represents a computer environment like a window console or unix/linux shell where a command is entered and system responds with an output. Node.js or Node comes bundled with a REPL environment. It performs the following desired tasks.

-   Read - Reads user's input, parse the input into JavaScript data-structure and stores in memory.
-   Eval - Takes and evaluates the data structure
-   Print - Prints the result
-   Loop - Loops the above command until user press ctrl-c twice.

### How does Node.js handle child threads? ☆☆☆

###  Why to use Buffers instead of binary strings to handle binary data ? ☆☆☆☆

[](https://gist.github.com/paulfranco/9f88a2879b7b7d88de5d1921aef2093b#q11-why-to-use-buffers-instead-of-binary-strings-to-handle-binary-data--)

Answer: Pure JavaScript does not able to handle straight binary data very well. Since Node.js servers have to deal with TCP streams for reading and writing of data, binary strings will become problematic to work with as it is very slow and has a tendency to break. That's why it is always advisable to use Buffers instead of binary strings to handle binary data.

Source: *codingdefined.com*

### Q12: How to use Buffer in Node.js? ☆☆☆

[](https://gist.github.com/paulfranco/9f88a2879b7b7d88de5d1921aef2093b#q12-how-to-use-buffer-in-nodejs-)

Answer: Buffer is used to process binary data, such as pictures, mp3, database files, etc. Buffer supports a variety of encoding and decoding, binary string conversion.

[](https://gist.github.com/paulfranco/9f88a2879b7b7d88de5d1921aef2093b#q17-how-does-nodejs-handle-child-threads-)

Answer: Node.js, in its essence, is a single thread process. It does not expose child threads and thread management methods to the developer. Technically, Node.js does spawn child threads for certain tasks such as asynchronous I/O, but these run behind the scenes and do not execute any application JavaScript code, nor block the main event loop.

If threading support is desired in a Node.js application, there are tools available to enable it, such as the ChildProcess module.

### Explain usage of NODE_ENV ☆☆☆☆

[](https://gist.github.com/paulfranco/9f88a2879b7b7d88de5d1921aef2093b#q14-explain-usage-of-node_env-)

Answer: Node encourages the convention of using a variable called NODE_ENV to flag whether we're in production right now. This determination allows components to provide better diagnostics during development, for example by disabling caching or emitting verbose log statements. Setting NODE_ENV to production makes your application 3 times faster.

```source-shell
// Setting environment variables in bash before starting the node process
$ NODE_ENV=development
$ node

// Reading the environment variable using code
if (process.env.NODE_ENV === "production")
    useCaching = true;
```


### **If Node.js is Single-Threaded, How Does It Handle Concurrency?**

Node.js is **single-threaded**, but it is designed to handle **high concurrency** efficiently using its **event-driven, non-blocking architecture**. This is achieved using the **event loop** and **asynchronous I/O operations**, which allow Node.js to handle multiple requests without creating a separate thread for each request.

* * * * *

### **Understanding Node.js Concurrency Model**

Even though Node.js runs on a **single thread**, it can handle many operations concurrently because of the following mechanisms:

1.  **Asynchronous & Non-Blocking I/O**

    -   Instead of blocking the thread while waiting for tasks (like file reads, database queries, network requests), Node.js **delegates** these operations to the operating system or background threads (via libuv).
    -   Once the task is complete, the callback function is executed in the event loop.
2.  **The Event Loop**

    -   The **event loop** is the core mechanism in Node.js that continuously listens for events and executes their corresponding callbacks.
    -   When an I/O operation is initiated, Node.js registers a callback and moves on to the next task. Once the operation completes, the event loop picks up the callback and executes it.
3.  **Worker Threads & libuv**

    -   Node.js has a **thread pool** in the **libuv library**, which it uses to handle computationally expensive tasks like file I/O and cryptographic operations.
    -   The **worker threads module** in Node.js also allows running CPU-intensive tasks in parallel.
4.  **Offloading Work to the System Kernel**

    -   The OS kernel itself is efficient in handling I/O operations asynchronously.
    -   For example, network requests (handled by `http` or `fs` modules) use **kernel-level threads**, so Node.js doesn't have to wait for them.

* * * * *

### **Flow of Concurrency in Node.js**

1.  **A client request arrives** (e.g., a database query or API request).
2.  **Node.js registers the request** in the event loop and delegates I/O tasks to the thread pool (if applicable).
3.  **While the I/O task is running in the background**, Node.js continues processing other requests.
4.  **Once the I/O task completes**, its callback function is added to the event loop queue.
5.  **The event loop picks the callback and executes it**, sending the response to the client.

* * * * *

### **Example: Handling Multiple Requests in Node.js**

Let's see an example of how Node.js handles multiple requests without blocking:

```
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Home Page");
  } else if (req.url === "/slow") {
    setTimeout(() => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Slow Page Loaded");
    }, 5000);
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

```

-   When a user requests `/`, the response is sent immediately.
-   When a user requests `/slow`, Node.js **doesn't block** other requests for 5 seconds. Instead, it registers a timeout and continues processing other requests.

* * * * *

### **Comparison with Multi-Threaded Models**

| Feature | Node.js (Single-Threaded) | Traditional Multi-Threaded Servers (e.g., Java, PHP) |
| --- | --- | --- |
| **Threading Model** | Single-threaded event loop | Each request gets a new thread |
| **Concurrency Handling** | Non-blocking I/O | Blocking I/O |
| **Scalability** | High due to event-driven model | Requires thread management |
| **Memory Usage** | Lower, as fewer threads are created | Higher due to multiple threads |
| **Best for** | I/O-heavy applications (APIs, real-time apps) | CPU-intensive applications |

* * * * *

### **Handling CPU-Intensive Tasks in Node.js**

Since Node.js runs on a single thread, **CPU-heavy operations (e.g., image processing, large JSON parsing)** can block the event loop. To handle this, you can:

1.  **Use Worker Threads**

    -   The `worker_threads` module allows running CPU-intensive tasks on separate threads.

    ```
    const { Worker } = require("worker_threads");

    const worker = new Worker("./worker-task.js");
    worker.on("message", (msg) => console.log("Result:", msg));

    ```

2.  **Offload Work to External Services**

    -   Offload complex computations to separate microservices using message queues (e.g., **Redis, RabbitMQ**).
3.  **Use Clustering**

    -   The `cluster` module allows running multiple instances of Node.js processes to distribute CPU workload.

* * * * *

### **Conclusion**

Node.js handles concurrency efficiently despite being single-threaded. It achieves this using:

-   **Asynchronous, non-blocking I/O**
-   **The Event Loop**
-   **Worker Threads (libuv)**
-   **Delegating tasks to the OS Kernel**

This architecture makes Node.js ideal for **scalable web applications**, especially **APIs, streaming services, real-time applications, and chat apps**. However, for CPU-intensive tasks, solutions like **worker threads, clustering, and external services** should be used.

***2. Asynchronous Programming (15 Questions)***

Here are **detailed explanations** for these important Node.js topics:

---

## **1. What are callbacks in Node.js?**
A **callback** is a **function** that is passed as an argument to another function and is executed after the completion of that function.

### **How Callbacks Work**
Node.js follows a **non-blocking, asynchronous model**, where long-running tasks (like reading files or making API calls) are executed in the background, and once they are complete, a **callback function** is invoked.

✅ **Example: Callback in File Reading**
```javascript
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
});
```
- **`fs.readFile`** reads the file asynchronously.
- The **callback function** `(err, data) => {}` is executed **after** the file is read.
- If there's an error, `err` is populated; otherwise, `data` contains the file content.

---

## **2. How do you avoid callback hell?**
### **What is Callback Hell?**
Callback hell occurs when there are **too many nested callbacks**, making the code difficult to read and maintain.

✅ **Example of Callback Hell**
```javascript
getUser(userId, (user) => {
    getPosts(user.id, (posts) => {
        getComments(posts[0].id, (comments) => {
            sendNotification(comments[0].userId, () => {
                console.log('Notification sent');
            });
        });
    });
});
```
This **deep nesting** makes the code unreadable.

---

### **Ways to Avoid Callback Hell**
#### **1. Using Named Functions**
Instead of **anonymous functions**, use **named functions** to improve readability.

✅ **Refactored Code with Named Functions**
```javascript
function getUserData(userId, callback) {
    getUser(userId, callback);
}

function getUserPosts(user, callback) {
    getPosts(user.id, callback);
}

function getPostComments(posts, callback) {
    getComments(posts[0].id, callback);
}

function sendUserNotification(comments, callback) {
    sendNotification(comments[0].userId, callback);
}

// Execute functions sequentially
getUserData(userId, (user) => {
    getUserPosts(user, (posts) => {
        getPostComments(posts, (comments) => {
            sendUserNotification(comments, () => {
                console.log('Notification sent');
            });
        });
    });
});
```
---

#### **2. Using Promises**
Promises allow **chaining** instead of nesting.

✅ **Using Promises**
```javascript
getUser(userId)
    .then(user => getPosts(user.id))
    .then(posts => getComments(posts[0].id))
    .then(comments => sendNotification(comments[0].userId))
    .then(() => console.log('Notification sent'))
    .catch(err => console.error('Error:', err));
```
---

#### **3. Using async/await (Best Approach)**
Async/Await simplifies asynchronous code by making it look like synchronous code.

✅ **Using Async/Await**
```javascript
async function notifyUser(userId) {
    try {
        const user = await getUser(userId);
        const posts = await getPosts(user.id);
        const comments = await getComments(posts[0].id);
        await sendNotification(comments[0].userId);
        console.log('Notification sent');
    } catch (err) {
        console.error('Error:', err);
    }
}

notifyUser(userId);
```

✅ **Benefits of async/await**
✔️ No nesting  
✔️ Readable, maintainable  
✔️ Easier error handling with `try...catch`

---

## **3. What is the difference between synchronous and asynchronous programming?**
### **Synchronous Programming**
- **Executes code sequentially, blocking execution until completion.**
- Each statement waits for the previous one to finish.

✅ **Example (Blocking)**
```javascript
console.log('Start');
const result = fs.readFileSync('example.txt', 'utf8'); // Blocks execution
console.log(result);
console.log('End');
```
**Output:**  
```
Start
<File content>
End
```
🔴 **Issue:** The file read operation blocks further execution.

---

### **Asynchronous Programming**
- **Executes code without blocking the main thread.**
- Uses **callbacks, Promises, or async/await**.

✅ **Example (Non-Blocking)**
```javascript
console.log('Start');

fs.readFile('example.txt', 'utf8', (err, data) => {
    console.log(data);
});

console.log('End');
```
**Output:**  
```
Start
End
<File content>
```
🟢 **Benefit:** The file read operation **does not block** execution.

---

---

## **5. What are Promises, and how do they improve async code?**
A **Promise** is an object representing **the eventual completion or failure** of an asynchronous operation.

### **Promise States**
1. **Pending** – Initial state, waiting for resolution.
2. **Fulfilled** – Operation completed successfully.
3. **Rejected** – Operation failed.

✅ **Example: Creating a Promise**
```javascript
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Data fetched'), 2000);
});

myPromise.then(result => console.log(result)).catch(err => console.error(err));
```
**Output (after 2 sec):**  
```
Data fetched
```

---

### **How Promises Improve Async Code**
Before Promises (**callback hell**):
```javascript
fetchData((data) => {
    processData(data, (processed) => {
        saveToDB(processed, (saved) => {
            console.log('Done');
        });
    });
});
```
Using Promises (**chaining**):
```javascript
fetchData()
    .then(processData)
    .then(saveToDB)
    .then(() => console.log('Done'))
    .catch(err => console.error('Error:', err));
```

Using **async/await** (**cleaner & readable**):
```javascript
async function processAll() {
    try {
        const data = await fetchData();
        const processed = await processData(data);
        await saveToDB(processed);
        console.log('Done');
    } catch (err) {
        console.error('Error:', err);
    }
}
processAll();
```

🚀 **Benefits of Promises**
✔ **Avoids callback hell**  
✔ **Easier to read**  
✔ **Better error handling (`.catch()`)**  

---

## **Final Summary**
| Concept | Key Takeaways |
|---------|--------------|
| **Callbacks** | Used for async operations, but can lead to callback hell. |
| **Avoid Callback Hell** | Use Named Functions, Promises, or async/await. |
| **Sync vs Async** | Sync blocks execution, Async doesn't. |
| **Event Loop** | Handles async tasks using micro & macrotasks. |
| **Promises** | Makes async code cleaner and avoids nesting. |

### **How Does the Node.js Event Loop Work?**

The **event loop** is one of the most critical concepts in **Node.js**, as it enables **non-blocking I/O operations**. It allows Node.js to efficiently handle multiple operations **asynchronously** without blocking the main thread.

* * * * *

**1\. What is the Event Loop?**
-------------------------------

The **event loop** is a mechanism in Node.js that continuously checks and executes tasks from different **queues**.

-   It processes **asynchronous operations** like **I/O, timers, network requests**, and **callbacks**.
-   It ensures that **Node.js remains single-threaded** while handling multiple operations concurrently.

* * * * *

**2\. How Does the Event Loop Work?**
-------------------------------------

The event loop works in **phases** that execute tasks in a particular order.\
Each cycle of the event loop is called a **"tick"**, and during each tick, Node.js processes different types of asynchronous operations.

### **Event Loop Phases**

1.  **Timers Phase**
    -   Executes callbacks from `setTimeout()` and `setInterval()`.
2.  **I/O Callbacks Phase**
    -   Executes I/O callbacks (e.g., reading files, network requests).
3.  **Idle, Prepare Phase** *(internal use)*
    -   Used internally by Node.js for optimizations.
4.  **Poll Phase**
    -   Retrieves I/O events and executes callbacks.
5.  **Check Phase**
    -   Executes `setImmediate()` callbacks.
6.  **Close Callbacks Phase**
    -   Executes `close` event handlers like `socket.on('close')`.

* * * * *

**3\. Node.js Event Loop Execution Order**
------------------------------------------

### **Example: Understanding Execution Order**

```
console.log('Start');

setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'));

process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('Promise'));

console.log('End');

```

### **Output:**

```
Start
End
nextTick
Promise
setTimeout
setImmediate

```

* * * * *

**4\. Microtasks vs. Macrotasks**
---------------------------------

The event loop has two types of task queues:

1.  **Microtasks Queue** (Higher priority)
    -   **`process.nextTick()`**
    -   **Promises (`.then()`, `.catch()`)**
2.  **Macrotasks Queue** (Lower priority)
    -   **Timers (`setTimeout`, `setInterval`)**
    -   **I/O operations (`fs.readFile`)**
    -   **setImmediate()**

* * * * *

**5\. Key Differences Between Asynchronous Methods**
----------------------------------------------------

| Function | Phase |
| --- | --- |
| **process.nextTick()** | Executes **immediately after synchronous code**, before I/O events. |
| **Promise.then()** | Added to the **microtask queue** (executed after `nextTick()`). |
| **setTimeout(fn, 0)** | Executes in the **Timers phase** (after microtasks). |
| **setImmediate()** | Executes in the **Check phase**, after Poll phase. |

* * * * *

**6\. Deep Dive into Event Loop Phases**
----------------------------------------

### **1️⃣ Timers Phase (`setTimeout`, `setInterval`)**

-   Executes **timers** set by `setTimeout()` and `setInterval()`.
-   The actual execution time **may be delayed** due to other phases.

```
console.log('Before Timer');
setTimeout(() => console.log('Timer executed'), 1000);
console.log('After Timer');

```

**Output:**

```
Before Timer
After Timer
Timer executed (after ~1s)

```

* * * * *

### **2️⃣ I/O Callbacks Phase**

-   Executes **callbacks from asynchronous I/O operations** (e.g., `fs.readFile()`).
-   Runs after the **Timers phase**.

```
const fs = require('fs');

fs.readFile('file.txt', 'utf8', () => {
    console.log('File read completed');
});
console.log('Reading file...');

```

**Output:**

```
Reading file...
File read completed (executed in I/O Callbacks phase)

```

* * * * *

### **3️⃣ Poll Phase**

-   **Retrieves and executes I/O events** (network requests, file system, database queries).
-   If no I/O operations are pending, it **waits** for new events.

```
setTimeout(() => console.log('Timer Callback'), 0);
setImmediate(() => console.log('Immediate Callback'));

console.log('Synchronous Code');

```

**Output:**

```
Synchronous Code
Timer Callback
Immediate Callback

```

-   `setTimeout()` **executes in the Timers phase**.
-   `setImmediate()` **executes in the Check phase**, after Poll.

* * * * *

### **4️⃣ Check Phase (`setImmediate`)**

-   Executes callbacks scheduled with `setImmediate()`.
-   If **I/O callbacks are pending**, `setImmediate()` **executes before timers**.

```
const fs = require('fs');

fs.readFile('file.txt', () => {
    setTimeout(() => console.log('Timeout Callback'), 0);
    setImmediate(() => console.log('Immediate Callback'));
});

```

**Output:**

```
Immediate Callback
Timeout Callback

```

-   **`setImmediate()` executes before `setTimeout(0)`.**

* * * * *

### **5️⃣ Close Callbacks Phase**

-   Handles cleanup operations (e.g., `socket.on('close', callback)`).

```
const net = require('net');

const server = net.createServer();
server.on('close', () => console.log('Server Closed'));

server.close();

```

* * * * *

**7\. `process.nextTick()` vs. `setImmediate()`**
-------------------------------------------------

| Function | Execution Timing |
| --- | --- |
| **`process.nextTick()`** | Executes **before** the next event loop iteration. |
| **`setImmediate()`** | Executes in the **Check phase** (after I/O operations). |

✅ **Example**

```
setImmediate(() => console.log('setImmediate'));
process.nextTick(() => console.log('nextTick'));
console.log('Synchronous');

```

**Output:**

```
Synchronous
nextTick
setImmediate

```

-   **`process.nextTick()` executes immediately** after synchronous code.
-   **`setImmediate()` waits for the event loop to reach the Check phase**.

* * * * *

**8\. Real-World Use Cases**
----------------------------

### **🔹 Optimizing Performance with `process.nextTick()`**

```
function heavyComputation() {
    process.nextTick(() => console.log('Processing data...'));
}

console.log('Start');
heavyComputation();
console.log('End');

```

**Output:**

```
Start
End
Processing data...

```

-   `process.nextTick()` ensures **"Processing data..."** executes after synchronous code.

* * * * *

### **🔹 Using `setImmediate()` for Asynchronous Tasks**

```
const server = require('http').createServer();

server.on('request', (req, res) => {
    setImmediate(() => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World');
    });
});

server.listen(3000);

```

-   Ensures **request handling** doesn't block other operations.

* * * * *

**9\. Summary**
---------------

| **Concept** | **Description** |
| --- | --- |
| **Event Loop** | Mechanism that handles **asynchronous operations**. |
| **Microtasks** | `process.nextTick()`, Promises (`.then()`). |
| **Macrotasks** | Timers, I/O, `setImmediate()`. |
| **Timers Phase** | Executes `setTimeout()` & `setInterval()`. |
| **I/O Callbacks Phase** | Executes I/O operations (e.g., `fs.readFile()`). |
| **Poll Phase** | Waits for new I/O events. |
| **Check Phase** | Executes `setImmediate()`. |
| **Close Callbacks Phase** | Handles close event callbacks. |
| **`process.nextTick()`** | Executes before the next event loop iteration. |
| **`setImmediate()`** | Executes in the Check phase. |

🚀 **Key Takeaway:**

-   **Mastering the event loop** helps optimize **asynchronous code** and avoid **performance issues**.
-   Understanding **execution order** is **critical for debugging Node.js applications**.

### **Detailed Flow of How the Event Loop Works in Node.js**

The **Event Loop** in Node.js is responsible for handling asynchronous operations **efficiently** in a **single-threaded**environment. It ensures that non-blocking I/O operations (like reading files, network requests, and timers) are executed properly without stopping the execution of JavaScript code.

* * * * *

**📌 High-Level Overview of the Event Loop**
--------------------------------------------

1.  **Node.js starts execution of the script** (all synchronous code runs first).
2.  **The Event Loop continuously runs** as long as there are tasks in the callback queue.
3.  **Asynchronous operations (like I/O, Timers, Promises) are handled in different phases.**
4.  **Each iteration of the event loop is called a "tick"**, and in each tick, specific tasks are executed in different **phases**.
5.  **Microtasks (process.nextTick & Promises) are always executed before moving to the next phase.**

* * * * *

**🛠️ Step-by-Step Breakdown of the Event Loop Execution**
----------------------------------------------------------

The **event loop** runs in **six phases**, executing different types of asynchronous tasks in each phase.

### **🔴 Phase 1: Timers**

-   Executes callbacks from **setTimeout()** and **setInterval()**.
-   If a timer has completed the specified delay, its callback is added to the callback queue.

✅ **Example**

```
console.log("Start");

setTimeout(() => {
    console.log("Timeout Callback");
}, 0);

console.log("End");

```

**Output:**

```
Start
End
Timeout Callback

```

-   **Synchronous code executes first** (`Start` → `End`).
-   `setTimeout(0)` executes in the **Timers phase** after the delay.

* * * * *

### **🔵 Phase 2: I/O Callbacks**

-   Executes callbacks for **I/O operations** (e.g., file system operations, network requests).
-   Runs only **after all expired timers have been executed**.

✅ **Example**

```
const fs = require("fs");

fs.readFile("file.txt", () => {
    console.log("File Read Completed");
});

console.log("Reading File...");

```

**Output:**

```
Reading File...
File Read Completed

```

-   **File reading is handled asynchronously**.
-   The callback (`File Read Completed`) executes in the **I/O Callbacks phase**.

* * * * *

### **⚫ Phase 3: Idle, Prepare (Internal Use)**

-   Used **internally by Node.js** for optimizations.
-   No user-defined callbacks are executed in this phase.

* * * * *

### **🟢 Phase 4: Poll**

-   This phase is where **I/O operations are retrieved and executed**.
-   If there are pending **I/O tasks**, their callbacks are executed.
-   If there are **no I/O tasks**, Node.js **waits** for new events.

✅ **Example**

```
const fs = require("fs");

fs.readFile("file.txt", () => {
    console.log("I/O Callback Executed");
});

setTimeout(() => console.log("Timer Callback"), 0);
setImmediate(() => console.log("Immediate Callback"));

console.log("Synchronous Code");

```

**Output:**

```
Synchronous Code
I/O Callback Executed
Immediate Callback
Timer Callback

```

-   **Poll phase executes I/O first** (`I/O Callback Executed`).
-   `setImmediate()` executes **before** `setTimeout(0)`.

* * * * *

### **🟡 Phase 5: Check (`setImmediate`)**

-   Executes **setImmediate() callbacks**.
-   These callbacks run **right after I/O operations**.
-   `setImmediate()` is **always executed before `setTimeout(0)`** if called inside an I/O operation.

✅ **Example**

```
const fs = require("fs");

fs.readFile("file.txt", () => {
    setTimeout(() => console.log("setTimeout"), 0);
    setImmediate(() => console.log("setImmediate"));
});

```

**Output:**

```
setImmediate
setTimeout

```

-   **setImmediate() executes before setTimeout()** because it belongs to the **Check phase**.

* * * * *

### **🔵 Phase 6: Close Callbacks**

-   Executes callbacks for **closed resources** (e.g., `socket.on('close')`).
-   Used for **cleanup tasks**.

✅ **Example**

```
const net = require("net");

const server = net.createServer();

server.on("close", () => {
    console.log("Server Closed");
});

server.close();

```

**Output:**

```
Server Closed

```

-   The `close` event executes in the **Close Callbacks phase**.

* * * * *

**📌 Microtasks: `process.nextTick()` & Promises**
--------------------------------------------------

-   **Microtasks** are tasks that execute **before moving to the next phase**.
-   Includes:
    -   `process.nextTick()`
    -   `Promise.then()`, `Promise.catch()`, `Promise.finally()`

✅ **Execution Order of Microtasks**

```
console.log("Start");

setTimeout(() => console.log("setTimeout"), 0);
setImmediate(() => console.log("setImmediate"));

process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("Promise"));

console.log("End");

```

**Output:**

```
Start
End
nextTick
Promise
setTimeout
setImmediate

```

-   **Synchronous Code executes first** (`Start`, `End`).
-   **Microtasks (nextTick & Promise) execute before Timers**.
-   `setTimeout(0)` executes **before** `setImmediate()`.

* * * * *

**🛠️ Execution Flow of Event Loop (Step-by-Step)**
---------------------------------------------------

### **1️⃣ Script Execution (Synchronous Code)**

-   Executes all synchronous JavaScript code **first**.

### **2️⃣ Microtasks Execution**

-   `process.nextTick()` and `Promise.then()` execute **before the next event loop phase**.

### **3️⃣ Event Loop Starts Processing Phases**

| Phase | Tasks Executed |
| --- | --- |
| **Timers** | `setTimeout()`, `setInterval()` |
| **I/O Callbacks** | File system, network requests |
| **Poll** | Retrieves new I/O tasks, executes callbacks |
| **Check** | `setImmediate()` callbacks |
| **Close Callbacks** | Cleanup operations |

* * * * *

**📌 Summary Table**
--------------------

| Concept | Description |
| --- | --- |
| **Event Loop** | Runs continuously, processing different queues. |
| **Microtasks** | `process.nextTick()`, Promises (executed before next phase). |
| **Timers Phase** | Executes `setTimeout()` and `setInterval()`. |
| **I/O Callbacks Phase** | Handles network requests, file system operations. |
| **Poll Phase** | Retrieves new I/O tasks, executes callbacks. |
| **Check Phase** | Executes `setImmediate()` callbacks. |
| **Close Callbacks Phase** | Executes cleanup operations. |

* * * * *

**🚀 Key Takeaways**
--------------------

✔️ **Event Loop is single-threaded**, but allows async operations using callbacks.\
✔️ **Microtasks (`process.nextTick()` & Promises) always execute before the next event loop phase.**\
✔️ **`setImmediate()` executes before `setTimeout(0)` inside I/O operations.**\
✔️ **Understanding event loop phases helps optimize Node.js performance.**

* * * * *

**6\. Difference between `Promise.all()`, `Promise.any()`, `Promise.race()`, and `Promise.allSettled()`**
---------------------------------------------------------------------------------------------------------

### **✅ `Promise.all()`**

-   Takes an **array of promises** and **resolves** when **all promises** are resolved.
-   If **any promise rejects**, it **immediately rejects** the entire `Promise.all()`.
-   Used when **all results are needed** before proceeding.

✅ **Example**

```
const p1 = Promise.resolve(10);
const p2 = new Promise((resolve) => setTimeout(() => resolve(20), 1000));
const p3 = Promise.reject("Error!");

Promise.all([p1, p2, p3])
    .then((results) => console.log(results))
    .catch((error) => console.log("Rejected:", error));

```

**Output:**

```
Rejected: Error!

```

🚀 **Use Case:** Fetching multiple API responses where all are required.

* * * * *

### **✅ `Promise.any()`**

-   Takes an **array of promises** and resolves when **the first promise fulfills**.
-   If **all promises reject**, it rejects with an `AggregateError`.

✅ **Example**

```
const p1 = new Promise((_, reject) => setTimeout(() => reject("Error 1"), 500));
const p2 = new Promise((resolve) => setTimeout(() => resolve(20), 1000));
const p3 = new Promise((resolve) => setTimeout(() => resolve(30), 2000));

Promise.any([p1, p2, p3])
    .then((result) => console.log("Resolved:", result))
    .catch((error) => console.log("All rejected:", error.errors));

```

**Output:**

```
Resolved: 20

```

🚀 **Use Case:** Fetching from multiple redundant APIs and using the fastest response.

* * * * *

### **✅ `Promise.race()`**

-   Takes an **array of promises** and resolves/rejects as **soon as the first promise settles (either resolves or rejects).**

✅ **Example**

```
const p1 = new Promise((_, reject) => setTimeout(() => reject("Rejected first"), 500));
const p2 = new Promise((resolve) => setTimeout(() => resolve("Resolved second"), 1000));

Promise.race([p1, p2])
    .then((result) => console.log("Resolved:", result))
    .catch((error) => console.log("Rejected:", error));

```

**Output:**

```
Rejected: Rejected first

```

🚀 **Use Case:** Loading an image from multiple CDN servers; use the first available one.

* * * * *

### **✅ `Promise.allSettled()`**

-   Takes an **array of promises** and **always resolves** with an array of objects, regardless of individual promise failures.

✅ **Example**

```
const p1 = Promise.resolve(10);
const p2 = new Promise((_, reject) => setTimeout(() => reject("Error!"), 500));

Promise.allSettled([p1, p2]).then((results) => console.log(results));

```

**Output:**

```
[
  { status: "fulfilled", value: 10 },
  { status: "rejected", reason: "Error!" }
]

```

🚀 **Use Case:** When we need to track both success and failure cases without stopping execution.

* * * * *

**7\. What is `async/await`, and how does it simplify asynchronous programming?**
---------------------------------------------------------------------------------

-   `async/await` is a modern way to handle asynchronous code **without using callbacks or `.then()` chains.**
-   Makes **asynchronous code look like synchronous code**.

✅ **Example**

```
async function fetchData() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

fetchData();

```

-   **No need for `.then()`** -- execution pauses at `await` until the promise resolves.
-   **Improves readability** and avoids **callback hell**.

* * * * *

**8\. How do you handle errors in `async/await`?**
--------------------------------------------------

### **✅ Using `try...catch`**

-   Wrap `await` calls inside a `try...catch` block to handle errors.

```
async function fetchData() {
    try {
        let response = await fetch("https://invalid-url.com");
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.log("Error:", error.message);
    }
}

fetchData();

```

### **✅ Using `.catch()` with Promises**

```
async function fetchData() {
    let response = await fetch("https://invalid-url.com").catch((error) => console.log("Caught:", error.message));
}
fetchData();

```

* * * * *

**9\. Difference between `process.nextTick()` and `setImmediate()`**
--------------------------------------------------------------------

| Feature | `process.nextTick()` | `setImmediate()` |
| --- | --- | --- |
| Execution Timing | Runs **before** I/O and timers | Runs **after** I/O callbacks |
| Priority | **Higher** (executes before next event loop phase) | **Lower** (executes in the Check phase) |
| Use Case | Urgent callbacks | Less urgent but immediate tasks |

✅ **Example**

```
console.log("Start");

process.nextTick(() => console.log("nextTick callback"));
setImmediate(() => console.log("setImmediate callback"));

console.log("End");

```

**Output:**

```
Start
End
nextTick callback
setImmediate callback

```

🚀 **Key Takeaway:**

-   `process.nextTick()` **executes before any I/O or timer callbacks**.
-   `setImmediate()` **executes in the next iteration of the event loop**.

* * * * *

**10\. How does the Microtask Queue differ from the Macrotask Queue?**
----------------------------------------------------------------------

| **Feature** | **Microtask Queue** | **Macrotask Queue** |
| --- | --- | --- |
| **Examples** | `process.nextTick()`, `Promise.then()` | `setTimeout()`, `setImmediate()`, `setInterval()` |
| **Execution Priority** | **Higher (executes first, before the next phase of event loop)** | Lower (executes after microtasks) |
| **Use Case** | Urgent tasks that must be completed before moving to the next event loop cycle | Normal asynchronous operations like timers and I/O |

✅ **Example**

```
console.log("Start");

setTimeout(() => console.log("setTimeout"), 0);
setImmediate(() => console.log("setImmediate"));
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("Promise"));

console.log("End");

```

**Output:**

```
Start
End
nextTick
Promise
setTimeout
setImmediate

```

🚀 **Key Takeaways**

1.  **Microtasks (`process.nextTick()`, `Promise.then()`) execute before Macrotasks**.
2.  **Timers (`setTimeout()`) and I/O (`setImmediate()`) are scheduled in the Event Loop**.
3.  **Order of Execution:**
    -   **Synchronous Code → Microtasks → Macrotasks**.

* * * * *

**📌 Final Summary**
--------------------

| Concept | Description |
| --- | --- |
| **`Promise.all()`** | Resolves when **all promises resolve** or **rejects if any fail**. |
| **`Promise.any()`** | Resolves when **any one promise resolves**. |
| **`Promise.race()`** | Resolves/rejects **when the first promise settles**. |
| **`Promise.allSettled()`** | Resolves when **all promises settle (success/failure)**. |
| **`async/await`** | Improves readability of async code, avoiding `.then()` chains. |
| **Error Handling in `async/await`** | Use **`try...catch`** or `.catch()` for promise handling. |
| **`process.nextTick()` vs `setImmediate()`** | `nextTick()` runs **before next loop**, `setImmediate()` runs in **Check phase**. |
| **Microtask vs Macrotask Queue** | Microtasks execute **before macrotasks** in the event loop. |

**11\. How do you implement throttling and debouncing in Node.js?**
-------------------------------------------------------------------

### **✅ Throttling**

Throttling ensures that a function executes at most once in a specified time period, no matter how many times the event is triggered.

**📌 Use Case:**

-   **Limiting API requests**
-   **Restricting UI button clicks**
-   **Rate-limiting function calls**

✅ **Throttle Implementation using `lodash.throttle`**

```
const _ = require("lodash");

const throttleFunction = _.throttle(() => {
    console.log("Function executed!");
}, 2000);

setInterval(throttleFunction, 500); // This will only execute every 2 seconds

```

✅ **Throttle Implementation without Lodash**

```
function throttle(fn, limit) {
    let lastCall = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastCall >= limit) {
            lastCall = now;
            fn.apply(this, args);
        }
    };
}

const logMessage = () => console.log("Throttled function executed!");
const throttledFunction = throttle(logMessage, 2000);

setInterval(throttledFunction, 500);

```

* * * * *

### **✅ Debouncing**

Debouncing delays function execution until a specified time has passed **since the last time** it was invoked.

**📌 Use Case:**

-   **Auto-save feature**
-   **Search input optimizations**
-   **Window resize event handling**

✅ **Debounce Implementation using `lodash.debounce`**

```
const debounceFunction = _.debounce(() => {
    console.log("Function executed!");
}, 2000);

debounceFunction();
debounceFunction(); // Only the last call within 2 seconds executes

```

✅ **Debounce Implementation without Lodash**

```
function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

const logMessage = () => console.log("Debounced function executed!");
const debouncedFunction = debounce(logMessage, 2000);

debouncedFunction();
debouncedFunction(); // Only the last call will execute

```

* * * * *

**12\. Difference between an event-driven and a multi-threaded approach**
-------------------------------------------------------------------------

| Feature | **Event-Driven Approach** | **Multi-Threaded Approach** |
| --- | --- | --- |
| **Concurrency Model** | Non-blocking, uses event loop | Uses multiple OS threads |
| **Execution Style** | Single-threaded, event-driven | Multi-threaded, parallel execution |
| **Performance** | Efficient for I/O-heavy operations | Suitable for CPU-intensive tasks |
| **Complexity** | Simpler, avoids thread synchronization | Requires thread management and synchronization |
| **Example** | **Node.js** (event loop) | **Java, Python (threading)** |

✅ **Event-Driven Example (Node.js)**

```
const fs = require("fs");

fs.readFile("file.txt", "utf-8", (err, data) => {
    if (err) console.error(err);
    else console.log(data);
});
console.log("File read initiated"); // Runs first due to async nature

```

✅ **Multi-Threaded Example (Using Worker Threads in Node.js)**

```
const { Worker } = require("worker_threads");

const worker = new Worker("./worker.js");
worker.postMessage("Start");

worker.on("message", (msg) => console.log("Worker response:", msg));

```

* * * * *

**13\. How do you optimize async code execution?**
--------------------------------------------------

### ✅ **1\. Use `Promise.all()` for Parallel Execution**

```
const fetch1 = fetch("https://jsonplaceholder.typicode.com/posts/1");
const fetch2 = fetch("https://jsonplaceholder.typicode.com/posts/2");

Promise.all([fetch1, fetch2])
    .then((responses) => Promise.all(responses.map((res) => res.json())))
    .then((data) => console.log(data));

```

### ✅ **2\. Use `async/await` with Proper Error Handling**

```
async function fetchData() {
    try {
        let response = await fetch("https://api.example.com/data");
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
fetchData();

```

### ✅ **3\. Use `setImmediate()` for Heavy Computation**

```
setImmediate(() => console.log("Executed after I/O callbacks"));

```

### ✅ **4\. Use Worker Threads for CPU-Intensive Tasks**

```
const { Worker } = require("worker_threads");
const worker = new Worker("./worker.js");

worker.on("message", (msg) => console.log("Worker:", msg));
worker.postMessage("Start");

```

* * * * *

**14\. What is a Worker Thread, and how do you use it in Node.js?**
-------------------------------------------------------------------

### **📌 What is a Worker Thread?**

-   A **Worker Thread** allows parallel execution of JavaScript code in **multiple threads**.
-   Used for **CPU-intensive tasks** (e.g., image processing, data crunching).

✅ **Basic Worker Thread Example**

### **🔹 `worker.js`**

```
const { parentPort } = require("worker_threads");

parentPort.on("message", (msg) => {
    console.log("Worker received:", msg);
    parentPort.postMessage("Done processing!");
});

```

### **🔹 `main.js`**

```
const { Worker } = require("worker_threads");

const worker = new Worker("./worker.js");
worker.postMessage("Start");

worker.on("message", (msg) => console.log("Worker response:", msg));

```

* * * * *

**15\. How do you handle multiple async operations in parallel?**
-----------------------------------------------------------------

### ✅ **1\. Using `Promise.all()` (Best for Independent Operations)**

-   Runs all promises in parallel and waits for **all to complete**.

```
const fetch1 = fetch("https://jsonplaceholder.typicode.com/posts/1").then((res) => res.json());
const fetch2 = fetch("https://jsonplaceholder.typicode.com/posts/2").then((res) => res.json());

Promise.all([fetch1, fetch2]).then((data) => console.log(data));

```

### ✅ **2\. Using `Promise.race()` (Best for Fastest Response)**

-   Returns the **first resolved/rejected promise**.

```
Promise.race([
    fetch("https://jsonplaceholder.typicode.com/posts/1").then((res) => res.json()),
    fetch("https://jsonplaceholder.typicode.com/posts/2").then((res) => res.json()),
]).then((data) => console.log("First resolved:", data));

```

### ✅ **3\. Using `Promise.allSettled()` (Best for Handling Success & Failures Separately)**

```
Promise.allSettled([
    fetch("https://jsonplaceholder.typicode.com/posts/1"),
    fetch("https://invalid-url.com"),
]).then((results) => console.log(results));

```

### ✅ **4\. Using Worker Threads for CPU-Bound Tasks**

-   Helps in **parallelizing** computationally expensive tasks.

```
const { Worker } = require("worker_threads");

const worker1 = new Worker("./worker.js");
const worker2 = new Worker("./worker.js");

worker1.postMessage("Task 1");
worker2.postMessage("Task 2");

worker1.on("message", (msg) => console.log("Worker 1:", msg));
worker2.on("message", (msg) => console.log("Worker 2:", msg));

```

* * * * *

**🚀 Final Summary**
--------------------

| Concept | Description |
| --- | --- |
| **Throttling** | Limits function execution to once per specified time interval. |
| **Debouncing** | Delays function execution until after a specified delay. |
| **Event-Driven vs Multi-Threading** | Event-driven is async (Node.js), multi-threading uses multiple threads (Java, Python). |
| **Optimizing Async Execution** | Use `Promise.all()`, `async/await`, `setImmediate()`, Worker Threads. |
| **Worker Threads** | Run CPU-intensive tasks in separate threads. |
| **Handling Multiple Async Operations** | Use `Promise.all()`, `Promise.race()`, `Promise.allSettled()`, Worker Threads. |

***3. Node.js Modules & NPM (10 Questions)***

Here are detailed answers to your questions about **npm** and **module management** in Node.js:

* * * * *

### **1\. What is npm, and how does it work?**

**npm (Node Package Manager)** is the default package manager for Node.js. It is used to install, manage, and share JavaScript libraries and tools.

#### **How npm Works:**

-   It manages **dependencies** in a project via the `package.json` file.
-   Downloads packages from the **npm registry** (`https://www.npmjs.com/`).
-   Maintains versioning and dependency resolution using `package-lock.json`.
-   Can be used to **execute scripts** via `npm run`.

#### **Basic npm Commands:**

-   Install a package:

    ```
    npm install <package-name>

    ```

-   Install a package globally:

    ```
    npm install -g <package-name>

    ```

-   Initialize a new project:

    ```
    npm init -y

    ```

-   Run a script from `package.json`:

    ```
    npm run start

    ```

* * * * *

### **2\. What is the difference between `dependencies` and `devDependencies` in package.json?**

| Type | Purpose | Example Usage |
| --- | --- | --- |
| **dependencies** | Required for the application to run in production | Express, Axios |
| **devDependencies** | Only needed during development and testing | Jest, ESLint |

#### **Example `package.json`:**

```
{
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "jest": "^27.0.6"
  }
}

```

📌 **Use `--save-dev` to install devDependencies:**

```
npm install jest --save-dev

```

* * * * *

### **3\. What is the purpose of `package-lock.json`?**

-   Ensures **consistent dependency versions** across all environments.
-   Locks the exact versions of installed dependencies to avoid unexpected updates.
-   Helps in **faster installations** by avoiding redundant resolution.

📌 **To regenerate `package-lock.json`, delete it and run:**

```
rm package-lock.json && npm install

```

* * * * *

### **4\. How do you create a custom module in Node.js?**

A **custom module** in Node.js is a JavaScript file exporting functions, objects, or classes.

#### **Step 1: Create a module (`math.js`)**

```
// math.js
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

// Export functions
module.exports = { add, subtract };

```

#### **Step 2: Import and use the module (`index.js`)**

```
const math = require('./math');

console.log(math.add(5, 3));  // Output: 8
console.log(math.subtract(5, 3));  // Output: 2

```

* * * * *

### **5\. What are peer dependencies, and when should you use them?**

**Peer dependencies** are used when a package requires a specific dependency **but does not install it automatically**. Instead, it expects the parent project to provide it.

📌 **Use Cases:**

-   **Plugins or extensions** (e.g., React plugins require React to be installed in the main project).
-   **Shared dependencies** in a monorepo.

#### **Example in `package.json`:**

```
{
  "peerDependencies": {
    "react": "^17.0.0"
  }
}

```

📌 **Installation:**\
Users must manually install the peer dependencies:

```
npm install react

```

* * * * *

### **6\. How do you publish a package to npm?**

#### **Step 1: Login to npm**

```
npm login

```

#### **Step 2: Initialize a package**

```
npm init -y

```

#### **Step 3: Publish the package**

```
npm publish

```

📌 **Updating a package:**

```
npm version patch
npm publish

```

📌 **Publishing a scoped package (`@username/package`):**

```
npm publish --access public

```

* * * * *

### **7\. What is the difference between npm and yarn?**

| Feature | **npm** | **Yarn** |
| --- | --- | --- |
| **Speed** | Slower | Faster due to parallel downloads |
| **Lock file** | `package-lock.json` | `yarn.lock` |
| **Security** | Integrity checks | More secure checksum verification |
| **Command Syntax** | `npm install` | `yarn add` |

📌 **Install Yarn globally:**

```
npm install -g yarn

```

📌 **Installing dependencies using Yarn:**

```
yarn install

```

* * * * *

### **8\. How do you resolve module conflicts in Node.js?**

Module conflicts occur when different versions of the same package are installed due to dependency trees.

#### **Fixes for Module Conflicts:**

✅ **Use `npm dedupe` to remove duplicate packages**

```
npm dedupe

```

✅ **Use `npm list` to check installed versions**

```
npm list express

```

✅ **Manually update dependency versions in `package.json`**

```
{
  "dependencies": {
    "express": "^4.18.0"
  }
}

```

✅ **Use `npm install` after updating versions**

```
npm install

```

* * * * *

### **9\. How do you use `npx`, and when is it useful?**

**`npx` (Node Package eXecute)** allows running Node.js packages **without installing them globally**.

📌 **Use Cases:**

-   Running CLI tools **without installation**.
-   Running scripts from npm packages.

✅ **Running a package without installing:**

```
npx cowsay "Hello, World!"

```

✅ **Using `npx` to create a React app:**

```
npx create-react-app my-app

```

✅ **Running locally installed binaries:**

```
npx eslint .

```

* * * * *

### **10\. What are the common issues with module resolution in Node.js?**

#### **1️⃣ Module Not Found (`MODULE_NOT_FOUND`)**

**Cause:** Incorrect import path or missing module.\
**Fix:** Check module installation and import path.

✅ **Fix Example:**

```
npm install lodash

```

```
const _ = require('lodash'); // Correct import

```

#### **2️⃣ Version Conflicts**

**Cause:** Different versions of the same module are installed.\
**Fix:** Use `npm dedupe` or update `package.json`.

#### **3️⃣ Global vs Local Module Conflicts**

**Cause:** A package is installed globally but not locally.\
**Fix:** Always install locally if used in a project.

```
npm install nodemon --save-dev

```

#### **4️⃣ Circular Dependencies**

**Cause:** Two modules depend on each other in a loop.\
**Fix:** Refactor to remove circular references.

✅ **Example Fix:**

```
// A.js
const B = require('./B.js');
module.exports = { fromA: 'A', B };

// B.js
const A = require('./A.js');
module.exports = { fromB: 'B', A };

```

✅ **Solution:** Use lazy loading (`require()` inside a function).

* * * * *

**🚀 Summary**
--------------

| Question | Key Points |
| --- | --- |
| **npm** | Manages Node.js packages and dependencies. |
| **dependencies vs devDependencies** | `dependencies` for production, `devDependencies` for development. |
| **package-lock.json** | Locks versions for consistency. |
| **Custom Module** | Use `module.exports` to define modules. |
| **Peer Dependencies** | Used for shared libraries that require manual installation. |
| **Publishing to npm** | Use `npm publish` and `npm version`. |
| **npm vs Yarn** | Yarn is faster, npm is default. |
| **Resolving Module Conflicts** | Use `npm dedupe`, check `npm list`. |
| **npx** | Runs packages without installing globally. |
| **Module Resolution Issues** | Fix missing imports, version conflicts, circular dependencies. |

***4. File System & Streams (10 Questions)***

**1\. How do you read and write files asynchronously in Node.js?**
------------------------------------------------------------------

In Node.js, the **`fs` (File System) module** provides methods to read and write files asynchronously, preventing the main thread from blocking.

### **Reading a File Asynchronously (`fs.readFile`)**

```
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
});

```

📌 **Key Points:**

-   **`fs.readFile()`** reads the entire file into memory before returning the result.
-   The callback function handles errors (`err`) and the file content (`data`).
-   The second argument (`'utf8'`) ensures text is read as a string instead of a Buffer.

### **Writing a File Asynchronously (`fs.writeFile`)**

```
fs.writeFile('output.txt', 'Hello, Node.js!', 'utf8', (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('File written successfully!');
});

```

📌 **Key Points:**

-   **`fs.writeFile()`** replaces the file content if it already exists.
-   Handles errors in the callback.
-   The third argument (`'utf8'`) ensures text encoding.

* * * * *

**2\. What is the difference between `fs.readFile()` and `fs.createReadStream()`?**
-----------------------------------------------------------------------------------

| Feature | `fs.readFile()` | `fs.createReadStream()` |
| --- | --- | --- |
| **Method Type** | Reads entire file at once | Reads file in chunks |
| **Memory Usage** | Loads full content into RAM | Streams data in smaller parts |
| **Performance** | Slower for large files | Optimized for large files |
| **Best for** | Small files | Large files (e.g., logs, videos) |

### **Example: `fs.readFile()` (Reads Entire File)**

```
const fs = require('fs');

fs.readFile('largeFile.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('File content:', data);
});

```

📌 **Problem:** If the file is large (e.g., 1GB), it may crash the process due to high memory usage.

### **Example: `fs.createReadStream()` (Streams File)**

```
const fs = require('fs');

const stream = fs.createReadStream('largeFile.txt', 'utf8');

stream.on('data', (chunk) => {
    console.log('Received chunk:', chunk);
});

stream.on('end', () => {
    console.log('Finished reading file');
});

stream.on('error', (err) => {
    console.error('Error:', err);
});

```

📌 **Advantages of `fs.createReadStream()`:**

-   Uses **less memory** (only loads small chunks at a time).
-   Ideal for handling **large files**.
-   Provides **better performance** for big data processing.

* * * * *

**3\. How do you handle file system errors in Node.js?**
--------------------------------------------------------

File system operations can fail due to various reasons (missing files, permission errors, etc.). Node.js provides **error-first callbacks** and **try-catch blocks** (for promises) to handle such cases.

### **Handling Errors in Callbacks**

```
fs.readFile('nonexistent.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err.message);
        return;
    }
    console.log(data);
});

```

📌 **Common File System Errors:**

-   **ENOENT** (Error NO ENTry): File does not exist.
-   **EACCES** (Error ACcess): Permission denied.
-   **EMFILE**: Too many open files.

### **Handling Errors with `try...catch` in Promises**

Using **`fs.promises`**:

```
const fs = require('fs').promises;

async function readFile() {
    try {
        const data = await fs.readFile('example.txt', 'utf8');
        console.log(data);
    } catch (err) {
        console.error('Error reading file:', err.message);
    }
}

readFile();

```

📌 **Best Practices:**

-   Always check for **errors** (`err`).
-   Use `fs.existsSync(filePath)` to check file existence before reading.
-   Handle permission issues properly (`EACCES` errors).

* * * * *

**4\. What is the purpose of `fs.promises` in Node.js?**
--------------------------------------------------------

`fs.promises` is a **Promise-based API** for working with the file system **without callbacks**.

### **Advantages of `fs.promises`:**

✅ **No callback hell**\
✅ **Easier to use with `async/await`**\
✅ **Improves readability**

### **Example: Reading a File with `fs.promises`**

```
const fs = require('fs').promises;

async function readFileAsync() {
    try {
        const data = await fs.readFile('example.txt', 'utf8');
        console.log('File Content:', data);
    } catch (err) {
        console.error('Error:', err.message);
    }
}

readFileAsync();

```

📌 **Key Points:**

-   **Avoids nested callbacks**.
-   Works well with **async/await**.
-   Provides a modern alternative to traditional `fs` methods.

* * * * *


* * * * *

**🚀 Summary**
--------------

| Question | Key Points |
| --- | --- |
| **Reading/Writing Files** | Use `fs.readFile()` and `fs.writeFile()` for async operations. |
| **`fs.readFile()` vs `fs.createReadStream()`** | Use `fs.readFile()` for small files, `fs.createReadStream()` for large files. |
| **Handling Errors** | Always check `err`, use `try...catch` with `fs.promises`. |
| **`fs.promises`** | Provides promise-based file handling (`async/await`). |

# **What Are Streams in Node.js and How Do They Work?**

## **1. Introduction to Streams in Node.js**
Streams in Node.js are a powerful way to **handle and manipulate streaming data**. They enable **efficient** processing of large files, network communications, and real-time data transfer by reading/writing data **in chunks**, rather than loading everything into memory at once.

### **Why Use Streams?**
- **Memory Efficiency** → Streams process data in chunks, avoiding memory overload.
- **Faster Processing** → Streams work asynchronously, improving performance.
- **Pipelining Support** → Streams can be connected via `.pipe()`, optimizing workflows.

---

## **2. Types of Streams in Node.js**
There are **four** types of streams in Node.js:

| Stream Type | Description | Example |
|------------|-------------|---------|
| **Readable Streams** | Used to read data | `fs.createReadStream()` |
| **Writable Streams** | Used to write data | `fs.createWriteStream()` |
| **Duplex Streams** | Can read and write data | `net.Socket()` |
| **Transform Streams** | Modify or transform data as it passes through | `zlib.createGzip()` |

---

## **3. Readable Streams (Reading Data)**
A **Readable Stream** is used when **you want to read large data efficiently** (e.g., reading a file or receiving an HTTP request).

### **Example: Reading a Large File Using `fs.createReadStream()`**
```javascript
const fs = require('fs');

const readStream = fs.createReadStream('largeFile.txt', 'utf8');

readStream.on('data', (chunk) => {
    console.log('Received chunk:', chunk);
});

readStream.on('end', () => {
    console.log('Finished reading file');
});

readStream.on('error', (err) => {
    console.error('Error:', err);
});
```
### **How It Works:**
1. **Chunks of data** are read from `largeFile.txt`.
2. The **`data` event** fires each time a chunk is available.
3. The **`end` event** fires when the entire file is read.
4. The **`error` event** handles errors (e.g., file not found).

📌 **Benefits of Readable Streams:**
- Efficient for **large files**.
- Avoids **blocking the event loop**.
- Works with **real-time data** (e.g., live video streaming).

---

## **4. Writable Streams (Writing Data)**
A **Writable Stream** is used to **write large data efficiently**, such as logging data to a file or sending a large response.

### **Example: Writing Data to a File Using `fs.createWriteStream()`**
```javascript
const writeStream = fs.createWriteStream('output.txt');

writeStream.write('Hello, this is a streamed file write.\n');
writeStream.write('This is another line of data.\n');
writeStream.end('Writing complete!');

writeStream.on('finish', () => {
    console.log('Finished writing to file.');
});

writeStream.on('error', (err) => {
    console.error('Error writing to file:', err);
});
```
### **How It Works:**
1. **Chunks of data** are written to `output.txt`.
2. The **`write()` method** sends data.
3. The **`end()` method** signals that no more data will be written.
4. The **`finish` event** fires when all data is written.
5. The **`error` event** handles write errors.

📌 **Benefits of Writable Streams:**
- **Efficiently writes large files** without keeping them in memory.
- Supports **real-time data logging**.
- **Handles large responses** in HTTP servers.

---

## **5. Duplex Streams (Reading & Writing Data)**
A **Duplex Stream** can **both read and write** data, making it ideal for communication systems like **network sockets**.

### **Example: Using a Duplex Stream**
```javascript
const { Duplex } = require('stream');

const duplexStream = new Duplex({
    write(chunk, encoding, callback) {
        console.log('Writing:', chunk.toString());
        callback();
    },
    read(size) {
        this.push('Data from duplex stream');
        this.push(null); // End stream
    }
});

duplexStream.write('Hello from write stream!\n');
duplexStream.on('data', (chunk) => {
    console.log('Reading:', chunk.toString());
});
```
### **How It Works:**
- The **`write()` method** sends data.
- The **`read()` method** retrieves data.
- The **push method** sends chunks of data.
- The **push(null)** signals the end of the stream.

📌 **Use Cases for Duplex Streams:**
- **TCP socket communication** (`net.Socket`).
- **Implementing proxies**.
- **Streaming between two services**.

---

## **6. Transform Streams (Modifying Data)**
A **Transform Stream** is a special type of Duplex Stream that **modifies data as it passes through**.

### **Example: Using a Transform Stream to Convert Text to Uppercase**
```javascript
const { Transform } = require('stream');

const uppercaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

process.stdin.pipe(uppercaseTransform).pipe(process.stdout);
```
### **How It Works:**
1. Takes **input text** (`process.stdin`).
2. Converts it to **uppercase**.
3. Sends the modified output to `process.stdout`.

📌 **Use Cases for Transform Streams:**
- **Data compression (`zlib.createGzip()`)**.
- **Encoding conversion (UTF-8 to Base64)**.
- **Encrypting/decrypting data**.

---

## **7. Piping Streams (Connecting Streams)**
Piping allows us to **connect multiple streams together**, making data flow from one stream to another.

### **Example: Copying a File Using Pipe**
```javascript
const fs = require('fs');

const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);

writeStream.on('finish', () => {
    console.log('File copied successfully');
});
```
### **How It Works:**
1. **Reads** data from `input.txt`.
2. **Pipes** it directly into `output.txt`.
3. **Efficient** because data flows chunk-by-chunk.

📌 **Advantages of `pipe()`:**
- **Simplifies code** for handling streams.
- **Automatically manages** data flow.
- **Prevents memory overflow**.

---

## **8. Stream Events**
| Event | Description |
|--------|-------------|
| **`data`** | Fired when a chunk of data is available. |
| **`end`** | Fired when no more data is available. |
| **`error`** | Fired when an error occurs. |
| **`finish`** | Fired when a writable stream has completed writing. |

---

## **9. Key Takeaways**
✅ **Streams process data efficiently** without loading everything into memory.  
✅ **Readable Streams** read data chunk-by-chunk (e.g., reading a large file).  
✅ **Writable Streams** write data in chunks (e.g., logging data to a file).  
✅ **Duplex Streams** both read and write (e.g., network sockets).  
✅ **Transform Streams** modify data (e.g., compression, encryption).  
✅ **`pipe()` connects streams**, optimizing data flow.

---

## **10. Real-World Use Cases**
💡 **Handling Large Files** → Streaming large CSV/JSON files to avoid memory issues.  
💡 **HTTP Responses** → Sending data in chunks instead of loading it all first.  
💡 **Logging** → Writing log files in real time.  
💡 **File Compression** → Using `zlib.createGzip()` for on-the-fly compression.  
💡 **Video/Audio Streaming** → Handling media playback efficiently.  

---

**6\. What Are the Different Types of Streams in Node.js?**
-----------------------------------------------------------

Streams in Node.js are categorized into four types based on their functionality. They allow efficient handling of large amounts of data without loading everything into memory.

### **Types of Streams:**

| **Stream Type** | **Description** | **Example API** |
| --- | --- | --- |
| **Readable Streams** | Used to **read** data in chunks from a source. | `fs.createReadStream()`, `http.IncomingMessage` |
| **Writable Streams** | Used to **write** data in chunks to a destination. | `fs.createWriteStream()`, `http.ServerResponse` |
| **Duplex Streams** | Can both **read and write** data. | `net.Socket()`, `zlib.createGzip()` |
| **Transform Streams** | A special type of Duplex stream that **modifies** the data as it is passed through. | `zlib.createDeflate()`, `crypto.createCipher()` |

* * * * *

**7\. What Is the Difference Between `pipe()` and Stream Chaining?**
--------------------------------------------------------------------

Both `pipe()` and stream chaining are used for connecting multiple streams, but they serve slightly different purposes.

### **Using `pipe()`**

-   The `pipe()` method **connects a readable stream to a writable stream**.
-   It **automatically** handles the flow of data and applies backpressure.

**Example: Using `pipe()` to Copy a File**

```
const fs = require('fs');

const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);

writeStream.on('finish', () => {
    console.log('File copied successfully!');
});

```

✅ **Benefits:**

-   Handles **backpressure automatically**.
-   Simplifies code for handling streams.
-   Efficiently **transfers data chunk-by-chunk**.

* * * * *

### **Using Stream Chaining**

-   Stream chaining is an **extension** of `pipe()`, where **multiple streams are connected**.
-   Used when you need to **transform** data between reading and writing.

**Example: Compressing and Writing a File Using Stream Chaining**

```
const fs = require('fs');
const zlib = require('zlib');

fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())  // Compress the data
  .pipe(fs.createWriteStream('output.txt.gz'))  // Write the compressed data
  .on('finish', () => console.log('File compressed successfully!'));

```

✅ **Benefits of Stream Chaining:**

-   Allows **multiple operations** in a single line.
-   Improves **code readability** and performance.
-   Helps in **real-time data transformations** (e.g., encoding, compression).

* * * * *

**8\. How Do You Handle Large File Uploads in Node.js?**
--------------------------------------------------------

When dealing with **large file uploads**, the key challenge is **avoiding memory overload** by processing data in chunks.

### **Methods to Handle Large File Uploads:**

### **1️⃣ Using Streams for File Upload**

Instead of reading the entire file at once, streams process the data **chunk-by-chunk**.

**Example: Handling File Upload with Streams**

```
const fs = require('fs');
const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Store files in uploads folder

app.post('/upload', upload.single('file'), (req, res) => {
    const readStream = fs.createReadStream(req.file.path);
    const writeStream = fs.createWriteStream(`./uploads/${req.file.originalname}`);

    readStream.pipe(writeStream);

    writeStream.on('finish', () => {
        res.send('File uploaded successfully!');
    });

    writeStream.on('error', (err) => {
        res.status(500).send('Error uploading file');
    });
});

app.listen(3000, () => console.log('Server started on port 3000'));

```

📌 **Why Use Streams?**

-   Avoids **loading the entire file into memory**.
-   Handles **large files efficiently**.
-   **Prevents crashes** due to high memory usage.

* * * * *

### **2️⃣ Using External Libraries for Scalable Uploads**

Libraries like **Busboy** or **Multer** can handle **large file uploads efficiently**.

**Example: Using Busboy for Streaming File Upload**

```
const express = require('express');
const busboy = require('busboy');

const app = express();

app.post('/upload', (req, res) => {
    const bb = busboy({ headers: req.headers });

    bb.on('file', (name, file, info) => {
        const writeStream = fs.createWriteStream(`uploads/${info.filename}`);
        file.pipe(writeStream);
    });

    bb.on('finish', () => {
        res.send('File uploaded successfully!');
    });

    req.pipe(bb);
});

app.listen(3000, () => console.log('Server running on port 3000'));

```

📌 **Why Use Busboy?**

-   **Handles multiple files concurrently**.
-   Uses **less memory** than Multer.
-   **Streams files directly** to the storage location.

* * * * *

**9\. How Do You Watch for File Changes in Node.js?**
-----------------------------------------------------

In Node.js, you can monitor file changes **without manual intervention** using the `fs.watch()` or `fs.watchFile()`methods.

### **1️⃣ Using `fs.watch()`**

This method **watches a file or directory** and triggers an event when it changes.

**Example: Watching a File for Changes**

```
const fs = require('fs');

fs.watch('example.txt', (eventType, filename) => {
    if (filename) {
        console.log(`File changed: ${filename} - Event: ${eventType}`);
    }
});

```

📌 **Advantages:**

-   Detects **file modifications, renames, and deletions**.
-   Works for **both files and directories**.

* * * * *

### **2️⃣ Using `fs.watchFile()`**

This method **polls a file** at a set interval and triggers a callback if changes are detected.

**Example: Watching a File with `fs.watchFile()`**

```
fs.watchFile('example.txt', { interval: 5000 }, (curr, prev) => {
    console.log(`File modified at: ${curr.mtime}`);
});

```

📌 **Advantages:**

-   Can set a **custom polling interval**.
-   Useful for **monitoring logs or configuration files**.

* * * * *

**10\. How Do You Implement Backpressure Handling in Node.js Streams?**
-----------------------------------------------------------------------

### **What Is Backpressure?**

Backpressure happens when a **Writable Stream** is **slower** than a **Readable Stream**, causing data **to pile up in memory**.

📌 **Example of Backpressure Issue**

```
const fs = require('fs');

const readStream = fs.createReadStream('largeFile.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.on('data', (chunk) => {
    const canWrite = writeStream.write(chunk);
    if (!canWrite) {
        readStream.pause(); // Stop reading more data
    }
});

writeStream.on('drain', () => {
    readStream.resume(); // Resume reading data
});

```

### **How It Works:**

1.  The `readStream.on('data')` event fetches chunks.
2.  If `writeStream.write(chunk)` returns `false`, the **read stream is paused** (`readStream.pause()`).
3.  When `writeStream` is ready, the **`drain` event** triggers `readStream.resume()`.

✅ **Benefits of Handling Backpressure:**

-   **Prevents memory overload**.
-   Ensures **efficient data processing**.
-   Helps maintain **system stability**.

* * * * *

**🔥 Summary of Key Takeaways**
-------------------------------

-   **Streams** allow handling large files **efficiently**.
-   **`pipe()` connects streams**, while **stream chaining** allows multiple transformations.
-   **Large file uploads** should be handled using **streams or libraries like Busboy**.
-   **`fs.watch()` and `fs.watchFile()`** can monitor file changes.
-   **Backpressure handling** prevents memory overload by pausing/resuming streams.

* * * * *

***Performance & Optimization (10 Questions)***

**1\. How Do You Improve the Performance of a Node.js Application?**
--------------------------------------------------------------------

Optimizing a **Node.js** application involves improving its speed, scalability, and efficiency while reducing resource usage. Below are key strategies:

### **1️⃣ Use Asynchronous Programming & Avoid Blocking Code**

-   **Node.js is single-threaded**, so blocking operations can slow down the entire application.
-   Always use **asynchronous functions (`fs.promises`, `axios`, `db.query()`)** instead of synchronous ones.

✅ **Example: Use `fs.promises` Instead of `fs.readFileSync()`**

```
const fs = require('fs').promises;

async function readFileAsync() {
    const data = await fs.readFile('file.txt', 'utf-8');
    console.log(data);
}
readFileAsync();

```

📌 **Benefit:** Prevents blocking the event loop.

* * * * *

### **2️⃣ Optimize Database Queries**

-   Use **connection pooling** for databases like MySQL, PostgreSQL.
-   Use **indexes** in MongoDB to speed up queries.

✅ **Example: Use Connection Pooling in MySQL**

```
const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test_db'
});

```

📌 **Benefit:** Prevents database overload.

* * * * *

### **3️⃣ Enable Caching (Redis, Memory)**

-   Store frequently accessed data in **Redis** to avoid frequent database queries.

✅ **Example: Using Redis for Caching**

```
const redis = require('redis');
const client = redis.createClient();

client.set('key', 'value', 'EX', 60); // Cache for 60 seconds

```

📌 **Benefit:** Reduces database load, improving response time.

* * * * *

### **4️⃣ Use Compression to Reduce Response Size**

-   Compress responses using **gzip or Brotli** to minimize bandwidth usage.

✅ **Example: Use Gzip Compression in Express**

```
const compression = require('compression');
const express = require('express');
const app = express();

app.use(compression());

```

📌 **Benefit:** Faster API responses.

* * * * *

### **5️⃣ Optimize Middleware Execution**

-   Use only necessary middleware in Express.js.

✅ **Example: Avoiding Unnecessary Middleware**

```
const app = require('express')();
app.use(express.json()); // Use only if needed

```

📌 **Benefit:** Reduces unnecessary overhead.

* * * * *

### **6️⃣ Implement Load Balancing & Clustering**

-   Distribute requests across multiple **Node.js processes** to utilize all CPU cores.

✅ **Example: Use Clustering**

```
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork(); // Create a worker for each CPU
    }
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('Hello from Worker');
    }).listen(3000);
}

```

📌 **Benefit:** Maximizes CPU usage.

* * * * *

**2\. What Is Clustering in Node.js, and How Does It Work?**
------------------------------------------------------------

### **Why Clustering?**

-   Node.js runs in a **single-threaded environment**, meaning it can **only utilize one CPU core** at a time.
-   Clustering allows **multiple instances of the same Node.js app** to run in parallel, taking advantage of **all CPU cores**.

### **How Clustering Works**

-   The **`cluster` module** in Node.js allows us to **spawn multiple worker processes**.
-   The **Master process** creates worker processes, each having its own event loop.

✅ **Example: Implementing Clustering**

```
const cluster = require('cluster');
const http = require('http');
const os = require('os');

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    console.log(`Master process is running. Forking ${numCPUs} workers.`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork(); // Create worker process
    }
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Worker ${process.pid} handled request`);
    }).listen(3000);
}

```

📌 **Benefit:** Distributes workload across all CPU cores, improving performance.

* * * * *

**3\. How Do You Optimize Memory Usage in Node.js?**
----------------------------------------------------

### **Key Techniques:**

### **1️⃣ Use `Buffer` Instead of String Concatenation**

```
const buffer = Buffer.alloc(100); // Efficient memory allocation

```

📌 **Why?** Buffers **consume less memory** than strings.

* * * * *

### **2️⃣ Avoid Memory Leaks in Event Listeners**

```
const EventEmitter = require('events');
const emitter = new EventEmitter();

function eventHandler() {
    console.log('Event triggered');
}

emitter.on('event', eventHandler);
emitter.off('event', eventHandler); // Unregister after use

```

📌 **Why?** Prevents **holding memory unnecessarily**.

* * * * *

**4\. How Do You Prevent Memory Leaks in Node.js?**
---------------------------------------------------

Memory leaks occur when objects **stay in memory** even when they are no longer needed.

### **Common Causes & Fixes:**

### **1️⃣ Unused Timers**

```
let interval = setInterval(() => console.log('Running...'), 1000);
clearInterval(interval); // Always clear unused timers

```

📌 **Fix:** Always **clear intervals**.

* * * * *

### **2️⃣ Event Listeners Not Removed**

```
const emitter = new EventEmitter();
emitter.on('event', () => console.log('Event triggered'));
emitter.removeAllListeners(); // Prevent memory leaks

```

📌 **Fix:** **Remove unused listeners**.

* * * * *

### **3️⃣ Avoid Global Variables Holding References**

```
let data = [];
function addData() {
    data.push(new Array(1000000).join('*'));
}

```

📌 **Fix:** Use **local variables or WeakMap**.

* * * * *

**5\. What Is the Purpose of a Reverse Proxy with Node.js?**
------------------------------------------------------------

A **reverse proxy** sits between **clients and the Node.js server** to **improve performance, security, and scalability**.

### **Why Use a Reverse Proxy?**

-   **Load Balancing:** Distributes traffic to multiple Node.js servers.
-   **SSL Termination:** Handles HTTPS encryption.
-   **Caching:** Stores responses to reduce server load.
-   **Security:** Hides the backend server.

### **Example: Using Nginx as a Reverse Proxy**

#### **Step 1: Install Nginx**

```
sudo apt update
sudo apt install nginx

```

#### **Step 2: Configure Reverse Proxy**

Edit `/etc/nginx/sites-available/default`:

```
server {
    listen 80;
    server_name mywebsite.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

```

#### **Step 3: Restart Nginx**

```
sudo systemctl restart nginx

```

📌 **Benefits of Reverse Proxy:**

-   **Handles high traffic** better.
-   **Improves security** by masking backend services.
-   **Reduces latency** with caching.

* * * * *

**🔥 Summary of Key Takeaways**
-------------------------------

-   **Performance Optimization:** Use **async code, caching, compression, and clustering**.
-   **Clustering:** Uses **multiple worker processes** to utilize all CPU cores.
-   **Memory Optimization:** Use **buffers, remove listeners, and avoid global variables**.
-   **Memory Leaks Prevention:** Clear **timers, events, and unused objects**.
-   **Reverse Proxy:** Improves **scalability, security, and performance**.

* * * * *

**6\. How Do You Monitor Performance in a Node.js Application?**
----------------------------------------------------------------

Monitoring a Node.js application ensures **optimal performance, debugging, and detecting bottlenecks**. Below are key methods:

* * * * *

### **1️⃣ Use Built-in `console.time()` and `performance.now()`**

✅ **Basic Performance Measurement**

```
console.time('Execution Time');

setTimeout(() => {
    console.timeEnd('Execution Time'); // Logs execution time
}, 1000);

```

📌 **Use Case:** Measure how long a function takes to execute.

* * * * *

### **2️⃣ Use Node.js `process` Module**

✅ **Track Memory and CPU Usage**

```
console.log(process.memoryUsage());  // Returns heap usage
console.log(process.cpuUsage());     // Returns CPU usage

```

📌 **Use Case:** Identifies **memory leaks** and **high CPU usage**.

* * * * *

### **3️⃣ Monitor Event Loop Performance with `clinic`**

✅ **Install and Use `clinic`**

```
npm install -g clinic
clinic doctor -- node server.js

```

📌 **Use Case:** Detects **event loop delays, memory leaks**, and **high CPU usage**.

* * * * *

### **4️⃣ Use `pm2` for Process Monitoring**

✅ **Install `pm2`**

```
npm install -g pm2
pm2 start app.js --name=myApp
pm2 monit  # Live monitoring

```

📌 **Use Case:** Monitors **CPU, memory, process restarts**.

* * * * *

### **5️⃣ Use APM (Application Performance Monitoring) Tools**

✅ **Popular APM Tools**

-   **New Relic**
-   **Datadog**
-   **AppDynamics**
-   **Elastic APM** 📌 **Use Case:** Tracks **API response times, slow DB queries, and bottlenecks**.

* * * * *

**7\. How Does Load Balancing Work with Node.js?**
--------------------------------------------------

Load balancing ensures that incoming requests are **distributed across multiple instances** to **prevent overload and improve scalability**.

### **How Load Balancing Works**

1.  A **load balancer** (e.g., **Nginx, HAProxy**) directs traffic to **multiple Node.js servers**.
2.  Each **Node.js instance processes** requests **independently**.
3.  If one **server crashes**, traffic is rerouted to **other servers**.

✅ **Example: Nginx Load Balancing**

#### **Step 1: Install Nginx**

```
sudo apt update
sudo apt install nginx

```

#### **Step 2: Configure Load Balancing**

Edit `/etc/nginx/nginx.conf`:

```
http {
    upstream node_servers {
        server 127.0.0.1:3000;
        server 127.0.0.1:3001;
        server 127.0.0.1:3002;
    }

    server {
        listen 80;
        location / {
            proxy_pass http://node_servers;
        }
    }
}

```

#### **Step 3: Restart Nginx**

```
sudo systemctl restart nginx

```

📌 **Benefits:**

-   **Distributes traffic**, preventing overload.
-   **Handles failover**, improving uptime.
-   **Improves response times**.

* * * * *

**8\. What Are Some Ways to Optimize API Response Times?**
----------------------------------------------------------

### **1️⃣ Use Caching (Redis, Memory)**

✅ **Example: Cache API Responses Using Redis**

```
const redis = require('redis');
const client = redis.createClient();

app.get('/data', async (req, res) => {
    client.get('myData', async (err, cachedData) => {
        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }

        const data = await fetchFromDatabase();
        client.setex('myData', 3600, JSON.stringify(data)); // Cache for 1 hour
        res.json(data);
    });
});

```

📌 **Benefit:** Reduces **database load** and **improves response time**.

* * * * *

### **2️⃣ Optimize Database Queries**

✅ **Use Indexes in MongoDB**

```
db.collection.createIndex({ name: 1 }); // Creates an index on the 'name' field

```

📌 **Benefit:** Faster **query execution**.

* * * * *

### **3️⃣ Use Pagination & Limit Data Fetching**

✅ **Example: Use Pagination in MongoDB**

```
app.get('/users', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const users = await User.find().skip((page - 1) * limit).limit(limit);
    res.json(users);
});

```

📌 **Benefit:** Prevents **over-fetching**.

* * * * *

**9\. How Do You Optimize Node.js Applications for High Concurrency?**
----------------------------------------------------------------------

Concurrency means **handling multiple requests** simultaneously without degrading performance.

### **1️⃣ Use the Cluster Module**

✅ **Create Multiple Worker Processes**

```
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    for (let i = 0; i < numCPUs; i++) cluster.fork();
} else {
    require('./server.js');
}

```

📌 **Benefit:** Uses **all CPU cores** efficiently.

* * * * *

### **2️⃣ Use `worker_threads` for CPU-Intensive Tasks**

✅ **Run CPU-Heavy Tasks in a Separate Thread**

```
const { Worker } = require('worker_threads');

const worker = new Worker('./heavy-task.js');
worker.on('message', (msg) => console.log('Result:', msg));

```

📌 **Benefit:** Prevents **blocking the event loop**.

* * * * *

### **3️⃣ Optimize Event Loop with `setImmediate()`**

✅ **Example: Prioritize Execution**

```
setImmediate(() => console.log('Executed after I/O tasks'));

```

📌 **Benefit:** Ensures **fast response times**.

* * * * *

**10\. What Is the Role of Caching in Node.js Performance?**
------------------------------------------------------------

Caching **stores frequently accessed data** in memory, reducing the need for **repeated database queries**.

### **1️⃣ Using `memory-cache` (In-Memory Caching)**

✅ **Install Memory Cache**

```
npm install memory-cache

```

✅ **Example: In-Memory Caching**

```
const cache = require('memory-cache');

app.get('/data', (req, res) => {
    let cachedData = cache.get('key');
    if (cachedData) return res.json(cachedData);

    const data = fetchDataFromDB();
    cache.put('key', data, 60000); // Cache for 60 sec
    res.json(data);
});

```

📌 **Benefit:** Faster response time for **frequently requested data**.

* * * * *

### **2️⃣ Using Redis for Distributed Caching**

✅ **Install Redis**

```
npm install redis

```

✅ **Example: Caching with Redis**

```
const redis = require('redis');
const client = redis.createClient();

app.get('/data', async (req, res) => {
    client.get('cachedData', async (err, data) => {
        if (data) return res.json(JSON.parse(data));

        const fetchedData = await fetchFromDatabase();
        client.setex('cachedData', 3600, JSON.stringify(fetchedData)); // Cache for 1 hour
        res.json(fetchedData);
    });
});

```

📌 **Benefit:** Redis allows **high-performance caching**, reducing **DB load**.

* * * * *

**🔥 Summary of Key Takeaways**
-------------------------------

| Topic | Key Takeaways |
| --- | --- |
| **Performance Monitoring** | Use **`console.time()`**, `process.memoryUsage()`, `pm2`, and **APM tools**. |
| **Load Balancing** | Use **Nginx, HAProxy, or Cluster Module** to handle multiple instances. |
| **API Optimization** | Use **caching, pagination, and optimized DB queries**. |
| **High Concurrency** | Use **clustering, worker threads, and setImmediate()**. |
| **Caching** | Use **Redis, memory-cache** for **fast data retrieval**. |

* * * * *

***Security & Best Practices (10 Questions)***

**1\. What Are Common Security Vulnerabilities in Node.js?**
============================================================

Security vulnerabilities in Node.js applications can lead to **data breaches, unauthorized access, or performance issues**. Below are the most common vulnerabilities:

* * * * *

### **1️⃣ SQL Injection**

❌ **Vulnerability:** Malicious SQL queries injected into input fields.

✅ **Prevention:**

-   Use **parameterized queries** or **ORMs** like Sequelize, Prisma.
-   **Avoid direct string concatenation** in queries.

```
const userId = req.query.id;
db.query('SELECT * FROM users WHERE id = ?', [userId]); // Safe query

```

* * * * *

### **2️⃣ NoSQL Injection**

❌ **Vulnerability:** Attackers manipulate MongoDB queries.

✅ **Prevention:**

-   Use **`$eq`** instead of direct user input.
-   Validate input using **Joi or Express Validator**.

```
User.findOne({ username: { $eq: req.body.username } }); // Secure query

```

* * * * *

### **3️⃣ Cross-Site Scripting (XSS)**

❌ **Vulnerability:** Injecting malicious scripts via user input.

✅ **Prevention:**

-   **Sanitize inputs** using libraries like `xss-clean`.
-   **Use Content Security Policy (CSP)** to prevent script execution.

```
npm install xss-clean

```

```
const xss = require('xss-clean');
app.use(xss());

```

* * * * *

### **4️⃣ Cross-Site Request Forgery (CSRF)**

❌ **Vulnerability:** Malicious sites trick users into executing unwanted actions.

✅ **Prevention:**

-   Use **CSRF tokens** (`csurf` package).
-   Set **`SameSite=Strict`** for cookies.

```
npm install csurf

```

```
const csrf = require('csurf');
app.use(csrf());

```

* * * * *

### **5️⃣ Security Misconfiguration**

❌ **Vulnerability:** Exposing **sensitive error messages** and using **default settings**.

✅ **Prevention:**

-   Set **`NODE_ENV=production`**.
-   Disable stack traces in errors:

```
app.use((err, req, res, next) => {
  res.status(500).send('Something went wrong!');
});

```

* * * * *

**2\. How Do You Prevent SQL Injection Attacks?**
-------------------------------------------------

SQL Injection happens when **user input is directly concatenated** into SQL queries.

* * * * *

### **1️⃣ Use Parameterized Queries (Prepared Statements)**

✅ **Prevents attackers from injecting SQL**

```
const userId = req.body.userId;
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId], (err, results) => {
  if (err) throw err;
  res.json(results);
});

```

* * * * *

### **2️⃣ Use ORM (Sequelize, Prisma)**

✅ **ORM automatically escapes SQL queries**

```
const user = await User.findOne({ where: { id: req.body.id } });

```

* * * * *

### **3️⃣ Input Validation**

✅ **Ensure user inputs are safe**

```
const Joi = require('joi');
const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
});
const { error } = schema.validate(req.body);
if (error) return res.status(400).send(error.details);

```

* * * * *

**3\. How Do You Handle JWT Authentication in Node.js?**
--------------------------------------------------------

JWT (**JSON Web Token**) is used for secure **authentication and authorization**.

* * * * *

### **1️⃣ Install Required Packages**

```
npm install jsonwebtoken bcryptjs express

```

* * * * *

### **2️⃣ Generate JWT Token**

```
const jwt = require('jsonwebtoken');
const user = { id: 1, username: 'admin' };
const token = jwt.sign(user, 'secretKey', { expiresIn: '1h' });
console.log(token);

```

* * * * *

### **3️⃣ Verify JWT Token (Middleware)**

```
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access Denied');

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) return res.status(403).send('Invalid Token');
    req.user = decoded;
    next();
  });
};
app.get('/profile', authenticateJWT, (req, res) => {
  res.send('Protected User Data');
});

```

* * * * *

### **4️⃣ Store JWT Securely**

✅ **Best Practices**

-   Store token in **HTTP-only cookies** (prevents XSS).
-   Use **short expiration times** (e.g., 15 min).
-   Use **refresh tokens** for long-lived sessions.

* * * * *

**4\. How Do You Implement Rate Limiting in Express.js?**
---------------------------------------------------------

Rate limiting **prevents brute-force attacks and API abuse** by restricting the number of requests.

* * * * *

### **1️⃣ Install `express-rate-limit`**

```
npm install express-rate-limit

```

* * * * *

### **2️⃣ Apply Rate Limiting Middleware**

```
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
});

app.use('/api/', limiter);

```

* * * * *

### **3️⃣ Use Redis for Distributed Rate Limiting**

✅ **For large-scale applications, use Redis**

```
npm install express-rate-limit redis

```

```
const RedisStore = require('rate-limit-redis');
const limiter = rateLimit({
  store: new RedisStore({
    client: redis.createClient(),
  }),
  max: 100,
  windowMs: 15 * 60 * 1000,
});
app.use(limiter);

```

* * * * *

**5\. What Are Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF)?**
----------------------------------------------------------------------------------

### **❌ Cross-Site Scripting (XSS)**

**What is it?**

-   Attackers **inject malicious scripts** into websites.
-   Affects users by **stealing cookies, redirecting pages**.

**Example of Vulnerability**

```
<input type="text" name="name" value="<script>alert('Hacked!');</script>">

```

✅ **Prevention:**

-   Use **input sanitization (`xss-clean`)**
-   Enable **CSP (Content Security Policy)**
-   Use **`escape-html`** to encode output

```
npm install xss-clean

```

```
const xss = require('xss-clean');
app.use(xss());

```

* * * * *

### **❌ Cross-Site Request Forgery (CSRF)**

**What is it?**

-   Attacker tricks users into performing **unintended actions**.
-   Example: A fake link that **deletes a user account**.

✅ **Prevention:**

-   Use **CSRF tokens (`csurf`)**
-   Set **SameSite=Strict** for cookies.

```
npm install csurf

```

```
const csrf = require('csurf');
app.use(csrf());

```

* * * * *

**🔥 Key Takeaways**
--------------------

| **Security Risk** | **Solution** |
| --- | --- |
| **SQL Injection** | Use **parameterized queries, ORM** |
| **NoSQL Injection** | Use **query sanitization** |
| **XSS (Cross-Site Scripting)** | Sanitize inputs, use **CSP** |
| **CSRF (Cross-Site Request Forgery)** | Use **CSRF tokens (`csurf`)** |
| **JWT Security** | Use **HTTP-only cookies, short expiration** |
| **Rate Limiting** | Use `express-rate-limit`, **Redis** for scaling |

* * * * *

**6\. How Do You Use Environment Variables Securely in Node.js?**
=================================================================

Environment variables are used to store sensitive data like **API keys, database credentials, and JWT secrets** outside the codebase. Keeping them secure prevents **accidental leaks and unauthorized access**.

* * * * *

### **1️⃣ Use `.env` Files with `dotenv`**

-   Store environment variables in a **`.env` file**.
-   Use the **`dotenv` package** to load them into `process.env`.

#### **Installation**

```
npm install dotenv

```

#### **.env File (Never Commit This to Git)**

```
PORT=3000
DB_USER=admin
DB_PASS=securepassword
SECRET_KEY=mySecretKey

```

#### **Load Variables in `server.js`**

```
require('dotenv').config();

const port = process.env.PORT;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

console.log(`Database User: ${dbUser}`);

```

* * * * *

### **2️⃣ Use `.gitignore` to Prevent Leaks**

**Add `.env` to `.gitignore`** to avoid pushing secrets to repositories.

```
.env

```

* * * * *

### **3️⃣ Use Environment Variables in Production**

-   Set variables in **cloud providers** (AWS, Heroku, DigitalOcean).

-   Example for **Linux/macOS**:

    ```
    export DB_USER=admin
    export DB_PASS=securepassword
    node server.js

    ```

-   Example for **Windows (Command Prompt)**:

    ```
    set DB_USER=admin
    set DB_PASS=securepassword
    node server.js

    ```

* * * * *

### **4️⃣ Avoid Hardcoding Environment Variables**

❌ **Bad Practice**

```
const dbPass = 'myPlainTextPassword';

```

✅ **Good Practice**

```
const dbPass = process.env.DB_PASS;

```

* * * * *

**7\. Best Practices for Securing Sensitive Data in a Node.js Application**
---------------------------------------------------------------------------

| 🔒 **Security Concern** | ✅ **Best Practice** |
| --- | --- |
| **Hardcoded Secrets** | Use `.env` files & cloud secrets managers |
| **API Keys in Git** | Add `.env` to `.gitignore` |
| **Exposed Stack Traces** | Hide errors in production (`NODE_ENV=production`) |
| **Weak Hashing** | Use `bcrypt` for password hashing |
| **Insecure JWT Tokens** | Use strong secrets & short expiry times |
| **Database Credentials** | Store in **environment variables** |

### **1️⃣ Hash Passwords Securely (`bcrypt`)**

```
npm install bcrypt

```

```
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash('myPassword', 10);

```

### **2️⃣ Use HTTPS for Secure Communication**

-   Use **SSL/TLS** certificates.
-   Redirect HTTP to HTTPS in Express:

```
app.use((req, res, next) => {
  if (!req.secure) return res.redirect(`https://${req.headers.host}${req.url}`);
  next();
});

```

* * * * *

**8\. How Do You Prevent Denial-of-Service (DoS) Attacks in Node.js?**
----------------------------------------------------------------------

A **DoS attack** floods the server with requests, slowing or crashing the app.

* * * * *

### **1️⃣ Implement Rate Limiting**

Limit the number of requests per user/IP.

```
npm install express-rate-limit

```

```
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per IP
  message: 'Too many requests, please try again later.',
});

app.use('/api/', limiter);

```

* * * * *

### **2️⃣ Use Helmet for Basic Security**

```
npm install helmet

```

```
const helmet = require('helmet');
app.use(helmet());

```

* * * * *

### **3️⃣ Block Large Payloads**

Attackers may send large JSON bodies to crash the app.

```
app.use(express.json({ limit: '1kb' })); // Restrict body size

```

* * * * *

### **4️⃣ Monitor Requests & Block Malicious IPs**

-   Use **WAF (Web Application Firewall)** like Cloudflare.
-   Block repeated attackers using `express-slow-down`.

```
npm install express-slow-down

```

```
const slowDown = require('express-slow-down');
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 50, // Delay requests after 50
  delayMs: 500, // Add 500ms delay per request
});
app.use(speedLimiter);

```

* * * * *

**9\. How Do You Validate User Input in Node.js?**
--------------------------------------------------

User input must be validated to prevent **injections, XSS, and other attacks**.

* * * * *

### **1️⃣ Use `joi` for Input Validation**

```
npm install joi

```

```
const Joi = require('joi');

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const { error } = schema.validate(req.body);
if (error) return res.status(400).send(error.details[0].message);

```

* * * * *

### **2️⃣ Use `express-validator` for Middleware Validation**

```
npm install express-validator

```

```
const { body, validationResult } = require('express-validator');

app.post('/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());
    res.send('Success');
  }
);

```

* * * * *

**10\. What Tools Can You Use to Scan for Vulnerabilities in a Node.js Project?**
---------------------------------------------------------------------------------

### **1️⃣ `npm audit` (Built-in Security Scanner)**

```
npm audit
npm audit fix

```

-   Finds **vulnerable dependencies** in `package.json`.

* * * * *

### **2️⃣ `snyk` (Advanced Security Scanner)**

```
npm install -g snyk
snyk test

```

-   Scans for security issues **beyond `npm audit`**.

* * * * *

### **3️⃣ `eslint-plugin-security` (Finds Security Flaws in Code)**

```
npm install eslint-plugin-security --save-dev

```

```
{
  "extends": ["plugin:security/recommended"]
}

```

* * * * *

### **4️⃣ `Helmet` (Secures HTTP Headers)**

```
npm install helmet

```

```
const helmet = require('helmet');
app.use(helmet());

```

* * * * *

### **5️⃣ `OWASP Dependency-Check` (For Enterprise Security)**

```
npm install -g dependency-check
dependency-check --scan .

```

-   Detects outdated packages with **known vulnerabilities**.

* * * * *

**🔑 Key Takeaways**
--------------------

| 🔒 **Security Concern** | ✅ **Best Practice** |
| --- | --- |
| **Environment Variables** | Use `.env` files, cloud secrets |
| **Sensitive Data** | Avoid hardcoding secrets, use **`bcrypt`** |
| **DoS Attacks** | **Rate limiting**, `express-rate-limit` |
| **Input Validation** | Use `joi`, `express-validator` |
| **Security Scanning** | Use `npm audit`, `snyk`, `helmet` |

* * * * *

***Testing & Debugging (10 Questions)***

**1\. Best Practices for Testing Node.js Applications**
=======================================================

Testing is crucial to ensure reliability, maintainability, and bug-free code in Node.js applications. Follow these best practices:

### ✅ **General Best Practices**

-   **Use a Testing Framework**: Jest, Mocha, or AVA.
-   **Write Tests Before Code** *(TDD - Test-Driven Development)*.
-   **Follow the Testing Pyramid**:
    -   **Unit Tests (70%)**: Test functions/components in isolation.
    -   **Integration Tests (20%)**: Test modules working together.
    -   **End-to-End (E2E) Tests (10%)**: Test the full system with real APIs and DB.
-   **Mock External Services** to avoid slow and flaky tests.
-   **Use Code Coverage Tools** to ensure full test coverage.
-   **Run Tests in CI/CD** to prevent breaking changes.

* * * * *

**2\. How to Debug a Node.js Application?**
===========================================

Debugging helps find and fix errors in Node.js applications.

### **1️⃣ Using `console.log()` (Basic Method)**

-   Add logs at key points:

```
console.log("Debugging variable:", myVar);

```

-   **Downside**: It clutters the code.

* * * * *

### **2️⃣ Using `node inspect` (Built-in Debugger)**

```
node inspect app.js

```

-   Add a breakpoint:

```
debugger;

```

-   Run the file and step through code execution.

* * * * *

### **3️⃣ Debugging with Chrome DevTools**

1.  Start Node.js with `--inspect`

```
node --inspect-brk app.js

```

1.  Open `chrome://inspect` in Chrome.
2.  Click "Open Dedicated DevTools for Node".

* * * * *

### **4️⃣ Using VS Code Debugger**

1.  Open **`launch.json`** in VS Code.
2.  Add this configuration:

```
{
  "type": "node",
  "request": "launch",
  "name": "Debug",
  "program": "${workspaceFolder}/app.js"
}

```

1.  Click the **Run & Debug** button.

* * * * *

**3\. Difference Between Unit Tests and Integration Tests**
===========================================================

| Feature | Unit Tests | Integration Tests |
| --- | --- | --- |
| **Scope** | Individual functions/modules | Multiple components/modules together |
| **Speed** | Fast | Slower |
| **Dependency** | Mocks/stubs used | Real DB/API used |
| **Tools** | Jest, Mocha | Supertest, Jest, Mocha |

* * * * *

**4\. Popular Testing Frameworks for Node.js**
==============================================

| **Testing Framework** | **Use Case** |
| --- | --- |
| **Jest** | Fast and easy-to-use unit testing framework |
| **Mocha** | Flexible, widely used test runner |
| **Chai** | Assertion library for Mocha |
| **Supertest** | API testing |
| **Sinon.js** | Mocking, stubbing, and spying |

* * * * *

**5\. How to Use Jest for Testing Node.js Applications?**
=========================================================

### **1️⃣ Install Jest**

```
npm install --save-dev jest

```

### **2️⃣ Write a Test (Example: `sum.js`)**

```
function sum(a, b) {
  return a + b;
}
module.exports = sum;

```

### **3️⃣ Create a Test File (`sum.test.js`)**

```
const sum = require('./sum');

test('adds 2 + 3 to equal 5', () => {
  expect(sum(2, 3)).toBe(5);
});

```

### **4️⃣ Run Tests**

```
npx jest

```

* * * * *

**6\. Mocking and Stubbing in Node.js Tests**
=============================================

### **1️⃣ Using Jest Mocks**

Mocking external dependencies:

```
jest.mock('axios');
const axios = require('axios');
axios.get.mockResolvedValue({ data: { userId: 1 } });

```

### **2️⃣ Using Sinon for Spies/Stubs**

```
npm install --save-dev sinon

```

```
const sinon = require('sinon');
const myFunction = sinon.stub().returns(42);
console.log(myFunction()); // 42

```

* * * * *

**7\. How to Test Asynchronous Functions in Node.js?**
======================================================

Use Jest's async testing methods.

### **1️⃣ Using `async/await`**

```
test('fetches data', async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});

```

### **2️⃣ Using `done` Callback**

```
test('fetches data', (done) => {
  fetchData().then((data) => {
    expect(data).toBeDefined();
    done();
  });
});

```

* * * * *

**8\. How to Implement Logging in a Node.js Application?**
==========================================================

### **1️⃣ Using `console.log()` (Basic)**

```
console.log("User logged in", user);

```

### **2️⃣ Using `winston` (Advanced Logging)**

```
npm install winston

```

```
const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'app.log' }),
    new winston.transports.Console()
  ]
});

logger.info("Application started");

```

### **3️⃣ Using `morgan` for API Logging**

```
npm install morgan

```

```
const morgan = require('morgan');
app.use(morgan('combined'));

```

* * * * *

**9\. How to Write Efficient Error-Handling Tests?**
====================================================

### **1️⃣ Use `try/catch` for Error Testing**

```
test('throws an error', () => {
  expect(() => { throw new Error("Oops!") }).toThrow("Oops!");
});

```

### **2️⃣ Using `async/await`**

```
test('handles async errors', async () => {
  await expect(fetchData()).rejects.toThrow("Network error");
});

```

* * * * *

**10\. Tools for Monitoring and Logging in Node.js**
====================================================

| **Tool** | **Purpose** |
| --- | --- |
| **Winston** | Advanced logging |
| **Morgan** | HTTP request logging |
| **PM2** | Process monitoring |
| **New Relic** | Performance monitoring |
| **Sentry** | Error tracking |
| **Datadog** | Full observability |

* * * * *

### **🔑 Key Takeaways**

-   **Use Jest, Mocha, or AVA** for testing.
-   **Mock dependencies** using `jest.mock()` or `sinon`.
-   **Use `winston` and `morgan`** for logging.
-   **Test async code properly** using `async/await`.
-   **Monitor apps** using PM2, New Relic, or Datadog.
