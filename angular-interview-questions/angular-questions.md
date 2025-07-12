Here’s a solid, **interview-ready explanation** of each Angular concept with examples and clear distinctions. These are tailored for an SDE-2 level understanding.

---

### 1. **What are the main building blocks of Angular?**

Angular is a component-based front-end framework, and its main building blocks include:

* **Modules (`NgModules`)**: Container for a cohesive block of code dedicated to an application domain or workflow. Every Angular app has at least one root module (`AppModule`).
* **Components**: Control a portion of the screen (UI). Each component consists of:

  * A TypeScript class (logic)
  * An HTML template (view)
  * CSS styles (appearance)
* **Templates**: Define the view structure using HTML with Angular syntax (e.g., `*ngIf`, `{{expression}}`).
* **Directives**: Special markers in templates that alter DOM behavior (e.g., `*ngFor`, `*ngIf`, or custom directives).
* **Services & Dependency Injection**: Used to share logic across components (e.g., HTTP calls, state management), and injected via Angular's DI system.
* **Routing**: Manages navigation between views using `RouterModule`.

> **Example**: A `UserListComponent` might display a list of users, use a `UserService` to fetch data, and be declared in a `UserModule`.

---

### 2. **What are components in Angular and how do they differ from directives?**

#### **Component**:

A component is a **directive with a template**. It controls a section of the UI and is the core building block of Angular applications.

```ts
@Component({
  selector: 'app-user',
  template: `<p>{{ user.name }}</p>`
})
export class UserComponent {
  user = { name: 'Alice' };
}
```

#### **Directive**:

Directives are instructions to the DOM. They **don't have a template**, and are used to manipulate elements, styles, or behavior.

* **Structural Directives**: Change layout by adding/removing DOM elements (`*ngIf`, `*ngFor`).
* **Attribute Directives**: Change the appearance or behavior of elements (`[ngClass]`, custom ones like `appHighlight`).

```ts
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```

> **Key Difference**: Components = Template + Logic; Directives = Only Logic (acts on existing DOM).

---

### 3. **What is a module in Angular? Explain AppModule.**

An Angular **module** is a logical boundary for a set of related components, directives, pipes, and services.

Every Angular app has at least one module — the **root module**: `AppModule`.

```ts
@NgModule({
  declarations: [AppComponent, UserComponent],
  imports: [BrowserModule, FormsModule],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

* **declarations**: Components, directives, and pipes that belong to this module.
* **imports**: Other modules required by this module (e.g., `HttpClientModule`, `CommonModule`).
* **providers**: Services available to all parts of the app.
* **bootstrap**: The root component to launch the application (typically `AppComponent`).

> Think of modules as folders that help organize and encapsulate functionality.

---

### 4. **What is the difference between declarations, imports, providers, and exports in `@NgModule`?**

| Property       | Purpose                                                                  |
| -------------- | ------------------------------------------------------------------------ |
| `declarations` | Declares components, directives, and pipes that belong to this module.   |
| `imports`      | Imports other Angular modules with components/directives/pipes/services. |
| `providers`    | Registers services with the injector for use in the module.              |
| `exports`      | Makes components/directives/pipes usable in other modules.               |

> **Example**:

```ts
@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule],
  providers: [LoggingService],
  exports: [ButtonComponent] // Allows other modules to use <app-button>
})
export class SharedModule {}
```

---

### 5. **What are Angular lifecycle hooks? Explain key hooks like `ngOnInit`, `ngAfterViewInit`.**

Here’s a complete and **interview-optimized** answer that **first covers all Angular lifecycle hooks**, then dives deeper into **key ones like `ngOnInit`, `ngAfterViewInit`, and `ngOnDestroy`**, with examples and real-world relevance.

---

### **5. What are Angular lifecycle hooks? Explain key hooks like `ngOnInit`, `ngAfterViewInit`.**

Angular lifecycle hooks are special interface methods that allow developers to tap into **specific moments** in the **life of a component or directive** — from creation to destruction.

These hooks enable better control over:

* Component initialization
* Change detection
* DOM rendering
* Cleanup tasks

---

### 🔄 **List of All Lifecycle Hooks in Order**

| Hook                      | When it’s Called                                                                  | Purpose                                     |
| ------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------- |
| `ngOnChanges()`           | Before `ngOnInit`, whenever data-bound input properties change                    | React to changes in `@Input()` values       |
| `ngOnInit()`              | Once, after the first `ngOnChanges()`                                             | Initialize the component (e.g., fetch data) |
| `ngDoCheck()`             | During every change detection run                                                 | Custom change detection logic               |
| `ngAfterContentInit()`    | After Angular projects external content into the component (e.g., `<ng-content>`) | Used in content projection                  |
| `ngAfterContentChecked()` | After every check of projected content                                            | Called after each change detection cycle    |
| `ngAfterViewInit()`       | After the component’s view (and child views) are initialized                      | Interact with child components and DOM      |
| `ngAfterViewChecked()`    | After every check of the component’s view and children                            | Called after each view update               |
| `ngOnDestroy()`           | Just before Angular destroys the component                                        | Cleanup (unsubscribe, clear timers)         |

---

### 🔑 **Key Lifecycle Hooks Explained with Use Cases**

---

#### ✅ `ngOnInit()`

* Called once after the component is initialized.
* Ideal for API calls, subscriptions, or default value assignments.

```ts
ngOnInit() {
  this.userService.getUser(this.id).subscribe(user => this.user = user);
}
```

🟢 **Use Case**: Fetch data based on route params or initialize form controls.

---

#### ✅ `ngAfterViewInit()`

* Called after the component's **view and child views** have been fully initialized.
* Perfect for direct DOM manipulation or interacting with `@ViewChild`.

```ts
@ViewChild('inputRef') inputRef: ElementRef;

