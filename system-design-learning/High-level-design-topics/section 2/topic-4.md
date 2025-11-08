Got it — you want me to **restart the API Design section from the beginning**, but in the **same rich, conceptual, interview-sharp style** as the Networking notes. Not bullet-only, not too short, not flowery.

**This is the rewritten, deeper, structured version — starting fresh.**

---

# **API DESIGN (Deep System Design Notes)**

In system design interviews, after identifying the **core problem and components**, the next step is defining **how clients interact with your system**.
This is the **API design layer**, and even though the step is short (usually 2–5 minutes), it signals **whether you know how to design clean, scalable interfaces**.

Most interviewers **do not** expect API perfection.
They want to see:

1. You can identify **proper resources**
2. You use **consistent URL and method patterns**
3. You choose **REST / GraphQL / gRPC** for a **reason**, not randomly
4. You understand **pagination, versioning, security, and rate limiting**

Your goal is to show that **your API design scales**, is **easy to extend**, and is **simple to understand**.

---

# **1. Choosing API Type (REST vs GraphQL vs gRPC)**

The API type depends on:

* Who is calling your API (client/browser/mobile/service)
* The amount and shape of data needed
* Performance requirements

### **REST (Default Choice)**

**What it does:**
Represents system entities as **resources**, accessed using standard HTTP verbs.

**Why it’s used:**

* Maps cleanly to CRUD logic
* Easy to reason about
* Universal browser/mobile/tool support

**When to choose it:**
→ **Almost always**, unless there is a specific reason not to.

---

### **GraphQL**

**What problem it solves:**
Avoids **over-fetching** (too much data returned) and **under-fetching** (needing multiple requests).

Example:

* Mobile app only needs: event name + date
* Web dashboard needs: full venue, pricing, sections, availability

With REST → need multiple endpoints or oversized responses
With GraphQL → **client chooses** exactly what it needs.

**When to choose (interview signal):**

* Different clients need **different slices** of data
* You hear the words “avoid over-fetching / under-fetching”
* Rapid UI iteration, especially **mobile**

---

### **gRPC (RPC)**

**What problem it solves:**
High performance **internal service-to-service communication**.

Uses:

* **HTTP/2** (streaming)
* **Protobuf** (binary, compact)

**Why it matters:**
REST is too slow and heavy for microservices calling each other frequently.

**When to choose:**

* Internal **microservice architecture**
* High throughput / low latency paths
* Polyglot (multiple languages in backend)

**Not used for:** browser/public clients.

---

# **2. REST API Design (Core Interview Focus)**

## **Resource Modeling**

Identify **nouns**, not actions.

For a ticketing system:

* Event
* Venue
* Ticket
* Booking

These become your resource endpoints:

```
GET /events
GET /events/{id}
POST /events/{id}/bookings
GET /bookings/{id}
```

### **Key Principle**

> **If you are naming endpoints after verbs, you're doing it wrong.**

❌ `POST /createBooking`
✅ `POST /events/{id}/bookings`

---

## **3. HTTP Methods & Idempotency**

| Method     | Meaning                | Idempotent? | Example                    | Notes                      |
| ---------- | ---------------------- | ----------- | -------------------------- | -------------------------- |
| **GET**    | Retrieve data          | ✅ Yes       | `GET /events/42`           | Never changes state        |
| **POST**   | Create resource        | ❌ No        | `POST /events/42/bookings` | Retry can cause duplicates |
| **PUT**    | Replace resource fully | ✅ Yes       | `PUT /users/17`            | Client sends full object   |
| **PATCH**  | Partial update         | ✅ Yes       | `PATCH /users/17`          | More efficient than PUT    |
| **DELETE** | Remove resource        | ✅ Yes       | `DELETE /bookings/88`      | Safe to retry              |

### **Interview Insight**

> **POST is not idempotent, so you must consider retry safety.**

This leads to:

* **Idempotency keys** for payment-like operations (covered soon).

---

## **4. How to Pass Data in REST APIs**

| Where Data Goes  | Used For                             | Example                       | Why                     |
| ---------------- | ------------------------------------ | ----------------------------- | ----------------------- |
| **Path Param**   | Identifies a specific resource       | `/events/42`                  | Required identifier     |
| **Query Param**  | Filtering / searching / toggles      | `/events?city=NYC&date=today` | Optional refinements    |
| **Request Body** | Create/update data & object payloads | `{ "tickets": [...] }`        | Complex structured data |

