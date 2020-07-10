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

* Commonly, you might want to test whether a component renders correctly for given props. Consider a simple component that renders a message based on a prop:

```ts
// hello.js

import React from "react";
export default function Hello(props) {
    if (props.name) {
        return <h1>Hello, {props.name}!</h1>
    } else {
        return <span>Hey, stranger</span>;
    }
}
```

* We can write a test for this component:

```ts
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Hello from "./hello";

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
});

it("renders with or without a name", () => {
    act(() => {
        render(<Hello />, container);
    });
    expect(container.textContent).toBe("Hey, stranger");

    act(() => {
        render(<hello name="Jenny" />, container);
    });
    expect(container.textContent).toBe("Hello, Jenny!");

    act(() => {
        render(<Hello name="Margaret" />, container);
    });
    expect(container.textContent).toBe("Hello, Margaret!");
});
```

## Data Fetching

* Instead of calling real APIs in all your tests, you can mock requests with dummy data. Mocking data fetching with “fake” data prevents flaky tests due to an unavailable backend, and makes them run faster. Note: you may still want to run a subset of tests using an “end-to-end” framework that tells whether the whole app is working together.

```ts
// user.js

import React, {useState, useEffect} from "react";

export default function User(props) {
    const [user, setUser] = useState(null);

    async function fetchUserData(id) {
        const response = await fetch("/" + id);
        setUser(await response.json());
    }

    useEffect(() => {
        fetchUserData(props.id);
    }, [props.id]);

    if (!user) {
        return "loading...";
    }

    return (
        <details>
            <summary>{user.name}</summary>
            <strong>{user.age}</strong>
            years old
            <br />
            lives in {user.address}
        </details>
    );
}
```

* We can write tests for it:

```ts
// user.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import User from "./user";

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
});

it("renders user data", async() => {
    const fakeUser = {
        name: "Joni Baez",
        age: "32",
        address: "123, Charming Avenue"
    };

    jest.spyOn(global, "fetch").mockImplementation(() => {
        Promise.resolve({
            json: () => Promise.resolve(fakeUser)
        })
    });

    // Use the asynchronous version of act to apply reoslved promises
    await act(async() => {
        render(<User id="123" />, container);
    });

    expect(container.querySelector("summary").textContent).toBe(fakeUser.name);
    expect(container.querySelector("strong").textContent).toBe(fakeUser.age);
    expect(container.textContent).toContain(fakeUser.address);

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});

jest.spyOn(global, "fetch")
```

## Mocking Modules

* Some modules might not work well inside a testing environment, or may not be as essential to the test itself. Mocking out these modules with dummy replacements can make it easier to write tests for your own code.

* Consider a Contact component that embeds a third-party GoogleMap component:

```ts
// map.js

import React from "react";

import { LoadScript, GoogleMap } from "react-google-maps";
export default function Map(props) {
    return (
        <LoadScript id="script-loader" googleMapsApiKey="YOUR_API_KEY">
            <GoogleMap id="example-map" center={props.center} />
        </LoadScript>
    );
}

// contact.js

import React from "react";
import Map from "./map";

function Contact(props) {
    return (
        <div>
            <address>
                Contact {props.name} via{" "}
                <a data-testid="email" href={"mailto:" + props.email}>
                    email
                </a>
                or on their 
                <a data-testid="site" href={props.site}>
                    website
                </a>.
            </address>
            <Map center={props.center} />
        </div>
    );
}
```

* If we don’t want to load this component in our tests, we can mock out the dependency itself to a dummy component, and run our tests:

```ts
// contact.test.js

import React from "react";
import {render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Contact from "./contact";
import MockedMap from "./map";

jest.mock("./map", () => {
    return function DummyMap(props) {
        return (
            <div data-testid="map">
                {props.center.lat}:{props.center.long}
            </div>
        );
    }
});

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
});

it("should render contact information", () => {
    const center = { lat: 0, long: 0 };
    act(() => {
        render(
            <Contact 
                name="Joni Baez"
                email="test@example.com"
                site="http://test.com"
                center={center}
            />, 
            container
        );
    });

    expect(
        container.querySelector("[data-testid='email']").getAttribute("href")
    ).toEqual("mailto:test@example.com");

    expect(
        container.querySelector('[data-testid="site"]').getAttribute("href")
    ).toEqual("http://test.com");

    expect(
        container.querySelector('[data-testid="map"]').textContent
    ).toEqual("0:0");
});
```

## Events