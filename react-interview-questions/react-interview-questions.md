Great approach 👍
We’ll go **10 questions at a time**, with **clear explanations + examples**, focusing on **senior-level understanding** of React.

This set covers **Questions 1–10 (React Fundamentals)**.

---

# 1. What is the Virtual DOM, and how does React use it for performance?

The **Virtual DOM (VDOM)** is a **lightweight JavaScript representation of the real DOM**.

Instead of updating the browser DOM directly (which is slow), React:

1. Creates a **Virtual DOM tree**
2. When state/props change, React creates a **new Virtual DOM**
3. React **diffs** the old and new VDOM
4. Only the **changed parts** are updated in the real DOM

This process is called **Reconciliation**.

### Example

```jsx
function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

When `count` changes:

* React compares old `<h1>` and new `<h1>`
* Only the **text node updates**
* The rest of the DOM remains unchanged

✅ Benefit: **Minimizes expensive DOM operations**

---

# 2. What are React components? Explain functional vs class components.

Components are **reusable UI building blocks** in React.

They encapsulate:

* UI
* State
* Behavior

### Functional Components (Modern)

These are **JavaScript functions** that return JSX.

```jsx
function Welcome({ name }) {
  return <h1>Hello {name}</h1>;
}
```

Advantages:

* Simpler
* Support Hooks
* Less boilerplate

---

### Class Components (Legacy)

These use ES6 classes.

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}
```

They use lifecycle methods like:

* `componentDidMount`
* `componentDidUpdate`
* `componentWillUnmount`

Today, **functional components + hooks replaced class components**.

---

# 3. What is JSX and how does it get converted to JavaScript?

JSX stands for **JavaScript XML**.

It allows writing **HTML-like syntax inside JavaScript**.

Example:

```jsx
const element = <h1>Hello World</h1>;
```

JSX is **not understood by browsers**.

It gets transformed by **Babel** into:

```javascript
React.createElement("h1", null, "Hello World");
```

That creates a **React element object**.

---

### JSX Rules

1. Must return **one parent element**
2. Use **camelCase attributes**

Example:

```jsx
<button onClick={handleClick}>Click</button>
```

---

# 4. Explain props vs state in React

### Props

Props are **inputs passed from parent to child components**.

They are **read-only**.

Example:

```jsx
function Greeting({ name }) {
  return <h1>Hello {name}</h1>;
}

<Greeting name="John" />
```

---

### State

State is **internal data managed by the component**.

It can change over time.

```jsx
const [count, setCount] = useState(0);
```

---

### Key Difference

| Feature    | Props     | State               |
| ---------- | --------- | ------------------- |
| Mutability | Read-only | Mutable             |
| Source     | Parent    | Component itself    |
| Purpose    | Pass data | Manage dynamic data |

---

# 5. What happens internally when state changes?

When `setState` or `setCount` is called:

### Step-by-step

1. React schedules an **update**
2. Component **re-renders**
3. New **Virtual DOM** is created
4. React **diffs** with previous Virtual DOM
5. Only necessary changes applied to **real DOM**

---

### Example

```jsx
setCount(count + 1);
```

Triggers:

```
State Update
   ↓
Re-render Component
   ↓
Virtual DOM diff
   ↓
Real DOM update
```

React also **batches updates** for performance.

---

# 6. What are controlled vs uncontrolled components?

This relates to **form inputs**.

---

### Controlled Components

React **controls the input value** via state.

```jsx
function Form() {
  const [name, setName] = useState("");

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
```

Advantages:

* Easy validation
* Predictable state

---

### Uncontrolled Components

Input values are handled by the **DOM itself**.

Use `ref` to access values.

```jsx
const inputRef = useRef();

<input ref={inputRef} />
```

Access value:

```
inputRef.current.value
```

---

# 7. How does React reconciliation work?

Reconciliation is the process React uses to **update the DOM efficiently**.

Steps:

1. React compares **old Virtual DOM vs new Virtual DOM**
2. Determines **minimal changes**
3. Updates only affected nodes

Key heuristics:

### 1. Different element types → full replacement

```
<div> → <span>
```

React replaces entire node.

---

### 2. Same element type → update attributes

```
<div class="a"> → <div class="b">
```

Only class changes.

---

### 3. Lists use **keys**

Keys help React identify elements.

Example:

