Great — here is **Consistent Hashing**, written in the **same style and depth** as the *Caching* and *Sharding* notes you liked.
This is **interview-ready**, **fully conceptual**, and **easy to recall**.

---

# **Consistent Hashing — Core Concept (System Design Notes)**

## **What Problem Does Consistent Hashing Solve?**

In distributed systems, we often need to **distribute keys/data across multiple servers** (DB shards, cache nodes, brokers, etc.).
A common naive approach is:

```
node = hash(key) % N
```

Where:

* `key` = data identifier (user_id, event_id, cache key)
* `N` = number of servers

This works *only until* we **add or remove servers**.

### **The Problem**

If **N changes**, the modulo changes → **almost every key maps to a new node**.

* Add a server → nearly **all data must move**
* Remove a server → same problem, entire system reshuffles

This causes:

* Huge **data migration**
* **Cache flush** → cache storm, latency spikes
* **Database load surges**
* Risk of **downtime**

**Consistent Hashing solves this.**
It ensures that **when nodes are added or removed, only a small portion of keys move** (not all).

---

## **How Consistent Hashing Works (Intuition First)**

### **1) Build a Hash Ring**

* Imagine hash outputs on a **circle** (0 → 2³²−1 range).
* **Each server** is placed on the ring at a position based on `hash(server_id)`.

```
     50       75
      DB3   DB4
   /           \
0 DB1          (wrap-around)
   \           /
      DB2
     25
```

### **2) Place Data on the Ring**

* To store key `K`:

  1. Compute `hash(K)`
  2. Find the next node **clockwise** on the ring
  3. That node stores the data

```
key -> hash(key) -> walk clockwise -> node
```

### **3) Adding a Node**

Only keys **between the new node and its predecessor** move.

### **4) Removing a Node**

Only keys belonging to that node get remapped to the **next clockwise node**.

> **Result:** Only ~1/N of data moves instead of nearly 100%.

---

## **Example (Concrete Mapping)**

| Key         | hash(key) | Assigned Node |
| ----------- | --------- | ------------- |
| Event #1234 | → 14      | DB1           |
| Event #5678 | → 63      | DB4           |
| Event #9012 | → 41      | DB3           |

Now **add DB5** at position 45:

Only keys with hashes in the section `(DB3 → DB5)` move (e.g., #9012).
Everything else stays exactly where it is.

---

## **Why We Need Virtual Nodes**

If each physical server appears **only once** on the ring:

* Nodes may cluster in unlucky positions
* Leading to **uneven key load**
* Example → DB3 gets 2× traffic of others

### **Solution → Virtual Nodes (vnodes)**

Each physical node is hashed **multiple times**:

```
DB1-vn1, DB1-vn2, DB1-vn3 ...
```

These are scattered evenly → **smooth uniform distribution**.

| Physical Node | Virtual Nodes (Positions on Ring) |
| ------------- | --------------------------------- |
| DB1           | 5, 35, 75                         |
| DB2           | 10, 60, 95                        |
| DB3           | 20, 50, 90                        |

**Benefits:**

* Load spreads evenly
* When a node is removed, its keys redistribute **across multiple nodes**, not just one neighbor

---

## **Where Consistent Hashing Is Used in Real Systems**

| System                        | What is Sharded             | Notes                                     |
| ----------------------------- | --------------------------- | ----------------------------------------- |
| **Cassandra**                 | Data partitions             | Uses consistent hash ring + virtual nodes |
| **Amazon DynamoDB**           | Partitions internal storage | Splits partitions automatically           |
| **CDNs (Cloudflare, Akamai)** | Edge cache locations        | Ensures nearest + balanced server         |
| **Redis Cluster**             | Key slots (0–16383)         | Client routes to right shard              |

---

## **When to Mention Consistent Hashing in Interviews**

Use it when:

* Designing **distributed cache**
* Designing **sharded databases**
* Designing **distributed key-value store**
* Distributing **tasks across workers**

**Don’t use it** when:

* A single DB + read replicas + caching is enough (**don’t over-engineer**)

---

## **Interview-Ready Explanation (30 Seconds)**

> “Simple modulo hashing breaks when we add or remove nodes — almost everything has to move.
> **Consistent Hashing** places nodes and keys on a **hash ring** and assigns each key to the next node **clockwise**.
> When scaling up/down, **only ~1/N keys move**, minimizing rebalancing.
> We use **virtual nodes** to ensure even load distribution.”

---

## **Deeper Interview Version (If interviewer asks “how exactly?”)**

> “We compute `hash(node_id)` to place each server multiple times on a ring (virtual nodes).
> To assign data, we compute `hash(key)` and walk clockwise to find the owner.
> Adding/removing a server only shifts keys in its neighboring arc.
> This reduces rebalancing overhead from **O(all keys)** → **O(keys / N)**.”

---

## **Common Mistakes Interviewers Watch For**

| Mistake                                           | Correction                                                            |
| ------------------------------------------------- | --------------------------------------------------------------------- |
| “Consistent Hashing ensures perfect load balance” | Only when using **virtual nodes**                                     |
| Mentioning it too early                           | Introduce it **only when sharding / scaling nodes** becomes necessary |
| Not addressing hot keys                           | Virtual nodes + auto-splitting + caching + rate limiting              |

---

## **Summary (One-Liner)**

**Consistent Hashing** distributes keys across nodes such that when nodes are added/removed, **only a small fraction of keys are remapped**, especially when using **virtual nodes** for even load.

---