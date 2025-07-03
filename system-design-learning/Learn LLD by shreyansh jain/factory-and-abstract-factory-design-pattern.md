
---

# 🏭 Factory Design Pattern in JavaScript – Interview Notes

---

## ✅ What is Factory Design Pattern?

The **Factory Pattern** is a **creational design pattern** used to create objects **without specifying the exact class or constructor** that will be instantiated. Instead, a **factory function** handles the object creation logic.

This is useful when:

* You need to create many objects with shared structure but varying details.
* You want to **decouple object creation from usage**.
* You want a flexible and centralized object creation mechanism.

---

## 🧠 Key Concepts

* **Encapsulates object creation logic**
* Provides a **common interface** for creating objects
* **Abstracts complexity** involved in object instantiation
* Promotes **loose coupling**

---

## 🏗️ Structure

```plaintext
+-------------------+
|  Creator (Factory)|
+-------------------+
| + create(type)    |
+-------------------+
        |
        v
+------------------+
| Product (Object) |
+------------------+
```

---

## 🛠️ Basic Example

Let’s implement a `CarFactory` that creates different types of cars.

```javascript
// Step 1: Define product constructors
class Sedan {
  constructor() {
    this.type = 'Sedan';
    this.doors = 4;
  }
}

class SUV {
  constructor() {
    this.type = 'SUV';
    this.doors = 5;
  }
}

// Step 2: Define the factory
class CarFactory {
  createCar(carType) {
    switch(carType) {
      case 'sedan':
        return new Sedan();
      case 'suv':
        return new SUV();
      default:
        throw new Error("Unknown car type");
    }
  }
}

// Step 3: Use the factory
const factory = new CarFactory();

const car1 = factory.createCar('sedan');
console.log(car1); // { type: 'Sedan', doors: 4 }

const car2 = factory.createCar('suv');
console.log(car2); // { type: 'SUV', doors: 5 }
```

---

## 🧩 Factory Function Alternative

In JavaScript, we often use factory **functions** instead of classes.

```javascript
function createUser(type) {
  const baseUser = {
    login() {
      console.log(`${this.role} logged in`);
    }
  };

  if (type === 'admin') {
    return Object.assign({}, baseUser, { role: 'Admin', access: 'Full' });
  } else if (type === 'guest') {
    return Object.assign({}, baseUser, { role: 'Guest', access: 'Limited' });
  } else {
    return Object.assign({}, baseUser, { role: 'User', access: 'Standard' });
  }
}

const admin = createUser('admin');
admin.login(); // Admin logged in

const guest = createUser('guest');
guest.login(); // Guest logged in
```

---

## 📚 Real-World Use Cases

* **UI component creation**: Based on type or config
* **Logger factory**: Create different loggers (console, file, remote)
* **Database connectors**: Based on environment (MySQL, MongoDB, etc.)
* **Game development**: Create enemy/character types based on level

---

## ✅ Benefits

* Centralizes object creation
* Increases flexibility and scalability
* Avoids repetitive `new` usage across the codebase
* Easy to introduce new types without changing client code

---

## ❌ Drawbacks

* Can introduce **complexity** if overused
* May lead to large factory classes/functions
* Not suitable when you only need simple object instantiation

---

## 🔁 Comparison With Constructor

| Aspect        | Factory Pattern       | Constructor/`new`        |
| ------------- | --------------------- | ------------------------ |
| Abstraction   | Higher                | Lower                    |
| Flexibility   | More (conditional)    | Less                     |
| Extensibility | Easy to add types     | Harder                   |
| Inheritance   | Manual via prototypes | Native via class extends |

---

## 💡 Best Practices

* Use **naming conventions**: e.g., `createUser`, `buildComponent`
* Combine with **strategy pattern** for dynamic behaviors
* Avoid making factory too bloated — consider **multiple small factories**
* Prefer **composition over inheritance** inside factories

---

## 💬 Interview Tip

Be ready to explain:

* **Why** factory pattern is useful in JavaScript
* **When** to choose factory over class constructors
* The **difference** between Factory Pattern and Abstract Factory Pattern (advanced)
* Real-world analogy: Think of a coffee shop – customers ask for a “Latte” or “Espresso” without knowing how it's made internally.

---

## 🧪 Mini Quiz (For Self-Revision)

1. What is the purpose of the Factory Pattern?
2. How does it differ from using the `new` keyword directly?
3. Can a factory return different types of objects based on input?
4. Is it possible to use factory pattern without classes in JS?
5. What are the downsides of using factory functions too much?

---

Absolutely! Here's a **detailed, interview-focused note on the Abstract Factory Pattern in JavaScript**, with clear examples, diagrams, comparisons, and key revision points.

---

# 🏭 Abstract Factory Pattern in JavaScript – Interview Notes

---

## ✅ What is the Abstract Factory Pattern?

