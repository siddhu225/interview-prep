Got it. I will **rewrite all of this as clean, deep, structured, interview-ready notes**, in the **same style as your Networking & API notes** — no fluff, no simplification loss, but also organized for fast recall.

---

# **DATA MODELING (System Design Interview Notes — In Depth)**

Data modeling defines **how data is structured, stored, connected, and accessed** in your system.
In system design interviews, the goal is **not** to produce a perfect schema — the goal is to design a **clear, scalable, and reasonable** data model that supports your APIs and business rules.

### **Where Data Modeling Appears in the Delivery Framework**

| Step                | What You Do                                                             |
| ------------------- | ----------------------------------------------------------------------- |
| Requirements        | Identify core **entities** (users, posts, orders, etc.)                 |
| High-Level Design   | Choose a database + sketch tables/collections + indexes + relationships |
| Scaling & Tradeoffs | Discuss consistency, replication, caching, sharding                     |

A **clean data model** allows your system to:

* Scale reads and writes
* Preserve data integrity and correctness
* Support efficient queries
* Avoid painful redesign later

A **sloppy data model** → makes everything else worse.

---

# **Selecting a Database Model**

Most interview systems map *naturally* to relational databases.

### **Default Choice → Use SQL (PostgreSQL / MySQL)**

Unless the interviewer **explicitly pushes otherwise**.

This shows:

* You understand constraints
* You choose **stability over novelty**
* You design **for correctness first**, then scale

But — knowing alternatives lets you show **tradeoff awareness**.

---

## **Relational Databases (SQL)**

Relational DBs organize data into **tables**, with:

* **Rows** = records
* **Columns** = attributes
* **Foreign keys** = relationships
* **ACID transactions** = consistency

### Example Schema (Social App)

**users**
| id (PK) | username | email | created_at |

**posts**
| id (PK) | user_id (FK → users.id) | content | created_at |

**likes**
| id (PK) | user_id (FK → users.id) | post_id (FK → posts.id) | created_at |

### Why SQL is a strong interview choice

* Natural fit for **entities + relationships**
* Supports **joins and filters** well
* Provides **strong consistency** when needed (e.g., payments)
* Scales well using:

  * **Read replicas**
  * **Sharding**
  * **Caching layers**
  * **Connection pooling**

### Interview Sentence

> “Since our data has strong relationships and correctness matters, I’ll use a relational database (PostgreSQL). It gives us referential integrity and ACID guarantees.”

---

## **Document Databases (e.g., MongoDB, Firestore)**

Organize data as **flexible JSON-like documents**.

### When Useful

* Schema evolves rapidly
* Data varies widely record-to-record
* Data is often **read together** (so embedding reduces joins)

### Example (Embedding posts inside user document)

```json
{
  "username": "john_doe",
  "posts": [
    { "content": "Hello", "created_at": "2024-01-01" },
    { "content": "My first post", "created_at": "2024-01-02" }
  ]
}
```

### Tradeoffs

| Pros            | Cons                                       |
| --------------- | ------------------------------------------ |
| No migrations   | Update = rewrite whole document            |
| Flexible schema | Harder consistency guarantees              |
| No joins needed | Denormalization increases data duplication |

### Interview Rule

Use Document DBs **only when the interviewer mentions evolving schemas or flexible metadata**.

---

## **Key-Value Stores (Redis, DynamoDB, Memcached)**

Designed for **fast lookups by key**.
No joins, no complex queries.

### Best Use Cases

* **Caching**
* **Session storage**
* **User preferences / feature flags**
* **Rate limit counters**

### Data Modeling Impact

You often **duplicate** data because the store can't query by anything except key.

### Interview Sentence

> “We’ll cache hot data in Redis to reduce database load and improve response latency.”

---

## **Wide-Column Databases (Cassandra / HBase)**

Optimized for:

* **Huge write volume**
* **Time-series / log data**
* **Append-only workloads**

### When to choose

* Analytics pipelines
* IoT sensor streams
* Activity logs
* Telemetry/time-series analytics

### Data Modeling Rule Here

> Design **for queries first**, then structure data to suit those queries — even if it means duplication.

---

## **Graph Databases (Neo4j, Amazon Neptune)**

Optimized for:

* Deep relationship traversal
* Path queries (e.g., shortest path)

### When used in interviews?

Almost never.

Even Facebook stores social graph edges in **MySQL sharded tables**, not a graph DB.

### Interview Wisdom

> Don’t choose graph DBs unless the interviewer **explicitly** signals heavy graph analytics.

---

Great — here is **Schema Design Fundamentals section rewritten in deeper, clearer, interview-ready form**, with reasoning + examples + what to say in interviews.
This part will now match the depth and clarity of your Networking notes.

---

# **SCHEMA DESIGN FUNDAMENTALS (In-Depth)**

Schema design is about **structuring data in a way that matches how your system will query, update, and store it**. A strong schema is **driven by access patterns, data relationships, and consistency requirements**, *not* by just listing tables.

Your goal in interviews:

* Show that **your schema aligns with your APIs**
* Show awareness of **performance tradeoffs**
* Show how it will **scale and stay consistent** as data grows

---

