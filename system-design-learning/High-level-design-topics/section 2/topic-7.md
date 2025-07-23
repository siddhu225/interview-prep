You're looking for concrete SQL and MongoDB examples for each index type and optimization pattern. I'll provide those, building upon the explanations you've already seen.

For these examples, let's continue with the `products` table/collection structure:

**SQL (Example Table - PostgreSQL/MySQL compatible syntax)**

```sql
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2),
    category VARCHAR(100),
    stock_quantity INT,
    -- For geospatial example, assuming PostGIS for PostgreSQL or MySQL Spatial Extensions
    location GEOMETRY
);

-- For text index example, assuming a column that stores text for searching
ALTER TABLE products ADD COLUMN tags_text TEXT;
-- Or for PostgreSQL, a tsvector column for full-text search
-- ALTER TABLE products ADD COLUMN tsv TSVECTOR;
```

**MongoDB (Example Document Structure)**

```javascript
{
  _id: ObjectId("..."),
  product_id: 123,
  name: "Laptop Pro X",
  description: "High performance laptop with Retina display.",
  price: 1999.99,
  category: "Electronics",
  stock_quantity: 50,
  location: { type: "Point", coordinates: [-73.9925, 40.7306] }, // GeoJSON for geospatial
  tags: ["laptop", "apple", "pro", "tech"] // Array field for text/inverted index
}
```

-----

#### 2\. Types of Indexes - Examples

  * **2.1. B-Tree Indexes (B+-Tree)**
    These are the default and most common index types.

      * **SQL Example (Standard B-Tree Index):**
        To speed up queries that search or sort by `category` or `price`:

        ```sql
        CREATE INDEX idx_products_category ON products (category);
        CREATE INDEX idx_products_price ON products (price);

        -- Example Query that would use the index:
        SELECT * FROM products WHERE category = 'Electronics' ORDER BY price DESC;
        ```

      * **MongoDB Example (Default B-Tree Index):**
        MongoDB's `createIndex()` method by default creates a B-tree index.
        To speed up queries on `category` or to sort by `price`:

        ```javascript
        db.products.createIndex({ category: 1 }); // Ascending order
        db.products.createIndex({ price: -1 });  // Descending order

        // Example Query that would use the index:
        db.products.find({ category: "Electronics" }).sort({ price: -1 });
        ```

  * **2.2. LSM Trees (Log-Structured Merge Trees)**
    LSM Trees are a storage engine design, not a direct index type you explicitly create with a `CREATE INDEX` command in SQL or `createIndex` in MongoDB. They are the underlying architecture for how data is written and compacted in many NoSQL databases.

      * **SQL Context:** Traditional relational databases primarily use B-Trees for indexing and storage. LSM Trees are generally not a user-selectable index type for most SQL databases.
      * **MongoDB Context:** MongoDB's default storage engine, **WiredTiger**, is an LSM-tree based engine. So, when you create any index in MongoDB, WiredTiger uses LSM-tree principles to store and manage that index (and the collection data itself). You don't "choose" an LSM index; it's the underlying mechanism of the engine.

  * **2.3. Hash Indexes**
    Primarily useful for exact equality lookups.

      * **SQL Example (Note on Compatibility):**
        Hash indexes are less common and often not directly exposed or are internally managed in many relational databases like MySQL (InnoDB uses adaptive hash indexes internally) or PostgreSQL (requires `btree_gin` or `pg_trgm` extensions, or specific storage engines for direct hash indexes).
        A generic SQL syntax example (might not work directly in all RDBMS):

        ```sql
        -- This syntax is not universally supported. PostgreSQL requires specific extensions.
        -- MySQL's InnoDB uses adaptive hash indexes internally, no explicit CREATE HASH INDEX.
        -- Some other RDBMS might support it.
        CREATE INDEX idx_products_product_id_hash ON products USING HASH (product_id);

        -- Example Query:
        SELECT * FROM products WHERE product_id = 456; -- Very fast equality lookup
        ```

      * **MongoDB Example:**
        MongoDB explicitly supports hashed indexes.

        ```javascript
        db.products.createIndex({ product_id: "hashed" });

        // Example Query:
        db.products.find({ product_id: 456 }); // Very fast equality lookup
        ```

  * **2.4. Geospatial Indexes**
    Specialized for location-based queries.

      * **SQL Example (PostGIS for PostgreSQL, or MySQL Spatial Extensions):**
        Assumes `location` column is a `GEOMETRY` or `GEOGRAPHY` type.

        ```sql
        -- PostgreSQL (using PostGIS extension)
        CREATE INDEX idx_products_location ON products USING GIST (location);

        -- MySQL (requires spatial functions and data types)
        -- CREATE SPATIAL INDEX idx_products_products_location ON products (location);

        -- Example Query (Find products within a 1000-meter radius of a point):
        SELECT * FROM products
        WHERE ST_DWithin(location, ST_SetSRID(ST_MakePoint(-73.99, 40.73), 4326), 1000);
        ```

      * **MongoDB Example:**
        MongoDB supports `2dsphere` (for Earth-like spherical geometry) and `2d` (for planar geometry) indexes.

        ```javascript
        db.products.createIndex({ location: "2dsphere" });

        // Example Query (Find products within a 1000-meter radius of a point):
        db.products.find({
          location: {
            $nearSphere: {
              $geometry: {
                type: "Point",
                coordinates: [-73.9925, 40.7306]
              },
              $maxDistance: 1000 // In meters
            }
          }
        });
        ```

  * **2.5. Inverted Indexes**
    Used for full-text search capabilities.

      * **SQL Example (PostgreSQL Full-Text Search or MySQL `FULLTEXT`):**
        You often need to prepare a text-searchable column.

        ```sql
        -- PostgreSQL (using GIN index on a tsvector column)
        ALTER TABLE products ADD COLUMN tsv_description TSVECTOR;
        UPDATE products SET tsv_description = to_tsvector('english', description || ' ' || name || ' ' || tags_text);
        CREATE INDEX idx_products_tsv_description ON products USING GIN (tsv_description);

        -- Example Query:
        SELECT name, description FROM products
        WHERE tsv_description @@ to_tsquery('english', 'high & performance');

        -- MySQL (FULLTEXT index)
        ALTER TABLE products ADD FULLTEXT(name, description, tags_text); -- Combine fields for search

        -- Example Query:
        SELECT name, description FROM products
        WHERE MATCH(name, description, tags_text) AGAINST('high performance' IN NATURAL LANGUAGE MODE);
        ```

      * **MongoDB Example:**
        MongoDB provides text indexes for full-text search.

        ```javascript
        db.products.createIndex({
          description: "text",
          name: "text",
          tags: "text" // Can index array fields too
        });
        // Alternatively, create a wildcard text index for all string fields:
        // db.products.createIndex({ "$**": "text" });

        // Example Query:
        db.products.find({
          $text: { $search: "high performance laptop" }
        });
        ```