ngAfterViewInit() {
  this.inputRef.nativeElement.focus();
}
```

🟢 **Use Case**: Focus input, initialize a chart, or trigger a third-party plugin after the view is ready.

---

#### ✅ `ngOnDestroy()`

* Called just before the component is removed from the DOM.
* Use this for **cleanup**: unsubscribe from Observables, remove event listeners, clear intervals.

```ts
ngOnDestroy() {
  this.subscription.unsubscribe();
  clearInterval(this.timer);
}
```

🟢 **Use Case**: Prevent memory leaks by cleaning up resources.

---

### 🔁 Bonus: When are others used?

* `ngDoCheck()` is used rarely but helpful if default Angular change detection doesn’t catch changes (e.g., deep object mutation).
* `ngAfterContentInit()` is useful for components using `<ng-content>` for content projection.
* `ngAfterViewChecked()` can be helpful for reacting to changes in the DOM, but it should be used cautiously to avoid performance issues.

---

### Summary Diagram (for easy recall):

```
ngOnChanges() → ngOnInit() → ngDoCheck()
    ↓
ngAfterContentInit() → ngAfterContentChecked()
    ↓
ngAfterViewInit() → ngAfterViewChecked()
    ↓
ngOnDestroy()
```

---

Here are detailed and **interview-ready answers** to questions 6–10, each with clear **examples**, practical explanations, and **relevant distinctions** (e.g., pure vs impure pipes, NgZone usage, etc.).

---

### **6. What is the purpose of Angular Zones (`NgZone`)?**

Angular uses **zones** (powered by the [Zone.js](https://github.com/angular/zone.js/) library) to intercept **asynchronous operations** and trigger **change detection** automatically.

#### 🔍 What is `NgZone`?

`NgZone` is a service provided by Angular that **monitors async operations** like:

* `setTimeout`
* `Promise`
* HTTP requests
* User events

It ensures that after any of these operations complete, Angular automatically runs **change detection** to update the UI.

#### ✅ Example:

```ts
constructor(private ngZone: NgZone) {}

startTask() {
  this.ngZone.runOutsideAngular(() => {
    setTimeout(() => {
      // No change detection here unless manually triggered
      this.ngZone.run(() => {
        this.status = 'Completed';
      });
    }, 1000);
  });
}
```

🟢 **Why use `runOutsideAngular()`?**

* To improve performance by skipping unnecessary change detection (e.g., during animations or long-running tasks).

---

### **7. What is a Standalone Component (Angular 14+)?**

Prior to Angular 14, every component needed to be part of an NgModule. Angular 14 introduced **Standalone Components** — a way to build components **without declaring them in a module**.

#### 🔍 Benefits:

* Simplifies component declaration and structure.
* Improves code modularity and lazy-loading.
* Reduces boilerplate from `NgModule`.

#### ✅ Example:

```ts
@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {}
```

You can now use it directly in routes:

```ts
const routes: Routes = [
  { path: 'login', component: LoginComponent }
];
```

🟢 **Use Case**: Ideal for micro frontends, feature isolation, or modern component-first architectures.

---

### **8. What are Pipes in Angular? How do you create a custom pipe?**

**Pipes** are used to **transform data** in templates.

#### ✅ Built-in Examples:

* `{{ today | date:'shortDate' }}`
* `{{ amount | currency:'USD' }}`

#### 🔧 **Creating a Custom Pipe:**

```ts
@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
```

#### ✅ Usage in template:

```html
<p>{{ 'angular' | capitalize }}</p> <!-- Output: Angular -->
```

🟢 **Use Case**: For transforming strings, formatting numbers/dates, filtering lists, etc.

---

### **9. What are Pure vs Impure Pipes?**

#### ✅ **Pure Pipe** (default):

* Called only when the **input reference** changes (immutable data).
* **Fast and efficient**.
* Stateless and side-effect free.

```ts
@Pipe({
  name: 'multiply',
  pure: true
})
```

#### ✅ **Impure Pipe**:

* Called on **every change detection cycle**.
* Used for **mutable data**, like arrays or objects that may change internally.
* **Less performant**, use only when necessary.

```ts
@Pipe({
  name: 'filterUsers',
  pure: false
})
```

#### 🔍 Example: Impure Pipe for filtering list

```ts
transform(users: any[], searchTerm: string): any[] {
  return users.filter(u => u.name.includes(searchTerm));
}
```

🟡 **Use Case Warning**: Impure pipes are powerful but can hurt performance — use carefully.

---

### **10. How does Angular’s Dependency Injection (DI) system work?**

Angular’s **DI system** allows components and services to receive their **dependencies automatically** rather than creating them manually. It follows the **Inversion of Control** principle.

#### ✅ Key Concepts:

* **Injectors**: Objects that hold service instances.
* **Providers**: Define how to create dependencies (`useClass`, `useValue`, `useFactory`).
* **Tokens**: Used to identify dependencies.

#### 🔧 Registering a service:

```ts
@Injectable({
  providedIn: 'root' // Singleton across the app
})
export class LoggerService {
  log(msg: string) {
    console.log('Log:', msg);
  }
}
```

#### ✅ Injecting into a component:

```ts
@Component({...})
export class HomeComponent {
  constructor(private logger: LoggerService) {
    this.logger.log('Home loaded');
  }
}
```

#### 🔄 Hierarchical Injection:

* Angular injectors form a tree.
* You can provide services at:

  * `root` level (`providedIn: 'root'`)
  * `component` level (in `providers`)
  * `module` level (in `@NgModule.providers`)

🟢 **Use Case**: Sharing logic (e.g., AuthService, UserService) or third-party libraries via Angular's DI.

---

Here are **clear, interview-quality answers** for Angular data binding concepts (Questions 1–5), including **key differences**, **syntax**, and **real examples**.

---

### **1. What are the different types of data binding in Angular?**

Angular supports **four main types** of data binding:

| Type                 | Direction            | Syntax                | Description                             |
| -------------------- | -------------------- | --------------------- | --------------------------------------- |
| **Interpolation**    | Component → Template | `{{ value }}`         | Bind data into template as plain text   |
| **Property Binding** | Component → Template | `[property]="value"`  | Binds DOM property to a component field |
| **Event Binding**    | Template → Component | `(event)="handler"`   | Handles user events like clicks         |
| **Two-way Binding**  | Template ↔ Component | `[(ngModel)]="value"` | Syncs input and component property      |

---

### ✅ **Examples**:

```html
<!-- Interpolation -->
<p>Hello, {{ username }}</p>

