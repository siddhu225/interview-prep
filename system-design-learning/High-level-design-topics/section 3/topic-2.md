Here’s a **concise, interview-focused summary of Kafka** based on your notes, with emphasis on what really matters in system design interviews:

---

# **What You Should Know About Kafka for System Design Interviews**

Apache Kafka is a **distributed, fault-tolerant, high-throughput messaging and streaming platform**. In interviews, the focus is less on internal APIs and more on **scalability, fault tolerance, and usage patterns**.

---

## **1. Scalability**

* **Single broker limits**:

  * Recommended **message size <1MB**.
  * Single broker can store ~1TB of data and handle ~1M messages/sec (approximate, hardware-dependent).
  * Kafka is **not for storing large blobs**—store large data in S3/Blob storage and use Kafka messages as pointers.

* **Scaling strategies**:

  1. **Add brokers** → distributes partitions and load.
  2. **Partitioning strategy** → choose message keys wisely to avoid **hot partitions**.

     * Partition = `hash(key) % num_partitions`.
     * Bad keys → skewed traffic, hot partitions.

* **Handling hot partitions**:

  * Use **no key / default partitioning** (sacrifices ordering).
  * **Random salting** → add randomness to key.
  * **Compound keys** → combine attributes for better distribution.
  * **Back pressure** → slow down producers when partition lag is high.

---

## **2. Fault Tolerance & Durability**

* **Replication**:

  * Each partition has a **leader** + **followers**.
  * Messages written to leader → replicated to followers.
  * Replication factor ≥3 is common for durability.
* **Producer acknowledgments (acks)**:

  * `acks=all` → strongest durability; waits for all in-sync replicas.
* **Consumer failures**:

  * **Offset management** → consumers commit offsets after processing messages.
  * **Rebalancing** → partitions redistributed among remaining consumers if one fails.
* **“Kafka is always available, sometimes consistent”** → high availability focus over strong immediate consistency.

---

## **3. Handling Retries & Errors**

* **Producer retries**:

  * Automatic retries for transient failures.
  * **Idempotent producers** → avoid duplicates when retrying.

* **Consumer retries**:

  * Kafka doesn’t provide built-in retries.
  * Common patterns:

    * **Dead Letter Queue (DLQ)** → move failed messages for later processing.
    * Custom retry topic → separate consumer handles failed messages.

---

## **4. Performance Optimizations**

* **Batching** → send multiple messages in one network call.
* **Compression** → GZIP, Snappy, LZ4 to reduce message size.
* **Partitioning** → correct key choice maximizes parallelism.

```js
// Example: batching + compression (Node.js kafkajs)
await producer.send({
  topic: 'my_topic',
  compression: CompressionTypes.GZIP,
  messages: [
    { key: 'key1', value: 'Hello, Kafka!' },
    { key: 'key2', value: 'Another message' },
  ],
});
```

---

## **5. Retention Policies**

* Configurable via `retention.ms` or `retention.bytes`.
* Default: **7 days**.
* Longer retention → higher storage costs and potential performance impact.

---

## **6. Key Interview Focus Areas**

1. **Partitioning strategy** → how to distribute load, avoid hot partitions.
2. **Fault tolerance** → replication factor, leader/follower roles, consumer offset management.
3. **Producer/consumer design** → batching, retries, DLQs.
4. **Use cases**:

   * **Message queue** → async processing, ordered processing, decoupled services.
   * **Stream processing** → real-time analytics, multi-consumer pub/sub.

---

### **Interview Tip**

* Start by discussing **partitioning and scaling**. That’s the core design decision.
* Avoid over-engineering: use Kafka **for small, frequent messages**, not for large data storage.
* Emphasize **decoupling, ordering, and fault tolerance** in your answers.

---

If you want, I can make a **single-page visual cheat sheet for Kafka** showing **producers → topics → partitions → brokers → consumer groups**, including replication and hot-partition strategies. This is a great diagram to have in interviews.

Do you want me to make that diagram?
