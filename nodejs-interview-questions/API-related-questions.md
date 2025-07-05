Here are **detailed answers** to your API interview questions 1–10. These are foundational concepts frequently asked in system design and backend engineering interviews.

---

### **1. What is an API?**

An **API (Application Programming Interface)** is a **set of rules and protocols** that allows different software applications to communicate with each other.

* It defines **how clients (like web or mobile apps)** can interact with services or data on the server.
* APIs expose **endpoints** (usually URLs) that accept and respond to **HTTP requests**.

🧠 Example:
When a mobile app fetches user data, it might call:

```
GET https://api.example.com/users/123
```

---

Sure! Here's a **more detailed comparison** of **REST vs SOAP APIs**, including their core principles, real-world usage, advantages, and differences in protocol, performance, and design philosophy — ideal for interviews or design discussions.

---

### ✅ **What is REST?**

**REST (Representational State Transfer)** is an architectural style for building **lightweight, stateless APIs** over **HTTP**. REST was introduced by **Roy Fielding** in his 2000 dissertation.

REST APIs use **standard HTTP methods** like `GET`, `POST`, `PUT`, `DELETE`, etc., and commonly **return JSON** or sometimes XML.

---

### ✅ **What is SOAP?**

**SOAP (Simple Object Access Protocol)** is a **protocol** for exchanging structured information using **XML**. It was developed by Microsoft and is governed by the **W3C**. SOAP messages are **strictly defined**, typically transported via **HTTP or SMTP**, and often use **WSDL** (Web Services Description Language) for contracts.

---

### 🆚 **Detailed Comparison: REST vs SOAP**

| Feature                 | **REST API**                                 | **SOAP API**                                  |
| ----------------------- | -------------------------------------------- | --------------------------------------------- |
| **Protocol**            | Architectural style over HTTP                | Protocol over HTTP, SMTP, TCP, etc.           |
| **Data Format**         | JSON, XML, HTML, Text                        | Only XML                                      |
| **Message Structure**   | Lightweight, simple HTTP requests            | Strict, uses `Envelope`, `Header`, `Body` XML |
| **Ease of Use**         | Simple to use, especially with JSON          | Complex due to strict standards               |
| **Performance**         | Faster, lower bandwidth, better for mobile   | Heavier due to XML parsing                    |
| **Flexibility**         | Loosely coupled (URL-based resources)        | Tightly coupled (depends on WSDL)             |
| **Statelessness**       | REST is stateless (no session on server)     | SOAP can be stateful                          |
| **Security**            | Uses HTTPS, OAuth2, JWT                      | Built-in WS-Security (for enterprise needs)   |
| **Error Handling**      | Uses HTTP status codes                       | Uses `<Fault>` element in XML                 |
| **Transaction Support** | Not built-in (must handle manually)          | Yes (ACID-compliant via WS-\* standards)      |
| **Standardization**     | No strict contract — API docs are enough     | Strict standards (WSDL, XSD)                  |
| **Tooling**             | Postman, curl, Swagger/OpenAPI               | Enterprise tools (e.g., SOAP UI, WSDL tools)  |
| **Use Cases**           | Web/Mobile apps, microservices, RESTful APIs | Enterprise systems (banking, telco, ERP)      |

---

### 🧠 **Example**

#### REST:

```http
GET /users/123
Response: { "id": 123, "name": "Alice" }
```

#### SOAP:

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
 <soapenv:Body>
  <getUser>
    <id>123</id>
  </getUser>
 </soapenv:Body>
</soapenv:Envelope>
```

---

### 🏢 **When to Use Each**

| Use REST when…                               | Use SOAP when…                                           |
| -------------------------------------------- | -------------------------------------------------------- |
| You need **lightweight, stateless APIs**     | You need **formal contracts and strict schemas**         |
| You're building **mobile/web apps**          | You’re integrating with **legacy or enterprise systems** |
| You want **simple integration (JSON, HTTP)** | You need **transaction support, WS-Security**            |
| Scalability and performance matter more      | Formality and reliability matter more                    |

---

### 🚀 Summary

* **REST** is ideal for most modern apps (microservices, mobile, web).
* **SOAP** is better for **enterprise-grade**, **contract-driven** systems where **reliability, security, and formal validation** are key.

---

Let me know if you’d like:

* A **code demo comparing both**
* REST vs SOAP **use case matrix**
* A diagram showing how SOAP envelopes work



### **3. What is REST and what are its key principles?**

**REST (Representational State Transfer)** is an architectural style for designing **networked applications**, especially over HTTP.

### 🔑 Key REST Principles:

1. **Stateless** – Each request must contain all info needed; no session on server.
2. **Client-Server** – Separation of frontend and backend.
3. **Cacheable** – Responses can be cached to improve performance.
4. **Uniform Interface** – Use standard HTTP methods and URIs.
5. **Layered System** – Intermediaries (e.g., proxies) can be used transparently.
6. **Resources** – Everything is treated as a resource, identified by a URI.

🧠 Example:

```http
GET /users/123 → Fetch user with ID 123
```

---

### **4. What are the main HTTP methods and when to use each?**

| Method | Use Case                  | Idempotent? | Safe? |
| ------ | ------------------------- | ----------- | ----- |
| GET    | Fetch data                | ✅ Yes       | ✅ Yes |
| POST   | Create new resource       | ❌ No        | ❌ No  |
| PUT    | Update entire resource    | ✅ Yes       | ❌ No  |
| PATCH  | Update part of a resource | ✅ Yes       | ❌ No  |
| DELETE | Delete a resource         | ✅ Yes       | ❌ No  |

🧠 Example:

```http
POST /users       → create a new user
GET /users/123    → fetch user
PUT /users/123    → replace user data
PATCH /users/123  → update user partially
DELETE /users/123 → delete user
```

---

### **5. What is the difference between PUT and PATCH?**

| Feature          | PUT                              | PATCH                         |
| ---------------- | -------------------------------- | ----------------------------- |
| **Operation**    | Replaces the **entire resource** | Updates **partial fields**    |
| **Request body** | Must contain all fields          | Only changed fields           |
| **Idempotent**   | ✅ Yes                            | ✅ Yes                         |
| **Common use**   | Replacing full user profile      | Updating only email or status |

🧠 Example:

```http
PUT /user/1
{ "name": "John", "age": 30 }  // Replaces whole object