<!-- Property Binding -->
<img [src]="profileImageUrl">

<!-- Event Binding -->
<button (click)="onSubmit()">Submit</button>

<!-- Two-way Binding -->
<input [(ngModel)]="email">
```

---

### **2. How does two-way binding work (`[(ngModel)]`)?**

Two-way binding combines **property binding** and **event binding** in a single syntax:

```html
<input [(ngModel)]="user.name">
```

This is equivalent to:

```html
<input [ngModel]="user.name" (ngModelChange)="user.name = $event">
```

🟢 It updates the UI when the value changes in the component **and** updates the component when the user modifies the input.

#### ✅ Requirements:

* You must import `FormsModule` in your module for `[(ngModel)]` to work.

```ts
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule]
})
```

🟢 **Use Case**: Forms, inputs, sliders — where you want two-way sync between model and UI.

---

### **3. What is event binding and how is it used?**

Event binding allows you to **respond to user actions** like clicks, input, mouse movements, etc.

#### ✅ Syntax:

```html
<button (click)="saveUser()">Save</button>
```

This binds the `click` DOM event to the `saveUser()` method in the component.

#### ✅ Example:

```ts
export class UserComponent {
  saveUser() {
    console.log('User saved');
  }
}
```

🟢 **Use Case**: Handling form submissions, button clicks, key presses, etc.

---

### **4. How does property binding differ from attribute binding?**

| Type                  | Affects        | Syntax                   | Notes                   |
| --------------------- | -------------- | ------------------------ | ----------------------- |
| **Property Binding**  | DOM Property   | `[property]="value"`     | Updates live DOM object |
| **Attribute Binding** | HTML Attribute | `attr.attribute="value"` | Sets static attributes  |

---

#### ✅ Property Binding Example:

```html
<input [disabled]="isDisabled">
```

* Affects the `disabled` **DOM property**. If `isDisabled = true`, the input is actually disabled.

---

#### ✅ Attribute Binding Example:

```html
<td [attr.colspan]="2"></td>
```

* `colspan` is **not** a property of the DOM element, so attribute binding is needed.

🟡 **Important Distinction**:

* Use property binding for most use cases (e.g., `value`, `disabled`, `checked`).
* Use `attr.` binding for custom or **non-standard** HTML attributes.

---

### **5. What is interpolation? When should it be used?**

**Interpolation** allows you to bind a component’s property to **text content** in the HTML.

#### ✅ Syntax:

```html
<p>Hello, {{ user.name }}!</p>
```

This renders as:

```html
<p>Hello, John!</p>
```

🟢 Angular evaluates the expression **inside `{{ }}`** and updates it when the data changes.

#### ✅ Use Cases:

* Displaying variables in UI.
* Showing calculated values: `{{ totalPrice * quantity }}`
* Conditional text: `{{ isAdmin ? 'Admin' : 'User' }}`

---

### ✅ Summary Table

| Binding Type      | Syntax                | Direction     | Use For                                     |
| ----------------- | --------------------- | ------------- | ------------------------------------------- |
| Interpolation     | `{{ value }}`         | One-way (out) | Text content                                |
| Property Binding  | `[property]="value"`  | One-way (out) | DOM properties (e.g., `[disabled]`)         |
| Attribute Binding | `[attr.name]="value"` | One-way (out) | Static attributes (e.g., `colspan`, `aria`) |
| Event Binding     | `(event)="handler"`   | One-way (in)  | DOM events like click, input                |
| Two-way Binding   | `[(ngModel)]="value"` | Two-way       | Form inputs                                 |

---

Here are well-structured, **interview-quality answers** for Angular component interaction and directives (questions 6–10), including real-world **examples** and **key concepts**.

---

### **6. What are structural directives? Explain `*ngIf`, `*ngFor`, and `*ngSwitch`.**

**Structural directives** are responsible for **changing the structure of the DOM** — i.e., they add or remove elements from the DOM based on conditions.

All structural directives have a `*` prefix.

---

#### ✅ `*ngIf`

Displays the element **only if the condition is true**.

```html
<p *ngIf="isLoggedIn">Welcome, user!</p>
```

With `else` block:

```html
<p *ngIf="isLoggedIn; else loginBlock">Welcome</p>
<ng-template #loginBlock><p>Please login</p></ng-template>
```

---

#### ✅ `*ngFor`

Repeats the element for each item in a collection.

```html
<li *ngFor="let user of users; index as i">{{ i + 1 }}. {{ user.name }}</li>
```

---

#### ✅ `*ngSwitch`

Conditionally renders elements based on matching values.

```html
<div [ngSwitch]="role">
  <p *ngSwitchCase="'admin'">Admin Panel</p>
  <p *ngSwitchCase="'user'">User Dashboard</p>
  <p *ngSwitchDefault>Guest View</p>
</div>
```

🟢 **Use Case**: Conditional rendering and dynamic lists.

---

### **7. What are attribute directives? Examples: `ngClass`, `ngStyle`**

**Attribute directives** change the **appearance or behavior** of an element, component, or directive.

Unlike structural directives, they **don’t add/remove elements**, but **modify their properties or styles**.

---

#### ✅ `ngClass`

Applies CSS classes dynamically.

```html
<p [ngClass]="{ 'active': isActive, 'disabled': !isActive }">Status</p>
```

Or with class binding shortcut:

```html
<p [class.active]="isActive">Active</p>
```

---

#### ✅ `ngStyle`

Applies inline styles dynamically.

```html
<p [ngStyle]="{ color: isError ? 'red' : 'green' }">Message</p>
```

🟢 **Custom Attribute Directive Example**:

```ts
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```

Usage:

```html
<p appHighlight>Highlighted text</p>
```

---

### **8. How do `@Input()` and `@Output()` decorators enable component communication?**

Angular uses `@Input()` and `@Output()` to enable **parent-child communication**.

---

#### ✅ `@Input()`: Pass data **from parent to child** component.

**Child component:**

```ts
@Input() title: string;
```

**Parent template:**

```html
<app-header [title]="pageTitle"></app-header>
```

---

#### ✅ `@Output()`: Send events/data **from child to parent**.

**Child component:**

```ts
@Output() userCreated = new EventEmitter<string>();