The **Abstract Factory Pattern** is a **creational design pattern** that provides an **interface for creating families of related or dependent objects** **without specifying their concrete classes**.

> 🧠 It’s like a factory of factories — where each factory creates objects that are part of the same family.

---

## 🧠 Key Concepts

* Used when the system needs to create **multiple related objects**
* Helps ensure **object compatibility**
* Promotes **loose coupling** between client code and object creation
* Built on top of the **Factory Method Pattern**

---

## 🏗️ Structure Diagram

```plaintext
            Client
              |
       ----------------
       |              |
AbstractFactory    --> createProductA()
                    --> createProductB()
       |
ConcreteFactory1       ConcreteFactory2
   |                          |
 ProductA1, ProductB1     ProductA2, ProductB2
```

---

## 🔧 Real-World Analogy

🪑 Imagine a **furniture factory**:

* VictorianFurnitureFactory creates: `VictorianChair`, `VictorianSofa`
* ModernFurnitureFactory creates: `ModernChair`, `ModernSofa`

The client can switch the entire **family of products** by changing the factory.

---

## 🛠️ Code Example in JavaScript

Let’s implement a **UI Theme Factory** with `LightThemeFactory` and `DarkThemeFactory`.

### Step 1: Define Product Interfaces

```javascript
// Product A
class Button {
  render() {}
}

// Product B
class Checkbox {
  render() {}
}
```

### Step 2: Concrete Product Implementations

```javascript
class LightButton extends Button {
  render() {
    console.log('Rendering light button');
  }
}

class DarkButton extends Button {
  render() {
    console.log('Rendering dark button');
  }
}

class LightCheckbox extends Checkbox {
  render() {
    console.log('Rendering light checkbox');
  }
}

class DarkCheckbox extends Checkbox {
  render() {
    console.log('Rendering dark checkbox');
  }
}
```

### Step 3: Abstract Factory Interface

```javascript
class UIThemeFactory {
  createButton() {}
  createCheckbox() {}
}
```

### Step 4: Concrete Factories

```javascript
class LightThemeFactory extends UIThemeFactory {
  createButton() {
    return new LightButton();
  }

  createCheckbox() {
    return new LightCheckbox();
  }
}

class DarkThemeFactory extends UIThemeFactory {
  createButton() {
    return new DarkButton();
  }

  createCheckbox() {
    return new DarkCheckbox();
  }
}
```

### Step 5: Client Code

```javascript
function renderUI(factory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();

  button.render();
  checkbox.render();
}

const lightFactory = new LightThemeFactory();
renderUI(lightFactory);
// Output:
// Rendering light button
// Rendering light checkbox

const darkFactory = new DarkThemeFactory();
renderUI(darkFactory);
// Output:
// Rendering dark button
// Rendering dark checkbox
```

---

## 🧩 When to Use Abstract Factory

✅ When:

* You need to create **families of related objects**
* Your system should be **independent of how its products are created**
* You want to ensure **consistency** between components

🚫 Avoid if:

* You only need **one kind** of product
* You want **simple instantiation** without relationships between products

---

## 📚 Real-World Use Cases

* UI frameworks with **themes** (e.g. Material vs Bootstrap)
* **Cross-platform support**: Windows vs Mac UI controls
* **Database drivers**: Switching between MySQL and PostgreSQL families
* **Game development**: Different levels/themes generating related enemies, weapons, etc.

---

## ✅ Benefits

* Enforces **consistency** across related objects
* Makes it easy to **switch product families**
* Helps follow the **Open/Closed Principle**
* Promotes **loose coupling** between client code and object instantiation

---

## ❌ Drawbacks

* Can add **complexity** due to multiple layers of abstraction
* Can result in **too many classes/interfaces**
* May be overkill for simple object creation

---

## 🔁 Factory vs Abstract Factory

| Feature           | Factory Pattern         | Abstract Factory Pattern            |
| ----------------- | ----------------------- | ----------------------------------- |
| Purpose           | Creates one object type | Creates related families of objects |
| Abstraction Level | Single product          | Multiple related products           |
| Example           | Create one type of car  | Create sedan + SUV as a family      |
| Flexibility       | Moderate                | High                                |
| Complexity        | Low                     | Moderate to high                    |

---

## 🧪 Mini Quiz (Self-Check)

1. How is the Abstract Factory Pattern different from the Factory Pattern?
2. Why would you use an Abstract Factory in a UI component library?
3. Can Abstract Factory ensure consistency among related components?
4. What happens if you want to add a new product type (e.g. `Slider`)?
5. Can you use abstract factory pattern with functions instead of classes in JS?

---

## 💬 Interview Tips

* Be ready to **differentiate Abstract Factory and Factory patterns**
* Show **understanding of product families** and consistency
* Use **theme, UI component, or game level** analogies to explain
* Mention **modularity** and **decoupling** in your reasoning

---
