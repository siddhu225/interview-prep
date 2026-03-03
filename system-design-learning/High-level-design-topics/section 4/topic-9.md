Here’s a **structured narrative-style set of notes** for **Scaling Reads**, keeping your headings and flow intact, like the previous workflow notes. I’ve summarized key concepts, included examples, and explained trade-offs clearly.

---

# **Patterns: Scaling Reads**

### **The Problem**

Scaling reads is one of the most common challenges in system design. Applications often see read traffic far outpacing write traffic. Consider Instagram: when you open your feed, your app performs dozens of queries just to fetch images, metadata, likes, and comments. Meanwhile, you might only post a single photo in a day.

This imbalance—a typical **read-to-write ratio of 10:1 or higher**—is common in content-heavy applications like Twitter, YouTube, or Amazon. High read traffic can overwhelm your database, not due to bad code but **physical limits**: CPU, memory, and disk I/O. No amount of clever code can overcome hardware constraints alone.

---

### **The Solution**

Scaling reads typically follows a natural progression:

1. **Optimize within your database**
2. **Scale your database horizontally**
3. **Add external caching layers**

Each layer builds on the previous, progressively improving throughput and latency.

---

### **Optimize Within Your Database**

#### **Indexing**

Indexes are like a book’s index: they let the database jump directly to relevant rows instead of scanning the entire table. Without indexes, queries perform **full table scans**, which are slow for large datasets. Proper indexing turns linear operations into logarithmic ones.

Common types include **B-trees** for general queries, **hash indexes** for exact matches, and specialized indexes for full-text or geospatial queries.

Example: if users search posts by hashtags, index the `hashtag` column. For sorting products by price, index the `price` column.

> Note: Modern databases handle indexes efficiently. Under-indexing hurts far more than adding extra indexes.

#### **Hardware Upgrades and Vertical Scaling**

Sometimes the simplest solution is better hardware: SSDs for faster random I/O, more RAM to keep data in memory, faster CPUs and cores to handle concurrent queries. Vertical scaling can be a quick stopgap, though it doesn’t solve fundamental scalability limits.

#### **Denormalization**

Normalized databases reduce redundancy, splitting data across tables. But joins across multiple tables are expensive in read-heavy systems. Denormalization stores redundant data to speed up reads.

Example: instead of joining users, orders, and products, store an `order_summary` table with all needed data:

```sql
SELECT user_name, order_date, product_name, price
FROM order_summary
WHERE order_id = 12345;
```

This trades storage and write complexity for read performance. Materialized views take this further by precomputing aggregations like average product ratings.

---

### **Scale Your Database Horizontally**

When vertical scaling is insufficient, distribute the read load across multiple database servers.

#### **Read Replicas**

Replicas copy data from a primary database to secondary servers. Writes go to the primary; reads can be served from replicas.

* **Leader-follower replication** is standard.
* **Synchronous replication** ensures consistency but adds latency.
* **Asynchronous replication** is faster but may serve slightly stale data.

Replication lag is a key trade-off interviewers often test you on.

#### **Sharding**

Sharding splits your dataset across multiple databases, reducing the amount of data each server handles.

* **Functional sharding**: split by domain (users in one DB, products in another).
* **Geographic sharding**: split by region (US users in US DB, EU users in EU DB).

Sharding adds operational complexity and is often more useful for write scaling than pure read scaling.

---

### **Add External Caching Layers**

Caches store frequently accessed data in memory, bypassing disk reads and heavy queries.

#### **Application-Level Caching**

In-memory caches like **Redis** or **Memcached** sit between your app and database. On a cache hit, responses are served in **sub-millisecond** time; on a miss, the database is queried, and the result is cached.

**Cache invalidation strategies:**

* **TTL (Time-to-Live)**: simple, serves slightly stale data.
* **Write-through**: update cache immediately with database writes.
* **Write-behind**: queue cache updates asynchronously.
* **Tagged invalidation**: invalidate entries by tags (e.g., `user:123:posts`).
* **Versioned keys**: update the version on changes to naturally invalidate old data.

Most production systems combine strategies: use **short TTLs for safety**, plus active invalidation for critical data.

#### **CDN and Edge Caching**

CDNs cache data closer to users globally. Originally for static assets, modern CDNs can cache **dynamic content** like API responses.

* Reduces latency: Tokyo user fetches data from a Tokyo edge server rather than a distant data center.
* Reduces origin load: popular pages or posts can be served entirely from cache.
* Best for **shared content**, not personalized data like private messages or account settings.

CDNs and edge caches dramatically improve **read-heavy workloads** by offloading requests from origin databases.

---

### **Key Takeaways**

* Optimize your database first: indexes, denormalization, materialized views.
* Scale horizontally with **read replicas**; consider sharding if dataset grows very large.
* Add caching layers (Redis, Memcached) for frequently accessed data.
* Use CDNs for global read-heavy applications with shared content.
* Always consider **read/write ratio** and **data staleness requirements** before choosing strategies.

This layered approach—from database optimization to caching—allows systems to handle millions of read requests per second efficiently.

---

If you want, I can **also create a visual diagram summarizing Scaling Reads strategies**, showing **DB optimization → replicas → sharding → caching → CDN**, which is excellent for interviews.

Do you want me to make that diagram?
