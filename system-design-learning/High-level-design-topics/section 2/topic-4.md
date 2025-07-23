I have successfully browsed the URL and retrieved the content on API Design. I will now prepare detailed notes based on this content, following the established format.

---

### API Design for System Design Interviews

API (Application Programming Interface) design is a critical aspect of system design, defining how different components or services interact. In interviews, the goal isn't perfection but demonstrating a solid understanding of design principles and the ability to choose appropriate protocols and patterns.

---

#### 1. Overview of API Protocols

The article discusses three primary API protocols/paradigms, each suited for different communication needs:

* **REST (Representational State Transfer):**
    * **Nature:** The **default choice** for most web services and public APIs. It leverages standard HTTP methods and principles.
    * **Strengths:** Simple, widely understood, uses standard HTTP infrastructure (caching, proxies), highly scalable due to its stateless nature.
    * **Use Cases:** General web services, public APIs, client-server communication where a standardized, resource-oriented approach is desired.
* **GraphQL:**
    * **Nature:** A query language for APIs that allows clients to request *exactly* the data they need.
    * **Strengths:** Highly flexible data fetching, solves "under-fetching" (multiple requests for a single view) and "over-fetching" (receiving more data than needed) issues.
    * **Use Cases:** Mobile applications (where bandwidth is limited and data efficiency is crucial), diverse clients with varying data requirements, systems with rapidly evolving data schemas.
* **RPC (Remote Procedure Call):**
    * **Nature:** Allows a client to execute a function or procedure on a remote server as if it were a local call. Examples include gRPC (using Protocol Buffers and HTTP/2).
    * **Strengths:** High performance, strongly typed (with schema definitions), efficient for internal communication due to binary serialization.
    * **Use Cases:** High-performance internal service-to-service communication, especially in **microservices architectures**, where efficiency and strict contracts are prioritized.

---

#### 2. Key Aspects of REST API Design (The Default Focus)

Given REST's prevalence, the article details several important considerations for designing RESTful APIs:

* **2.1. Resource Modeling:**
    * **Principle:** Think in terms of **resources** (nouns), not actions (verbs). Resources represent entities in your system.
    * **Naming Convention:** Use **plural nouns** for resource names in URLs (e.g., `/users`, `/products`, `/events`). This represents a collection of resources.
    * **Example:** For events, the collection would be `/events`, and a specific event would be `/events/{eventId}`.