-----

#### 3\. Index Optimization Patterns - Examples

  * **3.1. Composite Indexes (Compound/Multi-column Indexes)**
    Indexes on multiple columns, where the order of columns is crucial.

      * **SQL Example:**
        To efficiently query products by `category` and then sort/filter by `price`:

        ```sql
        CREATE INDEX idx_products_category_price ON products (category, price);

        -- Queries that benefit:
        SELECT * FROM products WHERE category = 'Electronics' AND price > 1000;
        SELECT * FROM products WHERE category = 'Electronics' ORDER BY price;
        SELECT * FROM products WHERE category = 'Electronics'; -- Benefits from the leftmost column

        -- Query that generally does NOT fully benefit (unless price is also indexed separately or full scan is cheap):
        -- SELECT * FROM products WHERE price > 1000;
        ```

      * **MongoDB Example:**
        To efficiently query products by `category` and `stock_quantity`:

        ```javascript
        db.products.createIndex({ category: 1, stock_quantity: -1 }); // category ascending, stock_quantity descending

        // Queries that benefit:
        db.products.find({ category: "Electronics", stock_quantity: { $gt: 10 } });
        db.products.find({ category: "Electronics" }).sort({ stock_quantity: -1 });
        db.products.find({ category: "Electronics" });
        ```

  * **3.2. Covering Indexes (Index-Only Scans)**
    An index that includes all fields needed by a query, so the database doesn't need to touch the main data.

      * **SQL Example (PostgreSQL/SQL Server `INCLUDE` clause, or simply a wide composite index):**
        Suppose you frequently query for product `name` and `price` based on `category`.

        ```sql
        -- PostgreSQL / SQL Server (explicit INCLUDE clause)
        CREATE INDEX idx_products_category_name_price_covering ON products (category) INCLUDE (name, price);

        -- MySQL (implicitly covered if name, price are part of a composite index used for filtering)
        -- CREATE INDEX idx_products_category_name_price_composite ON products (category, name, price);


        -- Example Query (Can be an index-only scan if the index covers all requested columns):
        SELECT name, price FROM products WHERE category = 'Electronics';
        ```

        In the SQL example, if `idx_products_category_name_price_covering` is used, the database might only read the index for `name` and `price` columns, as `category` is the indexed key and `name`, `price` are included.

      * **MongoDB Example:**
        For a query that only needs `name` and `price` when filtering by `category`, if these fields are part of the index:

        ```javascript
        db.products.createIndex({ category: 1, name: 1, price: 1 });

        // Example Query:
        db.products.find(
          { category: "Electronics" }, // Query uses 'category' from index
          { name: 1, price: 1, _id: 0 } // Projection requests only 'name' and 'price' (and explicitly excludes _id)
        );
        ```

        In this MongoDB example, if `name` and `price` are present in the index `category: 1, name: 1, price: 1`, and `_id` is explicitly excluded from the projection, MongoDB can perform an **index-only scan**, retrieving all necessary data directly from the index without accessing the full document in the collection.