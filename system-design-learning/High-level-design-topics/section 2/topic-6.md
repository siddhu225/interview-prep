Awesome—here are your **interview-ready, in-depth notes on Database Indexing**, distilled from your content and organized for fast revision + strong delivery in system design/infra rounds. No external sources, just your material, clarified.

---

# **Database Indexing — Deep Notes (Interview Edition)**

## 1) Why Indexes Exist (Core Intuition)

* **Without an index:** DB scans the whole table (heap file) → many slow disk page reads → O(N).
* **With an index:** DB follows a small, structured path to the target rows → minimal page reads → O(log N) or better.
* **Important hardware context:** Even on SSDs, **random access is still much slower than sequential**. Indexes cut random reads drastically.

**Interview one-liner:**

> “Indexes convert full scans into targeted page lookups by maintaining search-optimized structures; this is why a million-row ‘find by email’ can be milliseconds instead of seconds.”

---

## 2) Costs & Trade-offs (When Indexes Hurt)

* **Disk space:** Indexes can be **almost as large** as the base table.
* **Write overhead:** Every **INSERT/UPDATE/DELETE** also updates **every** index on that table.
* **Bad fit cases:**

  * Write-heavy tables with **rare reads** (e.g., logs/metrics) → index maintenance costs dominate.
  * **Small tables** (hundreds of rows) → a sequential scan can beat index traversal.

**Interview signal:**

> “I’ll index only columns that materially reduce read latency on hot paths; for write-heavy/append-only tables, I’ll keep indexing minimal.”

---

## 3) How Indexes Work (Storage & Access)

* Base table often stored as a **heap** (unordered pages).
* An index is a **separate on-disk structure** (fits nodes to page size) guiding the engine to the right table (or index-only) pages.
* Query execution = **load as few pages as possible** (root → internal → leaf).

---

## 4) Index Types You Must Know

### A) **B-Tree (and B+Tree)** — *Default in OLTP databases*

* **Balanced, sorted tree**; keys in order; all leaves at same depth.
* Node size ≈ **one disk page** (e.g., 8KB) to optimize I/O.
* Supports:

  * **Equality** lookups (email = ?)
  * **Range** queries (created_at BETWEEN …)
  * **ORDER BY** on indexed columns
  * **Unique constraints** and **PKs**
* Used by: PostgreSQL (PK/UNIQUE/normal idx), MongoDB (B+Tree), most RDBMS.

**Interview default:**

> “When in doubt, use a B-tree. It handles equality, ranges, and ORDER BY efficiently and stays balanced as data grows.”

---

### B) **LSM Trees (Log-Structured Merge Trees)** — *Write-heavy champions*

* **Write path:**

  1. Write to **memtable** (in-memory, sorted)
  2. Append to **WAL** (sequential disk write) for durability
  3. Flush memtable → immutable **SSTables** (sorted files)
  4. Background **compaction** merges SSTables, removes tombstones/dupes
* **Why it’s fast for writes:** Turns random writes into **sequential appends**.
* **Read challenges:** Must check memtable + many SSTables → mitigated by:

  * **Bloom filters** (quick “definitely not here”)
  * **Sparse indexes** in SSTables
  * Compaction strategies (**size-tiered** vs **leveled**) to limit file fan-out
* Great for: **time-series, logging, metrics, massive writes**.

**Interview framing:**

> “For metric/audit streams we’d prefer an LSM engine—batching + sequential writes win. We pay a read tax, mitigated with Bloom filters and compaction.”

---

### C) **Hash Indexes** — *Exact match specialists*

* Persistent hash map: key → row pointer; **O(1)** average lookups.
* **Only** good for **equality**; **no ranges/sorting**.
* Rare in disk-backed OLTP because **B-trees are almost as fast** for equality and far more flexible.

**Use sparingly:** only when you need **pure exact-match speed** and never ranges.

---

### D) **Geospatial Indexes** — *Proximity queries*

