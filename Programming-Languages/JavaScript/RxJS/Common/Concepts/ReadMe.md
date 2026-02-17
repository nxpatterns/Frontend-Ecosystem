# Understanding RxJS

## Unterstanding Reactivity

RxJS leverages several core JavaScript functions and features to enable asynchronous operations and reactive programming. Beyond **`setTimeout`** and **`setInterval`**, key JavaScript functions and concepts used by RxJS include:

1. **`Promise`** - For handling asynchronous operations.
2. **`EventTarget` and `EventEmitter`** - For observing DOM events or custom events.
3. **`requestAnimationFrame`** - For animations and frame-based tasks.
4. **`fetch`** - For asynchronous HTTP communication.
5. **`MutationObserver`** - For observing changes in the DOM.
6. **`IntersectionObserver`** - For tracking elements' visibility within the viewport.
7. **`WebSocket`** - For bidirectional real-time communication.

**RxJS** also relies on fundamental JavaScript concepts like `callbacks`, `closures`,
and `higher-order functions` to create and manage `observables`.

Comparatively, **`Angular Signals`**, introduced in Angular for reactivity, primarily utilize the following core JavaScript features:

1. **`Closures`** - To maintain state and ensure encapsulation of reactive data.
1. **`Proxies`** - For intercepting and observing changes to objects and arrays, enabling 1.reactive tracking of dependencies.
1. **`WeakMap`** - To store and manage reactive dependencies without affecting garbage collection.
1. **`Microtask Queue`** (Promise.resolve) - For scheduling updates in a controlled and performant manner.
1. **`Observer Pattern`** - Implemented using JavaScript patterns for efficient change detection and propagation.

Here’s the comparison between **Angular Signals** and **RxJS** concerning their use of
core JavaScript functions:

**Commonalities:**

1. **`Closures`**: Both Angular Signals and RxJS use closures to encapsulate
and manage state and reactivity.
1. **`Microtask Queue`**: Both leverage JavaScript's event loop and microtask queue (e.g., Promise.resolve) for controlling
asynchronous updates and reactions.

**Differences:**

- **RxJS**:
  - **`Promises and setTimeout`**: RxJS heavily relies on Promises and
  timer mechanisms like setTimeout and setInterval to handle asynchronous tasks,
  delays, or repeated operations.
  - **`No Proxies`**: RxJS operates directly on Observables without using
  JavaScript Proxies.

- **Angular Signals**:
  - **`Proxies`**: Angular Signals use JavaScript Proxies to automatically
  detect and react to state changes by directly interacting with objects and
  heir properties.
  - **`WeakMap`**: Angular Signals employ WeakMaps to manage references to
  reactive objects efficiently and in a memory-friendly manner.

In summary, RxJS focuses on functional, stream-based programming with explicit asynchronous behavior, while Angular Signals are more about automatically tracking and updating state in a declarative manner, often using JavaScript Proxies and closures.

If you want to implement a simple example in TypeScript (whithout any additional libraries), you can use the following code snippet:

```ts
type StateType = {
    count: number;
    name: string;
};

const state: StateType = {
    count: 0,
    name: 'React'
};

function onStateChange<K extends keyof StateType>(property: K, value: StateType[K]): void {
    console.log(`The property "${property}" was changed to "${value}"`);
}

const handler: ProxyHandler<StateType> = {
    set(
        target: StateType,
        property: string | symbol,
        value: any
    ): boolean {
        if (property in target) {
            const key = property as keyof StateType;
            (target[key] as any) = value;
            onStateChange(key, value as StateType[typeof key]);
            return true;
        }
        return false;
    }
};

const proxyState = new Proxy(state, handler);

proxyState.count = 1;
proxyState.name = 'Angular';
```

**Short explanation of the code snippet:**

1. We define a **`StateType`** interface that represents the state of our application.
2. We create an initial **`state`** object with some properties.
3. We define an **`onStateChange`** function that will be called whenever a property
of the **`state`** object is changed.
4. We create a **`handler`** object that contains a **`set`** method.
This method is called whenever a property of the **`state`** object is set.
5. We create a **`proxyState`** object using the **`Proxy`** constructor.
This object will intercept property assignments and call the **`onStateChange`** function.
6. We change the **`count`** and **`name`** properties of the **`proxyState`** object,
which triggers the **`onStateChange`** function.

This code snippet demonstrates how to use **JavaScript** **Proxies** to automatically **detect**
and **react** to changes **in an object's properties**. This approach is similar to
how **Angular Signals use Proxies to track and update reactive state**.

For more complex scenarios and reactive programming, you can explore
**RxJS** and **Angular Signals** to leverage their respective features and capabilities.

**Regarding to the Types (A Side Note)**

During the analysis of the code snippet, you see an another concept (not related to RxJS or Angular
Signals or Proxies) about Types: **`"a wider union does not extend a narrower one"`**

Explained in a simplest example (See online: <https://stackoverflow.com/questions/78888773/how-to-correctly-type-a-javascript-proxy-handler-in-typescript-for-angular-sign>)

```ts

type Narrow = "x" | "y";
type Wide = "x" | "y" | "z";
```

- `Narrow` is a union type that includes `"x"` and `"y"`.
- `Wide` is a union type that includes `"x"`, `"y"`, and `"z"`.

```ts
type Check1 = Narrow extends Wide ? true : false; // true
type Check2 = Wide extends Narrow ? true : false; // false
```

**Explanation:**

- **`Check1`**: Here, `Narrow` (`"x" | "y"`) is being checked to see if it extends `Wide` (`"x" | "y" | "z"`). Since `"x" | "y"` is a subset of `"x" | "y" | "z"`, `Check1` evaluates to `true`.

- **`Check2`**: Here, `Wide` (`"x" | "y" | "z"`) is being checked to see if it extends `Narrow` (`"x" | "y"`). Since `"z"` is not included in `Narrow`, `Wide` cannot extend `Narrow`, so `Check2` evaluates to `false`.

**Summary:**

This example demonstrates that a narrower union type (`Narrow`) can extend a wider union type (`Wide`), but the reverse is not true—hence, "a wider union does not extend a narrower one."