PATCH /user/1
{ "age": 31 }  // Updates only age
```

---

### **6. What is idempotency in APIs?**

**Idempotency** means that **making the same API call multiple times has the same effect as making it once**.

### ✅ Idempotent Methods:

* `GET`, `PUT`, `DELETE`, `PATCH`

### ❌ Not Idempotent:

* `POST` (multiple calls = multiple resources created)

🧠 Example:

```http
DELETE /users/123 → Once or 5 times, user is still deleted.
```

---

### **7. What are status codes in HTTP? List commonly used ones.**

HTTP status codes indicate **success or failure** of requests.

| Code | Meaning               | Use Case                         |
| ---- | --------------------- | -------------------------------- |
| 200  | OK                    | Successful GET/POST              |
| 201  | Created               | Resource created                 |
| 204  | No Content            | Successful but no response       |
| 400  | Bad Request           | Invalid client input             |
| 401  | Unauthorized          | Not logged in                    |
| 403  | Forbidden             | No permission                    |
| 404  | Not Found             | Resource not found               |
| 409  | Conflict              | Duplicate record, state conflict |
| 500  | Internal Server Error | Bug or unhandled exception       |
| 503  | Service Unavailable   | Server overloaded or down        |

---

### **8. What is the difference between 401 and 403?**

| Code | Meaning      | When used                                        |
| ---- | ------------ | ------------------------------------------------ |
| 401  | Unauthorized | Not authenticated (no/invalid token)             |
| 403  | Forbidden    | Authenticated but not allowed (e.g., wrong role) |

🧠 Example:

* 401 → No login
* 403 → Logged in as a user, but trying to access admin-only route

---

### **9. What is the difference between 4xx and 5xx errors?**

| Code Category | Meaning           | Who is at fault?                 |
| ------------- | ----------------- | -------------------------------- |
| **4xx**       | Client-side error | The client (bad input, no token) |
| **5xx**       | Server-side error | The server (bug, crash, failure) |

🧠 Examples:

* 400 → Invalid JSON
* 500 → DB connection failure

---

### **10. What does “stateless” mean in REST?**

In REST, **statelessness** means that the **server does not store any session data** about the client between requests.

✅ Each API call must contain **everything needed** (auth, data, params).

🧠 Example:

```http
GET /profile
Authorization: Bearer <token>
```

The server uses the token to identify the user. It doesn’t remember anything from previous calls.

📌 Benefits:

* Easier scaling (no session storage)
* Independent request handling
* More reliable across distributed systems

---

Here are **detailed answers** for your next set of advanced API interview questions — commonly asked in backend/system design interviews and technical discussions:

---

### ✅ **1. What are path parameters vs query parameters?**

#### 📌 Path Parameters (`:id`)

* Used to identify a **specific resource**.
* Part of the **endpoint URL**.
* Mandatory for route resolution.

🧠 Example:

```http
GET /users/:userId
GET /users/123
```

Here, `123` is a path parameter referring to a specific user.

#### 📌 Query Parameters (`?key=value`)

* Used to **filter, search, paginate, or sort** data.
* Optional and passed after a `?` in the URL.

🧠 Example:

```http
GET /users?role=admin&page=2&sort=name
```

This request fetches a list of users filtered by role and paginated.

---

### ✅ **2. How do you handle pagination in APIs?**

Pagination is the process of splitting **large datasets into manageable chunks**.

#### 🛠️ Common Strategies:

| Method           | Description                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Offset-based** | Uses `page` and `limit` parameters<br>`/users?page=2&limit=10`                                                    |
| **Cursor-based** | Uses a `cursor` (usually an ID or timestamp) for efficient navigation<br>`/users?after=1679323423&limit=10`       |
| **Keyset-based** | Uses the value of a field (e.g., `id`, `created_at`) instead of offset<br>Good for performance on large data sets |

#### 📦 Best Practices:

* Always return **metadata** like:

  ```json
  {
    "data": [...],
    "pagination": {
      "page": 2,
      "limit": 10,
      "totalPages": 5,
      "totalItems": 48
    }
  }
  ```

* Use **links** for HATEOAS:

  ```
  "next": "/users?page=3"
  ```

---

### ✅ **3. What is content negotiation? How does the Accept header work?**

**Content negotiation** allows clients to specify the **desired format** of the response (e.g., JSON, XML, HTML).

#### 📌 How It Works:

* Clients send an `Accept` header in the request:

  ```
  Accept: application/json
  Accept: application/xml
  ```

* The server reads the header and returns the **best match**.

#### 🧠 Example:

```http
GET /users/123
Accept: application/xml
```

The server responds:

```xml
<user><id>123</id><name>John</name></user>
```

If the format is unsupported:

```
406 Not Acceptable
```

#### 📦 Advanced:

* You can also negotiate by:

  * **Content-Type** (in request body)
  * **Language** (`Accept-Language`)
  * **Encoding** (`Accept-Encoding`)

---

### ✅ **4. How do you return large datasets from an API?**

Returning large datasets all at once can cause:

* **High memory usage**
* **Timeouts**
* **Slow client rendering**

#### ✅ Strategies:

| Technique       | Use Case                                                |
| --------------- | ------------------------------------------------------- |
| **Pagination**  | Fetch in small chunks                                   |
| **Streaming**   | Use `res.write()` (Node.js) or SSE for real-time chunks |
| **Compression** | Use GZIP to reduce size (`compression` middleware)      |
| **Filtering**   | Allow selective field return (`fields=name,email`)      |
| **Caching**     | Store and serve repeated data faster                    |

#### 🔥 Example with streaming:

```js
res.writeHead(200, { 'Content-Type': 'application/json' });
res.write('[');
data.forEach((item, index) => {
  res.write(JSON.stringify(item));
  if (index < data.length - 1) res.write(',');
});
res.write(']');
res.end();
```

---

### ✅ **5. What are common best practices for naming API endpoints?**

🧱 RESTful naming improves **clarity**, **scalability**, and **consistency**.

#### ✅ Best Practices:

| Rule                           | Example                              |
| ------------------------------ | ------------------------------------ |
| Use **nouns**, not verbs       | `GET /users` not `/getUsers`         |
| Use **plural names**           | `/products`, `/orders`               |
| Use **sub-resources**          | `/users/123/orders`                  |
| Use **lowercase with hyphens** | `/user-profile`, not `/UserProfile`  |
| Use **HTTP verbs for actions** | `GET`, `POST`, `PUT`, `DELETE`       |
| Avoid deep nesting (>2 levels) | `/users/123/posts`, not `/a/b/c/d/e` |

#### ❌ Avoid:

```http
POST /createUser
```

#### ✅ Prefer:

```http
POST /users
```

---

### ✅ **6. How do you handle versioning in REST APIs?**

API versioning ensures **backward compatibility** as you evolve APIs.

#### ✅ Common Versioning Methods:

| Approach         | Example                          | Notes                             |
| ---------------- | -------------------------------- | --------------------------------- |
| **URI-based**    | `/api/v1/users`                  | Simple and most common            |
| **Header-based** | `Accept: application/vnd.api+v1` | Clean URL, less visible           |
| **Query Param**  | `/users?version=1`               | Not RESTful, easy for dev testing |

#### 📦 Best Practices:

* Use URI versioning for **public APIs**:

  ```http
  GET /v1/users
  ```
* Use **semver** (v1, v2, etc.)
* **Deprecate old versions** with warnings
* Document version differences clearly

---

Here are **detailed answers** to your next set of **API security and authentication** interview questions. These are frequently asked in SDE-2+ interviews and practical design discussions:

---

### ✅ **1. What are the differences between API Keys, JWTs, and OAuth2?**

| Feature            | **API Keys**                        | **JWTs (JSON Web Tokens)**                 | **OAuth 2.0**                                 |
| ------------------ | ----------------------------------- | ------------------------------------------ | --------------------------------------------- |
| **Purpose**        | Identify and authenticate apps      | Authenticate users (and carry user claims) | Authorization framework for delegated access  |
| **Authentication** | Yes                                 | Yes                                        | Yes                                           |
| **Authorization**  | No (basic)                          | Yes (can include roles/claims)             | Yes (via scopes and grants)                   |
| **Storage**        | Random string                       | Encoded token (header.payload.signature)   | Access + Refresh tokens                       |
| **Usage**          | In headers or query string          | In headers (Authorization: Bearer)         | Usually in headers (Bearer)                   |
| **Best for**       | Simple public APIs (e.g. analytics) | Stateless auth in SPAs and REST APIs       | Third-party access (e.g. "Login with Google") |

#### 🧠 Example:

* API Key: `GET /data?apikey=abc123`
* JWT: `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5...`
* OAuth2: Auth flow for user authorization, token scopes like `read:profile`

---

### ✅ **2. What is the purpose of CORS in APIs?**

**CORS (Cross-Origin Resource Sharing)** is a browser mechanism that **controls whether a frontend app running on one domain (origin)** is allowed to make requests to an API hosted on a **different domain**.

#### 🔐 Why It’s Needed:

* Browsers **block cross-origin requests** by default for security.
* CORS headers **relax this restriction**.

#### 🧠 Example:

```http
Access-Control-Allow-Origin: https://myfrontend.com
Access-Control-Allow-Methods: GET, POST
```

#### ✅ How to Enable in Express:

```js
const cors = require('cors');
app.use(cors({ origin: 'https://myfrontend.com' }));
```

---

### ✅ **3. How do you secure APIs from unauthorized access?**

#### 🔐 Techniques:

1. **Authentication**:

   * Use JWT, OAuth2, or session tokens.
   * Enforce login for private routes.

2. **Authorization**:

   * Role-based access control (RBAC)
   * Scopes and claims in tokens

3. **HTTPS**:

   * Always use HTTPS to prevent man-in-the-middle attacks.

4. **Input Validation**:

   * Prevent SQL injection, XSS, etc. with libraries like `express-validator`.

5. **Rate Limiting & Throttling**:

   * Protect against brute force & DoS.

6. **CORS and Same-Origin Policy**:

   * Control who can access your API from browsers.

7. **Hide Error Details**:

   * Never expose stack traces in responses.

---

### ✅ **4. How do you prevent replay attacks in APIs?**

A **replay attack** is when an attacker intercepts and resends a valid API request to gain unauthorized access or repeat an action.

#### 🛡️ Prevention Techniques:

| Method                       | Description                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------------- |
| **Timestamps**               | Include `timestamp` in each request. Reject old ones (e.g. >5 mins).                          |
| **Nonces (one-time tokens)** | Generate a unique `nonce` for each request. Keep a cache of used nonces to reject duplicates. |
| **Signatures**               | HMAC or hash of request + secret key. Server verifies signature.                              |
| **TLS (HTTPS)**              | Encrypt traffic to prevent sniffing and tampering.                                            |
| **JWT `exp` claim**          | Short expiration time helps prevent reuse of tokens.                                          |

🧠 Example:

```http
Authorization: HMAC key + timestamp + signature
```

---

### ✅ **5. How would you rate-limit an API to avoid abuse?**

**Rate limiting** controls how many requests a client can make in a given time window.

#### 🎯 Techniques:

| Method                 | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| **Token Bucket**       | Each request consumes a token. Refill tokens over time.  |
| **Fixed Window**       | Allow X requests per minute/hour. Simple but bursty.     |
| **Sliding Log/Window** | Records timestamps of requests for fine-grained control. |
| **Leaky Bucket**       | Requests are queued and released at a steady rate.       |

#### 🧠 Tools:

* **Nginx**: Built-in rate-limiting module
* **Express**: `express-rate-limit` package

```js
const rateLimit = require('express-rate-limit');

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit per IP
}));
```

✅ Tip: Use Redis for distributed rate-limiting in multi-node systems.

---

### ✅ **6. How do you handle sensitive data (like passwords or tokens) in API responses?**

#### ❌ Don’t:

* Return passwords or raw tokens in responses
* Log them in server logs
* Expose stack traces with sensitive info

#### ✅ Do:

| Item                   | Strategy                                    |
| ---------------------- | ------------------------------------------- |
| **Passwords**          | Hash using `bcrypt`, never return or log    |
| **JWT / API Tokens**   | Return only once (on login), store securely |
| **Partial Reveal**     | Show only part of a token (`****1234`)      |
| **Response Filtering** | Use serializers or DTOs to exclude fields   |
| **HTTPS**              | Always encrypt transport                    |
| **Config**             | Use `.env` files and never hardcode secrets |

🧠 Example:

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

🛑 Don’t include:

```json
"password": "user123"
```

---



Here’s a **comprehensive list of common API-related security attacks** along with **clear explanations** and **how to prevent each** — very useful for interviews and real-world backend/API security work:

---

### 🔓 1. **Broken Authentication**

* **Description**: Attackers exploit poorly implemented login mechanisms to gain unauthorized access (e.g., weak token validation, missing token expiration).
* **Example**: Using someone else’s JWT token.
* **Prevention**:

  * Use strong authentication (e.g., OAuth2, JWT).
  * Implement short-lived access tokens and refresh tokens.
  * Validate token signature and expiration (`exp` claim).
  * Enforce rate limiting and lock accounts on brute force attempts.

---

### 🦊 2. **Broken Object Level Authorization (BOLA / IDOR)**

* **Description**: Attackers access or modify data of **other users** by manipulating object IDs in the URL or body.
* **Example**:

  ```http
  GET /users/123 → attacker's ID  
  GET /users/124 → victim’s data
  ```
* **Prevention**:

  * Always check **user’s permissions** for each object access.
  * Don’t rely only on hidden fields or URLs.
  * Use **RBAC (Role-Based Access Control)** or **ABAC** systems.

---

### 🛑 3. **Rate Limiting & Brute Force Attacks**

* **Description**: Attackers send a high number of requests (e.g., login attempts or API abuse) to guess passwords or overwhelm the API.
* **Prevention**:

  * Implement **rate limiting** (e.g., `express-rate-limit`).
  * Use **CAPTCHA** or **2FA** on login endpoints.
  * Track and block repeated failures using IP or account ID.
  * Use **WAFs** (Web Application Firewalls).

---

### 🚫 4. **Mass Assignment**

* **Description**: Sending extra parameters to update fields the user shouldn't control.
* **Example**:

  ```json
  { "username": "john", "isAdmin": true }
  ```
* **Prevention**:

  * Use **whitelisting** of allowed fields (e.g., use DTOs or `pick()`).
  * Do **not blindly bind request body** to internal models.
  * Validate and sanitize input explicitly.

---

### 🔍 5. **Insufficient Logging & Monitoring**

* **Description**: Attacks go undetected because logs are missing or improperly configured.
* **Prevention**:

  * Log authentication attempts, permission denials, and rate limit violations.
  * Use log aggregation tools (e.g., ELK, Datadog).
  * Monitor for anomalies like excessive requests or access to restricted resources.

---

Certainly! Here's a **detailed explanation** of **SQL Injection attacks**, including **real-world risks**, **prevention techniques**, and examples tailored for backend developers — especially useful for interviews and production-grade API design.

---

### 💥 **What is SQL Injection (SQLi)?**

SQL Injection is a **code injection technique** that allows attackers to **manipulate SQL queries** by injecting **malicious input** into application fields (e.g., login forms, filters, search bars). This often happens when user input is directly concatenated into SQL statements without proper validation or sanitization.

---

### 🧨 **What Can an Attacker Do with SQLi?**

* **Bypass authentication**
  (e.g., logging in without valid credentials)
* **Read sensitive data**
  (e.g., passwords, credit card numbers)
* **Modify or delete data**
* **Drop entire tables or databases**
* **Escalate privileges** (e.g., become admin)

---

### 🧪 **Basic Example (Vulnerable Code)**

```js
const username = req.body.username;
const password = req.body.password;

