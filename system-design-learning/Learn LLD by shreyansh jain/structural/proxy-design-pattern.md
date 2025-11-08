Here's a complete **revision-friendly note** on the **Proxy Design Pattern in JavaScript**:

---

## ✅ What is the Proxy Design Pattern?

The **Proxy Design Pattern** provides a placeholder or substitute object to control access to another object.
It acts as an **intermediary** between the client and the real object.

---

## 🎯 Why Use Proxy Pattern?

* **Access control** (e.g., authorization or rate limiting)
* **Lazy initialization** (create expensive objects only when needed)
* **Logging and auditing**
* **Caching**
* **Smart references** (like counting references, pooling)

---

## ⚙️ Types of Proxies

| Type                 | Description                                       |
| -------------------- | ------------------------------------------------- |
| **Virtual Proxy**    | Delays creation of expensive objects until needed |
| **Protection Proxy** | Controls access (e.g., based on user roles)       |
| **Cache Proxy**      | Stores previous results and reuses them           |
| **Logging Proxy**    | Logs all operations on the object                 |

---

## 💡 Real-World Use Cases

* API rate limiting
* Lazy-loading images or components
* Access control in admin panels
* Virtual DOM rendering optimizations
* Caching network/API results
* Logging changes in data for auditing

---

## 🔧 Example: Basic Logging Proxy


Certainly! Below are **class-based examples** of the **Proxy Design Pattern** in JavaScript, showcasing different use cases like access control, logging, and lazy loading.

---

## ✅ 1. **Protection Proxy using Classes**

```js
class Employee {
  constructor(name, role) {
    this.name = name;
    this.role = role;
    this.salary = 100000;
  }

  getSalary() {
    return this.salary;
  }
}

class EmployeeProxy {
  constructor(employee) {
    this.employee = employee;
  }

  getSalary() {
    if (this.employee.role === 'Admin') {
      return this.employee.getSalary();
    } else {
      throw new Error('Access denied: Only Admin can view salary.');
    }
  }
}

// Usage
const emp = new Employee('John', 'User');
const proxy = new EmployeeProxy(emp);

// proxy.getSalary(); // ❌ Throws error

const admin = new Employee('Alice', 'Admin');
const adminProxy = new EmployeeProxy(admin);
console.log(adminProxy.getSalary()); // ✅ 100000
```

---

## 🔁 2. **Caching Proxy with Class**

```js
class MathService {
  square(num) {
    console.log('Calculating...');
    return num * num;
  }
}

class MathServiceProxy {
  constructor() {
    this.mathService = new MathService();
    this.cache = new Map();
  }

  square(num) {
    if (this.cache.has(num)) {
      console.log('Returning from cache');
      return this.cache.get(num);
    }
    const result = this.mathService.square(num);
    this.cache.set(num, result);
    return result;
  }
}

// Usage
const proxy = new MathServiceProxy();
console.log(proxy.square(5)); // Calculating... 25
console.log(proxy.square(5)); // Returning from cache... 25
```

---

## 🔍 3. **Logging Proxy using Class**

```js
class BankAccount {
  constructor(owner, balance = 0) {
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
  }

  withdraw(amount) {
    this.balance -= amount;
  }

  getBalance() {
    return this.balance;
  }
}

class BankAccountProxy {
  constructor(account) {
    this.account = account;
  }

  deposit(amount) {
    console.log(`[LOG] Depositing ${amount}`);
    this.account.deposit(amount);
  }

  withdraw(amount) {
    console.log(`[LOG] Withdrawing ${amount}`);
    this.account.withdraw(amount);
  }

  getBalance() {
    console.log(`[LOG] Checking balance`);
    return this.account.getBalance();
  }
}

// Usage
const account = new BankAccount('Sai', 1000);
const proxy = new BankAccountProxy(account);

proxy.deposit(500);
proxy.withdraw(300);
console.log(proxy.getBalance()); // Logs + Result
```

---

## 🧠 Key Notes for Class-Based Proxy

* **Encapsulates real object** inside the proxy class
* Useful for **OOP-based** systems or **Angular services**
* Proxy can be easily extended with additional logic (like auth, logging, or caching)
* Keeps code **clean and testable**
---

## 🧠 Key Points for Revision

* Proxy = “middleman” between client and real object
* Can intercept **get**, **set**, **apply**, etc.
* Use cases: access control, logging, caching, lazy loading
* ES6 `Proxy` class makes it easy to implement
* Very useful in large applications for cross-cutting concerns (like logging or auth)

---

Let me know if you want a comparison with **Decorator** or **Adapter** pattern as well.
