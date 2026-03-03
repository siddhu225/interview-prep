Here’s a **structured, interview-ready breakdown** of the **Dealing with Contention** pattern with practical examples and trade-offs:

---

# **Dealing with Contention Pattern**

Contention arises when multiple processes compete for the same resource simultaneously. Common scenarios: concert tickets, auction bids, or limited stock items.

Without proper handling, you get **race conditions, double-bookings, and inconsistent state**.

---

## **The Problem**

Example: buying the last seat for a concert:

| Step | Action                       | Result         |
| ---- | ---------------------------- | -------------- |
| 1    | Alice reads 1 seat available | sees 1 seat    |
| 2    | Bob reads 1 seat available   | sees 1 seat    |
| 3    | Alice decrements seat → 0    | success        |
| 4    | Bob decrements seat → -1     | double booking |

**Why it happens:**

* Reading and writing aren’t atomic.
* Both Alice and Bob act on **stale state**.
* Microseconds matter, and at scale (10,000+ concurrent users), conflicts multiply.

---

## **Solution Progression**

We go from **simple atomic operations** to **distributed coordination** depending on scale.

---

### **1. Single Node Solutions**

#### **Atomicity**

* Use **transactions** to ensure all operations succeed or fail together.
* Example: concert ticket purchase:

```sql
BEGIN TRANSACTION;

-- Check and reserve the seat
UPDATE concerts 
SET available_seats = available_seats - 1
WHERE concert_id = 'weeknd_tour';

-- Create the ticket record
INSERT INTO tickets (user_id, concert_id, seat_number, purchase_time)
VALUES ('user123', 'weeknd_tour', 'A15', NOW());

COMMIT;
```

**Limitation:**

* Atomicity alone doesn’t prevent **race conditions** if two transactions read the same state simultaneously.

---

#### **Pessimistic Locking**

* Acquire locks **before reading/updating** to prevent conflicts.
* Example:

```sql
BEGIN TRANSACTION;

-- Lock the row
SELECT available_seats FROM concerts 
WHERE concert_id = 'weeknd_tour' 
FOR UPDATE;

-- Update seat count
UPDATE concerts 
SET available_seats = available_seats - 1
WHERE concert_id = 'weeknd_tour';

-- Insert ticket
INSERT INTO tickets (user_id, concert_id, seat_number, purchase_time)
VALUES ('user123', 'weeknd_tour', 'A15', NOW());

COMMIT;
```

* **Locks prevent other transactions** from reading/updating until completion.
* **Trade-off:** reduces concurrency; hold locks as briefly as possible.

---

#### **Isolation Levels**

* Databases manage concurrent transaction visibility. Standard levels:

| Level            | Behavior                                        |
| ---------------- | ----------------------------------------------- |
| READ UNCOMMITTED | Can see uncommitted changes (rarely used)       |
| READ COMMITTED   | Only committed changes visible                  |
| REPEATABLE READ  | Reads same data consistently within transaction |
| SERIALIZABLE     | Transactions appear to run one at a time        |

* **SERIALIZABLE** prevents the ticket race condition automatically: conflicts abort one transaction for retry.
* **Trade-off:** expensive; more aborts and DB tracking.

---

#### **Optimistic Concurrency Control (OCC)**

* Assumes **conflicts are rare**.
* Detect conflicts **after the fact** using a **version number** or expected value.

**Example using available_seats as version:**

```sql
-- Alice reads available_seats = 1

BEGIN TRANSACTION;
UPDATE concerts
SET available_seats = available_seats - 1
WHERE concert_id = 'weeknd_tour' AND available_seats = 1;

INSERT INTO tickets (user_id, concert_id, seat_number, purchase_time)
VALUES ('alice', 'weeknd_tour', 'A15', NOW());
COMMIT;

-- Bob tries the same update:
-- 0 rows affected → conflict detected → retry
```

* **Version numbers** or changing values serve as the OCC mechanism.
* **Trade-off:** works well under **low contention**, avoids locking overhead, occasional retry required.
* **Caution:** watch for the **ABA problem**, where a value changes and returns to the original state, potentially confusing OCC.

---

### **Choosing the Right Approach**

| Scenario                              | Recommended                                                               |
| ------------------------------------- | ------------------------------------------------------------------------- |
| Rare contention (low concurrency)     | Optimistic concurrency                                                    |
| Frequent conflicts / high concurrency | Pessimistic locking                                                       |
| Complex transaction requirements      | SERIALIZABLE isolation level                                              |
| Distributed multi-node systems        | Distributed coordination / consensus (e.g., Zookeeper, etcd, Redis locks) |

---

### **Summary: Key Takeaways**

* Contention occurs when multiple actors try to modify the same resource.
* **Atomic transactions** ensure consistency but don’t prevent conflicts.
* **Pessimistic locking** prevents conflicts upfront; **OCC** detects conflicts after they happen.
* **Isolation levels** help DBs manage concurrency automatically; SERIALIZABLE is the strictest.
* Always choose your method based on **contention likelihood, system scale, and performance trade-offs**.

---

If you want, I can **combine all three patterns you’ve provided—Large Blobs, Long-Running Tasks, and Dealing with Contention—into a single interview-ready system design “cheat sheet”** with **examples, trade-offs, and visuals** so it’s easier to reference under pressure.

Do you want me to create that?
