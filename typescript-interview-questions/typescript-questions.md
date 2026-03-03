Here are **proper, interview-ready answers** with explanations and examples.

---

# 1️⃣ What is TypeScript and how is it different from JavaScript?

### ✅ Answer:

TypeScript is a **superset of JavaScript** developed by Microsoft that adds **static typing and advanced features**. It compiles into plain JavaScript.

### Key Differences:

| JavaScript        | TypeScript             |
| ----------------- | ---------------------- |
| Dynamically typed | Statically typed       |
| Errors at runtime | Errors at compile time |
| No interfaces     | Supports interfaces    |
| Weak tooling      | Strong IDE support     |

### Example:

**JavaScript**

```js
function add(a, b) {
  return a + b;
}

add("10", 20); // "1020" (unexpected)
```

**TypeScript**

```ts
function add(a: number, b: number): number {
  return a + b;
}

add("10", 20); 
// ❌ Compile-time error
```

👉 TypeScript prevents runtime bugs by catching errors early.

---

# 2️⃣ What are the advantages of using TypeScript?

### ✅ Answer:

1. **Static Type Checking** – Errors caught during development.
2. **Better IDE Support** – Autocomplete, refactoring, navigation.
3. **Improved Code Maintainability** – Especially for large projects.
4. **Self-Documenting Code** – Types describe expected structures.
5. **Safer Refactoring**
6. **Better Team Collaboration**
7. **Scalable for Large Applications**

### Example (API Contract Safety):

```ts
interface User {
  id: number;
  name: string;
}

function getUser(): User {
  return { id: 1, name: "Sai" };
}
```

If the structure changes, TypeScript immediately shows errors everywhere it is used.

---

# 3️⃣ What are basic types in TypeScript?

### ✅ Answer:

### Primitive Types:

* `string`
* `number`
* `boolean`
* `null`
* `undefined`
* `symbol`
* `bigint`

### Other Important Types:

* `any`
* `unknown`
* `void`
* `never`
* `object`
* Arrays
* Tuples

### Examples:

```ts
let name: string = "Sai";
let age: number = 28;
let isActive: boolean = true;

let numbers: number[] = [1, 2, 3];

let user: [string, number] = ["Sai", 28]; // tuple

function log(): void {
  console.log("Hello");
}
```

---

# 4️⃣ What is type inference in TypeScript?

### ✅ Answer:

Type inference means TypeScript automatically determines the type based on the assigned value.

### Example:

```ts
let message = "Hello";
```

TypeScript infers:

```ts
let message: string;
```

Another example:

```ts
let count = 10; 
// inferred as number
```

### Why Important?

* Reduces verbosity
* Makes code cleaner
* Still maintains type safety

However, in complex cases, explicit typing is recommended.

---

# 5️⃣ What is the difference between `any`, `unknown`, and `never`?

### ✅ any

* Disables type checking.
* Can assign anything.
* Dangerous.

```ts
let value: any = 10;
value = "Hello";
value.toUpperCase(); // No error (unsafe)
```

👉 Avoid using `any` in production code.

---

### ✅ unknown

* Safer alternative to `any`
* Must check type before using

```ts
let value: unknown = "Hello";

if (typeof value === "string") {
  console.log(value.toUpperCase()); // Safe
}
```

👉 Preferred over `any`.

---

### ✅ never

Represents values that **never occur**.

Used in:

* Functions that throw errors
* Infinite loops
* Exhaustive checks

```ts
function throwError(): never {
  throw new Error("Something went wrong");
}
```

---

### Quick Comparison:

| Type    | Safe?   | Use Case               |
| ------- | ------- | ---------------------- |
| any     | ❌ No    | Avoid                  |
| unknown | ✅ Yes   | When type is not known |
| never   | Special | Impossible values      |

---

# 6️⃣ What is the difference between `null` and `undefined` in TypeScript?

### ✅ undefined

* Variable declared but not assigned.

```ts
let value: number;
console.log(value); // undefined
```

### ✅ null

* Explicitly assigned empty value.

```ts
let user: string | null = null;
```

---

### Important: `strictNullChecks`

When enabled:

```ts
let name: string = null; 
// ❌ Error
```

You must explicitly allow it:

```ts
let name: string | null = null;
```

👉 In production apps, always enable `strictNullChecks`.

---

# 7️⃣ What is strict mode in TypeScript?