const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
db.query(query); // 🚨 Vulnerable!
```

#### 📌 Input:

```js
username: 'admin'
password: 'anything' OR '1'='1'
```

#### Final Query:

```sql
SELECT * FROM users WHERE username = 'admin' AND password = 'anything' OR '1'='1'
```

➡️ Always returns true → **bypasses authentication**

---

### 🛡️ **How to Prevent SQL Injections**

#### ✅ 1. **Use Parameterized Queries (Prepared Statements)**

🧱 Instead of manually building SQL strings, use placeholders.

**Node.js + MySQL Example:**

```js
db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);
```

**Node.js + PostgreSQL Example:**

```js
const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
```

➡️ Parameters are treated as **data**, not code.

---

#### ✅ 2. **Use an ORM or Query Builder**

Frameworks like **Sequelize**, **Prisma**, **TypeORM**, or **Knex.js** abstract raw SQL queries and handle parameterization automatically.

```js
// Sequelize
User.findOne({ where: { username, password } });
```

---

#### ✅ 3. **Escape and Sanitize User Input**

For edge cases (e.g., dynamic column names, raw queries), escape input manually:

* Use `mysql.escape()` or `pg-format`
* Validate format with libraries:

  ```js
  const { body } = require('express-validator');

  app.post('/login', [
    body('username').isAlphanumeric(),
    body('password').isLength({ min: 6 })
  ], handler);
  ```

---

#### ✅ 4. **Whitelist Allowed Inputs**

If the input must be used in places like column names, always **whitelist** allowed values.

```js
const allowedSortFields = ['name', 'date', 'price'];
if (!allowedSortFields.includes(req.query.sort)) {
  return res.status(400).send('Invalid sort field');
}
```

---

#### ✅ 5. **Least Privilege for DB Users**

* The database user your API uses should **not be a superuser**.
* Give only read/write permissions required by the application.
* Disable operations like `DROP TABLE`, `ALTER`, etc.

---

#### ✅ 6. **Use Web Application Firewalls (WAFs)**

* Detect common SQLi payloads
* Block malicious traffic
* Services: **AWS WAF**, **Cloudflare**, **Imperva**

---

### 🔎 **Types of SQL Injection**

| Type                 | Description                                         | Example                        |
| -------------------- | --------------------------------------------------- | ------------------------------ |
| **Classic SQLi**     | Directly injecting SQL                              | `' OR 1=1 --`                  |
| **Blind SQLi**       | Server doesn't return data, but behaves differently | `' AND 1=1` vs `' AND 1=2`     |
| **Time-based Blind** | Injecting SQL to create delays                      | `' OR IF(1=1, SLEEP(5), 0) --` |
| **Out-of-band SQLi** | Use of DNS or HTTP to exfiltrate data               | Advanced, requires DB support  |

