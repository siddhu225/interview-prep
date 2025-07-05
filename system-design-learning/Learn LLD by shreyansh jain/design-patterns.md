Here are **detailed notes** on the **three main types of design patterns** in software engineering:

---

# ✅ 1. Creational Design Patterns

> **Purpose**: Focus on **object creation** mechanisms, trying to create objects in a manner suitable to the situation.

### 🔹 Common Problems Solved:

* Controlling object creation to avoid tight coupling.
* Managing complex object initialization logic.
* Reusing objects instead of creating new ones.
* Supporting extensibility in the instantiation process.

---

### 🔧 Common Creational Patterns:

#### 1. **Singleton**

* **Ensures** only **one instance** of a class exists globally.
* Useful for **config objects, logging**, or **shared resources**.

```javascript
class Singleton {
  constructor() {
    if (Singleton.instance) return Singleton.instance;
    Singleton.instance = this;
    // initialization
  }
}
```

#### 2. **Factory Method**

* Creates objects **without exposing the creation logic**.
* Allows subclasses to alter the type of objects created.

```javascript
class TransportFactory {
  static getTransport(mode) {
    if (mode === 'road') return new Car();
    if (mode === 'sea') return new Ship();
  }
}
```

#### 3. **Abstract Factory**

* Provides an interface to create **families of related objects** without specifying their concrete classes.

```javascript
class UIFactory {
  createButton() {}
  createInput() {}
}

class DarkUIFactory extends UIFactory {
  createButton() { return new DarkButton(); }
  createInput() { return new DarkInput(); }
}
```

#### 4. **Builder**

* Separates the construction of a complex object from its representation.
* Useful when an object needs multiple configuration steps.

```javascript
class CarBuilder {
  setEngine(engine) { this.engine = engine; return this; }
  setWheels(wheels) { this.wheels = wheels; return this; }
  build() { return new Car(this); }
}
```

#### 5. **Prototype**

* Creates objects by **cloning existing objects**.
* Great for performance when object creation is expensive.

```javascript
const carPrototype = {
  clone() {
    return Object.assign({}, this);
  }
};
```

---

# ✅ 2. Structural Design Patterns

> **Purpose**: Deal with **object composition** — how to combine objects and classes into larger structures.

### 🔹 Common Problems Solved:

* Managing **relationships between objects**.
* Promoting **reusability** through flexible structure.
* Making systems easier to understand and extend.

---

### 🔧 Common Structural Patterns:

#### 1. **Adapter**

* Translates one interface into another.
* Allows incompatible interfaces to work together.

```javascript
class OldPrinter {
  oldPrint(text) { console.log(text); }
}

class NewPrinterAdapter {
  constructor(oldPrinter) {
    this.oldPrinter = oldPrinter;
  }

  print(text) {
    this.oldPrinter.oldPrint(text);
  }
}
```

#### 2. **Bridge**

* Separates abstraction from implementation so they can vary independently.
* Decouples the high-level logic from platform-specific implementations.

```javascript
class Remote {
  constructor(device) {
    this.device = device;
  }

  togglePower() {
    this.device.togglePower();
  }
}
```

#### 3. **Composite**

* Composes objects into **tree structures** (like DOM).
* Treats individual and composed objects **uniformly**.

```javascript
class File {
  open() {}
}

class Folder {
  constructor() { this.children = []; }
  add(child) { this.children.push(child); }
  open() { this.children.forEach(c => c.open()); }
}
```

#### 4. **Decorator**

* Adds responsibilities to objects dynamically.
* Used to **extend functionality without modifying the original class**.

```javascript
function withTimestamp(logFn) {
  return function(msg) {
    logFn(`[${Date.now()}] ${msg}`);
  };
}

const log = withTimestamp(console.log);
log("Hello");
```

#### 5. **Facade**

* Provides a **simplified interface** to a complex subsystem.
* Hides complexity for the client.

```javascript
class ComputerFacade {
  startComputer() {
    this.loadBIOS();
    this.loadOS();
    this.login();
  }
}
```

#### 6. **Flyweight**

* Reduces memory usage by sharing common object data.
* Useful in scenarios with **a large number of similar objects**.

```javascript
class ShapeFactory {
  constructor() {
    this.shapes = {};
  }

  getShape(color) {
    if (!this.shapes[color]) {
      this.shapes[color] = new Circle(color);
    }
    return this.shapes[color];
  }
}
```

#### 7. **Proxy**

* A placeholder object that controls access to another object (e.g., access control, lazy loading).

```javascript
class ImageProxy {
  constructor(filename) {
    this.image = null;
    this.filename = filename;
  }

  display() {
    if (!this.image) {
      this.image = new RealImage(this.filename);
    }
    this.image.display();
  }
}
```

---

# ✅ 3. Behavioral Design Patterns

> **Purpose**: Deal with **object communication** and responsibilities between them.

### 🔹 Common Problems Solved:

* Defining how objects **interact and communicate**.
* Reducing **tight coupling** between objects.
* Enhancing **flexibility** and control over program flow.

---

### 🔧 Common Behavioral Patterns:

#### 1. **Observer**

* Defines a one-to-many dependency, so when one object changes state, all dependents are notified.

```javascript
class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}
```

#### 2. **Strategy**

* Defines a family of algorithms, encapsulates them, and makes them interchangeable.

```javascript
class PaymentContext {
  setStrategy(strategy) {
    this.strategy = strategy;
  }

  pay(amount) {
    this.strategy.pay(amount);
  }
}
```

#### 3. **Command**

* Encapsulates a request as an object, allowing for parameterization, queuing, and logging.

```javascript
class Light {
  on() { console.log("Light on"); }
  off() { console.log("Light off"); }
}

class LightOnCommand {
  constructor(light) { this.light = light; }
  execute() { this.light.on(); }
}
```

#### 4. **Chain of Responsibility**

* Passes a request along a chain of handlers. Each handler decides whether to process or pass to the next.

```javascript
class Handler {
  setNext(handler) { this.next = handler; return handler; }
  handle(request) {
    if (this.next) return this.next.handle(request);
  }
}
```

#### 5. **Mediator**

* Encapsulates communication between objects to reduce direct dependencies.

```javascript
class ChatRoom {
  send(sender, message) {
    // Logic to send message between participants
  }
}
```

#### 6. **State**

* Allows an object to change its behavior when its internal state changes.

```javascript
class TrafficLight {
  setState(state) {
    this.state = state;
  }

  change() {
    this.state.handle();
  }
}
```

#### 7. **Template Method**

* Defines the **skeleton of an algorithm** and allows subclasses to override steps without changing the structure.

```javascript
class DataProcessor {
  process() {
    this.loadData();
    this.processData();
    this.saveData();
  }
}
```

#### 8. **Visitor**

* Allows adding new behavior to existing object structures without modifying them.

```javascript
class Animal {
  accept(visitor) {
    visitor.visit(this);
  }
}
```

---

# 🎯 Summary Table

| Pattern Type   | Purpose                  | Example Patterns              |
| -------------- | ------------------------ | ----------------------------- |
| **Creational** | How objects are created  | Singleton, Factory, Builder   |
| **Structural** | How objects are composed | Adapter, Decorator, Composite |
| **Behavioral** | How objects interact     | Observer, Strategy, Command   |

---

Let me know if you want:

* JavaScript code examples for each pattern.
* UML-style diagrams or visuals.
* Real-world use cases of these in Node.js or frontend frameworks.