```jsx
items.map(item => <li key={item.id}>{item.name}</li>)
```

Without keys → inefficient updates.

---

# 8. What are keys in lists and why are they important?

Keys uniquely identify elements in a list.

Example:

```jsx
products.map(product => (
  <ProductCard key={product.id} product={product} />
))
```

React uses keys to:

* Track elements
* Avoid unnecessary re-renders
* Maintain component state

---

### Bad Example

```
key={index}
```

Problem:

If list order changes → incorrect updates.

---

### Good Example

```
key={product.id}
```

---

# 9. Explain the component lifecycle in modern React

In modern React (with hooks), lifecycle is mainly handled with **useEffect**.

Lifecycle phases:

### 1. Mount

Component created and inserted into DOM.

Equivalent to:

```
componentDidMount
```

Example:

```jsx
useEffect(() => {
  fetchData();
}, []);
```

---

### 2. Update

Runs when state/props change.

```jsx
useEffect(() => {
  console.log("count changed");
}, [count]);
```

---

### 3. Unmount

Cleanup before component removal.

```jsx
useEffect(() => {
  const id = setInterval(...);

  return () => clearInterval(id);
}, []);
```

---

# 10. What are Fragments and why are they used?

Fragments allow grouping elements **without adding extra DOM nodes**.

Bad approach:

```jsx
<div>
  <h1>Title</h1>
  <p>Description</p>
</div>
```

Adds unnecessary `<div>`.

---

Better approach:

```jsx
<>
  <h1>Title</h1>
  <p>Description</p>
</>
```

This is shorthand for:

```
React.Fragment
```

---

### Why important

* Cleaner DOM
* Avoid unnecessary wrappers
* Useful inside tables or lists

---

Great 👍 Let’s continue with **Questions 11–20 (React Hooks)** for **React**.
Hooks are **very heavily tested in senior React interviews**, especially `useEffect`, `useMemo`, and `useCallback`.

---

# 11. What are React Hooks, and why were they introduced?

Hooks allow **functional components to use React features like state and lifecycle methods**.

Before Hooks, only **class components** could use:

* state
* lifecycle methods
* complex logic reuse

Hooks were introduced to:

1. **Remove class components**
2. **Reuse logic easily**
3. **Simplify component structure**

---

### Example

Before Hooks (Class):

```jsx
class Counter extends React.Component {
  state = { count: 0 };

  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        {this.state.count}
      </button>
    );
  }
}
```

After Hooks:

```jsx
function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

Benefits:

* Less boilerplate
* Easier logic reuse
* Better readability

---

# 12. Explain useState and how state updates are batched

`useState` allows functional components to **store state**.

```jsx
const [count, setCount] = useState(0);
```

* `count` → current state
* `setCount` → function to update state

---

### State Updates Are Batched

React **groups multiple state updates together** to improve performance.

Example:

```jsx
setCount(count + 1);
setCount(count + 1);
```

Result: **count increases only by 1**

Because both updates use the **same old state**.

---

### Correct Approach

Use **functional update**:

```jsx
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

Now count increases by **2**.

---

# 13. Explain useEffect and its dependency array

`useEffect` handles **side effects** in React.

Examples of side effects:

* API calls
* subscriptions
* DOM manipulation
* timers

---

### Basic Example

```jsx
useEffect(() => {
  console.log("Component rendered");
});
```

Runs **after every render**.

---

### Dependency Array

```jsx
useEffect(() => {
  fetchProducts();
}, []);
```

`[]` means:

Run **only once after mount**.

---

### With dependencies

```jsx
useEffect(() => {
  fetchUser(userId);
}, [userId]);
```

Runs when **userId changes**.

---

# 14. Difference between useEffect vs useLayoutEffect

Both run **after DOM updates**, but timing differs.

---

### useEffect

Runs **after browser paint**.

```
Render → DOM update → Paint → useEffect
```

Example:

* API calls
* analytics
* logging

---

### useLayoutEffect

Runs **before browser paint**.

```
Render → DOM update → useLayoutEffect → Paint
```

Example:

* measuring DOM size
* layout adjustments

---

### Example

```jsx
useLayoutEffect(() => {
  const height = ref.current.offsetHeight;
}, []);
```

---

### Rule of thumb

Use **useEffect by default**.

Use **useLayoutEffect only when necessary**.

---