### ✅ Answer:

Strict mode enables **all strict type-checking options**.

In `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

It includes:

* `noImplicitAny`
* `strictNullChecks`
* `strictFunctionTypes`
* `strictBindCallApply`
* `strictPropertyInitialization`

### Why Important?

* Prevents accidental `any`
* Prevents null-related bugs
* Makes code production-safe

In backend systems → strict mode is highly recommended.

---

# 8️⃣ What is the purpose of tsconfig.json?

### ✅ Answer:

`tsconfig.json` is the configuration file for the TypeScript compiler.

It controls:

* Compilation behavior
* Target JS version
* Module system
* Strict settings
* File inclusion/exclusion

### Example:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  }
}
```

### Important Options:

| Option          | Meaning                          |
| --------------- | -------------------------------- |
| target          | JS version output                |
| module          | Module system (CommonJS, ESNext) |
| strict          | Enable strict checks             |
| outDir          | Output folder                    |
| rootDir         | Source folder                    |
| esModuleInterop | Better compatibility             |

---


Perfect 👍
Now let’s move to the next section:

# 🔹 Types & Interfaces (Interview-Ready Detailed Answers)

---

# 9️⃣ What is the difference between `interface` and `type`?

### ✅ Answer:

Both are used to define custom types, but they have some differences.

### Similarities:

* Can define object structure
* Can define function types
* Can be extended

---

### 🔹 Interface

Best used for defining object shapes and contracts.

```ts
interface User {
  id: number;
  name: string;
}
```

Supports **declaration merging**:

```ts
interface User {
  email: string;
}

// Merged automatically
```

---

### 🔹 Type

More flexible. Supports unions, intersections, primitives.

```ts
type User = {
  id: number;
  name: string;
};

type Status = "active" | "inactive"; // union
```

---

### 🔥 Key Differences:

| Feature             | interface | type |
| ------------------- | --------- | ---- |
| Object shapes       | ✅         | ✅    |
| Union types         | ❌         | ✅    |
| Intersection types  | Limited   | ✅    |
| Declaration merging | ✅         | ❌    |
| Primitives          | ❌         | ✅    |

---

### 🎯 Interview Best Practice Answer:

Use **interface for object contracts**, and **type when working with unions, intersections, or complex compositions**.

---

# 🔟 What is a Union Type?

### ✅ Answer:

A union type allows a variable to hold **multiple possible types**.

```ts
let id: string | number;

id = 10;
id = "abc";
```

---

### Practical Example:

```ts
function printId(id: string | number) {
  console.log(id);
}
```

---

### Why Useful?

* Flexible APIs
* Handling dynamic input
* Avoids `any`

---

# 1️⃣1️⃣ What is an Intersection Type?

### ✅ Answer:

Intersection combines multiple types into one.

```ts
type Person = {
  name: string;
};

type Employee = {
  employeeId: number;
};

type Staff = Person & Employee;
```

Now `Staff` must contain both properties.

```ts
const staff: Staff = {
  name: "Sai",
  employeeId: 101
};
```

---

### 🔥 Use Case:

Combining DTOs, extending object structures.

---

# 1️⃣2️⃣ What are Literal Types?

### ✅ Answer:

Literal types allow variables to hold **specific fixed values only**.

```ts
let status: "success" | "error";

status = "success"; // ✅
status = "pending"; // ❌
```

---

### Types of Literal Types:

* String literals
* Number literals
* Boolean literals

---

### Real Backend Example:

```ts
type Role = "admin" | "user" | "guest";
```

Great for role-based systems.

---

# 1️⃣3️⃣ What is Declaration Merging?

### ✅ Answer:

TypeScript automatically merges multiple interface declarations with the same name.

```ts
interface User {
  name: string;
}

interface User {
  age: number;
}
```

Now:

```ts
const user: User = {
  name: "Sai",
  age: 28
};
```

---

### Important:

* Only works with **interface**
* Does NOT work with `type`

---

### Real-world use:

Extending third-party library types.

---

# 1️⃣4️⃣ How do you extend an interface?

### ✅ Answer:

Using `extends` keyword.

```ts
interface Person {
  name: string;
}

interface Employee extends Person {
  employeeId: number;
}
```

---

### Multiple Inheritance:

```ts
interface A {
  a: string;
}

interface B {
  b: string;
}

interface C extends A, B {
  c: string;
}
```

---