## **1. Start With Requirements → Identify Core Entities**

Entities come directly from **nouns in the problem description**.
Examples:

| Problem        | Entities                            |
| -------------- | ----------------------------------- |
| Social Network | User, Post, Comment, Like, Follow   |
| E-Commerce     | User, Product, Cart, Order, Payment |
| Ticket Booking | Event, Venue, Ticket, Booking, User |

If you cannot list your entities → **your design will collapse later**.

### Interview Phrase

> “The main entities in this system are Users, Posts, and Likes. These map directly to tables / collections in our database.”

---

## **2. Define Attributes & Choose Keys**

Each entity must have:

* **Primary Key (PK)** — a unique, stable identifier
* Required attributes (must exist)
* Optional attributes (can be null)
* Timestamps (`created_at`, `updated_at`)

### Always choose **synthetic PKs** (e.g., UUID, auto-increment, snowflake IDs)

Why?

* Emails, usernames, names **change**
* Business logic should not break schema integrity

### Example (Social App)

| Table | Key                                            | Why                                   |
| ----- | ---------------------------------------------- | ------------------------------------- |
| users | user_id (PK)                                   | Stable identity for users             |
| posts | post_id (PK)                                   | Needed to reference posts from others |
| likes | like_id (PK) or composite PK(user_id, post_id) | Prevent duplicates                    |

### Interview Phrase

> “I’ll use synthetic numeric/UUID primary keys to ensure consistency as user attributes change.”

---

## **3. Define Relationships Using Foreign Keys**

Relationships describe **how data connects**:

| Type  | Meaning                        | Example               | Implementation                      |
| ----- | ------------------------------ | --------------------- | ----------------------------------- |
| 1 : N | One record has many dependents | User → Posts          | posts.user_id FK → users.id         |
| N : M | Many connect to many           | Users ↔ Posts (likes) | Join table: likes(user_id, post_id) |
| 1 : 1 | Rare; usually merge tables     | User → Profile        | profile.user_id UNIQUE FK           |

### Example Tables

**posts**
| post_id (PK) | user_id (FK) | content | created_at |

**likes**
| user_id (FK) | post_id (FK) | created_at |

### Why Foreign Keys Matter

They **prevent orphan data** (e.g.,  likes for deleted posts).

But:
At very large scale → some companies **remove FK constraints** for write throughput
→ Integrity enforced at application layer.

### Interview Phrase

> “We use foreign keys to maintain referential integrity. If scale requires dropping FKs later, the application layer will enforce consistency.”

---

## **4. Apply Constraints**

Constraints enforce **data correctness** before bad data enters the system.

| Constraint | Purpose                   | Example                      |
| ---------- | ------------------------- | ---------------------------- |
| `NOT NULL` | Required fields           | A post must have a user_id   |
| `UNIQUE`   | Prevent duplicates        | email must be unique         |
| `CHECK`    | Business rule enforcement | rating must be 1–5           |
| `DEFAULT`  | Auto-set values           | created_at defaults to now() |

### Interview Phrase

> “Constraints shift correctness to the database, preventing invalid state before it occurs.”

---

## **5. Indexing Based on Access Patterns (Critical)**

Indexes are created to match **your most frequent and latency-sensitive queries**.

### Find user’s posts

```
SELECT * FROM posts WHERE user_id = ?
```

→ Index: **posts(user_id)**

### Load user's feed sorted by time

```
SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC
```

→ Composite Index: **(user_id, created_at DESC)**

### Avoid indexing everything — indexes slow writes.

### Interview Phrase

> “Indexes follow the main query paths. I’ll index `posts.user_id, created_at` to make feed queries efficient.”

---

## **6. Normalization vs Denormalization**

### Start Normalized

Ensure each fact lives **in one table only**.

#### Normalized Example

User data lives only in **users** table.

| users    | posts      |
| -------- | ---------- |
| user_id  | user_id    |
| username | content    |
| email    | created_at |

### When to Denormalize

When reads must be **very fast** and **slight delays are acceptable**, e.g.:

* Feed counts
* Like counters
* Aggregated summaries
* Search index docs

#### Denormalized Example

Store `post.like_count` instead of counting like rows each time.

| posts                     |
| ------------------------- |
| post_id                   |
| content                   |
| like_count ← denormalized |

### Interview Phrase

> “We’ll store like_count in the posts table for fast feed reads and update it asynchronously for efficiency.”

---

## **7. Scaling & Sharding**

When data is too large for one DB → **Shard**.

### Golden Rule:

Pick shard key based on **the most frequent query**.

If most queries are:

> “Get posts of user X”

→ Shard by `user_id`.

This ensures:

* All a user's data stays on one shard
* No cross-shard join to fetch posts

### Interview Phrase

> “If write volume grows, we shard by user_id to keep all posts for a user localized and avoid cross-shard fan-out queries.”

---

# **Final Interview Summary Sentence**

> “We define core entities first, assign stable primary keys, use foreign keys to maintain relationships, enforce correctness via constraints, and index based on real query patterns. The schema starts normalized for data integrity, with denormalization only where read performance requires it. If scaling demands, we shard based on the dominant access pattern to keep related data co-located.”