# 15. What are custom hooks and when should you create them?

Custom hooks allow **reusing stateful logic across components**.

Rule:

Custom hooks **must start with `use`**.

---

### Example

Create hook:

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData);
  }, [url]);

  return data;
}
```

Use it:

```jsx
const products = useFetch("/api/products");
```

---

### Benefits

* Logic reuse
* Cleaner components
* Better separation of concerns

---

# 16. Explain useRef and its use cases

`useRef` provides a **mutable reference object**.

```jsx
const inputRef = useRef();
```

It persists across renders **without triggering re-renders**.

---

### Use Case 1 — Access DOM elements

```jsx
<input ref={inputRef} />

inputRef.current.focus();
```

---

### Use Case 2 — Store mutable values

```jsx
const renderCount = useRef(0);

renderCount.current++;
```

Useful for:

* timers
* previous state
* caching values

---

# 17. What does useMemo do and when should you use it?

`useMemo` **memoizes expensive calculations**.

It prevents recalculating values unless dependencies change.

---

### Example

```jsx
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

Without `useMemo`, `heavyCalculation` runs **every render**.

---

### Good Use Cases

* large list filtering
* sorting
* expensive computations

Example:

```jsx
const filteredProducts = useMemo(() => {
  return products.filter(p => p.price < maxPrice);
}, [products, maxPrice]);
```

---

# 18. What does useCallback do?

`useCallback` memoizes **functions**.

It prevents function recreation on every render.

---

### Example

```jsx
const handleClick = useCallback(() => {
  console.log("clicked");
}, []);
```

---

### Why it matters

When passing functions to child components:

```jsx
<Child onClick={handleClick} />
```

Without `useCallback`, child components may **re-render unnecessarily**.

---

### Difference

| Hook        | Memoizes |
| ----------- | -------- |
| useMemo     | value    |
| useCallback | function |

---

# 19. Explain useContext and how it works with Context API

`useContext` allows components to **consume context values**.

Used with **React Context API**.

---

### Step 1 — Create Context

```jsx
const ThemeContext = React.createContext();
```

---

### Step 2 — Provide value

```jsx
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>
```

---

### Step 3 — Consume context

```jsx
const theme = useContext(ThemeContext);
```

---

### Use Cases

* authentication
* theme
* language settings

---

# 20. What problems occur if dependencies are missing in useEffect?

Missing dependencies cause **stale data bugs**.

---

### Example Problem

```jsx
useEffect(() => {
  console.log(count);
}, []);
```

If `count` changes → effect **won't run again**.

This leads to **stale closures**.

---

### Correct Version

```jsx
useEffect(() => {
  console.log(count);
}, [count]);
```

---

### ESLint Rule

React recommends using:

```
eslint-plugin-react-hooks
```

Which warns about missing dependencies.

---

### Common Senior-Level Bug

```
useEffect(() => {
 fetchData(userId)
}, [])
```

If `userId` changes → effect still uses **old value**.

---

In **React**, the **component lifecycle** describes the different phases a component goes through from **creation → update → removal**.

Originally this was handled with **class lifecycle methods**, but in modern React it’s handled mainly using **Hooks like `useEffect`**.

Let’s break it down clearly.

---

# 1. React Lifecycle Phases

React components go through **three main phases**:

```
Mounting → Updating → Unmounting
```

| Phase      | Meaning                                          |
| ---------- | ------------------------------------------------ |
| Mounting   | Component is created and inserted into the DOM   |
| Updating   | Component re-renders because state/props changed |
| Unmounting | Component is removed from the DOM                |

---

# 2. Lifecycle in Class Components (Traditional)

### Mounting Phase

Methods called when component first loads.

1️⃣ **constructor()**

* Initializes state
* Binds methods

```jsx
constructor(props) {
  super(props);
  this.state = { count: 0 };
}
```

---

2️⃣ **componentDidMount()**

Runs **after component is added to the DOM**.

Common uses:

* API calls
* Subscriptions
* DOM manipulation

Example:

```jsx
componentDidMount() {
  fetch("/api/products")
    .then(res => res.json())
    .then(data => this.setState({ products: data }));
}
```

---

### Updating Phase

Runs when **state or props change**.

3️⃣ **shouldComponentUpdate()**

Controls whether component should re-render.