### Why Useful?

* Reusable type definitions
* Clean architecture design

---

# 1️⃣5️⃣ What is the difference between `extends` and `implements`?

### 🔹 extends

Used to inherit from another interface or class.

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}
```

---

### 🔹 implements

Used by a class to implement an interface.

```ts
interface Animal {
  name: string;
}

class Dog implements Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
```

---

### 🔥 Key Difference:

| extends               | implements           |
| --------------------- | -------------------- |
| Interface → Interface | Class → Interface    |
| Inheritance           | Contract enforcement |

---

# 1️⃣6️⃣ What are Optional and Readonly Properties?

---

## 🔹 Optional Properties (`?`)

Allows property to be optional.

```ts
interface User {
  name: string;
  age?: number;
}

const user: User = {
  name: "Sai"
};
```

---

## 🔹 Readonly Properties

Cannot be modified after initialization.

```ts
interface User {
  readonly id: number;
  name: string;
}

const user: User = {
  id: 1,
  name: "Sai"
};

user.id = 2; // ❌ Error
```

---

### 🔥 Real Backend Example:

```ts
interface ApiResponse {
  readonly requestId: string;
  data: object;
}
```
Perfect 🔥
This section is **very important for senior-level TypeScript interviews**, especially for backend engineers.

I’ll give **proper explanations + real examples + interview-quality answers.**

---

# 🔥 Functions & Generics (Senior-Level Focus)

---

# 1️⃣7️⃣ How do you define function types in TypeScript?

### ✅ Answer:

You can define function types in multiple ways:

---

## 🔹 Basic Function with Types

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

* `a: number` → parameter type
* `: number` → return type

---

## 🔹 Arrow Function

```ts
const multiply = (a: number, b: number): number => {
  return a * b;
};
```

---

## 🔹 Function Type as a Variable

```ts
let operation: (a: number, b: number) => number;

operation = (x, y) => x + y;
```

---

## 🔹 Using Interface for Function Type

```ts
interface MathOperation {
  (a: number, b: number): number;
}
```

---

### 🎯 Senior-Level Tip:

Always explicitly define return types in backend systems for clarity and maintainability.

---

# 1️⃣8️⃣ What are Generics? Why are they useful?

### ✅ Answer:

Generics allow writing reusable, type-safe code that works with multiple types.

Instead of using `any`, we use generics to preserve type safety.

---

## 🔹 Without Generics (Bad)

```ts
function identity(value: any): any {
  return value;
}
```

No type safety.

---

## 🔹 With Generics (Correct)

```ts
function identity<T>(value: T): T {
  return value;
}
```

Now:

```ts
identity<string>("Hello");
identity<number>(10);
```

Type is preserved.

---

### 🔥 Real Backend Example:

```ts
interface ApiResponse<T> {
  data: T;
  status: number;
}
```

Now:

```ts
const response: ApiResponse<string> = {
  data: "Success",
  status: 200
};
```

---

### 🎯 Why Generics Matter in Senior Roles:

* Typed database responses
* Typed service layers
* Reusable repositories
* Strong API contracts

---

# 1️⃣9️⃣ What are Generic Constraints?

### ✅ Answer:

Generic constraints restrict the type that can be used.

---

## 🔹 Example with `extends`

```ts
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}
```

Now valid:

```ts
getLength("Hello"); // string has length
getLength([1, 2, 3]); // array has length
```

Invalid:

```ts
getLength(123); // ❌ number doesn't have length
```

---

### 🎯 Why Important?

Prevents misuse of generics and adds safety.

---

# 2️⃣0️⃣ What are Default Generic Types?

### ✅ Answer:

Generics can have default types.

```ts
interface ApiResponse<T = string> {
  data: T;
  status: number;
}
```

If no type is provided:

```ts
const res: ApiResponse = {
  data: "Success",
  status: 200
};
```

`T` defaults to `string`.

---

### 🔥 Used in:

* Library design
* Flexible APIs
* SDK development

---

# 2️⃣1️⃣ What are Function Overloads in TypeScript?

### ✅ Answer:

Function overloading allows defining multiple function signatures.

---

## 🔹 Example

```ts
function format(value: string): string;
function format(value: number): string;

