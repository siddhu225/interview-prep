Perfect 👍 — here’s your **Core Database** section written in the **exact same structured, detailed, and interview-oriented format** as your previous notes (Scaling → CAP Theorem → Locking → Indexing).
It’s clear, technically rich, and ready for quick revision.

---

# 📘 System Design Notes: **Core Database**

---

## 🔹 1. Overview

Almost every system design problem involves **data storage**, and that typically means using a **database** (sometimes paired with blob storage for large files).

Two broad categories dominate most real-world and interview designs:

* **Relational Databases (SQL)** — e.g., **PostgreSQL**, **MySQL**
* **NoSQL Databases** — e.g., **DynamoDB**, **MongoDB**, **Cassandra**

👉 **Interview tip:**
Avoid general “SQL vs NoSQL” debates. Instead, show you understand **why you chose your specific database** and **how its features support your design**.
Example:

> “I’m using Postgres because its ACID guarantees maintain strong consistency and data integrity.”

---

## 🔹 2. Relational Databases (RDBMS)

### **Definition**

A **relational database** stores data in **tables (rows and columns)** with well-defined **schemas**.
They are ideal for **structured, transactional data** such as user accounts, orders, or payments.

### **Common Uses**

* Most **product design interviews** assume RDBMS usage.
* Strong **ACID guarantees** make them ideal where **data integrity** is critical.

### **Query Language**

* Use **SQL (Structured Query Language)** — declarative and expressive.
* Enables complex querying, joining, filtering, and aggregation.

---

### **Core Features to Know**

| Feature                 | Description                                                                                    | Notes                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **SQL Joins**           | Combine data from multiple tables using keys (e.g., `JOIN users ON posts.user_id = users.id`). | Powerful but can cause performance issues; avoid unnecessary joins in high-scale systems.                        |
| **Indexes**             | Speed up queries by maintaining additional data structures (e.g., B-Tree, Hash, GIN).          | Relational DBs support multiple indexes, including multi-column and specialized indexes (full-text, geospatial). |
| **Transactions (ACID)** | Bundle multiple operations into one **atomic** unit — either all succeed or none do.           | Ensures data consistency (e.g., transferring money between accounts).                                            |
| **Schema**              | Defines the structure of your tables — columns, types, constraints.                            | Enforces data validity and makes queries predictable.                                                            |

---

### **When to Use**

✅ When data integrity and consistency matter.
✅ When your data has well-defined relationships (users → orders, etc.).
✅ When you need structured queries, joins, and transactions.

---

### **Common Relational Databases**

* **PostgreSQL** → Feature-rich, open source, supports JSON, full-text search, extensions like PostGIS.
* **MySQL** → Lightweight, widely supported, great for high-read applications.

💡 **Interview choice tip:**
If you don’t have a personal preference, pick **PostgreSQL** — it’s powerful, popular, and respected in interviews.

---

## 🔹 3. NoSQL Databases

### **Definition**

**NoSQL** databases are **non-relational** and designed for flexibility and scalability.
They can handle **unstructured or semi-structured data** and often scale **horizontally** across multiple servers.

---

### **When to Use**

* **Flexible Data Models:** Schema-less or rapidly evolving schemas.
* **Massive Scale:** Need to handle millions of requests or petabytes of data.
* **Big Data / Real-Time Use Cases:** High throughput or low-latency requirements.

---

### **Common Data Models**

| Type                    | Description                             | Example Databases  | Use Cases                        |
| ----------------------- | --------------------------------------- | ------------------ | -------------------------------- |
| **Key-Value Store**     | Simple key → value lookups.             | Redis, DynamoDB    | Caching, session storage.        |
| **Document Store**      | JSON-like documents.                    | MongoDB, Couchbase | User profiles, product catalogs. |
| **Column-Family Store** | Column-based storage for wide datasets. | Cassandra, HBase   | Time-series, analytics.          |
| **Graph Database**      | Nodes + edges for relationships.        | Neo4j              | Social graphs, recommendations.  |

---

### **Core Concepts to Know**

| Concept                | Description                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------- |
| **Consistency Models** | Range from **strong** (immediate) to **eventual** (converges over time). Understand CAP tradeoffs. |
| **Indexing**           | NoSQL systems also use B-Trees or hash indexes to improve query speed.                             |
| **Scalability**        | Uses **sharding** and **consistent hashing** to distribute data across nodes.                      |
| **Schema Flexibility** | Data can evolve without schema migrations — ideal for dynamic data models.                         |

---

### **When Discussing in Interviews**

Avoid blanket statements like “NoSQL scales better.”
Instead, say:

> “I’m choosing DynamoDB for horizontal scalability and flexible schema support, which fits our evolving data model.”

---

### **Common NoSQL Databases**

| Database           | Strengths                                                                              |
| ------------------ | -------------------------------------------------------------------------------------- |
| **DynamoDB (AWS)** | Fully managed, auto-scaling, predictable performance, supports secondary indexes.      |
| **Cassandra**      | Excellent write throughput, linear scalability, suitable for high-ingestion workloads. |
| **MongoDB**        | JSON-like documents, flexible schema, great for developer productivity.                |