createUser() {
  this.userCreated.emit('new_user');
}
```

**Parent component:**

```html
<app-user-form (userCreated)="onUserCreated($event)"></app-user-form>
```

---

🟢 **Use Case**:

* Pass props from parent to child
* Notify parent when an action occurs in child (e.g., form submitted)

---

### **9. What is content projection and how does `ng-content` work?**

**Content projection** allows you to insert **custom content** into a component from the outside, like slots in other frameworks.

Used when building reusable components like modals, cards, or dropdowns.

---

#### ✅ Simple Projection:

**Parent:**

```html
<app-card>
  <p>Projected content</p>
</app-card>
```

**Child (`app-card`):**

```html
<div class="card">
  <ng-content></ng-content>
</div>
```

---

#### ✅ Multiple Slots with Selectors:

```html
<ng-content select="[card-header]"></ng-content>
<ng-content select="[card-body]"></ng-content>
```

Parent:

```html
<div card-header>Title</div>
<div card-body>Body content</div>
```

🟢 **Use Case**: Wrapping third-party libraries, modals, dynamic templates, etc.

---

### **10. How can you share data between unrelated components?**

Unrelated components (not parent-child) cannot use `@Input()`/`@Output()`. You can use one of the following methods:

---

#### ✅ 1. **Shared Service with RxJS Subject or BehaviorSubject**

**Data Service:**

```ts
@Injectable({ providedIn: 'root' })
export class DataService {
  private message = new BehaviorSubject<string>('Initial');
  message$ = this.message.asObservable();

  updateMessage(newMsg: string) {
    this.message.next(newMsg);
  }
}
```

**Component A (sender):**

```ts
this.dataService.updateMessage('Hello from A');
```

**Component B (receiver):**

```ts
this.dataService.message$.subscribe(msg => this.receivedMsg = msg);
```

---

#### ✅ 2. **State Management Libraries**

* Use NgRx, Akita, or NgXs for large-scale apps with complex shared state.

---

#### ✅ 3. **Router Parameters or Query Params**

* Pass data via routing if navigating between components.

```ts
this.router.navigate(['/details'], { queryParams: { id: 123 } });
```

---

#### ✅ 4. **Local Storage or Session Storage**

* For storing persistent or global state.

---

🟢 **Preferred Approach**: Use a **shared service with RxJS** for clean, decoupled communication.

---

Great! Below are **detailed answers with code examples** for selected Angular Reactive Forms questions from the top 15 list. These are crafted to be **interview-ready**, helping you explain not just *what*, but *why and how*.

---

## ✅ 1. **What is a `FormGroup` and how is it used?**

A `FormGroup` is a collection of `FormControl`s that tracks the value and state of a group of form fields.

### 🔸 Example:

```ts
form = new FormGroup({
  name: new FormControl(''),
  email: new FormControl('')
});
```

**Accessing data:**

```ts
console.log(this.form.value.name);  // 'Sai'
```

**HTML:**

```html
<form [formGroup]="form">
  <input formControlName="name" placeholder="Name">
  <input formControlName="email" placeholder="Email">
</form>
```

🟢 Use `FormGroup` when you want to group related form controls (like user profile info).

---

## ✅ 2. **What is a `FormArray` and when do you use it?**

A `FormArray` is used when you want to manage **a dynamic list of similar form controls**.

### 🔸 Example: Adding a list of skills

```ts
form = this.fb.group({
  skills: this.fb.array([
    this.fb.control('Angular')
  ])
});

get skills(): FormArray {
  return this.form.get('skills') as FormArray;
}

addSkill() {
  this.skills.push(this.fb.control(''));
}
```

**HTML:**

```html
<div formArrayName="skills">
  <div *ngFor="let skill of skills.controls; let i = index">
    <input [formControlName]="i" placeholder="Skill {{i+1}}">
  </div>
</div>
<button (click)="addSkill()">Add Skill</button>
```

🟢 Useful when building dynamic forms like surveys, lists, multiple addresses, etc.

---

## ✅ 3. **What is the difference between `setValue()` and `patchValue()`?**

| Method         | Behavior                              |
| -------------- | ------------------------------------- |
| `setValue()`   | Requires all controls to be specified |
| `patchValue()` | Allows partial updates                |

### 🔸 Example:

```ts
form = this.fb.group({
  name: [''],
  email: ['']
});
```

```ts
form.setValue({ name: 'Sai', email: 'test@example.com' }); // ✅ works
form.patchValue({ name: 'Sai' }); // ✅ works
form.setValue({ name: 'Sai' });   // ❌ Error - missing 'email'
```

🟢 Use `patchValue` when updating partial data (e.g., pre-filling a form with only a subset of fields).

---

## ✅ 4. **How do you create a custom validator?**

Custom validators allow you to enforce custom rules, like disallowing a certain name.

### 🔸 Example: Forbidden name validator

```ts
function forbiddenNameValidator(control: AbstractControl): ValidationErrors | null {
  const forbidden = /admin/.test(control.value);
  return forbidden ? { forbiddenName: { value: control.value } } : null;
}
```

**Usage:**

```ts
form = this.fb.group({
  username: ['', [Validators.required, forbiddenNameValidator]]
});
```

**HTML:**

```html
<div *ngIf="form.get('username')?.hasError('forbiddenName')">
  Name cannot contain "admin".