```jsx
shouldComponentUpdate(nextProps, nextState) {
  return nextState.count !== this.state.count;
}
```

Used for **performance optimization**.

---

4️⃣ **componentDidUpdate()**

Runs after component updates.

Example:

```jsx
componentDidUpdate(prevProps) {
  if (prevProps.userId !== this.props.userId) {
    fetchUser(this.props.userId);
  }
}
```

---

### Unmounting Phase

5️⃣ **componentWillUnmount()**

Runs when component is removed.

Used for cleanup:

* remove event listeners
* clear timers
* cancel subscriptions

```jsx
componentWillUnmount() {
  clearInterval(this.timer);
}
```

---

# 3. Lifecycle in Functional Components (Hooks)

Modern React replaces lifecycle methods with **Hooks**.

Main hook: **`useEffect`**

---

## Mounting Equivalent

Run once when component loads.

```jsx
useEffect(() => {
  console.log("Component mounted");
}, []);
```

`[]` → empty dependency array.

---

## Updating Equivalent

Run when specific values change.

```jsx
useEffect(() => {
  console.log("count changed");
}, [count]);
```

Runs when **count changes**.

---

## Unmounting Equivalent

Return a **cleanup function**.

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Running...");
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}, []);
```

Cleanup runs when component unmounts.

---

# 4. Full Lifecycle Flow (Functional Component)

Example:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Mounted or updated");

    return () => {
      console.log("Cleanup before next effect");
    };
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

Flow:

```
Initial render
↓
useEffect runs (mount)

State change
↓
Cleanup runs
↓
useEffect runs again (update)

Component removed
↓
Cleanup runs (unmount)
```

---

# 5. Lifecycle Comparison

| Class Lifecycle      | Hooks Equivalent              |
| -------------------- | ----------------------------- |
| componentDidMount    | useEffect(() => {}, [])       |
| componentDidUpdate   | useEffect(() => {}, [deps])   |
| componentWillUnmount | cleanup function in useEffect |

---

# 6. Senior-Level Insight

A common mistake is **misunderstanding when `useEffect` runs**.

Example:

```jsx
useEffect(() => {
  fetchData();
});
```

This runs **on every render** ❌

Correct:

```jsx
useEffect(() => {
  fetchData();
}, []);
```

Runs **once on mount** ✅

---

# 7. Advanced Lifecycle Hooks

Some additional hooks related to lifecycle:

| Hook               | Purpose                       |
| ------------------ | ----------------------------- |
| useEffect          | side effects                  |
| useLayoutEffect    | runs before browser paint     |
| useInsertionEffect | CSS-in-JS libraries           |
| useRef             | persist values across renders |

---

# 8. Real Senior Interview Question

Often asked:

> "Why does `useEffect` cleanup run before the next effect?"

Because React ensures **previous side effects are cleaned up before applying new ones**, preventing:

* memory leaks
* duplicate subscriptions
* incorrect timers

---


Great 👍 Let’s continue with **Questions 21–30**, which focus on **State Management and Architecture** in **React** applications.
These questions are **very common for senior React engineers**, especially in large-scale apps.

---

# 21. What is the Context API and when should it be used?

The **Context API** allows sharing data **across multiple components without passing props manually (prop drilling).**

Normally:

```
App → Parent → Child → GrandChild
```

You must pass props through every level.

Context lets components **access shared data directly**.

---

### Example

Create context:

```jsx
const ThemeContext = React.createContext();
```

Provide value:

```jsx
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>
```

Consume context:

```jsx
const theme = useContext(ThemeContext);
```

---

### When to use Context

Good for **global UI state**:

* Theme
* Authentication
* Language
* User settings

---

### When NOT to use Context

For **frequently changing complex state**, because it can cause many re-renders.

Example:

* large product lists
* chat messages
* heavy data updates

For those, use **Redux** or similar.

---

# 22. When should you avoid Context API?

Context should be avoided when:

### 1️⃣ State updates frequently

Every update triggers **all consumers to re-render**.

Example:

```
Cart items updating frequently
```

Better solution: Redux.

---

### 2️⃣ Very large applications

Context becomes hard to manage if:

* many contexts
* complex logic
* nested providers

---

### 3️⃣ Performance-sensitive components

Because **context updates propagate down the tree**.

---

### Senior Solution

Use **Context + custom hooks + memoization**.

Example:

```
AuthContext
ThemeContext
SettingsContext
```

---

# 23. Compare Context API vs Redux

Both manage **global state**, but they serve different purposes.

| Feature     | Context API          | Redux      |
| ----------- | -------------------- | ---------- |
| Setup       | Simple               | More setup |
| State size  | Small                | Large      |
| Performance | Can cause re-renders | Optimized  |
| Debugging   | Basic                | DevTools   |
| Middleware  | No                   | Yes        |

---

### Context Example

```
Theme
Auth
Language
```

---

### Redux Example

```
Cart
Orders
Products
Notifications
```

Most production apps combine both.

---

# 24. How does Redux state flow work?

Redux uses **unidirectional data flow**.

Flow:

```
Component
 ↓