**Problem:** Lat/Lng are 2D; two separate 1D B-trees (lat, lng) create a big rectangle, not a circle—poor selectivity.

Approaches you mentioned:

* **Geohash**: map (lat,lng) → **base32 string**; nearby points share **prefixes**.

  * Store geohash; use **B-tree range on prefix** for “nearby”.
  * Simple, leverages existing B-trees; edge case at **cell boundaries**.
* **Quadtree**: recursively split space into 4 quadrants; adaptive by density; more of a conceptual foundation.
* **R-Tree**: hierarchical **bounding rectangles** (overlapping) that adapt to data clusters; production standard in PostGIS/MySQL for shapes + points.

**Interview line:**

> “For ‘near me’ searches, I’d use a geospatial index; geohash + B-tree for simplicity, or R-tree when we need robust spatial operators beyond simple radius.”

---

### E) **Inverted Indexes** — *Full-text search*

* Map **term → list of document IDs** (like a textbook’s back index).
* Text is **analyzed**: tokenized, lowercased, stopwords removed, optional **stemming**.
* Enables: term queries, relevance scoring, phrase/fuzzy search.
* Used by Elasticsearch/Lucene, code search, Slack/Docs search.

**Interview takeaway:**

> “LIKE ‘%word%’ can’t use B-trees; for real text search we need an inverted index.”

---

## 5) Index Optimization Patterns (What Interviewers Probe)

### A) **Composite Indexes** (multi-column, order matters)

* Example query:

  ```sql
  SELECT * FROM posts
  WHERE user_id = 123
    AND created_at > '2024-01-01'
  ORDER BY created_at DESC;
  ```
* **Best index:** `(user_id, created_at)`
  → filters by user, scans time range **already sorted**.
* **Order matters:** B-tree uses **leftmost prefix**. `(user_id, created_at)` helps queries that filter by `user_id` first. It won’t help queries on `created_at` alone.

**Interview line:**

> “I’d build a composite index that matches the filter + sort order, e.g., `(user_id, created_at DESC)` for the feed.”

---

### B) **Covering Indexes** (a.k.a. INCLUDE columns)

* Store extra **non-key** columns in the index so the query can be served **entirely from the index** (no table lookups).
* Example (PostgreSQL):

  ```sql
  CREATE INDEX idx_posts_user_time
  ON posts(user_id, created_at)
  INCLUDE (likes);
  ```
* Great for **read-heavy** endpoints that need a few columns; costs **more space** and **write overhead**.

**Interview stance:**

> “I’ll consider a covering index only when it removes expensive table lookups on very hot, read-heavy queries.”

---

## 6) Practical Indexing Playbook (From Your Material)

**Design from access patterns:**

* Tie each index to a **specific query** on a **hot path**.
* Example mappings:

  * `GET /users/{id}` → PK on `users(id)`
  * `GET /users/{id}/posts` → index `posts(user_id, created_at DESC)`
  * “Recent posts site-wide” → index `posts(created_at DESC)`
  * “Find by email” → unique B-tree on `users(email)`

**Avoid over-indexing:**

* Every index = more **disk** + **write cost**.
* Write-heavy, seldom-read tables (logs) → **few or no** secondary indexes.

**Know when a type is warranted:**

* Default: **B-tree**.
* Massive write ingest: **LSM** engine.
* Proximity by location: **geohash / R-tree**.
* Full-text: **inverted index**.
* Exact-match only (in-memory/very constrained): **hash index**.

---

## 7) Interview Phrases & Snippets (Use verbatim if helpful)

* **Default choice:**
  *“We’ll use B-tree indexes for equality and range queries; they also support ORDER BY efficiently.”*

* **Write-heavy stream:**
  *“For metrics/logs we’ll prefer an LSM-based store; writes are sequential (memtable + WAL + SSTables), with Bloom filters to keep reads acceptable.”*

* **Geospatial:**
  *“Regular B-trees on lat/lng don’t preserve spatial locality. I’ll use geohash (prefix range) or an R-tree when we need robust spatial predicates.”*

