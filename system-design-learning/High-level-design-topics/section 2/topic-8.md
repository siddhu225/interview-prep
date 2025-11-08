Perfect — here’s the **Sharding** guide in the **same style as your Caching notes**, but a bit **more detailed** (built only from the notes you provided).

---

# **Sharding – Core Concepts (Interview Notes)**

**Sharding** = splitting data **across multiple machines** to scale **storage** and **read/write throughput** once a single database (even a big one) can’t keep up.

**Why it matters:** Up to a point, you can scale vertically (bigger box), add read replicas, index better, and cache. Eventually you hit limits:

* **Storage ceiling** (tables/indexes too large; operational tasks hurt).
* **Write bottlenecks** (peak inserts/updates overwhelm a single primary).
* **Read saturation** (replicas not enough / replication lag).

**Interview trigger:** Don’t propose sharding first. **Show math** (storage, QPS) that a single DB + replicas + caching won’t sustain 12–24 months. Then shard.

---

## **Partitioning vs Sharding (be crisp)**

* **Partitioning** (single machine): Split a large table into **partitions** to improve **maintenance** and **targeted scans** (e.g., last month’s orders). No new machines.

  * **Horizontal**: same columns, fewer rows per partition (e.g., by time/id-range).
  * **Vertical**: same rows, fewer columns (frequent vs bulky columns).
* **Sharding** (many machines): Horizontal partitioning **across DB instances**. Each shard has its own CPU/RAM/disk/connections → **capacity & throughput scale linearly** as you add shards.

> Interview line: “We’ll try partitioning for local efficiency; when single-node limits are reached, we **shard** to scale out.”

---

## **When to Bring Up Sharding**

Use **numbers**:

* **Storage:** “500M users × 5KB ≈ 2.5TB; 10× growth crosses safe single-node bounds.”
* **Writes:** “Target 50k writes/s → single primary is a bottleneck.”
* **Reads:** “100M DAU * multiple queries → replicas & cache won’t be enough.”

**Then say:** “We’ll **shard** to distribute storage and R/W across nodes.”

---

## **How to Shard: Two Key Decisions**

### 1) **Choose the Shard Key** (what it solves / when to use)

A good key provides **high cardinality**, **even spread**, and **single-shard access** for hot queries.

* **Good:** `user_id` for user-centric systems (profiles, user’s orders, user’s feed).
  *Solves*: co-locates a user’s data, keeps reads/writes single-shard.
* **Good:** `order_id` for order-centric lookups/updates.
* **Bad:** `is_premium` (boolean → 2 shards; huge skew).
* **Bad:** `created_at` (time hotspot: newest shard absorbs all writes).

**Interview tip:** Tie the shard key to **access patterns**: “Most requests are user-scoped → shard by `user_id`.”

---

### 2) **Pick the Distribution Strategy**

#### **A) Range-Based Sharding**

* **How:** Assign continuous ranges to shards (e.g., user_id 1–1M → shard1).
* **Pros:** Simple, good for **range scans**.
* **Cons:** **Skew & hotspots** (e.g., time-based: newest range gets all writes).
* **Use when:** Tenants/users naturally segment into different ranges (multi-tenant).

#### **B) Hash-Based Sharding (default)**

* **How:** `shard = hash(key) % N`.
* **Pros:** **Even distribution** by design.
* **Cons:** Adding/removing shards with modulo → **massive remap**.
* **Fix:** **Consistent hashing** (vnodes/ring) → only a **slice** of keys move on resize.
* **Use when:** You want even spread with a simple mental model; **default interview choice**.

#### **C) Directory-Based Sharding**

* **How:** Lookup table/service maps key → shard.
* **Pros:** **Maximum flexibility** (move hot tenants, manual rebalancing).
* **Cons:** Extra **network hop**, **SPOF** risk, more ops complexity.
* **Use when:** You must isolate specific tenants/celebrities; not a default.

---

## **Routing & Topology (what it does / when used)**

* **Consistent hashing + virtual nodes (vnodes):**
  *What it does*: Distributes keys evenly; on resize, **only some vnodes move** → smaller, controlled migrations.
  *When used*: Hash-based sharding with growth/elasticity requirements.
* **Routing location:**

  * **Client/library** caches the ring and routes directly (fast, fewer hops).
  * **Gateway/proxy** centralizes policy/observability (simpler clients).

**Interview line:** “We’ll use **consistent hashing with vnodes**; clients cache routing metadata and refresh on topology change.”

---

## **Schema & Co-Location (what it does / when used)**

* **Keep related data on the same shard** to preserve **single-shard ACID**:

  * With `user_id` sharding: profile, posts, likes, orders all carry `user_id`.
* **Global data:** Keep in **global store** (catalog/config) or **replicate** read-only copies.
* **IDs:** Use globally unique IDs (e.g., snowflake) to safely reference across shards.
* **Indexes:** Create per-shard indexes aligned to the shard’s hot queries.

*Why:* Minimizes cross-shard joins and keeps transactions fast.

---

