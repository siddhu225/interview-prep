
---

## ✅ Overview: What are SOLID Principles?

SOLID is an acronym for five design principles aimed at making software designs more understandable, flexible, and maintainable. These principles were introduced by Robert C. Martin ("Uncle Bob").

---

## 1. **S - Single Responsibility Principle (SRP)**

### ✅ Definition:

> A class or module should have one, and only one, reason to change.

### ✅ Explanation:

Every class or function should do one thing and do it well. It should have **only one responsibility**.

### ✅ Problem it solves:

* Avoids **tightly coupled code**.
* Easier to **understand**, **test**, and **modify**.
* Prevents code from becoming a **"God object"** that does too many things.

### ✅ Example:

Before SRP:

```javascript
class UserSettings {
  constructor(user) {
    this.user = user;
  }

  changeSettings(settings) {
    if (this.verifyCredentials()) {
      // change settings
    }
  }

  verifyCredentials() {
    // verify user credentials
  }
}
```

After applying SRP (split responsibilities):

```javascript
class UserAuth {
  constructor(user) {
    this.user = user;
  }

  verifyCredentials() {
    // verify user credentials
  }
}

class UserSettings {
  constructor(user) {
    this.user = user;
    this.auth = new UserAuth(user);
  }

  changeSettings(settings) {
    if (this.auth.verifyCredentials()) {
      // change settings
    }
  }
}
```

Now, `UserSettings` only handles settings, and `UserAuth` handles authentication.

---

## 2. **O - Open/Closed Principle (OCP)**

### ✅ Definition:

> Software entities (classes, modules, functions) should be **open for extension**, but **closed for modification**.

### ✅ Explanation:

We should be able to **add new functionality** without **changing existing code**.

### ✅ Problem it solves:

* Prevents bugs in existing code when introducing new changes.
* Makes code **more robust to updates** and **less risky** to refactor.
* Encourages use of **abstraction and polymorphism**.

### ✅ Example:

Without OCP (modifying logic):

```javascript
function getArea(shape) {
  if (shape.type === 'circle') {
    return Math.PI * shape.radius * shape.radius;
  } else if (shape.type === 'square') {
    return shape.side * shape.side;
  }
}
```

With OCP (extensible design using polymorphism):

```javascript
class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius * this.radius;
  }
}

class Square {
  constructor(side) {
    this.side = side;
  }

  area() {
    return this.side * this.side;
  }
}

function getArea(shape) {
  return shape.area();
}
```

Now you can add new shapes without touching `getArea`.

---

## 3. **L - Liskov Substitution Principle (LSP)**

### ✅ Definition:

> Objects of a superclass should be **replaceable with instances of their subclasses** without breaking the application.

### ✅ Explanation:

A derived class should extend the base class **without changing its expected behavior**.

### ✅ Problem it solves:

* Prevents **incorrect assumptions** in polymorphic usage.
* Makes inheritance **safe and predictable**.
* Avoids broken or inconsistent behavior in subclasses.

### ✅ Example:

Violation of LSP:

```javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  setWidth(width) {
    this.width = width;
    this.height = width;
  }

  setHeight(height) {
    this.width = height;
    this.height = height;
  }
}
```

Using `Square` instead of `Rectangle` will break expected behavior:

```javascript
const rect = new Square();
rect.setWidth(5);
rect.setHeight(10);
console.log(rect.getArea()); // Not 50, breaks assumption
```

This violates LSP.

---

## 4. **I - Interface Segregation Principle (ISP)**

### ✅ Definition:

> Clients should not be forced to depend on methods they do not use.

### ✅ Explanation:

Split large interfaces into smaller, more specific ones. Classes should only implement what they actually need.

### ✅ Problem it solves:

* Avoids **fat interfaces**.
* Reduces **unused method implementations**.
* Improves **code readability and maintainability**.

### ✅ Example:

Bad design — single interface for all workers:

```javascript
class Employee {
  work() {}
  eat() {}
}
```

Now, if you implement a `Robot` class:

```javascript
class Robot extends Employee {
  eat() {
    // ?? Robot doesn't eat
  }
}
```

Better design using smaller interfaces:

```javascript
class Workable {
  work() {}
}

class Eatable {
  eat() {}
}

class Human extends Workable {
  eat() {}
}

class Robot extends Workable {
  // Only implements work
}
```

Now `Robot` doesn’t need to implement `eat()`.

---

## 5. **D - Dependency Inversion Principle (DIP)**

### ✅ Definition:

> High-level modules should not depend on low-level modules. Both should depend on abstractions.

> Abstractions should not depend on details. Details should depend on abstractions.

### ✅ Explanation:

Use interfaces or abstractions to decouple code. High-level logic shouldn’t know the low-level details.

### ✅ Problem it solves:

* Avoids **tight coupling**.
* Makes code more **testable**, **reusable**, and **extensible**.
* Supports **inversion of control** (e.g., dependency injection).

### ✅ Example:

Without DIP:

```javascript
class MySQLDatabase {
  connect() {
    // connect to MySQL
  }
}

class PasswordReminder {
  constructor() {
    this.db = new MySQLDatabase(); // tightly coupled
  }
}
```

With DIP:

```javascript
class PasswordReminder {
  constructor(database) {
    this.db = database; // depends on abstraction/interface
  }
}
```

Now you can inject any DB (MongoDB, PostgreSQL, etc.), and `PasswordReminder` doesn’t care about implementation details.

---

## 🔚 Conclusion

Applying SOLID principles:

* Makes code more **robust and scalable**.
* Encourages **decoupling and clean architecture**.
* Leads to **better team collaboration** and **easier refactoring**.

These principles are not limited to JavaScript — they apply across object-oriented and functional languages, and they help write cleaner, more maintainable code.

---

Let me know if you want a one-page cheat sheet version or examples using TypeScript!
