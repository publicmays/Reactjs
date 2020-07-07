# Testing Overview

* You can test React components similar to testing other JavaScript code.

* There are a few ways to test React components. Broadly, they divide into two categories:

1. Rendering component trees in a simplified test environment and asserting on their output.
1. Running a complete app in a realistic browser environment (also known as “end-to-end” tests).

* This documentation section focuses on testing strategies for the first case. While full end-to-end tests can be very useful to prevent regressions to important workflows, such tests are not concerned with React components in particular, and are out of the scope of this section.

## Tradeoffs