</div>
```

🟢 Ideal when built-in validators (`required`, `email`) aren't enough.

---

## ✅ 5. **How do you create a group-level validator (e.g., password match)?**

Group-level validators check multiple controls together — like confirming that password and confirm password match.

### 🔸 Example:

```ts
function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const pass = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return pass === confirm ? null : { passwordMismatch: true };
}
```

```ts
form = this.fb.group({
  password: ['', Validators.required],
  confirmPassword: ['', Validators.required]
}, { validators: passwordMatchValidator });
```

**HTML:**

```html
<div *ngIf="form.hasError('passwordMismatch')">Passwords do not match</div>
```

🟢 Used for cross-field validation (e.g., matching values, start date < end date).

---

## ✅ 6. **How do you dynamically generate form controls from a config (like a JSON schema)?**

### 🔸 Example:

```ts
fields = [
  { name: 'firstName', required: true },
  { name: 'age', required: false }
];

form = this.fb.group({});

ngOnInit() {
  this.fields.forEach(field => {
    this.form.addControl(
      field.name,
      new FormControl('', field.required ? Validators.required : [])
    );
  });
}
```

**HTML:**

```html
<div *ngFor="let field of fields">
  <label>{{ field.name }}</label>
  <input [formControlName]="field.name" />
</div>
```

🟢 Great for building dynamic forms like product configurators, survey engines, admin tools.

---

## ✅ 7. **How do you listen to value changes in a form or control?**

Use `valueChanges` to subscribe to real-time changes.

### 🔸 Example:

```ts
this.form.get('email')?.valueChanges.subscribe(value => {
  console.log('Email changed:', value);
});
```

You can also listen to the whole form:

```ts
this.form.valueChanges.subscribe(value => {
  console.log('Form changed:', value);
});
```

🟢 Useful for live preview, conditional validation, dynamic behavior.

---

Here are the **remaining 8 detailed Angular Reactive Forms interview questions with answers and examples**, continuing from the top 15 list:

---

## ✅ 8. **How do you add an async validator (e.g., to check email uniqueness)?**

Async validators run asynchronously, typically calling a backend to validate.

### 🔸 Example: Email uniqueness validator

```ts
function uniqueEmailValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return userService.isEmailTaken(control.value).pipe(
      map(isTaken => (isTaken ? { emailTaken: true } : null)),
      catchError(() => of(null)) // fallback for server errors
    );
  };
}
```

**Usage in form:**

```ts
this.form = this.fb.group({
  email: ['', [Validators.required, Validators.email], [uniqueEmailValidator(this.userService)]]
});
```

🟢 Ideal when form input needs to be verified with a backend (username, email, coupon code, etc.).

---

## ✅ 9. **How do you enable or disable form controls dynamically?**

Use `.disable()` and `.enable()` methods.

### 🔸 Example:

```ts
this.form.get('discount')?.disable(); // Initially disabled

if (this.form.get('hasDiscount')?.value) {
  this.form.get('discount')?.enable();
}
```

Also works with nested controls or entire groups:

```ts
this.form.get('address')?.disable();
```

🟢 Useful in wizards, role-based access, or toggling optional fields.

---

## ✅ 10. **How do you reset a form completely or partially?**

### 🔸 Reset all values:

```ts
this.form.reset(); // All values null, untouched, pristine
```

### 🔸 Reset with specific values:

```ts
this.form.reset({
  name: 'Sai',
  email: 'test@example.com'
});
```

You can also reset a single control:

```ts
this.form.get('email')?.reset('default@example.com');
```

🟢 Use when clearing form after submission or loading new data.

---

## ✅ 11. **What are the different form status values and what do they mean?**

Each `FormControl` or `FormGroup` has a status:

* `VALID` – All validators pass
* `INVALID` – At least one validator fails
* `PENDING` – Async validation in progress
* `DISABLED` – Control is disabled

### 🔸 Example:

```ts
this.form.statusChanges.subscribe(status => {
  console.log('Form status:', status);
});
```

🟢 Knowing the form status helps control submit button state or trigger additional UI behavior.

---

## ✅ 12. **How do you access or loop through controls in a FormArray?**

You can access FormArray elements using `at(index)` or `.controls`.

### 🔸 Example:

```ts
get skills(): FormArray {
  return this.form.get('skills') as FormArray;
}

addSkill() {
  this.skills.push(this.fb.control(''));
}
```

### HTML:

```html
<div *ngFor="let ctrl of skills.controls; let i = index">
  <input [formControlName]="i" placeholder="Skill {{ i + 1 }}">
</div>
```

🟢 Useful in forms with dynamic or repeated data.

---

## ✅ 13. **How do you mark a control as touched, dirty, or pristine programmatically?**

Angular tracks form control state to know if the user interacted with it.

### 🔸 Methods:

```ts
this.form.get('email')?.markAsTouched();
this.form.get('email')?.markAsDirty();
this.form.get('email')?.markAsPristine();
```

Check states:

```ts
control.touched     // true if user left the field
control.dirty       // true if value changed
control.pristine    // true if untouched
```

🟢 Helpful to show errors after submit or validate without waiting for blur.

---

## ✅ 14. **How do you write unit tests for Reactive Forms?**

Test the form structure, validation, and interaction.

### 🔸 Example:

```ts
it('should mark email as invalid if empty', () => {
  component.form.get('email')?.setValue('');
  expect(component.form.get('email')?.valid).toBeFalse();
});
```

Test custom validator:

```ts
it('should error if forbidden name is entered', () => {
  const control = new FormControl('admin', forbiddenNameValidator);
  expect(control.errors?.['forbiddenName']).toBeTruthy();
});
```

🟢 Form logic is easily testable since everything is in the component class.

---

## ✅ 15. **How do you create a dynamic form using JSON schema and FormArray?**

This pattern allows rendering forms from backend-configurable schemas.

### 🔸 Example JSON:

```ts
formConfig = [
  { name: 'productName', type: 'text', required: true },
  { name: 'tags', type: 'array', default: ['tech', 'angular'] }
];
```

### Dynamic Form Generation:

```ts
form = this.fb.group({});

