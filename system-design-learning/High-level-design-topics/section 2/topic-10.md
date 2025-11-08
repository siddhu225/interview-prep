Awesome — here’s **CAP Theorem** in the same interview-ready style as your Caching/Sharding notes: crisp concepts, practical trade-offs, and what to say in the room.

---

# **CAP Theorem — System Design Notes**

## **What CAP Really Says (and what it doesn’t)**

In a **distributed system**, during a **network partition** (messages dropped/links split), you must choose:

* **C — Consistency:** every read sees the **latest write** (single, coherent view).
* **A — Availability:** every request to a non-failing node **gets a response** (may be stale).
* **P — Partition tolerance:** the system **keeps operating despite partitions**.

👉 In practice, **P is non-negotiable** (partitions happen). So CAP becomes: **when P happens, do we prefer C or A?**

> CAP “consistency” ≠ ACID consistency. CAP-C = linearizable, single-copy view.

---

## **Mental Model (simple & interviewable)**

* **Normal times (no partition):** you can have both C and A.
* **Partition occurs:** you **cannot** guarantee both simultaneously.

  * **Choose C:** some requests **fail/block** (sacrifice A) to avoid stale reads/writes.
  * **Choose A:** all requests **succeed quickly**, but some reads can be **stale** (sacrifice C).

---

## **When to Prefer Consistency (CP)**

Prioritize **correctness over uptime** under partition:

* **Tickets/Seats/Inventory**: prevent **double-sell**.
* **Financial systems / balances / trades**: prevent **lost/phantom updates**.
* **Critical counters/quotas**: must not exceed limits.

**Trade-offs:** higher latency under partition, possible write blocking, degraded availability.

**Typical tech/approaches:**

* Single leader with **sync replication** (can block).
* **Transactions**; linearizable stores; quorums tuned for C.
* **Spanner** (TrueTime), PostgreSQL/MySQL single primary with strict sync replicas.
* DynamoDB **Strongly consistent reads** mode (per-table/per-call).

**Interview line:**

> “During a partition, I’ll **reject or block** writes that risk double-booking. We run **CP** for booking paths; browse/search can remain AP.”

---

## **When to Prefer Availability (AP)**

Prioritize **liveness + low latency** under partition (accept **eventual consistency**):

* **Social content, profiles, feeds, likes**
* **Catalog/metadata pages**
* **Analytics, counters, activity streams**

**Trade-offs:** temporary staleness, conflict resolution later.

**Typical tech/approaches:**

* **Async replication**, **multi-master**, **CRDTs**, **last-write-wins**, **Dynamo-style** quorum.
* **Cassandra**, DynamoDB (default), Riak, Cosmos DB (weaker models).

**Interview line:**

> “Profile reads remain **available** even if a region is partitioned; we accept **stale data** for a short window and converge via async replication.”

---

## **Blended Designs (real-world nuance)**

Most systems mix modes **by feature**:

* **Ticketmaster:** **CP** for booking; **AP** for event browsing.
* **Tinder:** **CP** for match creation; **AP** for profile/media.
* **E-commerce:** **CP** for checkout/inventory decrement; **AP** for product views, recommendations.

**Interview line:**

> “I’ll classify endpoints: *critical writes = CP*, *reads/browse = AP*. SLAs and UX guide per-path choices.”

---

## **Consistency Models (quick ladder)**

* **Strong (linearizable):** read sees latest committed write.
* **Read-your-own-writes:** user sees own updates immediately (others may see stale).
* **Monotonic reads / causal:** related operations appear in order.
* **Eventual:** replicas converge without timing guarantees.

**How to use in interviews:**

> “Public reads are **eventual**; user dashboards are **read-your-own-writes** to avoid UX confusion.”

---

## **Design Patterns Mapped to CAP Choice**

### If you choose **C (CP)** under partition

* **Synchronous replication** with **write quorums** (e.g., W+R > N).
* **Leader-based** writes; followers reject writes if leader unreachable.
* **Region fencing / lease-based primaries** to avoid split-brain.
* **Idempotent ops** + retries with backoff (avoid double commit).
* **Fail closed** on stale leadership.

**Operational knobs:**

* Quorum sizes (N,R,W), **strict majority** for writes.
* **Circuit breakers** when quorum not met → degrade gracefully.

### If you choose **A (AP)** under partition

* **Async replication**, **multi-writer** acceptance.
* **Conflict resolution:** LWW timestamps, vector clocks, **CRDTs**, application merges.
* **Background reconciliation** / CDC pipelines.
* **Client-side tolerance** (stale UI badges, “updated moments ago”).

**Operational knobs:**

* **Short TTLs**, **invalidate-then-refresh** after partition heals.
* **Versioning** (ETags) + **conditional writes** to detect conflicts.

---

## **Failure & UX Playbook**

* **Stale UI risk:** add “last updated” hints; gray badges; optimistic updates with confirmation.
* **Write conflicts:** surface a **resolve flow** (merge dialog) or enforce **single-writer** per entity.
* **Partition detection:** health checks between regions, quorum failures, leader lease expiry.
* **Degradation plan:** read-only mode, queue writes, or route to nearest healthy region.

---

## **Quick Decision Tree (say this out loud)**

1. **Will stale data cause harm?**

   * **Yes → CP** for that path.
   * **No → AP** with eventual convergence.
2. **Is user-perceived freshness required (self-view)?**

   * Add **read-your-own-writes** cache/session pinning.
3. **What’s the partition blast radius?**

   * Region-local **single writer**; cross-region **AP reads**; reconcile offline.

---

## **Common Interview Pitfalls (and fixes)**

* **Saying “we need both C and A under partition.”**
  → Acknowledge CAP: “Under partition, we **prefer C** for X, **A** for Y.”
* **Equating CAP-C with ACID**
  → Clarify linearizability vs transactional constraints.
* **Ignoring UX during partitions**
  → Offer a **read-only** mode or **queue & confirm** model.
* **Global CP everywhere** (needless latency)
  → **Scope CP** to the **minimal critical write path**.

---

## **Sample Interview Script (90 seconds)**

> “For non-functional requirements, let’s pick our CAP posture. Under partitions, **checkout & inventory** must avoid oversells, so they’re **CP**: leader-based writes, quorum commit, fail closed if quorum is lost. Browsing, search, reviews are **AP**: we accept temporary staleness, use async replication and cache, and reconcile via CDC. Users get **read-your-own-writes** so they immediately see their changes. Across regions we fence leaders with leases to prevent split-brain, and degrade to **read-only** if quorum isn’t met. That balances correctness where it matters and availability everywhere else.”

---

## **Cheat Lines**

* “**P is mandatory**, so the choice is **C vs A during partitions**.”
* “**CP for money/tickets; AP for feed/content**.”
* “**Read-your-own-writes** hides staleness for the author without forcing global CP.”
* “We’ll **fail closed** for booking; **serve stale** for browse; **reconcile** via CDC.”

---