function format(value: string | number): string {
  return value.toString();
}
```

---

### Why Needed?

Different behavior for different inputs.

---

### 🎯 Senior-Level Insight:

Use overloads when return type depends on input type.

Example:

```ts
function getData(id: number): User;
function getData(id: string): Admin;
```

---

# 2️⃣2️⃣ What is the `this` type in TypeScript?

### ✅ Answer:

TypeScript allows explicitly typing `this`.

---

## 🔹 Example in Function

```ts
function greet(this: { name: string }) {
  console.log(this.name);
}
```

---

## 🔹 In Classes

```ts
class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet() {
    console.log(this.name);
  }
}
```

---

## 🔹 Important in Callbacks

```ts
interface DB {
  save(this: DB): void;
}
```

---

### 🎯 Why Important?

Prevents losing `this` context in callbacks — common backend issue.

---

# 🔥 VERY IMPORTANT Senior Concepts

---

# 🔹 Generic Classes

```ts
class Repository<T> {
  private items: T[] = [];

  add(item: T) {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}
```

Used heavily in:

* ORM layers
* Repository patterns
* Service abstractions

---

# 🔹 Generic with Multiple Types

```ts
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}
```

---

# 🔥 Senior Interview Tip (Very Important)

When answering generics questions, say:

> “In large backend systems, I use generics extensively in repository layers, API response wrappers, and service abstractions to ensure strong typing while keeping the code reusable.”

That immediately shows maturity.

---

Perfect 🔥
This is where **senior-level TypeScript interviews** get serious.

Advanced types test whether you truly understand how TypeScript’s type system works — not just syntax.

I’ll explain clearly with **examples + interview explanation style answers**.

---

# 🔥 Advanced Types (Mapped, Conditional, infer)

---

# 2️⃣3️⃣ What are Mapped Types?

### ✅ Answer:

Mapped types allow you to create new types by transforming properties of an existing type.

They iterate over keys of a type using `keyof`.

---

## 🔹 Basic Example

```ts
type User = {
  id: number;
  name: string;
};
```

Now make all properties optional:

```ts
type PartialUser = {
  [K in keyof User]?: User[K];
};
```

This is exactly how `Partial<T>` works internally.

---

## 🔹 Using Built-in Utility

```ts
type PartialUser = Partial<User>;
```

---

### 🔥 How It Works

* `keyof User` → `"id" | "name"`
* `K in keyof User` → loops through each key
* `User[K]` → gets value type

---

### 🎯 Senior-Level Use Case

* Transforming DTOs
* Making update payload types
* Removing readonly
* Creating deeply immutable objects

---

# 2️⃣4️⃣ What are Conditional Types?

### ✅ Answer:

Conditional types allow types to be defined based on conditions.

Syntax:

```ts
T extends U ? X : Y
```

---

## 🔹 Example

```ts
type IsString<T> = T extends string ? true : false;
```

Usage:

```ts
type A = IsString<string>; // true
type B = IsString<number>; // false
```

---

## 🔹 Practical Example

```ts
type ApiResponse<T> = T extends string
  ? { message: T }
  : { data: T };
```

---

### 🔥 Real Backend Example

```ts
type ExtractId<T> = T extends { id: infer U } ? U : never;
```

Used for extracting types dynamically.

---

### 🎯 Why Important?

Used heavily in:

* Utility types
* Framework internals
* Advanced libraries
* Reusable abstractions

---

# 2️⃣5️⃣ What is the `infer` keyword?

### ✅ Answer:

`infer` is used inside conditional types to infer a type dynamically.

---

## 🔹 Example: Extract Return Type

```ts
type GetReturnType<T> = T extends (...args: any[]) => infer R
  ? R
  : never;
```

Usage:

```ts
function greet() {
  return "hello";
}

type Result = GetReturnType<typeof greet>; 
// string
```

---

## 🔹 Extract Promise Type

```ts
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
```

```ts
type A = UnwrapPromise<Promise<string>>; 
// string
```

---

### 🔥 Why infer is Powerful?

It allows dynamic type extraction without manually specifying types.

Frameworks like:

* Express
* NestJS
* React
* Redux

Use `infer` heavily internally.

---

# 2️⃣6️⃣ How do Mapped + Conditional Types Work Together?

🔥 This is very common in senior interviews.

---

## Example: Remove Nullable Fields

```ts
type NonNullableFields<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};
```

---

## Example: Make Certain Keys Optional

```ts
type MakeOptional<T, K extends keyof T> =
  Omit<T, K> & Partial<Pick<T, K>>;
