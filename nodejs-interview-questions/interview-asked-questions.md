Here are well-structured and concise explanations for your topics:

---

### **1. Heap vs Stack**

**Heap** and **Stack** are two types of memory used during program execution, but they serve different purposes:

| Feature               | Stack                                            | Heap                                         |
| --------------------- | ------------------------------------------------ | -------------------------------------------- |
| **Memory Allocation** | Fixed size, allocated at compile time            | Dynamically allocated at runtime             |
| **Access Speed**      | Faster (LIFO – Last In First Out)                | Slower due to dynamic access                 |
| **Usage**             | Stores function calls, local variables           | Stores objects, data shared across functions |
| **Memory Management** | Managed automatically (freed when function ends) | Managed manually or by garbage collector     |
| **Size**              | Limited and smaller                              | Larger but less efficient                    |

**Example:**

* Stack: Local variables in a function.
* Heap: Objects or arrays created using `new` in JavaScript or dynamic allocation in other languages.

---

### **2. Clustering in Node.js**

**Clustering in Node.js** is a technique used to **scale an application** across multiple CPU cores, improving performance and load handling.

* **Why use it?**
  Node.js runs on a single thread. Clustering helps utilize **multi-core systems** by spawning multiple instances (workers) of the application.

* **How it works:**

  * The `cluster` module in Node.js creates **child processes** that share the same server port.
  * A **master process** manages multiple **worker processes**.
  * Each worker handles incoming requests independently, increasing concurrency.

* **Basic Example:**

  ```js
  const cluster = require('cluster');
  const http = require('http');
  const os = require('os');

  if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  } else {
    http.createServer((req, res) => {
      res.end('Handled by worker: ' + process.pid);
    }).listen(3000);
  }
  ```

* **Benefits:**

  * Improved performance
  * Better fault isolation
  * Utilization of full hardware potential

---

### **3. Difference Between Hashing and Encryption**

| Feature         | Hashing                       | Encryption                            |
| --------------- | ----------------------------- | ------------------------------------- |
| **Purpose**     | Data integrity (verification) | Data confidentiality (protection)     |
| **Reversible?** | **No** – One-way process      | **Yes** – Can be reversed with a key  |
| **Key Usage**   | No key required               | Requires an encryption/decryption key |
| **Output Size** | Fixed-size output             | Output size may vary                  |
| **Example Use** | Password storage              | Secure communication (e.g., HTTPS)    |

* **Hashing**:
  Converts input data into a fixed-length hash. Used in password storage, file checksums, etc.
  Example algorithms: **MD5, SHA-256**

* **Encryption**:
  Converts readable data (plaintext) into unreadable form (ciphertext) using an algorithm and key.
  Example algorithms: **AES, RSA**

**Analogy:**

* Hashing is like creating a fingerprint – you can verify identity, but can't recreate the person from it.
* Encryption is like locking data in a safe – it can be unlocked (decrypted) with the right key.


Here’s a **complete overview of session management in Node.js**, covering what it is, how it works, how session activity is validated, and its pros and cons—all focused **only on session-based authentication**:

---

## 🔐 **4). Session Management in Node.js**

---

### 📌 What Is Session Management?

Session management is a server-side method to track users across multiple requests after login. It creates a **session object** on the server and uses a **unique session ID** to identify it. This session ID is typically stored in a **cookie** on the client.

---

### ⚙️ How Session Management Works

1. **User logs in**:

   * The server authenticates the credentials.
   * It creates a session object (e.g., `{ userId: 123 }`) and stores it in memory, Redis, or a DB.

2. **Session ID generation**:

   * The server generates a unique session ID (e.g., `abc123`) and links it to the session data.

3. **Cookie sent to client**:

   * The session ID is sent to the browser via a cookie like:

     ```
     Set-Cookie: connect.sid=abc123; HttpOnly
     ```

4. **Subsequent requests**:

   * The browser sends the session cookie on each request.
   * Server reads the session ID from the cookie, fetches the corresponding session from storage.