ngOnInit() {
  this.formConfig.forEach(field => {
    if (field.type === 'array') {
      this.form.addControl(field.name, this.fb.array(
        field.default.map((val: string) => this.fb.control(val))
      ));
    } else {
      this.form.addControl(
        field.name,
        this.fb.control('', field.required ? Validators.required : [])
      );
    }
  });
}
```

### HTML:

```html
<div *ngIf="form.get('tags') as tags" formArrayName="tags">
  <div *ngFor="let tag of tags.controls; let i = index">
    <input [formControlName]="i">
  </div>
</div>
```

🟢 Best for admin panels, survey forms, CMS-driven layouts.

Here are **detailed answers with examples** for the most important Angular Router interview questions. These are written to be **concise, clear, and practical**—ideal for SDE-2 or mid-senior level interviews.

---

## ✅ 1. **How does Angular Router work?**

Angular Router enables navigation between views/components in a single-page application (SPA) **without reloading the page**. It matches URLs to components defined in your routing configuration.

### 🔸 Basic example:

```ts
// app-routing.module.ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];
```

```html
<!-- app.component.html -->
<a routerLink="/">Home</a>
<a routerLink="/about">About</a>
<router-outlet></router-outlet>
```

🟢 The `<router-outlet>` is where the matched component is rendered.

---

## ✅ 2. **How do you configure nested (child) routes?**

Use the `children` property to create nested views.

### 🔸 Example:

```ts
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];
```

### 🔸 HTML:

```html
<!-- dashboard.component.html -->
<nav>
  <a routerLink="profile">Profile</a>
  <a routerLink="settings">Settings</a>
</nav>
<router-outlet></router-outlet>
```

🟢 Useful for layouts with sub-views like tabs or sidebar-based navigation.

---

## ✅ 3. **What is the difference between `RouterLink`, `navigate()`, and `navigateByUrl()`?**

| Feature                  | Use Case                             |
| ------------------------ | ------------------------------------ |
| `RouterLink`             | Template-based navigation            |
| `router.navigate()`      | Code-based navigation (array syntax) |
| `router.navigateByUrl()` | Code-based navigation (URL string)   |

### 🔸 Example:

```html
<a [routerLink]="['/user', userId]">Go to user</a>
```

```ts
// component.ts
this.router.navigate(['/user', 5]);
this.router.navigateByUrl('/user/5');
```

🟢 `navigate()` is more flexible for route parameters or relative paths.

---

## ✅ 4. **How do you pass route parameters and query parameters?**

### 🔹 Route Parameters:

```ts
// Route
{ path: 'user/:id', component: UserComponent }
```

**Navigation:**

```html
<a [routerLink]="['/user', 5]">Go to User 5</a>
```

**Access:**

```ts
const id = this.route.snapshot.paramMap.get('id');
```

### 🔹 Query Parameters:

```html
<a [routerLink]="['/search']" [queryParams]="{ q: 'angular' }">Search</a>
```

**Access:**

```ts
this.route.queryParams.subscribe(params => {
  console.log(params['q']); // angular
});
```

---

## ✅ 5. **What is a route guard? Explain `CanActivate`, `CanDeactivate`, and `Resolve`.**

### 🔹 `CanActivate`: Prevents route access (e.g., check login)

```ts
canActivate(): boolean {
  return this.authService.isLoggedIn();
}
```

```ts
{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }
```

---

### 🔹 `CanDeactivate`: Prevents leaving a route (e.g., unsaved changes)

```ts
canDeactivate(component: FormComponent): boolean {
  return component.hasUnsavedChanges() ? confirm('Leave?') : true;
}
```

---

### 🔹 `Resolve`: Pre-fetches data **before** activating the route

```ts
resolve(): Observable<User> {
  return this.userService.getUser();
}
```

```ts
{ path: 'profile', component: ProfileComponent, resolve: { user: UserResolver } }
```

🟢 Use guards for route-level control and cleaner UX.

---

## ✅ 6. **How do you lazy-load a feature module in Angular?**

Lazy loading improves performance by loading modules **on demand**.

### 🔸 Step 1: Create a feature module with its own routing

```ts
// users-routing.module.ts
const routes: Routes = [
  { path: '', component: UserListComponent }
];
```

### 🔸 Step 2: Configure lazy loading

```ts
// app-routing.module.ts
const routes: Routes = [
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }
];
```

🟢 Lazy loading is crucial for large apps or apps with rarely-used modules.

---

## ✅ 7. **How can you preload lazy-loaded modules?**

Preloading helps reduce load delays **after initial app load**.

### 🔸 Enable PreloadingStrategy

```ts
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })]
})
export class AppRoutingModule {}
```

🟢 Angular supports custom preloading strategies too (e.g., preload only on Wi-Fi).

---

## ✅ 8. **What is the difference between hash-based and path-based routing?**

| Feature       | Hash-based (`#`)     | Path-based (default)    |
| ------------- | -------------------- | ----------------------- |
| URL Example   | `example.com/#/home` | `example.com/home`      |
| Server config | Not required         | Requires server rewrite |
| SEO           | Not SEO-friendly     | SEO-friendly            |

### 🔸 Configure in `AppRoutingModule`:

```ts
RouterModule.forRoot(routes, { useHash: true }) // enables hash-based
```

🟢 Use hash-based routing if you **can’t control server configuration** (e.g., GitHub Pages).

---

Here are detailed, **interview-ready answers** to your **RxJS and Angular observables** questions, with explanations and examples tailored for SDE-2 level and above.

---

## ✅ 1. **What is RxJS and why is it used in Angular?**

**RxJS (Reactive Extensions for JavaScript)** is a library for reactive programming using **Observables** to manage asynchronous data streams (e.g., HTTP calls, UI events, timers).

### 🔹 Why Angular uses RxJS:

* Angular’s **HttpClient** returns `Observable`
* Form events, router events, user interactions use streams
* Enables **composability**, **cancelation**, and **pipelining**

### 🔸 Example:

```ts
this.http.get('/api/products').subscribe(data => this.products = data);
```

🟢 RxJS makes Angular highly **reactive**, **scalable**, and **clean** in handling async flows.

---

## ✅ 2. **What is the difference between Observable and Subject?**

