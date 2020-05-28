# Static Type Checking

* Static type checkers like Flow and TypeScript identify certain types of problems before you even run your code. They can also improve developer workflow by adding features like auto-completion. For this reason, we recommend using Flow or TypeScript instead of PropTypes for larger code bases.

# TypeScript

* TypeScript is a programming language developed by Microsoft. 
* It is a typed superset of JavaScript, and includes its own compiler. 
* Being a typed language, TypeScript can catch errors and bugs at build time, long before your app goes live.

To use TypeScript, you need to:

* Add TypeScript as a dependency to your project
* Configure the TypeScript compiler options
* Use the right file extensions
* Add definitions for libraries you use

## Using TypeScript with Create React App

* Create React App supports TypeScript out of the box.

* To create a new project with TypeScript support, run:

```ts
npx create-react-app my-app --template typescript
```

> Note: 

* If you use Create React App, you can skip the rest of this page. It describes the manual setup which doesn’t apply to Create React App users.

## Adding TypeScript to a Project