---

### ✅ How the Server Checks If a Session Is Active

When the session ID is received from the cookie:

1. **Session lookup**:

   * The server fetches session data from the session store (memory, Redis, DB).
   * If the session is **not found**, it’s considered expired or invalid.

2. **Expiration check**:

   * Sessions often have a `maxAge` or TTL (time to live).
   * If the session has expired, the session store (like Redis) auto-deletes it, or the app logic treats it as inactive.

3. **Custom validations (optional)**:

   * The server may check flags like `req.session.user` or `req.session.isLoggedIn` for finer control.

#### Example in Express:

```js
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'yourSecret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minutes
}));
```

```js
// Auth middleware
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.status(401).send('Session expired or not logged in');
  }
}
```

---

### 🧰 Where Sessions Are Stored

* **In-memory (default)** – fast but not scalable (useful for dev only).
* **Redis** – popular choice for production; supports TTL and horizontal scaling.
* **Database (MySQL, MongoDB)** – useful if you already use DB for app data.

---

### ✅ Advantages of Session Management

| Advantage                          | Description                                            |
| ---------------------------------- | ------------------------------------------------------ |
| 🔒 Secure                          | Session data stored on server (not exposed to client). |
| 🔁 Easy logout/invalidation        | Server can destroy sessions at any time.               |
| 🎯 Simple for server-rendered apps | Works seamlessly with traditional web apps.            |
| ⚙️ Fine-grained control            | Can modify or inspect session data server-side.        |

---

### ❌ Disadvantages of Session Management

| Disadvantage                   | Description                                                    |
| ------------------------------ | -------------------------------------------------------------- |
| 🧠 Not stateless               | Requires server memory or external session store.              |
| 🚫 Doesn't scale easily        | Needs centralized storage (like Redis) for load-balanced apps. |
| 📦 Cookie overhead             | Session ID cookie sent on every request.                       |
| 📱 Less suited for mobile/SPAs | Can be clunky when working with token-based frontends.         |

---

### ✅ Best Use Cases for Session Management

* Server-rendered apps (e.g., using EJS, Pug)
* Admin panels, dashboards
* Apps where easy logout and session revocation is a priority
* Apps not needing cross-device login or mobile APIs

---

Here’s a **complete overview of Token Management using JWT (JSON Web Token)** in Node.js, including what JWT is, how it works in authentication, different token stages, how it’s stored, verified, and the pros/cons.

---

## 🔐 **Token Management with JWT in Node.js**

---

### 📌5).  What Is Token Management?

Token management is a **stateless** authentication method where the server issues a signed **token (usually a JWT)** to the client upon login. The token contains encoded user info and is sent with every request. The server **verifies** the token to authenticate the user without needing server-side session storage.

---

## 🔑 **What is JWT (JSON Web Token)?**

* JWT is a **compact, URL-safe token** that represents claims between two parties.
* Used for authentication, authorization, and secure information exchange.

---

### 🧱 JWT Structure

A JWT has **3 parts**, separated by dots (`.`):

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VySWQiOjEyMywiZW1haWwiOiJ0ZXN0QGVtYWlsLmNvbSJ9.
s5xyN2rJ_0hNTeEKvR8w1AkysJ0dA3U0AYBb_YYNe-M
```

| Part | Name      | Purpose                               |
| ---- | --------- | ------------------------------------- |
| 1️⃣  | Header    | Specifies signing algorithm & type    |
| 2️⃣  | Payload   | Contains user data ("claims")         |
| 3️⃣  | Signature | Ensures data integrity & authenticity |

---

### 📦 Example Breakdown

```json
Header (Base64):
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload (Base64):
{
  "userId": 123,
  "email": "test@email.com",
  "exp": 1719847600  // UNIX timestamp
}