* **Full-text:**
  *“LIKE ‘%q%’ can’t leverage B-trees. We’ll use an inverted index with analysis (tokenize, lowercase, stopword removal, stemming).”*

* **Composite order:**
  *“Column order in composite indexes must match filters and sort—e.g., `(user_id, created_at)` for user feed by time.”*

* **Covering index caution:**
  *“We can INCLUDE hot projection columns for index-only scans, balancing the extra space/write overhead.”*

* **Cost awareness:**
  *“Indexes add write amplification and disk footprint; we’ll measure with real query plans and only keep the indexes that materially reduce latency.”*

---

## 8) Quick Decision Cheatsheet (What to choose when…)

| Scenario                            | Best Fit (from your notes)                       | Why                                |
| ----------------------------------- | ------------------------------------------------ | ---------------------------------- |
| Equality + range + sort (OLTP)      | **B-tree**                                       | Balanced, ordered, minimal I/O     |
| Massive write ingest (metrics/logs) | **LSM engine**                                   | Sequential writes, compaction      |
| Exact match only, no ranges         | **Hash index**                                   | O(1) lookups                       |
| “Near me” / radius search           | **Geohash** (simple) / **R-tree** (rich spatial) | Preserve spatial locality          |
| Full-text search                    | **Inverted index**                               | Term → doc list, analysis pipeline |

---

## 9) Sample DDL (Anchor to memory)

**B-tree (default):**

```sql
CREATE UNIQUE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_user_time ON posts(user_id, created_at DESC);
```

**Covering (PostgreSQL INCLUDE):**

```sql
CREATE INDEX idx_posts_feed ON posts(user_id, created_at DESC) INCLUDE (likes);
```

**Geohash (stored as string, indexed with B-tree):**

```sql
-- Assuming geohash column exists
CREATE INDEX idx_restaurants_geohash ON restaurants(geohash);
-- Query: BETWEEN 'dr5ru' AND 'dr5ru~'  (prefix range)
```

---

## 10) Final Wrap (What interviewers want to hear)

1. You **start from access patterns**; each index has a purpose.
2. You **default to B-trees**, choosing others only when requirements demand.
3. You **balance** read speed vs write cost and disk.
4. You can **explain geospatial & full-text** at the right level.
5. You understand **composite order** and when to use **covering indexes**.

**Capstone line:**

> “Indexing isn’t ‘add more’; it’s ‘add right’. For each hot query, we pick the minimal structure—usually a B-tree composite matching the filter + sort—then consider LSM/geospatial/inverted only when the workload demands it.”

---


Here’s a detailed breakdown of **index types in MongoDB**, what they do, when to use them, and key trade-offs (based on the official docs).
Use this for interview prep so you can confidently mention the right index for the right scenario.

---

## MongoDB Index Types & Details