---

### 🔐 **Detection Tips**

* Sudden spikes in `OR '1'='1'`-like patterns
* Logs with long or malformed SQL queries
* Unusual DB errors like:

  ```
  syntax error at or near "'"
  ```

---

### ⚠️ Real-world Breach Examples

* **Sony Pictures (2011)** – SQLi led to full database dump
* **Heartland Payment Systems** – Exposed over 100M credit card numbers
* **TalkTalk (UK ISP)** – \$60M fine after unpatched SQLi

---

Great follow-up! SQL Injection isn't limited to relational databases — **NoSQL Injection** is a **real and growing concern**, especially with document-based databases like **MongoDB**, **CouchDB**, or **Firebase**.

Let’s break it down 👇

---

## 💥 What is NoSQL Injection?

**NoSQL Injection** occurs when unvalidated or unsanitized user input is used to construct NoSQL queries, allowing attackers to manipulate the query logic and **bypass authentication**, **extract data**, or **alter the database** — similar to classic SQL Injection, but **in a NoSQL context**.

---

## 🧪 Example: MongoDB Injection (Node.js + Express)

### ❌ Vulnerable Code:

```js
// Example login API
app.post('/login', async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password
  });
});
```

### 🧨 Malicious Input:

```json
{
  "username": { "$ne": null },
  "password": { "$ne": null }
}
```