Dispatch Action
 ↓
Reducer updates state
 ↓
Store updates
 ↓
UI re-renders
```

---

### Example

Action:

```javascript
dispatch(addItem(product));
```

Reducer:

```javascript
addItem: (state, action) => {
  state.cart.push(action.payload);
}
```

Store:

Holds the **entire application state**.

---

### Benefits

* predictable state updates
* centralized state
* easier debugging

---

# 25. What is Redux Toolkit and why is it recommended?

**Redux Toolkit** is the **official modern way to write Redux**.

Old Redux required:

* boilerplate
* action types
* action creators
* reducers separately

Redux Toolkit simplifies everything.

---

### Example

```javascript
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    }
  }
});
```

No need for:

```
switch(action.type)
```

---

### Benefits

* less boilerplate
* built-in best practices
* includes middleware

---

# 26. Explain reducers, actions, and the store in Redux

### Store

The **central state container**.

Example state:

```javascript
{
  cart: [],
  user: {},
  products: []
}
```

---

### Actions

Actions describe **what happened**.

Example:

```javascript
{
  type: "cart/addItem",
  payload: product
}
```

---

### Reducers

Reducers define **how state changes**.

Example:

```javascript
function cartReducer(state, action) {
  switch(action.type) {
    case "cart/addItem":
      return [...state, action.payload];
  }
}
```

Reducers must be:

* pure functions
* immutable

---

# 27. What are selectors in Redux?

Selectors are **functions used to extract specific data from the store**.

Example:

```javascript
const selectCartItems = (state) => state.cart;
```

Usage:

```javascript
const cartItems = useSelector(selectCartItems);
```

---

### Benefits

* reusable
* easier state access
* improves performance

Advanced selectors use **memoization**.

Library often used:

```
reselect
```

---

# 28. How do you handle async operations in Redux?

Async operations include:

* API calls
* database calls
* delayed actions

Redux handles them using **middleware**.

Common solution: **Redux Thunk**

---

### Example

```javascript
export const fetchProducts = () => async (dispatch) => {
  const response = await fetch("/api/products");
  const data = await response.json();

  dispatch(setProducts(data));
};
```

Redux Toolkit includes:

```
createAsyncThunk
```

---

### Example

```javascript
const fetchProducts = createAsyncThunk(
  "products/fetch",
  async () => {
    const res = await fetch("/api/products");
    return res.json();
  }
);
```

---

# 29. What are middleware in Redux?

Middleware sits **between dispatch and reducer**.

```
Component
 ↓
Middleware
 ↓