## **Cross-Shard Operations (problem & mitigations)**

**Problem:** Queries spanning shards are **expensive** (fan-out, aggregate, sort).

**Mitigations:**

* **Cache** global aggregates (e.g., trending) with short TTL.
* **Precompute** via background jobs; store in a **summary** table/shard.
* **Denormalize small fields** to keep common reads single-shard.
* **Accept slow/rare fan-outs** only for admin/analytics.

> Interview lens: If you keep saying “hit all shards,” revisit shard key / caching / precomputation.

---

## **Consistency & Transactions (what it does / when used)**

* **Do:** Keep transactions **single-shard** (co-location) → ACID and fast.
* **Avoid:** **2PC** across shards (slow, fragile).
* **If needed:** **Saga pattern** (steps + compensations) → **eventual consistency**.

  * Example: cross-shard money transfer

    1. Debit A (shard1)
    2. Credit B (shard2)
    3. If (2) fails → compensate (refund A)

**When used:** Multi-shard workflows where strict atomicity isn’t worth the cost.

---

## **Hotspots & Load Imbalance (problem & fixes)**

**Problem:** Some shards get **much more traffic** (celebrity users, time-skew).

**Detect:** Per-shard **QPS/latency/CPU**, queue depth.

**Fixes:**

* **Isolate hot keys/tenants** to dedicated shards (directory override for a subset).
* **Compound shard keys** (e.g., hash(user_id + time_bucket)) to spread a single hot user over time windows.
* **Add read replicas** per shard; push caching (external + in-process).
* **Rate limit / shed load** on abusive patterns.

---

## **Resharding & Rebalancing (what it does / when used)**

**Goal:** Add capacity without downtime.

**Approach:**

1. **Over-provision logical shards (vnodes)** from day one.
2. Add physical nodes; **reassign vnodes** to new nodes.
3. **Migrate data** chunk-by-chunk (copy, verify, cutover).
4. Throttle; monitor lag; **rollback** path ready.

**When used:** Growth events, hotspot relief, storage rebalancing.

---

## **Failure Handling & Ops (what it does / when used)**

* **Per-shard HA:** Primary + replicas; automated failover.
* **Backups & DR:** Per-shard backups; periodic integrity checks; restore drills.
* **Schema changes:** **Expand–migrate–contract** pattern per shard.
* **Observability:** Tag metrics/logs by shard; per-shard SLOs and alerts.
* **Protection:** Circuit breakers on cross-shard calls; rate limits to shield weakest shard.

---

## **Sharding in Modern Databases (FYI mapping)**

* **Cassandra:** Partitioners (e.g., Murmur3) + **virtual nodes** (consistent-hash style) → even spread.
* **DynamoDB:** Hashes partition key to **internal partitions**; splits/merges under load (not classic public ring).
* **MongoDB:** Shards into **range-based chunks** on the shard key; with **hashed keys**, ranges are over the hash space; **balancer** splits/migrates chunks to keep balance.
* **Vitess / Citus (SQL):** Sharding layers for MySQL/Postgres; routing, online resharding (Vitess is **operator-driven**).

**Interview usage:** “We’ll use DynamoDB with `user_id` partition key” / “Vitess over MySQL, operator-driven online resharding.”

---

## **What to Say (scriptable flow)**

> “We’re beyond what a single DB + replicas + caching can support (storage/write/read math).
> We’ll **shard by `user_id`** because most hot paths are user-scoped.
> Use **hash-based sharding with consistent hashing (vnodes)** for even spread and smooth resharding.
> **Co-locate** all user-owned data, keeping transactions **single-shard**.
> **Global queries** (trending) are **precomputed and cached** to avoid fan-out.
> For **hotspots**, isolate heavy tenants and add per-shard replicas & caching.
> We have an **online resharding** plan: add nodes, reassign vnodes, throttle migration, verify, cut over.”

---

## **Common Pitfalls (call them out)**

* Picking a shard key that **doesn’t match access patterns** → constant fan-out.
* Using **modulo hashing** without a plan → rehash storm on resize.
* Sharding **too early** → ops burden w/o need.
* Forgetting **caching/indexing/read replicas** still matter within shards.

---

## **Quick Decision Flow (mental model)**

1. Can we last 12–24 months with single DB + replicas + cache? If yes → **don’t shard yet**.
2. If no: choose shard key tied to **hottest access pattern** (often `user_id`).
3. Default to **hash + consistent hashing**; size with **vnodes**.
4. Minimize cross-shard ops via **co-location, precompute, cache**.
5. Have a **live resharding** playbook.

---

## **One-Liner (final revision)**

**“Sharding horizontally splits data across DBs. Pick a shard key with high cardinality that matches hot queries (often `user_id`), distribute with consistent hashing (vnodes), keep related data together for single-shard ACID, precompute/cache global views to avoid fan-out, and plan for online resharding. Don’t shard before you must.”**

---

If you want, I can compress this into a **1-page cheat sheet** (like the caching one) or tailor examples to a domain (social, e-commerce) for even faster recall.
