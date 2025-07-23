

#### 6. Distributed Locks

Crucial for coordinating access to shared resources in distributed systems to prevent data corruption and ensure consistency.

* **Purpose:** To guarantee that only one process or machine at a time can access a particular shared resource or execute a critical section of code in a distributed environment.
* **Mechanism:** Typically involves a shared, highly available store (like Redis or ZooKeeper) where processes "acquire" and "release" a lock.
* **Examples of Implementations:**
    * **Redis:** Can be used with `SET NX PX` command or Redlock algorithm for more robust distributed locking.
        * **Simple Example (from article):** Using `INCR` (atomic increment) on a key with a TTL (Time To Live). If `INCR` returns 1, the lock is acquired. If >1, it's already locked. `DEL` the key when done.
    * **Apache ZooKeeper:** A distributed coordination service that provides primitives like distributed locks, leader election, and configuration management. Known for its strong consistency guarantees.
* **Use Cases:** Managing shared counters, ensuring only one instance of a background job runs, implementing atomic operations across multiple services.

Unfortunately, the previously provided link for "Key Technologies" does not contain detailed explanations for "Distributed Cache" and "CDN" at the level of detail requested for continuation.

To provide you with the comprehensive notes you need for these important system design concepts, I will use general knowledge of system design key technologies.

Here are the continued detailed notes:

---

#### 7. Distributed Cache

While general caching improves performance, **distributed caches** are designed for use across multiple application servers or nodes in a distributed system, enabling scalability and high availability for cached data.

* **Examples:** Redis, Memcached, Apache Ignite, Hazelcast.
* **Purpose:**
    * **Scalability:** Allows caching to scale horizontally by adding more cache nodes.
    * **High Availability:** If one cache node fails, other nodes can still serve cached data or a replica can take over.
    * **Shared Data:** Multiple application instances can access and share the same cached data.
    * **Offload Database:** Reduces load on the primary database by serving frequently accessed data directly from the cache.
* **Mechanism:**
    * Typically consist of a cluster of cache servers.
    * Data is often sharded across these servers based on a hashing algorithm (similar to consistent hashing) to distribute keys.
    * Clients (application servers) connect to the cache cluster and can read/write data to specific keys.
* **Key Concepts (Reiterated and Expanded):**
    * **Cache Hit/Miss:**
        * **Hit:** Data is found in the cache. Faster retrieval.
        * **Miss:** Data is not found, requiring retrieval from the slower primary data store.
    * **Cache Eviction Policies:** How data is removed from the cache when it reaches its capacity.
        * **LRU (Least Recently Used):** Discards the least recently used items first.
        * **LFU (Least Frequently Used):** Discards items that have been used least often.
        * **FIFO (First In, First Out):** Discards the item that was added first.
        * **Random:** Discards a random item.
    * **Cache Invalidation Strategies:** Ensuring the data in the cache is consistent with the primary data source. This is one of the hardest problems in distributed systems ("There are only two hard things in computer science: cache invalidation and naming things.").
        * **Write-Through:** Data is written to both the cache and the primary data store simultaneously. Ensures consistency but can increase write latency.
        * **Write-Back:** Data is written only to the cache initially, and then asynchronously written to the primary data store. Faster writes, but data loss risk if the cache fails before persistence.
        * **Time-to-Live (TTL):** Cached items automatically expire after a set duration, forcing a fresh retrieval from the source. Simple, but can lead to stale data if the source updates frequently.
        * **Explicit Invalidation:** The primary data store or an update service explicitly sends a message to the cache to invalidate specific keys when data changes. Requires tight coupling.
* **Use Cases:**
    * **Session Storage:** Storing user session data for stateless web applications.
    * **Full Page Caching:** Caching entire rendered HTML pages.
    * **Database Query Results:** Caching results of expensive or frequent database queries.
    * **Leaderboards/Counters:** Storing real-time, rapidly changing aggregate data.
    * **Rate Limiting:** Using atomic operations on keys (like `INCR` in Redis) to track request counts.
* **Challenges:**
    * **Consistency:** Maintaining consistency between the cache and the primary data source, especially in a distributed environment.
    * **Cold Start:** When a cache is empty (e.g., after a restart), initial requests will be misses, leading to increased load on the database.
    * **Cache Stampede:** Many requests simultaneously miss the cache and hit the backend, leading to overload.

---

#### 8. Content Delivery Networks (CDNs)

CDNs are globally distributed networks of proxy servers and their data centers, designed to serve content to users with high availability and performance by distributing the service spatially relative to end-users.

* **Examples:** Cloudflare, Akamai, Amazon CloudFront, Google Cloud CDN.
* **Purpose:**
    * **Reduce Latency:** Deliver content from a server geographically closer to the user (Edge Location/PoP - Point of Presence).
    * **Reduce Load on Origin Server:** Offload traffic from the main application servers, especially for static assets.
    * **Improve Availability:** Provide redundancy and failover if the origin server or a specific edge location becomes unavailable.
    * **Enhance Security:** Many CDNs offer WAF (Web Application Firewall) capabilities, DDoS protection, and SSL/TLS termination.
* **Mechanism:**
    * When a user requests content (e.g., an image, a video, a static HTML file), the request is routed to the nearest CDN edge server.
    * If the content is in the edge server's cache, it's served directly to the user.
    * If not, the edge server fetches the content from the **origin server** (your main application server/storage), caches it, and then serves it to the user.
    * Subsequent requests from users near that edge location will be served from the cache.
* **Key Concepts:**
    * **Edge Locations/PoPs (Points of Presence):** Geographically distributed data centers where CDN content is cached and served from.
    * **Origin Server:** The primary server or storage (e.g., your web server, S3 bucket) where the original content resides.
    * **Cache Invalidation:** How to force edge locations to fetch fresh content from the origin (e.g., purging cached content, versioning assets).
    * **Geographical Routing:** DNS-based routing that directs users to the closest edge server.
    * **Static vs. Dynamic Content:** Primarily used for static assets (images, CSS, JS, videos) which don't change often. Some CDNs offer capabilities for caching dynamic content or using edge compute.
* **Use Cases:**
    * Serving images, videos, audio, and other media files for websites and streaming platforms.
    * Accelerating static asset delivery for web applications.
    * Distributing software updates and game assets.
    * Protecting against DDoS attacks and providing basic web security.
* **Challenges:**
    * **Cache Invalidation:** Ensuring users always get the latest version of content, especially for frequently updated assets.
    * **Cost:** Usage-based pricing can become significant for very high traffic.
    * **Configuration Complexity:** Setting up caching rules, invalidation, and custom behaviors.

---