Reducer
```

Used for:

* logging
* async requests
* error handling

---

### Example

Logger middleware:

```javascript
const logger = store => next => action => {
  console.log(action);
  return next(action);
};
```

---

Common middleware:

* Redux Thunk
* Redux Saga
* Logger

---

# 30. When would you choose Zustand or Recoil instead of Redux?

Modern apps sometimes prefer lighter state libraries.

Examples:

* Zustand
* Recoil

---

### Zustand

Advantages:

* minimal boilerplate
* simple API
* no providers required

Example:

```javascript
const useStore = create((set) => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 }))
}));
```

---

### Recoil

Uses **atoms and selectors**.

Better for:

* complex derived state
* dependency graphs

---

### When Redux is still better

* very large applications
* strict architecture
* complex middleware

Great 👍 Let’s continue with **Questions 31–40**, which focus on **Performance Optimization in React**.

Performance is a **very important topic for Senior React Engineers**, because large applications can suffer from unnecessary re-renders and heavy computations.

---

# 31. How does React.memo work?

`React.memo` is a **higher-order component** that prevents **unnecessary re-renders**.

Normally, when a parent component re-renders, **all child components re-render**.

`React.memo` tells React:

> Only re-render this component if its props change.

---

### Example

```jsx
const ProductCard = React.memo(({ product }) => {
  console.log("Rendering product");
  return <div>{product.name}</div>;
});
```

Now if the parent re-renders but `product` hasn’t changed, the component **will not re-render**.

---

### Important

`React.memo` does **shallow comparison of props**.

If props are objects/functions recreated each render, it may still re-render.

---

### When to use

Good for:

* list items
* complex UI components
* frequently re-rendered parents

---

# 32. Difference between useMemo vs useCallback

Both optimize performance by **memoizing values**, but they serve different purposes.

| Hook        | Memoizes       |
| ----------- | -------------- |
| useMemo     | Computed value |
| useCallback | Function       |

---

### useMemo Example

```jsx
const filteredProducts = useMemo(() => {
  return products.filter(p => p.price < maxPrice);
}, [products, maxPrice]);
```

Avoids recalculating filtering every render.

---

### useCallback Example

```jsx
const handleAdd = useCallback(() => {
  dispatch(addItem(product));
}, [product]);
```

Prevents function recreation.

---

### Key difference

```
useMemo → returns value
useCallback → returns function
```

---

# 33. What causes unnecessary re-renders in React?

Common causes include:

### 1. Parent re-rendering

Child components automatically re-render.

---

### 2. New object references

Example:

```jsx
<Child config={{ theme: "dark" }} />
```

Object recreated every render → child re-renders.

---

### 3. Inline functions

```jsx
<button onClick={() => handleClick()} />
```

New function created each render.

---

### 4. Context updates

All context consumers re-render when value changes.

---

### How to prevent them

* `React.memo`
* `useMemo`
* `useCallback`
* splitting components

---

# 34. How would you optimize large list rendering?

Rendering **thousands of items** can slow the UI.

Best solution: **Virtualization**

Render only items visible on screen.

Libraries:

* react-window
* react-virtualized

---

### Example idea

Instead of rendering:

```
10,000 products
```

Render:

```
Only ~20 visible products
```

Huge performance improvement.

---

# 35. Explain code splitting in React

Code splitting divides the app into **smaller chunks** that load only when needed.

Without it:

```
Single large JS bundle
```

With it:

```
Multiple smaller bundles
```

This improves **initial load time**.

---

### Example

Using dynamic import:

```jsx
const AdminPage = React.lazy(() => import("./AdminPage"));
```

Now the admin page loads **only when needed**.

---

# 36. What is lazy loading using React.lazy?

`React.lazy` allows loading components **only when they are rendered**.

Example:

```jsx
const Dashboard = React.lazy(() => import("./Dashboard"));
```

Must be used with **Suspense**.

```jsx
<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
```

---

Benefits:

* smaller initial bundle
* faster page load
* better performance

---

# 37. How does Suspense work?

`Suspense` lets React **pause rendering until something loads**.

Common uses:

* lazy-loaded components
* data fetching (future React features)

Example:

```jsx
<Suspense fallback={<Spinner />}>
  <Profile />