| Feature | Observable                                       | Subject                           |
| ------- | ------------------------------------------------ | --------------------------------- |
| Nature  | Unicast (each subscriber gets its own execution) | Multicast (shared execution)      |
| Emits   | On `.subscribe()`                                | Manually via `.next()`            |
| Usage   | Used for HTTP, timer, etc.                       | Used to emit values to many parts |

### 🔸 Observable Example:

```ts
const obs = new Observable(observer => {
  observer.next(Math.random()); // new value per subscriber
});

obs.subscribe(val => console.log(val));
obs.subscribe(val => console.log(val));
```

### 🔸 Subject Example:

```ts
const subject = new Subject<number>();
subject.subscribe(val => console.log('A', val));
subject.subscribe(val => console.log('B', val));

subject.next(10); // both A and B get 10
```

---

## ✅ 3. **Explain the difference between `BehaviorSubject`, `ReplaySubject`, and `AsyncSubject`**

| Type              | Description                                          | Emits When Subscribed |
| ----------------- | ---------------------------------------------------- | --------------------- |
| `BehaviorSubject` | Requires initial value; emits last value immediately | Yes                   |
| `ReplaySubject`   | Buffers last N values; replays to new subscribers    | Yes                   |
| `AsyncSubject`    | Emits only the **last value** when **completed**     | Only on completion    |

### 🔸 Example:

```ts
const behavior = new BehaviorSubject('initial');
behavior.next('latest');
behavior.subscribe(v => console.log(v)); // prints 'latest'

const replay = new ReplaySubject(2);
replay.next('first');
replay.next('second');
replay.subscribe(v => console.log(v)); // prints both

const async = new AsyncSubject();
async.next('one');
async.next('two');
async.complete(); // emits 'two' on complete
```

---

## ✅ 4. **What is the use of the `async` pipe?**

The `async` pipe in Angular automatically **subscribes and unsubscribes** to an observable in templates.

### 🔸 Without async pipe:

```ts
ngOnInit() {
  this.data$.subscribe(data => this.data = data); // need to unsubscribe
}
```

### 🔸 With async pipe:

```html
<div *ngIf="data$ | async as data">
  {{ data.name }}
</div>
```

🟢 Prevents memory leaks and simplifies subscription logic.

---

## ✅ 5. **What are `switchMap`, `mergeMap`, `concatMap`, and how do they differ?**

All are RxJS **higher-order mapping operators** used to flatten inner Observables, but they differ in **how they handle inner subscriptions**.

| Operator    | Behavior                                                             |
| ----------- | -------------------------------------------------------------------- |
| `switchMap` | Cancels previous inner observable on new emission (ideal for HTTP)   |
| `mergeMap`  | Runs all inner observables in parallel                               |
| `concatMap` | Queues inner observables; waits for one to finish before next starts |

### 🔸 Example:

```ts
// switchMap: good for auto-complete
this.searchInput.valueChanges.pipe(
  debounceTime(300),
  switchMap(term => this.api.search(term))
).subscribe();
```

🟢 Use `switchMap` for form inputs or route changes, `mergeMap` for independent tasks, and `concatMap` for ordered executions.

---

## ✅ 6. **What is `takeUntil` and how does it help with memory leaks?**

`takeUntil()` is used to **automatically unsubscribe** from an observable when another observable emits a value.

### 🔸 Example:

```ts
destroy$ = new Subject<void>();

ngOnInit() {
  this.api.getData().pipe(
    takeUntil(this.destroy$)
  ).subscribe();
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

🟢 Prevents memory leaks when component is destroyed (especially useful for long-lived subscriptions).

---

## ✅ 7. **What’s the role of `combineLatest`, `forkJoin`, and `withLatestFrom`?**

These are RxJS **combination operators** to merge multiple observables.

| Operator         | Description                                                                    |
| ---------------- | ------------------------------------------------------------------------------ |
| `combineLatest`  | Emits when **any observable emits**, using **latest** values from all          |
| `forkJoin`       | Waits for **all observables to complete**, then emits once                     |
| `withLatestFrom` | Combines source with **latest value of another observable**, when source emits |

---

### 🔸 `combineLatest` example:

```ts
combineLatest([obs1, obs2]).subscribe(([a, b]) => console.log(a, b));
```

### 🔸 `forkJoin` example:

```ts
forkJoin({
  user: this.api.getUser(),
  posts: this.api.getPosts()
}).subscribe(result => console.log(result.user, result.posts));
```

### 🔸 `withLatestFrom` example:

```ts
this.search$.pipe(
  withLatestFrom(this.filter$),
  switchMap(([query, filter]) => this.api.search(query, filter))
).subscribe();
```

🟢 Choose based on use-case:

* `combineLatest` for continuous combined streams (e.g., filters)
* `forkJoin` for one-time load (e.g., initial data)
* `withLatestFrom` for referencing current context at time of action

---

Here are **interview-level answers** for Angular's `HttpClient` and HTTP interceptors, with code examples and clean explanations—ideal for SDE-2 or senior frontend rounds:

---

## ✅ 1. **How do you perform HTTP requests using HttpClient?**

Angular provides the `HttpClient` service (from `@angular/common/http`) to make HTTP requests.

### 🔸 Example: GET, POST, PUT, DELETE

```ts
constructor(private http: HttpClient) {}

getData() {
  return this.http.get('/api/items');
}

createItem(item: any) {
  return this.http.post('/api/items', item);
}

updateItem(id: string, data: any) {
  return this.http.put(`/api/items/${id}`, data);
}

deleteItem(id: string) {
  return this.http.delete(`/api/items/${id}`);
}
```

* All return **Observables**, allowing you to `.subscribe()` or use RxJS operators.
* Don't forget to import `HttpClientModule` in `AppModule`.

---

## ✅ 2. **How do you add headers or auth tokens to HTTP requests globally?**

You can **add headers per request** or **globally** using an **HTTP Interceptor**.

### 🔸 Per request:

```ts
const headers = new HttpHeaders().set('Authorization', 'Bearer token123');