Signature:
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
```

---

## 🔁 JWT Authentication Lifecycle (Step-by-Step)

### 1. **Login**

* User submits credentials (e.g., email + password).
* Server validates and generates a **JWT**.
* Server sends JWT to the client (usually in response body or as a cookie).

### 2. **Storage**

* Client stores the token:

  * **SPAs / mobile apps**: localStorage or sessionStorage.
  * **Web apps**: HTTP-only cookies for better security.

### 3. **Authenticated Request**

* Client includes JWT in each request header:

  ```http
  Authorization: Bearer <token>
  ```

### 4. **Token Verification**

* Server verifies the token using the secret/public key.
* If valid and not expired → user is authenticated.
* If invalid/expired → reject with 401.

---

## ✅ JWT Advantages

| Feature                | Benefit                                            |
| ---------------------- | -------------------------------------------------- |
| 🔄 Stateless           | No need for session storage on server              |
| 🌐 Cross-platform      | Works with web, mobile, APIs                       |
| 🚀 Fast authentication | Just verify signature + decode                     |
| 📦 Compact             | Lightweight; easy to send in HTTP headers          |
| 🧩 Custom claims       | Store roles, permissions, or app-specific metadata |

---

## ❌ JWT Disadvantages

| Concern                | Why It Matters                                     |
| ---------------------- | -------------------------------------------------- |
| 🔥 Hard to revoke      | Once issued, token is valid until it expires       |
| 🕐 Expiry handling     | You need short-lived tokens + refresh tokens       |
| ⚠️ Stored on client    | Susceptible to **XSS** (if stored in localStorage) |
| 🔐 Sensitive info risk | Shouldn't store private data unless encrypted      |

---

## 🔄 Access Token vs Refresh Token

| Token Type    | Purpose                        | Lifetime          | Stored Where        |
| ------------- | ------------------------------ | ----------------- | ------------------- |
| Access Token  | Authenticates API requests     | Short (e.g., 15m) | memory/localStorage |
| Refresh Token | Used to get a new access token | Long (e.g., 7d)   | HTTP-only cookie    |

**Flow with refresh token:**

1. Access token expires.
2. Client sends refresh token to `/refresh`.
3. Server validates and sends a new access token.

---

## 📦 Common Node.js Packages for JWT

```bash
npm install jsonwebtoken
```

### Issuing a Token:

```js
const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { userId: 123, role: 'admin' },
  'yourSecretKey',
  { expiresIn: '15m' }
);
```

### Verifying a Token:

```js
const decoded = jwt.verify(token, 'yourSecretKey');
```

### Middleware Example:

```js
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'yourSecretKey', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
```

---

## 🛡 Best Practices for JWT

* ✅ Use **short expiry** for access tokens (`5-15 mins`).
* ✅ Use **refresh tokens** in **HTTP-only secure cookies**.
* ✅ Never store JWTs in `localStorage` if XSS is a risk.
* ✅ Sign JWTs with a **strong secret key**.
* ✅ Rotate secrets and invalidate old tokens when needed.
* ✅ Avoid storing sensitive info in the JWT payload.

---

## ✅ Ideal Use Cases for JWT

* Mobile apps (Android/iOS)
* SPAs (React, Angular, Vue)
* Microservices
* OAuth2 implementations
* Public/private API access

---

Securing a Node.js project involves implementing multiple layers of defense across the **application**, **API**, **server**, and **database**. Here's a detailed breakdown of the most important **security measures** you should take:


Implementing **refresh tokens with JWT** is a secure way to maintain user sessions without forcing users to log in repeatedly. Here's a complete guide on how to do it in a **Node.js** backend.

---

## 🔐 What's the Problem?

* **Access tokens** are short-lived (e.g., 15 minutes) for security.
* When expired, the client must **get a new one** without making the user log in again.

👉 This is where a **refresh token** comes in.

---

## 🧩 Overview of JWT with Refresh Token Flow

1. **User logs in**

   * Server sends:

     * **Access token** (short-lived)
     * **Refresh token** (long-lived)
2. **Client stores tokens**

   * Access token → memory or `localStorage`
   * Refresh token → **HTTP-only cookie** (recommended)
3. **Access token expires**

   * Client sends refresh token to `/refresh-token`
   * Server verifies and issues a new access token
4. **User logs out**

   * Refresh token is deleted/invalidated

---

## 🛠️ Step-by-Step Node.js Implementation

### 1. Install dependencies

```bash
npm install express jsonwebtoken cookie-parser dotenv
```

---

### 2. Setup .env

```env
ACCESS_SECRET=yourAccessSecret
REFRESH_SECRET=yourRefreshSecret
```

---

### 3. Auth Controller

```js
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) =>
  jwt.sign(user, process.env.ACCESS_SECRET, { expiresIn: "15m" });