```

This is real production-level typing.

---

# 2️⃣7️⃣ What is Distributive Conditional Type?

When conditional types act on union types, they distribute automatically.

---

## Example:

```ts
type ToArray<T> = T extends any ? T[] : never;

type Result = ToArray<string | number>;
```

Result becomes:

```ts
string[] | number[]
```

This is called **distributive behavior**.

---

### 🔥 Senior Interview Trick Question

How to stop distribution?

Wrap in tuple:

```ts
type ToArray<T> = [T] extends [any] ? T[] : never;
```

Now it won’t distribute.

---

# 2️⃣8️⃣ What are Key Remapping in Mapped Types?

Introduced in TS 4.1

Allows renaming keys.

---

## Example

```ts
type PrefixKeys<T> = {
  [K in keyof T as `prefix_${string & K}`]: T[K];
};
```

---

Usage:

```ts
type User = {
  id: number;
  name: string;
};

type NewUser = PrefixKeys<User>;
```

Result:

```ts
{
  prefix_id: number;
  prefix_name: string;
}
```

🔥 Very impressive in interviews.

---

# 2️⃣9️⃣ What is Recursive Type?

A type that refers to itself.

---

## Example:

```ts
type TreeNode = {
  value: string;
  children?: TreeNode[];
};
```

Used in:

* JSON types
* Nested categories
* Tree structures

---

# 3️⃣0️⃣ How are Utility Types Built Internally?

Example: `Partial<T>`

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

Example: `Readonly<T>`

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

Senior interviewers LOVE this question.

---

# 🔥 Very Common Senior Interview Questions

1. How does `ReturnType<T>` work internally?
2. How does `Exclude<T, U>` work?
3. How does `Extract<T, U>` work?
4. Difference between `unknown` and `never` in conditional types?
5. Why does conditional type distribute over unions?

---

# 🎯 Senior-Level Answer Style

When explaining advanced types, say:

> “I use mapped and conditional types to build reusable abstractions in backend systems — especially for DTO transformations, API contracts, and enforcing type-safe repository layers.”

That signals deep understanding.

Perfect 🔥
This section is **extremely important for senior backend engineers (6+ years)**.

These are **real-world Node.js + TypeScript interview questions** that companies ask for SDE-2 / Senior Backend / Founding Engineer roles.

I’ll give:

* ✅ Question
* ✅ Proper senior-level answer
* ✅ Example where needed
* ✅ What interviewer is actually testing

---

# 🔥 Node.js + TypeScript Backend Interview Questions

---

# 1️⃣ How do you structure a scalable Node.js + TypeScript backend project?

### ✅ Senior-Level Answer:

In production systems, I follow a layered architecture:

```
src/
 ├── controllers/
 ├── services/
 ├── repositories/
 ├── models/
 ├── middlewares/
 ├── routes/
 ├── utils/
 ├── config/
 └── types/
```

### Architecture Layers:

* **Controller** → Handles HTTP layer
* **Service** → Business logic
* **Repository** → DB interaction
* **Model** → Schema definitions
* **Middleware** → Auth, logging, validation
* **Types** → Shared interfaces

### Why?

* Separation of concerns
* Testability
* Scalability
* Clean architecture principles

---

# 2️⃣ How do you type Express Request and Response in TypeScript?

### ✅ Basic Example:

```ts
import { Request, Response } from "express";

export const getUser = (req: Request, res: Response) => {
  res.json({ message: "Hello" });
};
```

---

### 🔥 Advanced (Custom Request Type)

```ts
interface AuthRequest extends Request {
  user: {
    id: string;
    role: string;
  };
}

export const profile = (req: AuthRequest, res: Response) => {
  res.json({ userId: req.user.id });
};
```

### What Interviewer Tests:

* Can you safely extend request object?
* Do you avoid `any`?

---

# 3️⃣ How do you handle environment variables safely in TypeScript?

### ❌ Bad Practice

```ts
process.env.DB_URL
```

No type safety.

---

### ✅ Good Practice

Create a config file:

```ts
interface EnvConfig {
  PORT: string;
  DB_URL: string;
}

const env: EnvConfig = {
  PORT: process.env.PORT!,
  DB_URL: process.env.DB_URL!,
};
```

Or use validation libraries (like Zod).

### Why Important?

Prevents runtime crashes due to missing env variables.

---

# 4️⃣ How do you implement a generic repository pattern?

### ✅ Example:

```ts
class Repository<T> {
  constructor(private model: any) {}