### 🔍 The Resulting Query:

```js
User.findOne({
  username: { $ne: null },
  password: { $ne: null }
})
```

This query returns **any user where username and password are NOT null**, effectively **bypassing authentication**. 😨

---

## 🛡️ How to Prevent NoSQL Injection

### ✅ 1. **Use Input Validation Libraries**

Use libraries like:

* [`express-validator`](https://express-validator.github.io/docs/)
* [`joi`](https://joi.dev/)
* [`zod`](https://github.com/colinhacks/zod)

```js
const { body } = require("express-validator");

app.post("/login", [
  body("username").isString().trim().escape(),
  body("password").isString().isLength({ min: 6 }),
], handler);
```

---

### ✅ 2. **Sanitize User Input**

Manually enforce data types and block suspicious operators like `$ne`, `$gt`, `$regex`, etc.

```js
if (typeof req.body.username !== "string") {
  return res.status(400).send("Invalid input");
}
```

---

### ✅ 3. **Strict Schema with ODMs (like Mongoose)**

Use **Mongoose schemas** to restrict data structure and types:

```js
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});
```

Mongoose **ignores extra operators** (e.g., `$ne`, `$gt`) in input if the schema enforces strict mode.

---

### ✅ 4. **Avoid Directly Trusting JSON Input in Queries**

Do **not** allow raw objects or filters from the client to go directly into `find()` or `update()`.

```js
// 🚨 BAD
db.collection.find(req.body);

// ✅ GOOD
db.collection.find({ name: req.body.name });
```

---

### ✅ 5. **Escape JSON Inputs (when required)**

For systems exposing custom filter logic to users, escape or whitelist acceptable operators.

Example: allow `$gte`, `$lte` only on numeric fields.

---

### ✅ 6. **Use Role-Based Access Control (RBAC)**

Ensure that even if an injection bypasses a basic query, **data access is still restricted** by role, tenant, etc.

---

### ✅ 7. **Rate Limiting & Logging**

Helps prevent automated attack scripts and brute force attempts.

```js
const rateLimit = require('express-rate-limit');
app.use(rateLimit({ max: 100, windowMs: 15 * 60 * 1000 }));
```

---

## 🔐 Summary Table: SQL vs NoSQL Injection

| Feature                    | SQL Injection                | NoSQL Injection                      |
| -------------------------- | ---------------------------- | ------------------------------------ |
| Targets                    | MySQL, PostgreSQL, MSSQL     | MongoDB, Firebase, CouchDB           |
| Input Type                 | Raw SQL string               | JSON/JS-like objects                 |
| Injection Vector           | `' OR 1=1 --`                | `{ "$ne": null }`                    |
| Authentication Bypass Risk | ✅ High                       | ✅ High                               |
| Prevention                 | Param queries, ORM, escaping | Validation, schema enforcement, ODMs |
| Difficulty to Detect       | Medium                       | Often overlooked 😬                  |

---

## 🔧 Real-World Example

### If you build filters like this:

```js
Product.find(req.body.filters); // 🚨 DANGEROUS
```

Attackers can craft:

```json
{
  "filters": { "price": { "$lt": 1 }, "stock": { "$gt": 1000 } }
}
```




---

### 🧠 7. **Cross-Site Scripting (XSS)**

* **Description**: Injecting malicious JavaScript into pages via API that stores user-generated content.
* **Prevention**:

  * Escape and sanitize input before rendering it in HTML.
  * Use CSP (Content Security Policy).
  * Avoid unsafe innerHTML rendering in clients.

---

### 🪞 8. **Clickjacking**

* **Description**: Tricking users into clicking on hidden elements (like buttons) using iframes.
* **Prevention**:

  * Add headers to prevent rendering in iframes:

    ```http
    X-Frame-Options: DENY
    Content-Security-Policy: frame-ancestors 'none'
    ```

---

### 🧪 9. **Improper Input Validation**

* **Description**: Allowing unexpected or malformed data leads to logic bugs or exploits.
* **Prevention**:

  * Validate all inputs (type, length, format, range).
  * Use libraries like `joi`, `express-validator`, or Zod.
  * Reject requests with extra or unknown fields.

---

### 🔐 10. **Sensitive Data Exposure**

* **Description**: APIs return credentials, tokens, stack traces, or PII in responses or logs.
* **Prevention**:

  * Never return passwords, API keys, or secrets.
  * Use TLS (HTTPS) for transport encryption.
  * Filter logs for sensitive content.
  * Mask PII in API responses.

---

### ⚠️ 11. **Security Misconfiguration**

* **Description**: Leaving open ports, default passwords, or exposing `/admin` endpoints without protection.
* **Prevention**:

  * Disable unused services, routes, or debug modes.
  * Use `helmet` middleware in Express to set secure headers.
  * Regularly scan for vulnerabilities and misconfigurations.

---

### 🧬 12. **Cross-Site Request Forgery (CSRF)**

* **Description**: Attackers trick a logged-in user to perform actions they didn’t intend (if session-based auth is used).
* **Prevention**:

  * Use **CSRF tokens** for state-changing operations.
  * Use **SameSite cookies** or token-based auth (e.g., JWT) where CSRF is less likely.

---

### 🧱 13. **Improper Asset or File Upload Handling**

* **Description**: Malicious users upload executable files (e.g., `.php`, `.exe`) that can be executed on the server.
* **Prevention**:

  * Restrict file types, extensions, and content-type.
  * Store files on separate storage/CDN (not on app server).
  * Rename files and scan for malware.

---

### 📦 14. **MIME-Type Sniffing**

* **Description**: Browser interprets files as scripts (e.g., `.jpg` file served as `text/html` and executed as script).
* **Prevention**:

  * Add header:

    ```http
    X-Content-Type-Options: nosniff
    ```


Here are **detailed answers** to your advanced API design and performance questions — tailored for SDE-2/SDE-3 interviews and system design discussions:

---

### ✅ **3. How do you make an API highly available and scalable?**

#### 🧱 High Availability

Ensures the API is **accessible with minimal downtime**.

🔧 Key Strategies:

* **Load balancers** (e.g., NGINX, AWS ELB) to distribute traffic
* **Auto-scaling groups** to spin up new servers during high load
* **Multi-region deployment** (active-active or active-passive)
* Use **circuit breakers** to avoid cascading failures (e.g., with `opossum` in Node.js)
* **Health checks** to remove bad nodes

#### ⚡ Scalability

Ensures the system can handle **increasing load** gracefully.

📈 Techniques:

* **Horizontal scaling** (add more instances)
* Use **caching layers** (e.g., Redis, CDN)
* **Async processing** via queues (RabbitMQ, Kafka, SQS)
* **Stateless APIs** so requests can hit any server
* **Database partitioning** (sharding, read replicas)
* Use **gRPC** or **compression** for lower-latency comms

---

### ✅ **4. How do you handle consistency in distributed APIs?**

Distributed systems often trade between **consistency** and **availability** (CAP Theorem).

#### 🧠 Strategies:

| Strategy                 | Description                                                                 |
| ------------------------ | --------------------------------------------------------------------------- |
| **Strong Consistency**   | Use **transactions** or **distributed locks** (e.g., in booking or banking) |
| **Eventual Consistency** | Allow short-term inconsistency, sync with background jobs or retries        |
| **Versioning**           | Version data or resources to resolve conflicts                              |
| **Write-through cache**  | Keep DB as source of truth, update cache immediately                        |
| **Idempotent APIs**      | Retry-safe operations — multiple requests yield the same result             |

🧪 Example:

* In a shopping cart, it’s okay to show stale inventory, but **checkout must be consistent**.

---

### ✅ **5. What are some API design patterns and anti-patterns you’ve seen?**

#### ✅ **Design Patterns (Good)**

| Pattern                   | Why It’s Good                                          |
| ------------------------- | ------------------------------------------------------ |
| **RESTful resources**     | Clean, predictable routes (e.g., `/users/:id`)         |
| **HATEOAS**               | Adds discoverability via links in responses            |
| **Stateless APIs**        | Enables horizontal scaling                             |
| **Pagination**            | Prevents huge payloads, improves performance           |
| **Rate limiting**         | Protects backend from abuse                            |
| **Versioning**            | Allows backward-compatible changes (`/v1/users`)       |
| **Standard status codes** | Consistent client behavior (`200`, `400`, `404`, etc.) |

#### ❌ **Anti-patterns (Bad)**

| Anti-pattern                      | Problem                                                   |
| --------------------------------- | --------------------------------------------------------- |
| **Verb in URL**                   | `/getUserInfo` — REST should use HTTP verbs, not in paths |
| **Huge payloads**                 | Slow responses, harder to debug                           |
| **Inconsistent error format**     | Hard to parse or act on errors                            |
| **Tight coupling with DB models** | Leaks internal details, brittle API                       |
| **Not versioning**                | Breaks existing consumers when updated                    |

---

### ✅ **6. What is the Richardson Maturity Model in REST APIs?**

The **Richardson Maturity Model** (RMM) defines the **levels of RESTfulness** in an API.

| Level | Description                                     | Example                                 |
| ----- | ----------------------------------------------- | --------------------------------------- |
| 0     | **Single URI** with verbs in parameters or body | `POST /api?action=getUser`              |
| 1     | **Multiple resources** via URIs                 | `GET /users`, `POST /orders`            |
| 2     | Uses **HTTP verbs properly**                    | `GET`, `POST`, `PUT`, `DELETE` on URIs  |
| 3     | Includes **HATEOAS**                            | Response includes links to next actions |

🔍 Level 3 is full REST maturity, allowing clients to discover behavior via hypermedia.

---

### ✅ **7. What is HATEOAS in RESTful design?**

**HATEOAS** = **Hypermedia As The Engine Of Application State**

It means your API returns **links** with the response that describe **what the client can do next**.

#### 📦 Example:

```json
{
  "userId": 123,
  "name": "Alice",
  "_links": {
    "self": { "href": "/users/123" },
    "orders": { "href": "/users/123/orders" },
    "update": { "href": "/users/123", "method": "PUT" }
  }
}
```

✅ This improves **discoverability** and **decouples client logic** from backend URLs.

---

### ✅ **8. Your API is getting slow — how would you debug and optimize it?**

#### 🔎 Step-by-step Debugging:

1. **Check monitoring tools** (e.g., Datadog, New Relic, Prometheus):

   * Which endpoints are slow?
   * What’s the latency at each layer?

2. **Profile latency**:

   * **Client → Load Balancer**
   * **LB → App Server**
   * **App → DB / External APIs**

3. **Log and trace**:

   * Use **request IDs** and distributed tracing (OpenTelemetry, Zipkin, Jaeger)
   * Identify DB bottlenecks (e.g., slow queries)

#### 🚀 Optimization Techniques:

| Bottleneck     | Fix                                                   |
| -------------- | ----------------------------------------------------- |
| DB queries     | Add indexes, denormalize, cache with Redis            |
| Payload size   | Compress responses (gzip), paginate large data        |
| API throughput | Use async queues for heavy tasks                      |
| External APIs  | Add retries + fallbacks, cache results                |
| Cold starts    | Keep Node.js apps warm in serverless contexts         |
| Server load    | Auto-scale, increase concurrency, optimize middleware |

🧠 Tools:

* `express-status-monitor`, `morgan`, `winston` for Express
* Postman or `autocannon` for load testing

Here are detailed, interview-ready answers for your API testing, monitoring, and tools-related questions — tailored for mid-to-senior backend or full-stack developers:

---

### ✅ **1. How do you test APIs (unit, integration, E2E)?**

#### 🧪 Unit Testing:

* Tests individual route/controller logic in isolation.
* Mock external dependencies like DB, services, and `req`/`res`.
* Example: `jest`, `mocha`, `sinon`

```js
it("should return 400 if email is missing", () => {
  const req = { body: {} };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  controller.login(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
});
```

---

#### 🔗 Integration Testing:

* Test **real app + real DB**, but often still mock 3rd-party APIs.
* Covers multiple layers: routing → controller → DB.
* Use `supertest` with Express apps:

```js
const request = require("supertest");
app.post("/login", loginRoute);
await request(app).post("/login").send({ email, password });
```

---

#### 🌐 End-to-End (E2E) Testing:

* Tests the entire system (frontend → backend → DB).
* Tools: `Cypress`, `Playwright`, `Selenium`.

---

### ✅ **2. What tools do you use for API testing?**

| Tool           | Use Case                          |
| -------------- | --------------------------------- |
| **Postman**    | Manual testing, collections, envs |
| **Supertest**  | Integration tests for Express     |
| **Jest**       | Unit + integration test framework |
| **Swagger UI** | Try APIs via docs                 |
| **Newman**     | Run Postman tests in CI           |
| **Insomnia**   | Lightweight Postman alternative   |
| **Cypress**    | E2E testing frontend + backend    |

---

### ✅ **3. How do you mock external APIs for testing?**

#### 🧱 Options:

* **Nock**: Mock HTTP requests in Node.js
* **MSW (Mock Service Worker)**: Mocks fetch/XHR in browser and Node
* Use **dependency injection** to inject fake services or mocks

```js
// Using nock
nock("https://payment-api.com")
  .post("/pay")
  .reply(200, { success: true });
```

* For unit tests, stub external methods using `jest.mock()` or `sinon`.

---

### ✅ **4. How do you monitor and log API usage?**

#### 📊 Monitoring:

* Use **APM tools**: Datadog, New Relic, Prometheus, Elastic APM
* Monitor:

  * Request count, response time
  * Error rates (4xx, 5xx)
  * Memory/CPU usage
  * Latency by endpoint

#### 📝 Logging:

* Use loggers: `winston`, `pino`, or `bunyan`
* Log:

  * Request metadata (method, path, IP)
  * Status codes, error stacks
  * User/session IDs for traceability

```js
app.use(require("morgan")("combined"));
```

* Use correlation IDs for tracing across services (`X-Request-ID` header).

---

### ✅ **5. How do you detect and handle API errors in production?**

#### 🛡️ Error Handling:

* Use centralized error middleware in Express:

```js
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});
```

#### 🔍 Detection:

* Use monitoring tools (New Relic, Sentry, LogRocket)
* Set up alerts for:

  * High 5xx errors
  * Slow response time
  * API downtime

#### 🔁 Recovery:

* Implement retries, circuit breakers (e.g., with `opossum`)
* Graceful degradation (fallbacks, cached responses)

---

### 🛠️ **Tools & Technologies**

---

### ✅ **1. What is Swagger/OpenAPI and why is it useful?**

**OpenAPI (Swagger)** is a specification for describing RESTful APIs.

#### Benefits:

* **Auto-generated docs**
* Live testing of endpoints
* Supports request/response schemas
* **Contract-first** development
* Tools like `swagger-jsdoc`, `swagger-ui-express`

```yaml
paths:
  /users:
    get:
      summary: Get all users
      responses:
        200:
          description: A list of users
```

---

### ✅ **2. What are some tools to document your API?**

| Tool                | Features                              |
| ------------------- | ------------------------------------- |
| **Swagger/OpenAPI** | Interactive docs, schema-first design |
| **Redoc**           | Beautiful docs from OpenAPI spec      |
| **Postman**         | Generate docs from test collections   |
| **Slate**           | Markdown-based static documentation   |
| **API Blueprint**   | Markdown + tooling for REST API docs  |

---

### ✅ **3. What is GraphQL? How does it differ from REST?**

#### GraphQL:

* A **query language** for APIs developed by Facebook
* Clients specify **exact fields** they want
* Uses a **single endpoint** (`POST /graphql`)
* Schema defines **types, queries, mutations**

#### REST:

* Multiple endpoints (`GET /users`, `POST /orders`)
* Fixed responses based on endpoint logic

| Feature        | REST                    | GraphQL                         |
| -------------- | ----------------------- | ------------------------------- |
| Endpoint model | Multiple URLs           | Single endpoint (`/graphql`)    |
| Over-fetching  | Yes                     | No — query exact fields         |
| Versioning     | Often uses `/v1`, `/v2` | Schema evolves without breaking |
| Flexibility    | Limited                 | Highly flexible and nested      |

---

### ✅ **4. When would you choose GraphQL over REST?**

#### Choose **GraphQL** if:

* Frontend needs **precise control** over fields
* You want to **avoid over/under fetching**
* You have **deeply nested data** (e.g., social graphs)
* Multiple clients (web, mobile) require different payloads

#### Avoid if:

* You only need simple CRUD APIs
* Caching at HTTP level is important (GraphQL is harder to cache)
* You want to stick to **stateless, RESTful standards**

Here are **detailed, production-focused answers** to your advanced API design and resilience questions — highly relevant for mid-to-senior backend interviews and system design discussions:

---

### ✅ **1. What would you do if an external API dependency is down?**

#### 🔍 Problem:

If your backend relies on a third-party API (e.g., payment gateway, shipping API), its downtime can **break your own API**, causing a **domino failure**.

#### 🧰 Mitigation Strategies:

| Strategy                 | Description                                                                    |
| ------------------------ | ------------------------------------------------------------------------------ |
| **Timeouts**             | Never wait indefinitely. Use aggressive timeouts (e.g., 2s–5s).                |
| **Retries with backoff** | Retry transient errors with exponential backoff (`axios-retry`, `retry-axios`) |
| **Circuit Breaker**      | Stop making requests temporarily if failure rate is high. (e.g., `opossum`)    |
| **Graceful Degradation** | Return a cached or default response if possible                                |
| **Queue & Retry**        | In async flows, queue the request and retry later (e.g., order sync)           |
| **Fallback Services**    | If using multiple vendors (e.g., SMS/email), use a fallback provider           |
| **Alerting**             | Monitor failure rate of the dependency and alert the team immediately          |

> 📌 Example: If payment gateway is down, allow order placement but show “Payment Pending” and retry later via a job queue.

---

### ✅ **2. How would you deprecate an existing API endpoint without breaking clients?**

#### 🔁 Step-by-Step Process:

1. **Version your APIs** (e.g., `/v1/users` → `/v2/users`)
2. **Mark old endpoints as deprecated** in documentation and responses (e.g., `Deprecation: true` header)
3. **Announce ahead of time** — notify frontend teams and 3rd-party integrators
4. **Log usage** of deprecated endpoints to identify active clients
5. **Provide migration guide** or automated fallback support
6. **Monitor errors** after rollout and rollback if needed
7. **Remove endpoint** only after usage drops to zero or is fully migrated

> 📌 Add a warning in the response:

```http
Deprecation: true
Sunset: Tue, 31 Dec 2025 23:59:59 GMT
```

---

### ✅ **3. Explain how you would implement rate-limiting for a login API.**

#### 📊 Why it’s needed:

To prevent brute-force attacks, protect system resources, and ensure fair usage.

#### 🔐 Implementation Options:

| Method                          | Description                                     |
| ------------------------------- | ----------------------------------------------- |
| **IP-based limiting**           | Allow N attempts per IP per minute              |
| **User/Email-based**            | Rate-limit by login identifier (email/username) |
| **Token Bucket / Leaky Bucket** | Smooth out spikes over time                     |
| **Use Redis-backed libraries**  | e.g., `express-rate-limit` + `rate-limit-redis` |

```js
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many login attempts. Try again later.'
});
app.post('/login', limiter, loginHandler);
```

➡ Also implement **progressive delays** or **CAPTCHAs** after repeated failures.

---

### ✅ **4. How would you handle concurrency in API updates (e.g., multiple users updating the same resource)?**

Concurrency issues arise when two users try to **update the same record at the same time**, potentially **overwriting each other’s changes**.

#### 🧩 Strategies:

| Strategy                            | How it works                                                                             |
| ----------------------------------- | ---------------------------------------------------------------------------------------- |
| **Optimistic locking**              | Client sends last known `version` or `updatedAt`. Server checks for match before update. |
| **Pessimistic locking**             | Lock the record during update (via DB transaction or lock table).                        |
| **ETags / If-Match Headers**        | Client sends ETag (hash of content). Server only updates if ETag matches.                |
| **Patch requests (Partial update)** | Only change specific fields instead of whole document.                                   |

#### ✅ Example:

```js
// Request body
{
  "email": "new@example.com",
  "version": 4
}
```

Server verifies version before applying update.

---

### ✅ **5. How would you protect an API that exposes financial transactions?**

🔐 Financial APIs must be **secure, auditable, and resilient**.

#### Key Protections:

| Area                           | Measures                                                   |
| ------------------------------ | ---------------------------------------------------------- |
| **Authentication**             | Use OAuth2, client certificates, or token-based auth (JWT) |
| **Authorization**              | Enforce RBAC, account ownership checks                     |
| **Data validation**            | Strong schema validation (e.g., Joi, express-validator)    |
| **Input sanitization**         | Prevent injection, validate all params                     |
| **Rate limiting & throttling** | Protect against abuse                                      |
| **Audit logs**                 | Log who accessed/modified what and when                    |
| **Idempotency keys**           | Prevent duplicate charges or retries                       |
| **Encryption**                 | Use HTTPS, encrypt PII in DB                               |
| **Two-factor verification**    | For sensitive operations (e.g., withdrawals)               |
| **Monitoring & alerts**        | Log all anomalies and set up fraud detection               |

➡ Always comply with regulations like PCI-DSS for payment APIs.

---

### ✅ **6. How would you manage API changes with multiple frontend consumers?**

When multiple teams (web, mobile, 3rd-parties) consume your API, **backward compatibility** is critical.

#### 🧰 Best Practices:

| Technique                               | Why It Helps                                                     |
| --------------------------------------- | ---------------------------------------------------------------- |
| **Versioning (v1, v2)**                 | Allows rolling out breaking changes safely                       |
| **Feature flags**                       | Gradually enable features for select consumers                   |
| **Schema validation tools**             | Enforce contracts (e.g., with OpenAPI or GraphQL schemas)        |
| **Deprecation headers**                 | Warn clients about future changes                                |
| **Strict typings / typings versioning** | For frontend SDKs using your API                                 |
| **Change logs / communication**         | Keep consumers in sync with changes                              |
| **Contract testing**                    | Use tools like `pact` to ensure frontend & backend compatibility |

> 📌 In GraphQL, use **nullable fields** instead of removing them.

---