const generateRefreshToken = (user) =>
  jwt.sign(user, process.env.REFRESH_SECRET, { expiresIn: "7d" });

// In-memory storage (use Redis or DB in real apps)
let refreshTokens = [];

exports.login = (req, res) => {
  const user = { id: 1, email: "test@example.com" }; // dummy user

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  refreshTokens.push(refreshToken); // Save for validation

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.json({ accessToken });
};

exports.refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.sendStatus(401);
  if (!refreshTokens.includes(token)) return res.sendStatus(403);

  jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const newAccessToken = generateAccessToken({ id: user.id });
    res.json({ accessToken: newAccessToken });
  });
};

exports.logout = (req, res) => {
  const token = req.cookies.refreshToken;
  refreshTokens = refreshTokens.filter((t) => t !== token);
  res.clearCookie("refreshToken");
  res.sendStatus(204);
};
```

---

### 4. Express App Setup

```js
const express = require("express");
const cookieParser = require("cookie-parser");
const authController = require("./authController");
require("dotenv").config();

const app = express();
app.use(cookieParser());
app.use(express.json());

app.post("/login", authController.login);
app.post("/refresh-token", authController.refreshToken);
app.post("/logout", authController.logout);

app.listen(3000, () => console.log("Server started on 3000"));
```

---

## 🧠 Best Practices

| Concern                | Best Practice                                            |
| ---------------------- | -------------------------------------------------------- |
| 🔐 Store refresh token | In HTTP-only, secure cookies                             |
| 🔁 Rotate tokens       | Issue new refresh token on every refresh                 |
| 🗑️ Invalidate tokens  | Store in DB or Redis and delete on logout/compromise     |
| ⏳ Token expiration     | Use short-lived access token + long-lived refresh token  |
| 🛡️ Block reuse        | Add refresh token IDs and expiration tracking (advanced) |

---

## ✅ Summary

| Token Type | Lifespan    | Stored In             | Use                    |
| ---------- | ----------- | --------------------- | ---------------------- |
| Access     | Short (15m) | Memory / localStorage | Authenticated requests |
| Refresh    | Long (7d+)  | HTTP-only Cookie      | Get new access token   |

---

Would you like a **version using Redis or DB** to track refresh tokens, or **implement rotation-based token security** to prevent reuse?


---

## 🔐 **1. Authentication & Authorization**

### ✅ Use Secure Authentication Methods

* Use **bcrypt** or **argon2** to hash passwords (`bcryptjs`, `bcrypt`).
* Use **JWT** or **sessions** securely for login.
* Implement **2FA** (Two-Factor Authentication) for sensitive systems.

### ✅ Role-Based Access Control (RBAC)

* Restrict access based on user roles (admin, user, manager, etc.).
* Don’t trust user input for permission checks.

---

## 🛡 **2. Input Validation & Sanitization**

### ✅ Use Schema Validators

* Use `Joi`, `Zod`, or `express-validator` to validate input on all endpoints.
* Example:

  ```js
  const schema = Joi.object({ email: Joi.string().email().required() });
  ```

### ✅ Sanitize Inputs

* Prevent injection attacks using sanitization libraries:

  * `express-mongo-sanitize` (MongoDB)
  * `xss-clean` (for XSS)

---

## 🧱 **3. Protection Against Common Web Vulnerabilities**

### ✅ SQL Injection / NoSQL Injection

* Never use raw queries with user input.
* Use ORM/ODM libraries like **Sequelize**, **Mongoose**, etc.
* Sanitize input before using it in DB queries.

### ✅ Cross-Site Scripting (XSS)

* Use `helmet` middleware.
* Sanitize HTML inputs.
* Escape outputs in frontend templates.

### ✅ Cross-Site Request Forgery (CSRF)

* Use CSRF tokens for forms using `csurf` middleware if using sessions.
* If using JWTs, prefer **same-site HTTP-only cookies** for refresh tokens.

---

## 🧠 **4. Secure Token Handling (JWT)**

* Set short expiry for access tokens.
* Store refresh tokens in **HTTP-only, secure cookies**.
* Never expose JWT secrets in the frontend.
* Don’t store JWT in `localStorage` (prone to XSS).

---

## 🔒 **5. Secure HTTP Headers**

Use [`helmet`](https://github.com/helmetjs/helmet):

```bash
npm install helmet
```

```js
const helmet = require('helmet');
app.use(helmet());
```

Adds headers like:

* `X-Content-Type-Options: nosniff`
* `X-Frame-Options: DENY`
* `Content-Security-Policy`

---

## 🧰 **6. Rate Limiting & Brute Force Protection**

* Use `express-rate-limit` to throttle requests:

```js
const rateLimit = require('express-rate-limit');
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
```

* Use `bcrypt` with a high cost factor to slow down brute force attacks on passwords.

---

## 🔐 **7. HTTPS Everywhere**

* Use **SSL/TLS** for encrypted traffic.
* Redirect all HTTP traffic to HTTPS.
* Use `secure: true` for cookies when using HTTPS.

---

## 🧪 **8. Dependency Security**

* Regularly audit packages:

  ```bash
  npm audit
  ```

* Use tools like:

  * `snyk`
  * `npm audit fix`
  * `OWASP Dependency-Check`

* Avoid vulnerable or outdated packages.

---

## 🧭 **9. Environment Variables & Secrets Management**

* Don’t hardcode secrets or credentials in code.
* Use `.env` + `dotenv`, or better, a secrets manager:

  * AWS Secrets Manager
  * HashiCorp Vault
  * Azure Key Vault

```js
require('dotenv').config();
const dbPassword = process.env.DB_PASSWORD;
```

---

## 🚧 **10. Secure Error Handling**

* Don’t expose stack traces or internal logic in errors.
* Use centralized error-handling middleware.
* Log detailed errors **only on the server**.

---

## 🧼 **11. Log & Monitor**

* Use Winston, Bunyan, or Pino for logging.
* Monitor logs for anomalies or repeated attacks.
* Use alerting tools like:

  * LogRocket
  * Sentry
  * Datadog

---

## 🧬 **12. Secure File Uploads (if any)**

* Validate file types & sizes.
* Store outside your app directory.
* Use virus scanners if needed.
* Don’t allow arbitrary file execution.

---

## 🔄 **13. Session Security (if using sessions)**

* Use `express-session` securely:

  * `httpOnly: true`
  * `secure: true`
  * Use Redis to store sessions.

---

## 🔐 Summary Checklist

| Area                  | Key Actions                                |
| --------------------- | ------------------------------------------ |
| Authentication        | Hash passwords, secure JWTs or sessions    |
| Input Validation      | Use Joi, Zod, sanitize with xss-clean etc. |
| HTTP Security Headers | Use `helmet()`                             |
| Rate Limiting         | Use `express-rate-limit`                   |
| Dependency Safety     | Use `npm audit`, `snyk`                    |
| HTTPS                 | Always use HTTPS                           |
| Secrets Management    | Store in `.env` or secret managers         |
| Session Security      | Use secure cookies & Redis store           |
| Logging               | Sanitize logs, use monitoring tools        |

---

Let me know if you want a **boilerplate setup** or want to do a **security audit** of your existing Node.js project.


When setting up a **Node.js project**, especially in a backend or microservice architecture, applying **design patterns** improves modularity, scalability, and maintainability.

---

## 🎯 Common Design Patterns in a Node.js Project

### ✅ 1. **Singleton Pattern**

Used to ensure a class has **only one instance** and provides a global access point to it.

**Use Cases:**

* DB connections (MongoDB, PostgreSQL, Redis)
* Logger instances
* Config managers
* Caching clients

---

### ⚠️ Issues with Singleton Pattern in Node.js

| Problem                    | Explanation                                                                       |
| -------------------------- | --------------------------------------------------------------------------------- |
| ❌ **Hidden State**         | Singleton holds internal state that may be unintentionally shared across modules. |
| ❌ **Hard to Test**         | Difficult to mock or replace singleton in unit tests.                             |
| ❌ **Tight Coupling**       | Everything using the singleton becomes tightly coupled to its implementation.     |
| ❌ **Hot Reloading Issues** | In serverless or watch-mode (e.g. Nodemon), singleton may be recreated.           |

---

### 🛠️ How to Resolve Issues with Singleton Pattern

#### 🔄 1. **Use Dependency Injection (DI)**

Instead of requiring singleton directly:

```js
// BAD (tight coupling)
const logger = require('./logger');
logger.log("Hello");
```

Use DI:

```js
// GOOD
module.exports = (logger) => {
  return function handle(req, res) {
    logger.info('Request received');
  };
};
```

Now you can **inject mocks/stubs** in tests.

---

#### 🧪 2. **Make Singleton Configurable**

Use a factory function:

```js
let instance = null;