### Example Combining Them

```
POST /events/42/bookings?send_confirmation=true
{
  "tickets": [
    { "section": "VIP", "quantity": 2 }
  ],
  "payment_method": "credit_card"
}
```

---

## **5. API Responses**

| Status Code                   | Meaning                   | When Used                |
| ----------------------------- | ------------------------- | ------------------------ |
| **200 OK**                    | Request successful        | GET                      |
| **201 Created**               | Resource created          | POST                     |
| **400 Bad Request**           | Client sent invalid data  | Validation errors        |
| **401 Unauthorized**          | Not logged in             | Missing/expired auth     |
| **403 Forbidden**             | Logged in but not allowed | Role or permission issue |
| **404 Not Found**             | Resource missing          | Wrong ID                 |
| **500 Internal Server Error** | Something broke           | Server failure           |

---

# **6. Pagination (Expanded Detail)**

## **Why Pagination Exists**

Some API responses can be **very large**.
Clients do not need all records at once.

Pagination:

* Reduces **latency**
* Reduces **DB load**
* Reduces **network transfer size**

---

## **Offset-Based Pagination**

```
GET /events?offset=60&limit=20
```

**Good for:**

* Admin dashboards
* Simple browsing UI

**Problem:**
If data changes while paginating → **rows shift**, causing:

* Duplicates
* Skipped rows

Also **slow for large tables** (database must count + skip rows).

---

## **Cursor-Based Pagination (Preferred at Scale)**

Instead of numbers, it uses **a pointer** to last record returned.

```
GET /events?cursor=evt_987xyz&limit=20
```

The API returns:

```
{
  "events": [...],
  "next_cursor": "evt_987xyz"
}
```

**Advantages:**

* Stable while data changes
* Efficient for large tables
* Natural fit for **time-sorted or ID-sorted** data

**When used in interviews:**
→ When dataset is **very large** or **real-time changing**, say:

> “I’ll use cursor-based pagination to ensure stability and efficiency.”

---

# **7. Rate Limiting & Throttling (Highly Interview-Relevant)**

## **Why It Exists**

To prevent:

* Abuse (bot floods, DDOS behavior)
* Accidental overload (buggy client loops)
* Cost escalation (API calls often cost money)

Rate limiting protects your system.

---

## **Two Key Concepts**

| Concept           | Meaning                                               | Example                            |
| ----------------- | ----------------------------------------------------- | ---------------------------------- |
| **Rate Limiting** | Max operations allowed in a time window               | “100 requests per minute per user” |
| **Throttling**    | Slowing down / delaying requests instead of rejecting | Queue + gradual release            |

---

## **How Rate Limiting Is Implemented**

### **Token Bucket (Most Common — Mention in Interview)**

* Bucket holds **tokens**
* Each request **consumes** one token
* Tokens refill at fixed rate
* If bucket empty → reject or queue request

This supports **bursts** but protects sustained overload.

---

### **Where Rate Limiting Is Applied**

| Layer                                 | Example                               | Why                                   |
| ------------------------------------- | ------------------------------------- | ------------------------------------- |
| **API Gateway / CDN / Load Balancer** | CloudFront, NGINX, Envoy              | Stops traffic before reaching backend |
| **Application Layer**                 | Express middleware / Django decorator | Fine-grained controls                 |
| **Database Query Layer**              | Query blocker                         | Protects DB from overload             |

---

## **Return Code**

When limit exceeded, return:

```
429 Too Many Requests
Retry-After: 30
```

---

## **Interview Sentence (Use This Exactly)**

> “To prevent abuse and ensure fairness, I will add rate limiting using a token bucket algorithm at the API gateway. When the limit is exceeded, we return HTTP 429 with a Retry-After header. For critical operations, we include idempotency keys to ensure retries don’t duplicate state changes.”

Great — continuing in the **same depth + clarity style** with:

**(1) Authentication & Authorization**
**(2) API Versioning Strategies**

---

# **1. Authentication & Authorization (In-Depth)**

Security is a required piece of API design.
Even if the interviewer doesn’t explicitly ask, **mentioning auth shows maturity**.

There are **two separate concerns**:

| Concept            | Meaning                                   | Example                              |
| ------------------ | ----------------------------------------- | ------------------------------------ |
| **Authentication** | Who are you? (identity)                   | Login, session, JWT                  |
| **Authorization**  | What are you allowed to do? (permissions) | Customer cannot view admin dashboard |

---

## **A) Authentication Methods**

### **i) JWT (JSON Web Tokens)** — *Most common for user-facing apps*

**What Problem It Solves:**
Avoids server-side session storage. Each request carries its own authentication info.

**How It Works:**

* User logs in → server creates JWT containing user ID + role + expiration
* JWT is **signed** (cannot be tampered with)
* Client sends the JWT in the `Authorization: Bearer token` header
* Server validates signature → trusts the request

**Example JWT Payload** *(readable part — before signature)*:

```json
{
  "user_id": "12345",
  "email": "john@site.com",
  "role": "customer",
  "exp": 1735689600
}
```

### **Why It’s Good in Distributed Systems**

> Any microservice can validate the token **without calling the auth service**.

This reduces latency and removes bottlenecks.

### **Interview Use Sentence**

> “We’ll use JWT for stateless user authentication. The server validates the token signature on each request — no server-side session store required.”

---

### **ii) API Keys** — *Used for service-to-service communication*

**What Problem It Solves:**
Machines (cron jobs, backend services) need simple authentication not tied to individual users.

**Characteristics**

* Long, random key generated by backend
* Sent in request header:

```
Authorization: Bearer API_KEY_HERE
```

* Stored in DB and validated on each request

**Use Case Examples**

* Booking service → Payment service
* Mobile backend → Analytics ingestion service

**Interview Signal**
If communication is **internal**, say API keys.

---

## **B) Authorization (Who is allowed to do what)**

The most common model = **RBAC (Role-Based Access Control)**

### Example Roles

| Role              | Can Do                                        |
| ----------------- | --------------------------------------------- |
| **Customer**      | Create/view own bookings only                 |
| **Venue Manager** | Create events & view sales for *their* venues |
| **Admin**         | Full access                                   |

### Server-side check example:

```
GET /bookings/987
→ Check JWT user_id matches booking.user_id
→ Otherwise: 403 Forbidden
```

### Interview Sentence

> “Authentication verifies identity. Authorization checks permissions for the requested resource. We’ll use RBAC enforced at the API layer.”

---

# **2. API VERSIONING (How to Evolve APIs Without Breaking Clients)**

Real systems **change**:

* You add new fields
* You change validation rules
* Old clients keep calling old formats

So your API must be **backward compatible**.

---

## **Why Versioning Matters**

You **cannot force all clients to upgrade instantly**.

Especially true for:

* Mobile apps (users update slowly)
* External partners (external API users)
* Long-lived browser sessions

---

## **Versioning Strategies**

### **A) URL Versioning (Most Common & Interview-Safe)**

Version is part of the endpoint path.

```
GET /v1/events/123
GET /v2/events/123
```

**Pros**

* Very clear
* Easy to route
* Easy to test & debug

**Cons**

* Can lead to parallel logic in backend

**Interview Recommendation → Default to this.**

---

### **B) Header-Based Versioning**

Client sends version in `Accept` header:

```
Accept: application/vnd.example.v2+json
```

**Pros**

* Cleaner URLs

**Cons**

* Harder to debug manually
* Less common in interviews unless interviewer pushes it

---

### **C) Deprecation Strategy**

When moving from v1 → v2:

1. Deploy v2
2. Support both versions for a while
3. Send deprecation warnings in response headers
4. Eventually remove v1

**Interview Sentence**

> “We’ll introduce v2 alongside v1 and gradually migrate clients. v1 remains active until traffic to it drops below threshold.”

---

# **How to Say It Smoothly in Interviews**

When you reach the **API Step**, say:

> “We’ll expose public-facing APIs as REST endpoints. Authentication will use JWT tokens, and authorization follows RBAC to enforce access control. To evolve the API safely, we’ll use URL-based versioning (e.g., `/v1/events` → `/v2/events`) so older clients continue working while new clients adopt updated semantics.”

This tells the interviewer:
✅ You understand **real-world** API lifecycles
✅ You know how to prevent **breaking clients**
✅ You think about **security + maintainability**