</Suspense>
```

Flow:

```
Component loading
↓
Fallback shown
↓
Component loaded
↓
Render actual component
```

---

# 38. What is debouncing and throttling?

Both control **how often a function runs**.

---

### Debouncing

Waits until user **stops typing** before executing.

Example: search input.

```
User typing
↓
Delay
↓
API request
```

Example:

```javascript
debounce(search, 500)
```

---

### Throttling

Limits function to **run at most once in a time interval**.

Example:

* scroll events
* resize events

```
Run every 500ms
```

---

### Libraries often used

* lodash
* custom hooks

---

# 39. How do you optimize API-heavy components?

Strategies:

### 1. Caching data

Use libraries like:

* React Query
* SWR

---

### 2. Debouncing requests

Avoid too many API calls.

Example:

Search bar.

---

### 3. Pagination / infinite scroll

Avoid loading large datasets.

---

### 4. Memoizing results

Prevent unnecessary re-computation.

---

### 5. Parallel API calls

Use `Promise.all`.

---

# 40. What tools can you use to measure React performance?

### 1. React Developer Tools Profiler

Available in browser extension.

Shows:

* component render times
* unnecessary renders

---

### 2. Chrome Performance Tab

Analyze:

* CPU usage
* rendering performance
* network requests

---

### 3. Lighthouse

Measures:

* page load speed
* bundle size
* performance metrics

---

### 4. Web Vitals

Measures real user metrics:

* LCP
* FID
* CLS

---

### Example

Use profiler to detect:

```
Component re-rendering 200 times
```

Then fix using:

```
React.memo
useMemo
```

---

Perfect 👍 Let’s continue with **Questions 41–50**, which focus on **React Architecture and Component Design Patterns** — very important for **senior React engineers** who build **scalable applications**.

---

# 41. What is the container vs presentational component pattern?

A classic **React design pattern** for separation of concerns.

---

### Presentational Components

* Concerned with **UI only**
* Receive data via **props**
* Do not handle state (or minimal local state)
* Often **stateless functional components**

Example:

```jsx id="pc7mvh"
const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);
```

---

### Container Components

* Concerned with **logic and data fetching**
* Pass props to presentational components
* Can be stateful

Example:

```jsx id="4dqhfi"
function ButtonContainer() {
  const [count, setCount] = useState(0);

  return (
    <Button
      label={`Clicked ${count} times`}
      onClick={() => setCount(count + 1)}
    />
  );
}
```

✅ Benefit: clean separation of UI vs logic

---

# 42. What is prop drilling and how do you avoid it?

**Prop drilling**: Passing props through multiple layers of components unnecessarily.

Example:

```
App → Parent → Child → GrandChild → GreatGrandChild
```

GrandChild only needs `user` prop from App → tedious to pass.

---

### How to avoid

1. **Context API**

```jsx id="j0tqyd"
const UserContext = createContext();
```

2. **State management libraries** (Redux, Zustand, Recoil)

3. **Composition patterns** (render props, HOCs)

---

# 43. Explain compound components pattern

Allows components to **share implicit state** without prop drilling.

Example: Tabs

```jsx id="xktvc2"
<Tabs>
  <Tabs.List>
    <Tabs.Tab>Tab 1</Tabs.Tab>
    <Tabs.Tab>Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panels>
    <Tabs.Panel>Content 1</Tabs.Panel>
    <Tabs.Panel>Content 2</Tabs.Panel>
  </Tabs.Panels>
</Tabs>
```

* Tabs component manages state internally
* Child components **automatically consume context**

✅ Clean and flexible API for users

---

# 44. What are higher-order components (HOCs)?

HOC = function that **takes a component and returns a new component**.

Used to **reuse logic across components**.

---

### Example

```jsx id="6yqv2s"
function withLogging(WrappedComponent) {
  return function(props) {
    console.log("Rendering", WrappedComponent.name);
    return <WrappedComponent {...props} />;
  };
}

const LoggedButton = withLogging(Button);
```

---

### Use cases

* authentication
* data fetching
* analytics logging

---

# 45. What are render props?

Render props = **a component that takes a function as a prop** to determine what to render.

---

### Example

```jsx id="rwe6o7"
function MouseTracker({ render }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}>
      {render(pos)}
    </div>
  );
}
```

Usage:

```jsx id="y0zwzz"
<MouseTracker render={pos => <p>{pos.x}, {pos.y}</p>} />
```

✅ Benefit: logic reuse without inheritance

---

# 46. What is feature-based folder structure?

Organize **files by feature/domain**, not by type.

---

### Example

```
src/
  auth/
    Login.jsx
    Login.css
    authSlice.js
  products/
    ProductList.jsx
    ProductCard.jsx
    productsSlice.js
```

---

Benefits:

* Easier to scale
* Grouping by domain makes ownership clear
* Reduces imports complexity

---

# 47. How do you design scalable React applications?

Key principles for **senior-level architecture**:

1. Modular components
2. Clear separation of UI vs logic
3. Feature-based folder structure
4. Use **state management** wisely (Context/Redux/Zustand)
5. Optimize performance (`React.memo`, `useMemo`, virtualization)
6. Handle error boundaries
7. Code splitting and lazy loading
8. Maintainable styling (CSS modules, Styled Components)
9. Proper testing strategy
10. Documentation and naming conventions

---

# 48. How do you manage shared logic across components?

Options:

1. **Custom Hooks**

```jsx id="kx5rcn"
function useFetch(url) { ... }
```

2. **HOCs**

```id="h6dsns"
withAuth(Component)
```

3. **Render Props**

```id="rc36up"
<DataFetcher render={data => <UI data={data} />} />
```

4. **Context API**

* For state shared across many components

---

# 49. How do you structure large React projects?

Senior engineers focus on **clarity and scalability**:

* Feature-based folder structure
* Separate UI components vs business logic
* Use slices/reducers per feature
* Shared utilities/helpers
* Centralized constants/config
* Testing directory structure
* Lazy loading for heavy modules
* Properly scoped CSS/styling

---

### Example

```
src/
  features/
    auth/
    products/
  components/
    ui/
    common/
  hooks/
  utils/
  services/
  store/