| Index Type                                                                                                   | What it Does & Use-Case                                                                                                                               | When to Use                                                                                                                     | Trade-Offs                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Single Field Index**                                                                                       | Index on one field, e.g., `{ email: 1 }`. Allows fast equality or range queries on that field.                                                        | Common for queries like `find({ email: "x" })` or `find({ age: { $gt: 30 } })`.                                                 | Simpler, but only helps queries on that one field; additional indexes needed for multi-field queries.                                  |
| **Compound Index**                                                                                           | Index on multiple fields, e.g., `{ user_id: 1, created_at: -1 }`. Supports queries that filter/sort on the indexed fields in the proper order.        | For queries like “posts by user ordered by date”.                                                                               | Column order matters; if query doesn’t follow prefix of index, may not use it efficiently.                                             |
| **Multikey Index**                                                                                           | For fields that hold **arrays**. MongoDB indexes each array element.                                                                                  | When a document field is an array and you query on the array’s elements (e.g., `tags: [ "mongodb", "indexing" ]`).              | More complex; each array element yields an index entry so index size grows; array-of-arrays have extra restrictions.                   |
| **Geospatial Indexes**                                                                                       | Two main types in MongoDB: `2d` (legacy) and `2dsphere`. They support geospatial queries (nearby, within polygon) on coordinate data.                 | When you store data with location (lat, lng) and need queries like “find restaurants within 5 km”.                              | Must structure data properly; combining with other filters may require extra planning; storage/precision trade-offs.                   |
| **Text Index**                                                                                               | Supports full-text search of string content in one or more fields. Builds an inverted-index structure behind the scenes.                              | When you query documents for included words/phrases, e.g., blog posts `'search: "indexing"'`.                                   | More overhead; text search semantics differ from standard equality; limited support for combining with some other index types.         |
| **Hashed Index**                                                                                             | Indexes the hash of a field’s value, e.g., `{ user_id: "hashed" }`. Useful for sharding and equality lookups when you don’t care about range queries. | When you need **uniform distribution** for sharding or very fast equality look-ups on a field but never need range scans on it. | Cannot do range queries on the hashed field; indexes built using hashed values cannot optimize sorting or range filters on that field. |
| **Wildcard Indexes**                                                                                         | Indexes multiple fields or sub‐fields dynamically, useful when document structure is variable.                                                        | When documents can have dynamic fields and you need to query across many possible keys without defining each index explicitly.  | Can become very large; may index fields you don’t need; performance cost on writes.                                                    |
| **Clustered Indexes** (MongoDB supports clustered collections where the PK and data are stored in key order) | Controls the physical order of documents on disk.                                                                                                     | When ordered storage by key is beneficial (range scans by PK).                                                                  | More storage overhead; less flexible than non-clustered; careful planning required.                                                    |
| **TTL Indexes** (Time To Live)                                                                               | Special index type that removes documents automatically after a specified time based on field value.                                                  | When you have time-sensitive data like session tokens, logs, caches.                                                            | Cannot be part of a compound list that orders by something else; removal happens asynchronously (not real-time precise).               |
| **Column-store / Analytics Index (Newer)**                                                                   | For analytic workloads: compresses columns and speeds aggregations. (Mentioned in newer MongoDB versions)                                             | When you run heavy read/analytics jobs over large collections, compressible columns, fewer updates.                             | Not always necessary for typical OLTP; additional complexity; write performance may suffer.                                            |

---

## Key Interview Insights & What to Emphasize

* **Default assumption:** Use a single‐field or compound B-tree style index (MongoDB uses B-tree under the hood). When you need something special (arrays, geolocation, full-text, sharding) then pick the specialized index.
* **Array fields → Multikey:** If one of your document fields is an array and you query on it, mention you’ll use a multikey index.
* **Location data → Geospatial:** For “near me” queries or maps, emphasise `2dsphere` index and why it’s better than simple single‐field indexes on lat & lng.
* **Large collections & equality only on one field → Hashed:** If you plan to shard on user_id or you have huge writes but no range queries on that field, you may mention hashed.
* **Varied document schema → Wildcard:** If your collection has many optional/dynamic fields and you want to support flexible querying, wildcard index is useful.
* **Time sensitive data → TTL:** For auto-expiration use-cases call out TTL index.
* **Analytics vs OLTP:** If your system has a huge analytics component (reads heavy, writes rare) mention **column-store/analytics index** to show you differentiate workloads.

---

## Example Snippets (MongoDB Syntax)

### Create a hashed index:

```js
db.users.createIndex({ user_id: "hashed" });
```

### Create a compound index:

```js
db.posts.createIndex({ user_id: 1, created_at: -1 });
```

### Create a geospatial index (2dsphere):

```js
db.places.createIndex({ location: "2dsphere" });
```

### Create a text index:

```js
db.articles.createIndex({ content: "text", title: "text" });
```

### Create a TTL index:

```js
db.sessions.createIndex({ last_accessed: 1 }, { expireAfterSeconds: 3600 });
```

---

If you like, I can **summarize index type trade-offs in a table (for MongoDB specifically)** or provide **when to pick each index type** in an interview context. Would you like that?