* **2.2. HTTP Methods (Verbs) and Idempotency:**
    * **Principle:** Use standard HTTP methods to represent CRUD (Create, Read, Update, Delete) operations on resources.
    * **`GET`:**
        * **Purpose:** Retrieve a resource or collection of resources.
        * **Idempotency:** **Idempotent**. Calling `GET` multiple times with the same parameters will always produce the same result (no side effects on the server state).
    * **`POST`:**
        * **Purpose:** Create a new resource within a collection.
        * **Idempotency:** **Not Idempotent**. Calling `POST` multiple times with the same payload will typically create multiple new resources.
    * **`PUT`:**
        * **Purpose:** **Completely replace** an existing resource.
        * **Idempotency:** **Idempotent**. Calling `PUT` multiple times with the same payload to the same resource ID will result in the same state (the resource is replaced with that exact representation each time).
    * **`PATCH`:**
        * **Purpose:** **Partially update** an existing resource (e.g., update only a few fields).
        * **Idempotency:** **Not inherently Idempotent** (depends on implementation). If a `PATCH` operation depends on the current state (e.g., incrementing a counter), repeated calls might yield different results. However, if it's updating specific fields to a set value, it can be designed to be idempotent.
    * **`DELETE`:**
        * **Purpose:** Remove a specified resource.
        * **Idempotency:** **Idempotent**. Calling `DELETE` multiple times on the same resource ID will result in the same state (the resource is eventually removed, subsequent deletes will still indicate it's gone).

* **2.3. Passing Data in API Requests:**
    * **Path Parameters:**
        * **Purpose:** Used for required identifiers of a specific resource or sub-resource.
        * **Placement:** Part of the URL path (e.g., `/users/{id}`, `/posts/{postId}/comments`).
    * **Query Parameters:**
        * **Purpose:** Used for optional filtering, sorting, pagination, or other non-identifying parameters.
        * **Placement:** Appended to the URL after a `?` (e.g., `/events?location=NYC&date=today`).
    * **Request Body:**
        * **Purpose:** Used for sending complex data structures, especially for `POST` and `PUT` (and sometimes `PATCH`) requests.
        * **Format:** Typically **JSON**.
        * **Example:** For a `POST /users` request, the request body would contain the new user's details (e.g., `{"name": "Alice", "email": "alice@example.com"}`).

---

#### 3. Common API Patterns

* **3.1. Pagination:** Essential for APIs returning large collections of resources.
    * **Offset-based Pagination:**
        * **Mechanism:** Uses `offset` (number of items to skip) and `limit` (number of items to return) query parameters (e.g., `/items?offset=10&limit=5`).
        * **Pros:** Simple to implement, allows jumping to any "page."
        * **Cons:** Can be inefficient for very deep pages (database has to skip many rows), prone to inconsistencies if data is added/deleted during pagination (e.g., items shifting pages).
    * **Cursor-based Pagination:**
        * **Mechanism:** Uses a `cursor` (an opaque identifier, often based on a timestamp or unique ID of the last item from the previous page) to fetch the next set of results (e.g., `/items?since_id=12345&limit=5` or `/items?after_cursor=xyz`).
        * **Pros:** More efficient for large datasets (database doesn't skip rows), more resilient to data changes (consistent results across pages).
        * **Cons:** Cannot easily jump to arbitrary pages, requires a consistent sort order.

* **3.2. Versioning:** How to manage changes to your API over time without breaking existing clients.
    * **URL Versioning (Most Common):**
        * **Mechanism:** Include the API version directly in the URL path (e.g., `/v1/users`, `/v2/users`).
        * **Pros:** Simple, explicit, clear what version is being called, easy to route.
        * **Cons:** Requires changing URLs for clients, can lead to URL proliferation.
    * **Header Versioning:** Pass the version in a custom HTTP header (e.g., `X-Api-Version: 1`).
    * **Accept Header Versioning:** Use the `Accept` header (e.g., `Accept: application/vnd.myapi.v1+json`).

---

#### 4. Security Considerations

API design must incorporate robust security measures:

* **4.1. Authentication:** Verifying the identity of the client or user making the API request.
    * **API Keys:**
        * **Mechanism:** A secret token typically passed in a header or query parameter.
        * **Use Cases:** Common for **server-to-server communication**, third-party application access (where a specific user isn't involved).
        * **Security:** Should be treated as secrets, rotated, and have appropriate permissions.
    * **JWT (JSON Web Tokens):**
        * **Mechanism:** A compact, URL-safe means of representing claims to be transferred between two parties. Tokens are typically signed (and sometimes encrypted) and contain information about the user and their permissions.
        * **Use Cases:** Primarily for **user sessions** in web and mobile applications. After authentication, the client receives a JWT and sends it with subsequent requests in an `Authorization` header.
        * **Security:** Tokens are stateless on the server, but proper signing, expiration, and invalidation strategies are crucial.
* **4.2. Authorization:** Determining what an authenticated client/user is *allowed* to do.
    * **Role-Based Access Control (RBAC):** Assigning permissions based on predefined roles (e.g., `admin`, `editor`, `viewer`). A user with the `admin` role might have permission to delete resources, while a `viewer` can only read.
* **4.3. Rate Limiting:**
    * **Purpose:** To prevent abuse, overload, and malicious attacks (like DDoS) by limiting the number of API requests a client can make within a given time period.
    * **Mechanism:** The API gateway or a dedicated rate-limiting service tracks requests per user/IP/API key and blocks or delays requests once a threshold is met.
    * **Response:** Typically returns a `429 Too Many Requests` HTTP status code.

---
By demonstrating an understanding of these API design principles, protocols, and patterns, candidates can showcase strong engineering judgment in system design interviews.