I have successfully browsed the URL and retrieved the content regarding the CAP Theorem. I will now compile these into detailed notes as requested, strictly following the provided text.

---

### CAP Theorem: Consistency, Availability, and Partition Tolerance

The CAP Theorem is a foundational concept in distributed systems that outlines a crucial trade-off. It states that a distributed data store can only guarantee **two out of three** desired properties simultaneously:

1.  **Consistency (C)**
2.  **Availability (A)**
3.  **Partition Tolerance (P)**

Understanding the CAP theorem is vital for system design, as it directly influences fundamental design decisions and the trade-offs you must make.

---

#### 1. The Three Properties of CAP

* **1.1. Consistency (C)**
    * **Definition:** Means that all nodes in a distributed system see the **same data at the same time**.
    * **Implication:** If a write operation occurs on one node, all subsequent read operations across all other nodes (after the write has committed) must return the updated data. There should be no stale reads.
    * **Analogy:** Imagine a shared document. If one person makes a change, everyone else immediately sees that change.

* **1.2. Availability (A)**
    * **Definition:** Ensures that every request made to a **non-failing node** in the system receives a **response**.
    * **Implication:** The system must always be responsive, meaning it will always return *some* data, even if that data might not be the most recent version (i.e., it might be stale). The system doesn't block or return errors due to data synchronization issues; it keeps serving requests.
    * **Analogy:** A public library that is always open and always allows you to check out *some* book, even if it might not be the very latest edition.

* **1.3. Partition Tolerance (P)**
    * **Definition:** Means the system continues to operate despite **network failures** or **partial system failures** (i.e., "partitions").
    * **Implication:** A network partition occurs when communication between nodes is disrupted, effectively splitting the system into isolated sub-systems that cannot communicate with each other. A partition-tolerant system must remain operational even when this happens.
    * **Practical Reality:** In a distributed system, network failures are **inevitable**. Therefore, **Partition Tolerance (P) is a must-have** property for almost any real-world distributed system. You generally cannot "choose" to sacrifice partition tolerance in a distributed environment because you cannot control network reliability.

---

#### 2. The Core Trade-Off: C vs. A (Given P)

Since Partition Tolerance (P) is almost always a requirement for any practical distributed system, the CAP theorem effectively boils down to a choice between **prioritizing Consistency (C) or Availability (A)** when a network partition *does* occur.

* **2.1. CP System (Consistent and Partition-Tolerant, but not always Available)**
    * **Choice during Partition:** When a network partition occurs, a CP system will **prioritize Consistency**.
    * **Behavior:** It will refuse to serve requests (or return an error) for parts of the system that cannot guarantee consistent data. This sacrifices availability to ensure that any data returned is always up-to-date and consistent across all reachable nodes.
    * **Example (Ticket Booking System):**
        * **Scenario:** A partition separates the system into two groups of nodes, both containing information about available tickets.
        * **CP Choice:** To prevent **double-bookings**, the system would stop accepting new bookings (sacrificing availability) on any node that cannot confirm its state with all other nodes. This ensures that a ticket is never sold twice.
        * **Outcome:** Users might see an error or be unable to book during the partition, but data integrity is maintained.
    * **Design Implications:** Often leads to designs involving distributed transactions, consensus algorithms (like Paxos or Raft), or in simpler cases, a single primary node for writes to maintain strong consistency (with potential availability issues if that node fails or is partitioned).

* **2.2. AP System (Available and Partition-Tolerant, but not always Consistent)**
    * **Choice during Partition:** When a network partition occurs, an AP system will **prioritize Availability**.
    * **Behavior:** It will continue to serve requests on all non-failing nodes, even if it means returning data that might be stale or inconsistent. Data will eventually become consistent once the partition heals.
    * **Example (Social Media Platform - e.g., Feed Updates):**
        * **Scenario:** A partition occurs, and a user posts an update. Some nodes might have the update immediately, while others are temporarily isolated and don't.
        * **AP Choice:** The system continues to serve user feeds and allow new posts even from isolated nodes (prioritizing availability).
        * **Outcome:** Users might temporarily see slightly outdated feeds or posts (eventual consistency) during the partition, but the service remains responsive and usable.
    * **Design Implications:** Often involves multiple data replicas with asynchronous replication. Conflicts arising from simultaneous writes during a partition must be resolved eventually (e.g., last-writer-wins, conflict-free replicated data types - CRDTs).

---

#### 3. Nuances and Interview Considerations

* **No "Perfect" System:** The CAP theorem means you cannot simultaneously achieve all three properties in a distributed system when a network partition occurs. You must make a design choice.
* **"Perfect" Consistency is Hard:** Achieving "perfect" or strong consistency (where all reads see the absolute latest write immediately) across a distributed system is incredibly challenging and often comes with significant performance and availability trade-offs.
* **Eventual Consistency:** Many modern large-scale distributed systems opt for **eventual consistency** in parts of their system. This means that if no new writes occur, all reads will eventually return the last written value, but there might be a delay. This allows for higher availability and partition tolerance.
* **Feature-Specific Consistency:** A single large system might employ different consistency models for different features. For example:
    * **Strong Consistency (CP-like):** For critical transactions like payment processing or user authentication (where data integrity is paramount).
    * **Eventual Consistency (AP-like):** For less critical data like social media feeds, user profiles, or product recommendations (where responsiveness is more important than absolute immediate consistency).
* **Interview Focus:** Understanding the CAP theorem is crucial in system design interviews because it demonstrates your ability to:
    * Identify fundamental trade-offs in distributed systems.
    * Justify design decisions based on consistency requirements vs. availability needs.
    * Discuss the implications of network failures on your chosen data model and access patterns.