this.http.get('/api/items', { headers }).subscribe();
```

### 🔸 Globally (recommended for tokens):

Use an interceptor (see next question).

---

## ✅ 3. **What is an HTTP interceptor and how is it implemented?**

An **HTTP Interceptor** intercepts all outgoing HTTP requests and incoming responses, enabling global logic like:

* Attaching headers (e.g., tokens)
* Logging
* Error handling
* Response transformation

### 🔸 Example: Token Interceptor

```ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(cloned);
  }
}
```

### 🔸 Register in AppModule:

```ts
providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
]
```

🟢 This ensures all requests have the token added automatically.

---

## ✅ 4. **How do you handle global error handling using interceptors?**

Intercept errors and handle them centrally to avoid duplicating try/catch logic in each service.

### 🔸 Example:

```ts
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Redirect to login
        } else if (error.status === 500) {
          console.error('Server error:', error.message);
        }
        return throwError(() => error);
      })
    );
  }
}
```

🟢 You can log errors, show toast messages, redirect to login, or retry requests here.

---

## ✅ 5. **What is the difference between `HttpParams` and `HttpHeaders`?**

| Feature   | `HttpParams`                         | `HttpHeaders`                                   |
| --------- | ------------------------------------ | ----------------------------------------------- |
| Purpose   | Add query string params to URL       | Add headers to the request                      |
| Immutable | Yes (creates new instance)           | Yes (methods like `.set()` return new instance) |
| Usage     | Filtering, pagination, sorting, etc. | Auth tokens, content-type, CORS                 |

### 🔸 Example:

```ts
const params = new HttpParams()
  .set('page', '1')
  .set('limit', '10');

const headers = new HttpHeaders()
  .set('Authorization', 'Bearer token123');

this.http.get('/api/items', { params, headers }).subscribe();
```

🟢 Use `HttpParams` for building RESTful APIs, and `HttpHeaders` for authentication or metadata.

---

Here are **detailed, interview-ready answers** for Angular performance and optimization concepts like change detection, OnPush, trackBy, lazy loading, and best practices—key for SDE-2 and above.

---

## ✅ 1. **What is Angular’s change detection mechanism?**

**Change detection** is the mechanism Angular uses to detect and reflect changes in the component’s data model into the view (template).

### 🔹 How it works:

* Angular uses **zone.js** to detect **async events** (e.g., `setTimeout`, `click`, `XHR`) that may change the model.
* It runs the change detection tree from the root (AppComponent) downward, checking all components for changes.

### 🔹 Example:

```ts
count = 0;

increment() {
  this.count++; // Angular detects this and updates view
}
```

🟢 Angular automatically detects this change and updates the DOM using its internal diffing algorithm.

---

## ✅ 2. **What is `ChangeDetectionStrategy.OnPush` and when should you use it?**

`ChangeDetectionStrategy.OnPush` tells Angular to **only check the component when:**

1. An `@Input()` reference changes.
2. An event is triggered inside the component (like `click`).
3. An observable emits (with `async` pipe).

### 🔹 Default vs OnPush

```ts
@Component({
  selector: 'app-sample',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleComponent {
  @Input() user: User;
}
```

### 🔹 Why use OnPush?

* Improves performance by **skipping change detection** unless necessary.
* Especially helpful for **large lists**, **heavy components**, or **optimized apps**.

🟢 Use `OnPush` when your component:

* Receives data via `@Input` (immutable or via observables).
* Doesn’t mutate objects directly (e.g., uses spread operator for state changes).

---

## ✅ 3. **How can `trackBy` improve performance in `*ngFor`?**

By default, Angular re-renders all DOM elements if the array reference changes—even if items themselves haven’t.

Using `trackBy`, Angular can **identify and reuse** existing DOM elements when iterating over lists.

### 🔹 Without `trackBy` (inefficient):

```html
<div *ngFor="let item of items">{{ item.name }}</div>
```

### 🔹 With `trackBy` (optimized):

```html
<div *ngFor="let item of items; trackBy: trackById">{{ item.name }}</div>
```

```ts
trackById(index: number, item: Item) {
  return item.id; // unique identifier
}
```

🟢 This avoids unnecessary DOM re-creation, improving rendering performance for large lists.

---

## ✅ 4. **How do you use lazy loading and preloading strategies to improve app performance?**

### 🔹 Lazy Loading:

* Load **feature modules** only when the user navigates to them.
* Reduces **initial bundle size** → faster load time.

```ts
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];
```

✅ Use for large modules, dashboards, or low-priority pages.

---

### 🔹 Preloading Strategies:

Load **lazy-loaded modules in the background** after initial load.

```ts
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ]
})
export class AppModule {}
```

🟢 Preloading balances fast load time with readiness of future routes.

You can also create **custom strategies** to preload based on conditions (e.g., user role, network speed).

---

## ✅ 5. **What are best practices for optimizing large Angular applications?**

### 🔸 A. ✅ Performance Practices:

* **Use `ChangeDetectionStrategy.OnPush`** when possible.
* **Avoid deep nested DOM structures**.
* **Avoid calling functions directly in templates** (e.g., `{{ calculate() }}`).
* Use `trackBy` in `*ngFor` for long lists.

---

### 🔸 B. ✅ Lazy Loading & Preloading:

* Lazy load large or rarely used modules.
* Use preloading for high-priority routes after initial load.

---

### 🔸 C. ✅ Bundle Optimization:

* Use **Angular CLI production builds**:

  ```bash
  ng build --prod
  ```

  Enables AOT, tree shaking, minification.

* Use **differential loading** (modern + legacy browsers).

* Split large modules using `loadChildren`.

---

### 🔸 D. ✅ Reduce Change Detection Overhead:

* Use `OnPush`
* Detach and manually trigger `ChangeDetectorRef` for static components.
* Debounce or throttle user events (e.g., input, scroll).

---

### 🔸 E. ✅ Avoid Memory Leaks:

* Use `takeUntil()` with long-lived subscriptions.
* Clean up `setTimeout`/`interval` in `ngOnDestroy`.

---


