Here’s a **structured, interview-ready summary** for **handling contention across multiple nodes** with trade-offs, patterns, and examples:

---

# **Dealing with Contention Across Multiple Databases**

When your system spans multiple databases, **single-node transactions aren’t enough**. Coordinating updates across databases requires distributed coordination.

---

## **Key Principles**

1. **Keep contended data in a single database if possible** – simpler, more reliable.
2. **If multiple databases are necessary**, you have three main approaches:

---

## **1. Two-Phase Commit (2PC)**

* Ensures **atomicity across multiple databases**.
* **Coordinator service** manages the transaction:

**Phases:**

1. **Prepare phase:**

   * Each database starts a transaction and performs all changes except final commit.
   * Holds locks until coordinator decides.

   Example for bank transfer:

```sql
-- Database A (debit Alice)
BEGIN TRANSACTION;
SELECT balance FROM accounts WHERE user_id='alice' FOR UPDATE;
UPDATE accounts SET balance = balance - 100 WHERE user_id='alice';
-- Transaction stays open

-- Database B (credit Bob)
BEGIN TRANSACTION;
SELECT balance FROM accounts WHERE user_id='bob' FOR UPDATE;
UPDATE accounts SET balance = balance + 100 WHERE user_id='bob';
-- Transaction stays open
```

2. **Commit/Abort phase:**

   * Coordinator tells all databases to **commit** if all succeeded, otherwise **abort**.

**Pros:**

* Guarantees atomicity.

**Cons:**

* Fragile: coordinator crash can leave open transactions.
* Expensive: locks held across network calls, blocking other operations.
* Network partitions can halt the system.

---

## **2. Distributed Locks**

* Ensure **only one process can work on a resource at a time** across nodes.
* Useful for **simpler coordination** without full atomic transactions.

**Implementation options:**

1. **Redis with TTL** – fast, atomic, auto-expiring locks.
2. **Database columns** – track locks with status and expiration.
3. **Coordination services** (ZooKeeper / etcd) – strong consistency via consensus.

**Use case:**

* Ticket reservations (e.g., Ticketmaster seats “reserved” for a few minutes before payment).
* Uber driver assignment (“pending_request” status).

**Pros:**

* Simple and fast for user-facing flows.
* Shrinks contention window.

**Cons:**

* Bottleneck under heavy contention.
* Must handle lock timeouts and failures.

---

## **3. Saga Pattern**

* **Break operations into independent, compensatable steps** instead of holding locks.
* Each step commits immediately; if a later step fails, run a **compensation step**.

**Bank transfer example:**

1. Debit Alice (Database A) → commit immediately.
2. Credit Bob (Database B) → commit immediately.
3. Send confirmation → if fails, compensate previous steps.

**Pros:**

* Avoids long-running locks and coordinator crashes.
* More resilient than 2PC.

**Cons:**

* System is temporarily **eventually consistent**.
* Other processes might see intermediate states.
* Requires careful design to handle compensations.

---

## **Choosing the Right Approach**

| Approach                           | Use When                                         | Avoid When                              | Latency               | Complexity |
| ---------------------------------- | ------------------------------------------------ | --------------------------------------- | --------------------- | ---------- |
| **Pessimistic Locking**            | High contention, single DB, critical consistency | Low contention, high throughput         | Low                   | Low        |
| **SERIALIZABLE Isolation**         | Auto conflict detection needed                   | High contention/performance critical    | Medium                | Low        |
| **Optimistic Concurrency**         | Low contention, performance critical             | High contention, can’t tolerate retries | Low (if no conflicts) | Medium     |
| **Distributed Transactions (2PC)** | Must have atomicity across DBs                   | High availability, low latency needs    | High                  | Very High  |
| **Distributed Locks**              | User-facing flows, reservations                  | Purely technical coordination           | Low                   | Medium     |
| **Saga Pattern**                   | Multiple DBs, resilience preferred               | Need strict atomicity                   | Medium                | Medium     |

---

### **Guideline Flow**

1. **Single DB?** → Use **pessimistic or optimistic locking**.
2. **Multiple DBs, must be atomic?** → Use **2PC** (if willing to accept fragility) or **Sagas** (resilient, eventual consistency).
3. **User-facing flows?** → Use **distributed locks / reservations** to reduce contention and improve UX.

**Tip:** Always start with **pessimistic locking in a single database** – simple, predictable, easy to reason about.

---

If you want, I can create a **single visual “cheat sheet” combining Long-Running Tasks, Large Blobs, and Dealing with Contention (single + multi-node)**, so you have a **one-page system design reference** for interviews.

Do you want me to make that?
