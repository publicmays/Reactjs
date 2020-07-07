# Testing Overview

* You can test React components similar to testing other JavaScript code.

* There are a few ways to test React components. Broadly, they divide into two categories:

1. Rendering component trees in a simplified test environment and asserting on their output.
1. Running a complete app in a realistic browser environment (also known as “end-to-end” tests).

* This documentation section focuses on testing strategies for the first case. While full end-to-end tests can be very useful to prevent regressions to important workflows, such tests are not concerned with React components in particular, and are out of the scope of this section.

## Tradeoffs

* When choosing testing tools, it is worth considering a few tradeoffs:

* Iteration speed vs Realistic environment: Some tools offer a very quick feedback loop between making a change and seeing the result, but don’t model the browser behavior precisely. Other tools might use a real browser environment, but reduce the iteration speed and are flakier on a continuous integration server.

* How much to mock: With components, the distinction between a “unit” and “integration” test can be blurry. If you’re testing a form, should its test also test the buttons inside of it? Or should a button component have its own test suite? Should refactoring a button ever break the form test?

* Different answers may work for different teams and products.

## Recommended Tools