```

---

# 50. What are micro-frontends and when would you use them?

**Micro-frontends** = splitting a large React app into **smaller, independently deployable apps**.

* Each team owns a feature module
* Can be deployed independently
* Works well with **large-scale enterprise apps**

---

### Example

* `/dashboard` → React app A
* `/reports` → React app B
* `/settings` → React app C

All integrated into one shell app.

---

### When to use

* Large teams
* Multiple deployment cycles
* Need technology isolation
* Independent feature ownership

---

Perfect! 👍 Let’s finish with **Questions 51–55**, which focus on **Routing, Data Handling, and Error Handling** in senior-level **React** applications.

---

# 51. How does React Router work?

**React Router** manages navigation in single-page apps (SPAs) without full page reloads.

* Uses **BrowserRouter** or **HashRouter** to track the URL.
* **Route** renders components based on the current URL.
* Supports nested routes, dynamic parameters, and redirects.

### Example

```jsx id="m3l1ri"
import { BrowserRouter, Routes, Route } from "react-router-dom";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products/:id" element={<Product />} />
  </Routes>
</BrowserRouter>
```

Dynamic route:

```jsx id="w4n3v2"
<Route path="/products/:id" element={<Product />} />
```

`useParams()` hook extracts `id` inside `Product` component.

---

# 52. How do you implement protected routes?

Protected routes restrict access to **authenticated users**.

* Often use **Context API or Redux** to store auth state.

### Example

```jsx id="pj8m5y"
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/login" />;
}
```

Usage:

```jsx id="qv1u9k"
<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
```

✅ Ensures users cannot access dashboard without login.

---

# 53. What are Error Boundaries in React?

Error boundaries **catch errors in the render phase** of a component tree.

* Only class components can be error boundaries (functional support coming via libraries)
* Prevents **whole app crash**.

### Example

```jsx id="v9jdf4"
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logError(error, info);
  }

  render() {
    return this.state.hasError ? <h1>Something went wrong.</h1> : this.props.children;
  }
}
```

Usage:

```jsx id="d8jse7"
<ErrorBoundary>
  <Dashboard />
</ErrorBoundary>
```

---

# 54. How do you handle API calls efficiently in React?

Senior-level considerations:

1. **Use async hooks or libraries**:

* `useEffect` for simple fetches
* React Query or SWR for caching, retries, and deduplication

---

2. **Debounce/throttle requests**

* For search bars or live typing

---

3. **Pagination / Infinite Scroll**

* Avoid loading huge datasets

---

4. **Memoization of results**

```jsx id="m5qpxd"
const filteredData = useMemo(() => data.filter(...), [data]);
```

---

5. **Error handling and retries**

```jsx id="gz2rqv"
try {
  const res = await fetch(url);
} catch(err) {
  console.error(err);
}
```

---

# 55. What is the best way to handle stale closures in hooks?

A **stale closure** occurs when a hook captures old state or props.

Example:

```jsx id="7c2jti"
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count); // might log old value
  }, 1000);

  return () => clearInterval(timer);
}, []);
```

* Dependency array empty → uses **initial count**, not updated one

### Solutions

1. **Add state to dependencies**

```jsx id="l1fya7"
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count);
  }, 1000);

  return () => clearInterval(timer);
}, [count]);
```

2. **Use useRef to store latest state**

```jsx id="f6d7ts"
const countRef = useRef(count);

useEffect(() => {
  countRef.current = count;
});

useEffect(() => {
  const timer = setInterval(() => {
    console.log(countRef.current);
  }, 1000);

  return () => clearInterval(timer);
}, []);
```
