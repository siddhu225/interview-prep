xHere’s a structured **“Handling Large Blobs” guide** for system design interviews, capturing the key patterns, challenges, and solutions in an interview-ready format:

---

# **Handling Large Blobs in System Design Interviews**

Large files—videos, images, PDFs—require special handling in distributed systems. The main idea is: **don’t proxy bytes through your servers**. Instead, use blob storage, presigned URLs, and CDNs.

---

## **Why Not Store Large Files in Databases?**

* Databases are optimized for structured data, **not large binary objects**.

* Issues with storing large blobs in DBs:

  * Query performance suffers.
  * Backups and replication become slow.
  * Even 100MB files can cripple operations.

* **Rule of Thumb:** Files >10MB or that don’t need SQL queries → put in **blob storage** (S3, GCS, Azure Blob Storage).

---

## **The Problem with Proxying Uploads / Downloads**

Typical naive approach:

```
Client → API server → Blob Storage
```

* **Bottlenecks:** servers become dumb pipes.
* **Latency & cost:** every GB goes through your compute layer.
* **Failures:** large uploads fail near the end, requiring retries.

---

## **The Solution: Direct Client Access**

Shift the server’s role from **data transfer** → **access control**.

### **1. Presigned / Temporary URLs**

* Server generates **time-limited URLs** for upload/download.
* Client interacts **directly** with storage.

**Upload example:**

```
https://mybucket.s3.amazonaws.com/uploads/user123/video.mp4
?X-Amz-Algorithm=AWS4-HMAC-SHA256
&X-Amz-Credential=...
&X-Amz-Expires=900
&X-Amz-Signature=...
```

**Key points:**

* Encodes permissions (file, size, type, expiry).
* Validated **by the storage service**, not your servers.
* Server **never touches file bytes**.

**Restrictions you can enforce:**

* `content-length-range` → prevent huge unexpected uploads
* `content-type` → enforce expected file type (images, videos, etc.)

---

### **2. Simple Direct Upload & Download**

* **Uploads:** Client PUTs directly to blob storage.
* **Downloads:** Client GETs from storage or **CDN with signed URLs**.
* **CDN advantage:** geographic distribution, caching, low latency for frequent downloads.

---

### **3. Resumable / Chunked Uploads**

Large files must support **resumable uploads**:

* Break file into **chunks** (e.g., 5MB parts in S3 multipart upload).
* Each chunk has its own presigned URL.
* Client tracks progress; if network fails, resume from failed chunks.
* After all chunks upload, call **completion endpoint** to assemble file.

**Benefits:**

* Upload failures only affect remaining chunks.
* Natural **progress tracking** for UI.
* Storage provider ensures **atomic assembly**.

---

### **4. State Synchronization**

* Metadata (filename, user, status) stored in **DB**.
* File bytes stored in **blob storage**.
* Status examples: `'pending', 'uploading', 'completed', 'failed'`.

**Challenges:**

* Race conditions: DB may show complete before file exists.
* Orphaned files: upload succeeded but client failed to notify server.
* Malicious clients: marking uploads complete without sending file.
* Network failures.

**Solutions:**

* **Client completion callback:** simple but not fully reliable.
* **Event notifications:** storage service triggers message (SNS/SQS, Pub/Sub) → update DB.
* **Reconciliation job:** periodically verify DB vs blob storage to catch stragglers.

---

### **5. Cloud Provider Equivalents**

| Feature               | AWS                                     | Google Cloud              | Azure                          |
| --------------------- | --------------------------------------- | ------------------------- | ------------------------------ |
| Temporary Upload URLs | Presigned URLs                          | Signed URLs (resumable)   | SAS tokens                     |
| Multipart Uploads     | Multipart Upload API (5MB-5GB parts)    | Resumable Uploads         | Block Blobs (4MB-100MB blocks) |
| Event Notifications   | S3 Event Notifications → Lambda/SQS/SNS | Pub/Sub → Cloud Functions | Event Grid                     |
| CDN with Signed URLs  | CloudFront                              | Cloud CDN                 | Azure CDN (SAS tokens)         |
| Cleanup Policies      | Lifecycle Rules                         | Lifecycle Management      | Lifecycle Management Policies  |

---

### **Key Interview Patterns**

1. **Direct client access to storage**

   * Server generates presigned URLs → client uploads/downloads directly.

2. **Resumable uploads**

   * Chunked transfer for large files; completion endpoint to assemble final object.

3. **Metadata + storage separation**

   * DB tracks file status; storage holds content.
   * Use events + reconciliation for consistency.

4. **CDN for distribution**

   * Cache frequently accessed files; use signed URLs for secure access.

5. **Lifecycle / cleanup policies**

   * Expire incomplete uploads automatically.

---

### **Interview Takeaways**

* Avoid overloading app servers with large blobs.

* Understand **trade-offs**:

  * Direct client upload → less server cost, better scalability, but requires state coordination.
  * CDN → faster global reads, higher cost, caching complexity.
  * Chunked uploads → higher complexity, better reliability for large files.

* Show awareness of **failure modes**, progress tracking, and distributed state synchronization.

* Mention cloud provider equivalence to demonstrate practical knowledge without memorizing SDKs.

---

This pattern is perfect for systems like:

* **YouTube / Vimeo** → large video uploads
* **Dropbox / Google Drive** → resumable file uploads with metadata
* **Instagram / TikTok** → media storage + CDN distribution

---

If you want, I can **merge this “Large Blob Handling” guide with your earlier write & read scaling patterns** into a **single, interview-ready System Design Scaling Patterns Handbook**. It would cover **reads, writes, and large file handling** in one unified reference.

Do you want me to do that next?