  async create(data: T): Promise<T> {
    return await this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id);
  }
}
```

---

### Why Use Generics?

* Reusable across models
* Strong typing
* Clean architecture

---

# 5️⃣ How do you ensure type-safe API responses?

### ✅ Use Generic Response Wrapper

```ts
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}
```

Usage:

```ts
const response: ApiResponse<User> = {
  success: true,
  data: user
};
```

### Why?

Prevents inconsistent response formats.

---

# 6️⃣ How do you handle async errors properly in Node.js + TS?

### ❌ Problem

Uncaught promise rejections.

---

### ✅ Proper Pattern

```ts
const asyncHandler = (fn: Function) =>
  (req: Request, res: Response, next: Function) =>
    Promise.resolve(fn(req, res, next)).catch(next);
```

Used as:

```ts
router.get("/user", asyncHandler(getUser));
```

---

### Why Important?

* Prevents server crashes
* Centralized error handling

---

# 7️⃣ How do you validate request bodies in a TypeScript backend?

### Best Practice:

Use runtime validation libraries.

Example with Zod:

```ts
const userSchema = z.object({
  name: z.string(),
  age: z.number()
});
```

Type inference:

```ts
type UserInput = z.infer<typeof userSchema>;
```

### Why?

TypeScript alone does not validate runtime input.

This shows senior-level awareness.

---

# 8️⃣ How do you handle database typing (e.g., with Prisma or Mongoose)?

### Senior-Level Answer:

Avoid manual interfaces. Instead:

* Use ORM-generated types (Prisma)
* Infer types from schemas

Example:

```ts
type User = Prisma.UserGetPayload<{}>;
```

Or:

```ts
type User = typeof userModel.prototype;
```

---

### What Interviewer Tests:

* Do you avoid duplicate type definitions?
* Do you understand type-source-of-truth?

---

# 9️⃣ How do you handle partial updates safely?

### ❌ Bad

```ts
updateUser(data: any)
```

---

### ✅ Correct

```ts
updateUser(data: Partial<User>)
```

Even better:

```ts
type UpdateUserDto = Partial<Pick<User, "name" | "email">>;
```

---

### Why?

Prevents updating restricted fields like `id`.

---

# 🔟 How do you manage shared types across microservices?

### Senior-Level Answer:

Options:

1. Shared internal npm package
2. Monorepo (Turborepo/Nx)
3. OpenAPI schema generation
4. Codegen from protobuf

### Why?

Prevents API contract mismatch.

---

# 1️⃣1️⃣ How do you prevent circular dependencies in TypeScript?

### Solutions:

* Use dependency inversion
* Extract interfaces to separate files
* Avoid barrel files in complex systems
* Use dynamic imports carefully

Circular dependencies cause runtime issues.

---

# 1️⃣2️⃣ How do you improve performance in Node.js backend?

### Senior-Level Points:

* Avoid blocking code
* Use streaming
* Use clustering / PM2
* Optimize DB queries
* Caching (Redis)
* Avoid unnecessary JSON parsing

TypeScript doesn’t affect runtime performance — it improves reliability.

---

# 1️⃣3️⃣ How do you handle authentication in TypeScript?

### Example with JWT:

```ts
interface JwtPayload {
  userId: string;
  role: string;
}
```

Middleware:

```ts
const payload = jwt.verify(token, secret) as JwtPayload;
```

Never use `any` for decoded token.

---

# 1️⃣4️⃣ How do you design DTOs in TypeScript?

Separate:

* Database model
* API response
* Create request
* Update request

Example:

```ts
interface CreateUserDto {
  name: string;
  email: string;
}

interface UserResponseDto {
  id: string;
  name: string;
}
```

Prevents exposing sensitive fields.

---

# 1️⃣5️⃣ What are common mistakes in Node + TypeScript backend?

### ❌ Overusing `any`

### ❌ Not enabling strict mode

### ❌ Mixing business logic in controllers

### ❌ Not validating runtime input

### ❌ Duplicating types manually

### ❌ Ignoring async error handling

---

# 🔥 What Senior Interviewers Actually Evaluate

They check:

* Architecture thinking
* Type safety maturity
* Scalability awareness
* Clean code principles
* Error handling patterns
* API contract consistency