function createLogger(config) {
  if (!instance) {
    instance = new Logger(config);
  }
  return instance;
}

module.exports = { createLogger };
```

So you can pass config/test mock as needed.

---

#### 🧹 3. **Avoid Global State in Singleton**

Singletons can exist **without shared mutable state**. Avoid storing session/user-specific data in them.

---

#### 📦 4. **Use Class with Static Method (alternative)**

```js
class Config {
  static get(key) {
    return process.env[key];
  }
}
```

No need to instantiate anything, and no hidden shared state.

---

## ✅ Other Patterns Used in Node.js Projects

| Pattern                     | Purpose                                                   |
| --------------------------- | --------------------------------------------------------- |
| **Factory**                 | Dynamically create objects with config                    |
| **Observer (EventEmitter)** | Handle async events like messaging or logging             |
| **Middleware**              | Common in Express apps for layered request processing     |
| **Strategy**                | Select behavior at runtime (e.g., different auth methods) |
| **Repository**              | Abstract DB logic from services (used with ORMs/ODMs)     |
| **Adapter**                 | Normalize interfaces from external APIs/libraries         |
| **Command**                 | Wrap requests (e.g., job queues, async handlers)          |
| **Proxy**                   | Add auth/logging to service calls without modifying them  |

---

## 📌 Summary

* Singleton pattern is useful for shared resources like DB, Logger, etc.
* But it can lead to **tight coupling**, **hidden state**, and **testability issues**.
* Solve it using **dependency injection**, **factory methods**, and **configurable singletons**.

---

Let me know if you want a boilerplate project with best practices or a working example of DI with singletons in Node.js.

Great question! Let’s go step by step and cover:

---

## 🧾 What is a **Transaction**?

A **transaction** is a sequence of operations performed as a **single logical unit of work**.
In MongoDB, this means:

> **All operations inside a transaction either succeed together or fail together.**

---

## 📦 Why Transactions in MongoDB?

* MongoDB is a **NoSQL document database**.
* Before v4.0, it supported **atomic operations only at the document level**.
* From **v4.0+**, MongoDB supports **multi-document ACID transactions** (replica sets).
* From **v4.2+**, also supports **transactions in sharded clusters**.

---

## 🔄 Transaction Flow in MongoDB

Let’s say you want to move money from `Account A` to `Account B`. You want both operations to succeed or fail together.

### ✅ Flow:

```js
const session = await mongoose.startSession();
session.startTransaction();

