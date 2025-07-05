

---

## 🧠 What is the Builder Design Pattern?

The **Builder Pattern** is a **creational design pattern** that lets you construct **complex objects step by step**. It allows you to create different representations of the object using the same construction process.

Instead of having a large constructor with many parameters (or inconsistent object creation), the builder provides a **fluent interface** for creating objects.

---

## 🧰 Real-world Analogy

> Think of building a **burger** in a restaurant:
>
> * You choose the bun
> * Then the patty
> * Then the toppings and sauces

Each step builds upon the last — and in the end, you have a complete burger built **step-by-step**.

---

## 🧱 Structure

Here’s a breakdown of the components involved:

* **Product**: The complex object being built (e.g., a `Burger`)
* **Builder**: Contains methods to build different parts
* **Director (optional)**: Orchestrates the building steps in a particular order
* **Client**: Uses the builder to create the product

---

## 💻 JavaScript Code Example

### 🎯 Goal: Build a complex `Computer` object

```js
// Product
class Computer {
  constructor() {
    this.cpu = null;
    this.gpu = null;
    this.ram = null;
    this.storage = null;
    this.os = null;
  }

  specs() {
    return `CPU: ${this.cpu}, GPU: ${this.gpu}, RAM: ${this.ram}, Storage: ${this.storage}, OS: ${this.os}`;
  }
}

// Builder
class ComputerBuilder {
  constructor() {
    this.computer = new Computer();
  }

  setCPU(cpu) {
    this.computer.cpu = cpu;
    return this;
  }

  setGPU(gpu) {
    this.computer.gpu = gpu;
    return this;
  }

  setRAM(ram) {
    this.computer.ram = ram;
    return this;
  }

  setStorage(storage) {
    this.computer.storage = storage;
    return this;
  }

  setOS(os) {
    this.computer.os = os;
    return this;
  }

  build() {
    return this.computer;
  }
}

// Client
const gamingPC = new ComputerBuilder()
  .setCPU("Intel i9")
  .setGPU("NVIDIA RTX 4090")
  .setRAM("32GB")
  .setStorage("2TB SSD")
  .setOS("Windows 11")
  .build();

console.log(gamingPC.specs());
```

---

## 🖼️ Visual Representation

```
Client
  ↓
ComputerBuilder
  ├── setCPU("Intel i9")
  ├── setGPU("RTX 4090")
  ├── setRAM("32GB")
  ├── setStorage("2TB SSD")
  └── setOS("Windows")
      ↓
  .build()
      ↓
  → 🎯 Computer Object
```

---

## ✅ Pros of Builder Pattern

| Advantage                         | Description                                                         |
| --------------------------------- | ------------------------------------------------------------------- |
| ✅ Clear & readable                | Makes object creation **more readable** with method chaining        |
| ✅ Flexible                        | You can **customize only parts** you need, skipping optional fields |
| ✅ Avoids telescoping constructors | No need to pass 10+ arguments into a constructor                    |
| ✅ Immutable final object          | You can build and freeze object afterward if needed                 |
| ✅ Testable                        | Easy to unit test each build step                                   |

---

## ❌ Cons of Builder Pattern

| Disadvantage            | Description                                                                                              |
| ----------------------- | -------------------------------------------------------------------------------------------------------- |
| ❌ Verbose               | Adds extra classes or code for simple objects                                                            |
| ❌ Can be overkill       | For objects with only 2–3 properties, builder adds complexity                                            |
| ❌ No strict enforcement | In JS, lack of type safety might allow building incomplete objects without error unless manually handled |

---

## 🧭 When to Use the Builder Pattern

* When you’re creating **objects with many optional fields** or steps.
* When object creation should be **separated from representation** (e.g., different configurations).
* When you want to use a **fluent API** to simplify object configuration.
* When you want to make **immutable or complex nested objects**.

---

## 🧩 Advanced Use (Optional: Director Pattern)

If you have predefined configurations:

```js
class Director {
  static buildGamingPC() {
    return new ComputerBuilder()
      .setCPU("Intel i9")
      .setGPU("RTX 4090")
      .setRAM("32GB")
      .setStorage("2TB SSD")
      .setOS("Windows 11")
      .build();
  }

  static buildOfficePC() {
    return new ComputerBuilder()
      .setCPU("Intel i5")
      .setRAM("8GB")
      .setStorage("512GB SSD")
      .setOS("Ubuntu")
      .build();
  }
}
```

---

## 🔚 Summary

* **Builder Pattern** is perfect for constructing complex, step-by-step objects.
* Helps eliminate bloated constructors.
* Common in real-world scenarios like:

  * Config builders
  * UI component factories
  * HTTP request setup (e.g., Axios or fetch wrappers)
  * Object config in libraries (e.g., chart config, form builders)

---

