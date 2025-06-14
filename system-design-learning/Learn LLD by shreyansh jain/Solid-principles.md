---

## 🧱 SOLID Principles in JavaScript

**SOLID** is an acronym representing five design principles that enhance the maintainability, scalability, and flexibility of object-oriented software. These principles are particularly relevant in JavaScript, a language that supports object-oriented programming through ES6+ classes and prototypes.

---

### 1. **Single Responsibility Principle (SRP)**

* **Definition**: A class or module should have only one reason to change, meaning it should have only one job or responsibility.

* **Importance**: Simplifies maintenance and testing by ensuring that changes in one area don't affect unrelated parts of the system.

* **Example**:

```javascript
  // Before SRP
  class Person {
    constructor(name, age, height, country) {
      this.name = name;
      this.age = age;
      this.height = height;
      this.country = country;
    }
    getPersonCountry() {
      console.log(this.country);
    }
    greetPerson() {
      console.log("Hi " + this.name);
    }
    static calculateAge(dob) {
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
  }
```



```javascript
  // After SRP
  class Person {
    constructor(name, dateOfBirth, height, country) {
      this.name = name;
      this.dateOfBirth = dateOfBirth;
      this.height = height;
      this.country = country;
    }
  }

  class PersonUtils {
    static calculateAge(dob) {
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
  }

  class PersonService {
    getPersonCountry() {
      console.log(this.country);
    }
    greetPerson() {
      console.log("Hi " + this.name);
    }
  }
```



---

### 2. **Open/Closed Principle (OCP)**

* **Definition**: Software entities (classes, modules, functions) should be open for extension but closed for modification.

* **Importance**: Facilitates adding new features without altering existing code, reducing the risk of introducing bugs.

* **Example**:

```javascript
  class Shape {
    area() {
      throw new Error("Method 'area()' must be implemented.");
    }
  }

  class Rectangle extends Shape {
    constructor(width, height) {
      super();
      this.width = width;
      this.height = height;
    }
    area() {
      return this.width * this.height;
    }
  }

  class Circle extends Shape {
    constructor(radius) {
      super();
      this.radius = radius;
    }
    area() {
      return Math.PI * Math.pow(this.radius, 2);
    }
  }

  class ShapeProcessor {
    calculateArea(shape) {
      return shape.area();
    }
  }

  const rectangle = new Rectangle(20, 10);
  const circle = new Circle(5);
  const shapeProcessor = new ShapeProcessor();

  console.log(shapeProcessor.calculateArea(rectangle)); // 200
  console.log(shapeProcessor.calculateArea(circle)); // 78.53981633974483
```



---

### 3. **Liskov Substitution Principle (LSP)**

* **Definition**: Objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program.

* **Importance**: Ensures that a subclass can stand in for its superclass without altering the desired behavior.

* **Example**:

```javascript
  class Vehicle {
    move() {
      console.log("The vehicle is moving.");
    }
  }

  class Car extends Vehicle {
    move() {
      console.log("Car is running on four wheels");
    }
  }

  class Airplane extends Vehicle {
    move() {
      console.log("Airplane is flying...");
    }
  }

  const car = new Car();
  const airplane = new Airplane();

  car.move(); // Car is running on four wheels
  airplane.move(); // Airplane is flying...
```



---

### 4. **Interface Segregation Principle (ISP)**

* **Definition**: Clients should not be forced to depend on interfaces they do not use.

* **Importance**: Prevents bloated interfaces and ensures that classes only implement methods that are relevant to them.

* **Example**:

```javascript
  const PrinterInterface = {
    print: function () {},
  };

  const ScannerInterface = {
    scan: function () {},
  };

  const FaxInterface = {
    fax: function () {},
  };

  class Printer {
    print() {
      console.log("Printing document");
    }
  }

  class Scanner {
    scan() {
      console.log("Scanning document");
    }
  }

  class MultiFunctionPrinter extends Printer {
    scan() {
      console.log("Scanning document");
    }
    fax() {
      console.log("Faxing document");
    }
  }
```



---

### 5. **Dependency Inversion Principle (DIP)**

* **Definition**: High-level modules should not depend on low-level modules; both should depend on abstractions.

* **Importance**: Reduces coupling between components, making the system more modular and easier to maintain.

* **Example**:

```javascript
  class MySQLDatabase {
    connect() {
      console.log("Connecting to MySQL database...");
    }
  }

  class MongoDBDatabase {
    connect() {
      console.log("Connecting to MongoDB database...");
    }
  }

  class Application {
    constructor(database) {
      this.database = database;
    }

    start() {
      this.database.connect();
    }
  }

  const mySQLDatabase = new MySQLDatabase();
  const mongoDBDatabase = new MongoDBDatabase();

  const mySQLApp = new Application(mySQLDatabase);
  const mongoApp = new Application(mongoDBDatabase);

  mySQLApp.start(); // Connecting to MySQL database...
  mongoApp.start(); // Connecting to MongoDB database...
```



---

## ✅ Benefits of Applying SOLID

* **Maintainability**: Easier to update and modify code with minimal risk of affecting other parts of the system.

* **Testability**: Simplifies writing unit tests due to clear and focused responsibilities.([solidprinciples.org][1])

* **Scalability**: Facilitates adding new features and components without disrupting existing functionality.

* **Flexibility**: Enhances the ability to adapt to changing requirements and technologies.

---

If you need further details or examples in a specific context, feel free to ask!

[1]: https://solidprinciples.org/blog?utm_source=chatgpt.com "Blog | Solid Principles"