---

## 🔹 4. Blob Storage

### **Definition**

**Blob storage** is used to store **large, unstructured binary files** — images, videos, backups, etc.
It’s **not a database**, but complements one by storing heavy files **outside** the main data store.

### **Why Not Store Blobs in Databases?**

* Expensive and inefficient — databases are optimized for structured data, not huge binary objects.
* Blob storage is **cheap, durable, and infinitely scalable**.

---

### **How It Works**

**Common Flow:**

#### ➤ Upload

1. Client requests a **presigned URL** from the server.
2. Server generates and stores metadata (e.g., file name, owner) in the database.
3. Client uploads directly to blob storage using the presigned URL.
4. Blob storage notifies the server upon completion.

#### ➤ Download

1. Client requests a file.
2. Server returns a **presigned URL** to fetch from blob storage (often cached via CDN).

---

### **Core Features to Know**

| Feature             | Description                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------- |
| **Durability**      | Replication and erasure coding ensure 99.999999999% (11 nines) durability.                   |
| **Scalability**     | Effectively unlimited storage and request handling (e.g., AWS S3).                           |
| **Cost Efficiency** | Extremely cheap compared to database storage (S3 ≈ $0.023/GB vs DynamoDB ≈ $1.25/GB).        |
| **Security**        | Supports encryption (in transit & at rest) and fine-grained access control.                  |
| **Chunked Uploads** | Upload large files in chunks with resumable, parallel transfers (e.g., S3 Multipart Upload). |

---

### **Typical Use Cases**

| Application   | Blob Storage Usage             | Database Usage                                           |
| ------------- | ------------------------------ | -------------------------------------------------------- |
| **YouTube**   | Store videos in S3             | Store metadata (title, user, views) in Postgres/DynamoDB |
| **Instagram** | Store photos & reels in S3     | Store captions, likes, user info in DB                   |
| **Dropbox**   | Store user files in blob store | Store file metadata in DB                                |

---

### **Popular Blob Storage Services**

* **Amazon S3 (recommended for interviews)**
* **Google Cloud Storage**
* **Azure Blob Storage**

💡 Many non-AWS systems still offer **S3-compatible APIs**, so referencing S3 is safe in interviews.

---

## 🔹 5. Search-Optimized Databases

### **Definition**

**Search-optimized databases** are built to perform **fast, full-text search** over large datasets.
Unlike SQL `LIKE '%term%'` queries (which scan entire tables), they use **inverted indexes** to quickly find matching records.

---

### **How It Works**

An **inverted index** maps **words → documents** that contain them.

Example:

```json
{
  "music": [doc1, doc3],
  "concert": [doc2, doc3],
  "ticket": [doc1, doc2]
}
```

So searching “concert” directly retrieves `[doc2, doc3]` instead of scanning every record.

---

### **Core Concepts**

| Concept            | Description                                                                          |
| ------------------ | ------------------------------------------------------------------------------------ |
| **Inverted Index** | Maps words to documents for fast text lookup.                                        |
| **Tokenization**   | Splits text into words/tokens before indexing.                                       |
| **Stemming**       | Reduces words to their root (e.g., “running”, “runs” → “run”).                       |
| **Fuzzy Search**   | Finds near matches by computing edit distance (useful for typos or partial matches). |
| **Scaling**        | Uses clustering and sharding to handle large datasets.                               |

---

### **When to Use**

✅ When your system requires **full-text search**, **ranking**, or **relevance-based queries**.
✅ Examples:

* **Ticketmaster** — searching events.
* **Twitter** — searching tweets.
* **E-commerce** — product search and filtering.

---

### **Popular Search Databases**

| Database                   | Description                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Elasticsearch**          | Most widely used search engine (built on Lucene), supports text, geospatial, and analytics. Used by Netflix, Uber, Yelp. |
| **Postgres (GIN Indexes)** | Built-in full-text search support; great if you want to stay within your primary DB.                                     |
| **RedisSearch**            | Lightweight, in-memory text search (less powerful, more limited).                                                        |

💡 **Interview Tip:**
If full-text search is part of your system, mention ElasticSearch — but also note its **latency** (eventual consistency via CDC) and **extra complexity**.

---

## 🔹 6. Summary of Database Choices

| Type                 | Ideal For                                      | Examples                     |
| -------------------- | ---------------------------------------------- | ---------------------------- |
| **Relational (SQL)** | Structured, transactional, ACID-compliant data | Postgres, MySQL              |
| **NoSQL**            | Flexible, high-scale, evolving schemas         | DynamoDB, MongoDB, Cassandra |
| **Blob Storage**     | Large files (images, videos, backups)          | S3, GCS, Azure Blob          |
| **Search Optimized** | Text search, filtering, and relevance queries  | ElasticSearch, Postgres GIN  |

---

✅ **Interview Strategy Tip:**
Always justify *why* you chose a database:

> “I’ll use Postgres for transactional data with ACID guarantees, DynamoDB for scalable key-value access, and S3 for storing media files.”

---
