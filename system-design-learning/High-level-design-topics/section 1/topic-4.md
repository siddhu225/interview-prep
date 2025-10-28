Perfect — here are your **comprehensive, structured notes** on this section, formatted exactly in the same way as your earlier ones (Scaling → CAP Theorem → Locking).
These notes are detailed yet clean, making them ideal for **system design interview revision**.

---

# 📘 System Design Notes: **Indexing, Communication Protocols, Security & Monitoring**

---

## 🔹 1. Indexing in Databases

### **Definition**

**Indexing** is the process of creating data structures that allow a database to **retrieve data faster**.
Indexes speed up reads at the cost of additional storage and slower writes (since the index must also be updated).

### **In Practice**

* Most relational databases (e.g., MySQL, PostgreSQL) let you create indexes on **any column** or combination of columns.
* Indexing improves query performance (especially for `WHERE`, `ORDER BY`, or `JOIN` clauses).
* However, too many indexes can slow down inserts and updates due to the overhead of maintaining them.

### **Primary vs Secondary Indexes**

* **Primary Index:** Automatically created for primary key columns.
* **Secondary Index:** Additional indexes created on other columns to speed up queries.

---

### **Indexing Across Databases**

| Database Type                    | Indexing Support                                  | Notes                                                                                       |
| -------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **Relational (Postgres, MySQL)** | Full indexing support                             | Can index multiple columns, use B-tree, hash, GIN, etc.                                     |
| **DynamoDB**                     | Supports **secondary indexes** (Global and Local) | Good flexibility, but comes with throughput and storage limits.                             |
| **Redis**                        | No built-in indexing                              | Must design and manage your own index structures manually (e.g., sorted sets or hash maps). |

👉 **Rule:**
If you can index inside your **primary database**, do it there — databases are optimized and battle-tested for indexing. Avoid building custom index systems unless necessary.

---

## 🔹 2. Specialized Indexes

Beyond basic indexing, databases support **specialized indexes** for domain-specific data types.

### **Examples:**

1. **Geospatial Indexes:**

   * Used for **location-based data** (e.g., finding nearby restaurants, delivery zones).
   * Enable spatial queries like “find nearest X within Y distance.”
   * Example: *PostGIS extension in PostgreSQL*.

2. **Vector Indexes:**

   * Used for **high-dimensional data**, such as image embeddings, document similarity, or recommendation systems.
   * Example: *Vector databases* (like Pinecone, Milvus, or PostgreSQL with pgvector).

3. **Full-Text Indexes:**

   * Used for **text search** (e.g., searching tweets, documents, or posts).
   * Example: *Postgres full-text search, ElasticSearch, Lucene.*

**Mature databases** like PostgreSQL support these via extensions (e.g., **PostGIS**, **pgvector**), reducing the need for external systems.

---

## 🔹 3. ElasticSearch as a Secondary Index

**ElasticSearch (ES)** is a powerful search engine often used as a **secondary indexing system**.
It supports:

* Full-text search (via Lucene)
* Geospatial indexing
* Vector search

**Integration Approach:**
ElasticSearch can stay in sync with the primary database via **Change Data Capture (CDC)**:

* The ES cluster listens for database changes and updates its indexes accordingly.
* This enables near real-time searching across data.

**Trade-offs:**

* Introduces **extra latency** — ES data may be slightly stale.
* Adds a **new point of failure**.
* Increases system complexity (needs synchronization and error handling).

**Interview Tip:**
If you mention ElasticSearch, be ready to explain:

* How it connects (via CDC or ETL).
* How you handle staleness.
* Why it’s necessary (text or complex search).

---

## 🔹 4. Communication Protocols

Communication protocols define **how different parts of your system talk to each other**.
In interviews, you’ll focus mostly on choosing appropriate protocols for internal and external communication.

---

### **Internal Communication**

Used between **microservices** or backend components.

✅ Typical choices:

* **HTTP(S):** Simple, stateless, easy to scale.
* **gRPC:** High performance, binary-based, supports streaming and built-in authentication.

**Guideline:**
For most microservice systems (≈90% of cases), HTTP or gRPC is sufficient — don’t overcomplicate it.

---

### **External Communication**

