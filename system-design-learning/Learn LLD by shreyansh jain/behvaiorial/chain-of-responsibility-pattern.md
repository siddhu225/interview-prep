Here’s a **detailed, interview-ready explanation** of the **Chain of Responsibility (CoR) Design Pattern** in JavaScript — with a real-world analogy, code example, use cases, and when exactly to use it.

---

# ✅ Chain of Responsibility Design Pattern (JavaScript)

## 🔹 What Is It?

The **Chain of Responsibility** is a **behavioral design pattern** that allows you to pass a request along a **chain of handlers**. Each handler decides whether to:

* Handle the request,
* Pass it to the next handler in the chain.

This avoids tight coupling between sender and receiver — the sender doesn't care who handles the request.

---

## 🔹 Real-World Analogy

Imagine a **customer complaint**:

* Goes to **front desk**
* If unresolved, goes to **floor manager**
* Then to **store manager**
* Then to **corporate HQ**

Each level decides whether to handle it or pass it on.

---

## 🔹 When to Use Chain of Responsibility

✅ Use this pattern when:

* You want to **decouple sender and receiver**.
* Multiple handlers could process a request.
* You want to add/remove responsibilities **dynamically**.
* You want to avoid large **if-else or switch** blocks.

---

## 🔹 Example: Support Ticket System

Let’s build a support system where different handlers process tickets based on **urgency**.

---

### 🔸 Step 1: Base Handler

```js
class Handler {
  setNext(handler) {
    this.nextHandler = handler;
    return handler; // enables chaining
  }

  handle(request) {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    } else {
      console.log("No handler could process the request.");
    }
  }
}
```

---

### 🔸 Step 2: Concrete Handlers

```js
class LevelOneSupport extends Handler {
  handle(request) {
    if (request.level <= 1) {
      console.log("Level 1 Support handled the request.");
    } else {
      super.handle(request);
    }
  }
}

class LevelTwoSupport extends Handler {
  handle(request) {
    if (request.level <= 2) {
      console.log("Level 2 Support handled the request.");
    } else {
      super.handle(request);
    }
  }
}

class LevelThreeSupport extends Handler {
  handle(request) {
    if (request.level <= 3) {
      console.log("Level 3 Support handled the request.");
    } else {
      console.log("Escalating to external team...");
    }
  }
}
```

---

### 🔸 Step 3: Chain Setup and Usage

```js
const level1 = new LevelOneSupport();
const level2 = new LevelTwoSupport();
const level3 = new LevelThreeSupport();

// Create the chain
level1.setNext(level2).setNext(level3);

// Requests
level1.handle({ level: 1 }); // Level 1 Support handled the request.
level1.handle({ level: 2 }); // Level 2 Support handled the request.
level1.handle({ level: 3 }); // Level 3 Support handled the request.
level1.handle({ level: 4 }); // Escalating to external team...
```

---

## 🔹 Benefits

* ✅ **Decouples sender and handlers**.
* ✅ **Flexible** — add/remove/change handlers without breaking others.
* ✅ Reduces large **if-else or switch-case** chains.
* ✅ Supports **lazy processing** — stops once a handler handles it.

---

## 🔹 Drawbacks

* ❌ Debugging can be harder since flow is **dynamic**.
* ❌ If no handler handles the request, it may fail silently.
* ❌ Requires careful design to avoid cycles in the chain.

---

## 🔹 Use Cases

* **Middleware pipelines** (like Express.js).
* **Validation chains** (e.g., form fields).
* **Access control checks**.
* **Logging chains** — log at debug → warn → error.
* **Approval workflows** — team lead → manager → director.

---

## 🔹 Chain of Responsibility vs Other Patterns

| Pattern                     | Key Difference                                              |
| --------------------------- | ----------------------------------------------------------- |
| **Decorator**               | Adds behavior **before/after** method calls                 |
| **Strategy**                | Selects **one algorithm** dynamically                       |
| **Chain of Responsibility** | Passes request through a chain; multiple potential handlers |

---

## ✅ Quick Revision Snippet

```js
class Handler {
  setNext(handler) {
    this.nextHandler = handler;
    return handler;
  }

  handle(request) {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
  }
}

class AuthMiddleware extends Handler {
  handle(req) {
    if (req.user) {
      console.log("Auth passed");
      super.handle(req);
    } else {
      console.log("Unauthorized");
    }
  }
}

class RoleCheckMiddleware extends Handler {
  handle(req) {
    if (req.user.role === 'admin') {
      console.log("Role check passed");
      super.handle(req);
    } else {
      console.log("Forbidden");
    }
  }
}

const auth = new AuthMiddleware();
const role = new RoleCheckMiddleware();

auth.setNext(role);

auth.handle({ user: { name: 'Sai', role: 'admin' } });
// Output:
// Auth passed
// Role check passed
```

---

## 🧠 Summary for Interviews

* CoR is useful when multiple objects **can handle a request**, and you want to **decouple sender from handler**.
* You define a **chain of handlers**, each of which decides to handle or pass it on.
* Used widely in **middleware**, **validation**, **approvals**, **loggers**.
* Promotes **open/closed principle**: add new handlers without modifying existing ones.

---

Let me know if you'd like a diagram or side-by-side comparison with middleware in Express or NestJS!