try {
  // Operation 1: Debit account A
  await Account.updateOne({ _id: 'A' }, { $inc: { balance: -100 } }).session(session);

  // Operation 2: Credit account B
  await Account.updateOne({ _id: 'B' }, { $inc: { balance: 100 } }).session(session);

  // Commit the transaction
  await session.commitTransaction();
} catch (err) {
  // Rollback on error
  await session.abortTransaction();
} finally {
  session.endSession();
}
```

---

### 🧭 Behind the Scenes:

1. **Start Session**: `startSession()` creates a logical context to track operations.
2. **Begin Transaction**: `startTransaction()` starts buffering writes.
3. **Perform Ops**: Any reads/writes use `.session(session)` to participate in the transaction.
4. **Commit**: `commitTransaction()` applies all changes.
5. **Abort**: `abortTransaction()` undoes all changes if an error occurred.

---

## 📌 Important Notes:

| Concept                   | Explanation                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------- |
| **All writes are staged** | Until `commitTransaction()` is called, writes are not visible to others.                |
| **Isolation**             | MongoDB transactions use **snapshot isolation** (others don’t see in-progress changes). |
| **Retries**               | Recommended to wrap transactions in a retry loop for robustness.                        |

---

## 🛡️ Write Concerns in Transactions

### 🧾 What is Write Concern?

**Write concern** defines the level of acknowledgment requested from MongoDB for write operations:

* `w: 1` → Acknowledged by primary only
* `w: "majority"` → Acknowledged by a majority of replica set members

### 💡 In Transactions:

* The **write concern for the whole transaction** must be set at the **session level**.
* **Default**: `w: "majority"` (recommended to ensure data durability)

```js
session.startTransaction({
  writeConcern: { w: 'majority' },
});
```

📌 All writes inside the transaction will follow this write concern.

---

### 🔍 Example with Retry Logic (Production Pattern)

```js
async function runTransactionWithRetry(txnFunc, session) {
  while (true) {
    try {
      session.startTransaction({ writeConcern: { w: 'majority' } });
      await txnFunc(session);
      await session.commitTransaction();
      break;
    } catch (err) {
      if (
        err.hasErrorLabel('TransientTransactionError')
      ) {
        // Retry transaction
        continue;
      } else {
        throw err;
      }
    }
  }
}
```

---

## ✅ Summary

| Topic                       | MongoDB Support                              |
| --------------------------- | -------------------------------------------- |
| Multi-document transactions | ✅ From v4.0                                  |
| In sharded clusters         | ✅ From v4.2                                  |
| Isolation                   | ✅ Snapshot isolation                         |
| Rollback support            | ✅ With `abortTransaction()`                  |
| Write concern               | ✅ Set per transaction (e.g. `w: 'majority'`) |
| Retry needed?               | ✅ Yes, for production-grade systems          |

---

Let me know if you want a complete example using **Mongoose**, **native MongoDB driver**, or want to explore **performance tradeoffs** with transactions.



MongoDB, like all distributed systems, must make trade-offs based on the **CAP theorem**.

---

## 🧠 Recap: What is the CAP Theorem?

**CAP** stands for:

* **C**onsistency: Every read gets the latest write or an error.
* **A**vailability: Every request receives a (non-error) response.
* **P**artition Tolerance: The system continues to operate despite network partitions (message loss between nodes).

According to the theorem, in the event of a **network partition**, a system can choose **only two** out of the three.

---

## 🍃 MongoDB and CAP Theorem

MongoDB is a **CP system** (Consistency + Partition Tolerance) by default.

### ✅ 1. **Partition Tolerance** — Yes

MongoDB is a distributed database, so it must tolerate partitions. This is **non-negotiable** in modern distributed systems.

### ✅ 2. **Consistency** — Yes (by default)

MongoDB ensures **strong consistency** if you're reading from the **primary** replica.

* Writes always go to the primary.
* Reads from the primary see the latest committed data.

### ❌ 3. **Availability** — Not guaranteed during partitions

If the primary node becomes unreachable and **a new primary can't be elected** (due to lack of quorum), the system may reject reads/writes until recovery — sacrificing **availability**.

---

## 📌 Customizability: MongoDB Can Be Tuned

MongoDB lets you **configure** for different trade-offs:

| Setting                 | Behavior                                                                      |
| ----------------------- | ----------------------------------------------------------------------------- |
| **Read from secondary** | Increases availability but may return stale data (eventual consistency)       |
| **Write concern**       | `w:1` = faster writes, lower consistency; `w:majority` = stronger consistency |
| **Read concern**        | `local`, `majority`, `linearizable` — choose based on desired consistency     |

So, MongoDB can be **AP** or **CP** depending on configuration, but:

> 💡 **By default**, MongoDB prefers **Consistency + Partition Tolerance (CP)**

---

## ✅ Summary

| CAP Property        | MongoDB (Default Behavior)             |
| ------------------- | -------------------------------------- |
| Consistency         | ✅ Yes (strong consistency via primary) |
| Availability        | ⚠️ May be sacrificed during partition  |
| Partition Tolerance | ✅ Yes (replica sets, sharding)         |
| **CAP Type**        | **CP**                                 |

---

Let me know if you want this mapped to **real scenarios** (e.g. sharding, elections, failovers), or if you'd like to explore how to configure MongoDB toward more **AP-style** behavior.



Questions related to Kafka.. What is broker... what is Zookeeper



service discovery in microservices
circuit pattern in microservices



generics in typescript

3. Implement Observer Design Pattern
4. Reverse of the words in the statement
5. Event Loop Working
Sharding vs Partitiononig
Debugging  of Memory Leaks
How you can Vertical and Horizontal Scale your systems
Design the System for Library
ACID
CAP Theoriem
Aggregation in MongoDB
Currying in JS
Promise Chainining
FInd INdexes of unsorted array if it sums the target
GCD using Eucledian Algo



1. Asked to design a wallet system with credit debit money functionality with user ... handle production worst case
2. Matrix Programs, calculate Left and right dignal of matrix
3. Event loop
4. How to upload 2 - 3 GB file from the frontend to the Node server, the frontend should not be constant on the same page... but the user should able to get real-time upload progress... and also backend should not be blocked
5. What is the best way to prevent backend malicious attack 
6. What is the difference in Hashing and encripting 
7. How to implement refresh token feature for user authentication using JWT
8. Questions related to Kafka.. What is broker... what is Zookeeper
9. How to implement a retrying mechanism for backend API if any API is failing... also server should not crash due to the error because of which the API is failing 
10. Why the frontend hooks or lifecycle method trigger twice in dev mode... why not in prod mode
11. how to improve the backend performance, give the example where yo improved performance and it resolved business issue 
12. how to get in frontend which component is licking memory... and how to fix that
13.  Given requirements like real estate web app (ex no broker), asked which Design pattern I can use there to make system performance very efficiently 
14. Asked to design msg system in 1 hr using socket IO, multiple user should be able to join room and they should be able to msg each other... frontend and backend both
15. How many users use the system or App which you have worked on... basically concurrency... and how many user it can handle
16. Given the assignment where test cases was failing... we will have to correct the code due to which all the testcase will pass 
17. Microservices architecture
18. Micro frontend Architecture 
19. there was a multiple array of numbers, each number belonged to specific road.. we should find out the shortest path for given any number
20. Mongodb Aggregate functions questions 
21. Mongodb indexes questions
22. We are a company of credit cards... we provide a credit card to the users... but we get those from the bank... we have to maintain all the transactions from the bank whichever the user is doing... handle the worst case as there are chances to fail the transaction from bank to our system, also define which design pattern you will use.... we will have to answer this within a 30 min... all the solution for frontend and backend 
23. Which nodejs libraries we should use to secure our backend server
24. asked for JWT functions 