Used between **clients (web, mobile)** and your backend.

You’ll usually choose based on:

* Who initiates the communication.
* How real-time the updates need to be.
* How much data is exchanged.

---

#### 1. **HTTP(S)**

* Best for **standard request-response APIs**.
* Stateless → easy horizontal scaling via load balancers.
* Works perfectly for RESTful APIs.
* Avoid maintaining client state on the server (use tokens or cookies if needed).

---

#### 2. **Long Polling**

* Used when clients need **near real-time updates**.
* Client sends a request → server holds it open until new data is available → client reconnects.
* Works with standard HTTP load balancers and firewalls.
* Great balance between simplicity and interactivity.

---

#### 3. **WebSockets**

* For **real-time, bidirectional communication** (both client and server can send messages).
* Common for chat apps, games, live dashboards.
* Harder to scale:

  * Servers must maintain persistent connections.
  * Load balancers and firewalls need special handling.
* Often combined with a **message broker** (e.g., Kafka, Redis Pub/Sub) to manage communication.

---

#### 4. **Server-Sent Events (SSE)**

* One-way (server → client) updates over a single, long-lived HTTP connection.
* More efficient than long polling for continuous updates.
* Easier to manage than WebSockets.
* Ideal for **unidirectional updates** like notifications, live scores, or data feeds.

---

### **Design Tip: Statelessness**

Stateless designs simplify scalability.
Delegate state handling to:

* **Databases**
* **Message brokers**
  This enables **horizontal scaling** of services without losing client context.

---

## 🔹 5. Security

Security is crucial in production systems and should always be discussed in interviews.

---

### **Authentication & Authorization**

* Used to verify *who* is accessing and *what* they’re allowed to do.
* Delegate to an **API Gateway** or a managed service like **Auth0** or **Cognito**.
* This prevents building custom, error-prone authentication logic.

---

### **Encryption**

Two key aspects:

1. **Data in Transit:**

   * Protects data while moving between systems.
   * Use **HTTPS (SSL/TLS)** — standard for web traffic.
   * gRPC also supports TLS encryption natively.

2. **Data at Rest:**

   * Protects stored data (e.g., in databases or file systems).
   * Use databases that support encryption or encrypt data before saving.
   * Sensitive systems may use **per-user encryption keys**, so even if the DB is compromised, data stays secure.

---

### **Data Protection**

Protect against **unauthorized access or leaks**:

* Implement **rate limiting** or **request throttling** to prevent scraping or brute-force attacks.
* Validate endpoints that expose user data indirectly (e.g., friend requests).
* Ensure proper access control and input validation.

---

## 🔹 6. Monitoring

Monitoring ensures your system’s **health, reliability, and performance** once deployed.
It’s a key signal of production experience in interviews.

Monitoring occurs at **three levels**:

---

### **1. Infrastructure Monitoring**

* Tracks the **health of infrastructure components** (CPU, memory, disk, network).
* Tools: **Datadog**, **New Relic**, **Prometheus + Grafana**.
* Helps detect early signs of trouble like disk exhaustion or high CPU usage.

---

### **2. Service-Level Monitoring**

* Focuses on **performance of backend services**:

  * Request latency
  * Error rates
  * Throughput (requests/sec)
* Helps detect user-facing performance issues or traffic spikes.
* Useful for setting **SLIs** (Service Level Indicators) and **SLOs** (Service Level Objectives).

---

### **3. Application-Level Monitoring**

* Focuses on **business and application metrics**, such as:

  * Number of active users
  * Active sessions or connections
  * Transaction success rates
* Often integrated via tools like **Google Analytics**, **Mixpanel**, or **custom dashboards**.
* Most relevant for **product-oriented interviews**, as it ties system metrics to user experience.

---

## 🔹 7. Key Interview Takeaways

✅ Use **database-native indexing** whenever possible.
✅ For special cases, understand **ElasticSearch**, but mention its **latency and consistency limits**.
✅ Keep internal protocols **simple** (HTTP/gRPC), and choose external communication based on **real-time needs**.
✅ Emphasize **security** at all levels: authentication, encryption, and protection.
✅ Always include **monitoring** in your design — it shows real-world awareness and operational maturity.


