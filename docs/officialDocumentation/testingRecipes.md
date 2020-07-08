# Testing Recipes

* Common testing patterns for React components.

> Note:

* This page assumes you’re using Jest as a test runner. If you use a different test runner, you may need to adjust the API, but the overall shape of the solution will likely be the same. Read more details on setting up a testing environment on the Testing Environments page.

* On this page, we will primarily use function components. However, these testing strategies don’t depend on implementation details, and work just as well for class components too.

* Setup/Teardown
* act()
* Rendering
* Data Fetching
* Mocking Modules
* Events
* Timers
* Snapshot Testing
* Multiple Renderers
* Something Missing?

## Setup/Teardown

* For each test, we usually want to render our React tree to a DOM element that’s attached to document. This is important so that it can receive DOM events. When the test ends, we want to “clean up” and unmount the tree from the document.

* A common way to do it is to use a pair of beforeEach and afterEach blocks so that they’ll always run and isolate the effects of a test to itself:

```ts
import { unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
})
```

* You may use a different pattern, but keep in mind that we want to execute the cleanup even if a test fails. Otherwise, tests can become “leaky”, and one test can change the behavior of another test. That makes them difficult to debug.

## act()

* When writing UI tests, tasks like rendering, user events, or data fetching can be considered as “units” of interaction with a user interface. React provides a helper called act() that makes sure all updates related to these “units” have been processed and applied to the DOM before you make any assertions:

```ts
act(() => {
    // render components
});

// make assertions
```

* This helps make your tests run closer to what real users would experience when using your application. The rest of these examples use act() to make these guarantees.

* You might find using act() directly a bit too verbose. To avoid some of the boilerplate, you could use a library like React Testing Library, whose helpers are wrapped with act().

> Note:

* The name act comes from the Arrange-Act-Assert pattern.

## Rendering