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

* It all begins with running one command in your terminal.

* If you use Yarn, run:

```ts
yarn add --dev typescript
```

* If you use npm, run:

```ts
npm install --save-dev typescript
```

* Congrats! You’ve installed the latest version of TypeScript into your project. Installing TypeScript gives us access to the tsc command. Before configuration, let’s add tsc to the “scripts” section in our package.json:

```ts
{
    // ...
    "scripts": {
        "build": "tsc",
        // ...
    },
    // ...
}
```

## Configuring the TypeScript Compiler

* The compiler is of no help to us until we tell it what to do. In TypeScript, these rules are defined in a special file called tsconfig.json. To generate this file:

* If you use Yarn, run:

```ts
yarn run tsc --init
```

If you use npm, run:

```ts
npx tsc --init
```

* Looking at the now generated tsconfig.json, you can see that there are many options you can use to configure the compiler. For a detailed description of all the options, check here.

* Of the many options, we’ll look at rootDir and outDir. In its true fashion, the compiler will take in typescript files and generate javascript files. However we don’t want to get confused with our source files and the generated output.

* We’ll address this in two steps:

* Firstly, let’s arrange our project structure like this. We’ll place all our source code in the src directory.

```ts
├── package.json
├── src
│   └── index.ts 
└── tsconfig.json
```

Next, we’ll tell the compiler where our source code is and where the output should go.

```ts
// tsconfig.json
{
    "compilerOptions": {
        // ...
        "rootDir": "src",
        "outDir": "build"
        // ...
    },
}
```

* Great! Now when we run our build script the compiler will output the generated javascript to the build folder. The TypeScript React Starter provides a tsconfig.json with a good set of rules to get you started.

* Generally, you don’t want to keep the generated javascript in your source control, so be sure to add the build folder to your .gitignore.

## File extensions

* In React, you most likely write your components in a `.js` file. In TypeScript we have 2 file extensions:

* `.ts` is the default file extension while `.tsx` is a special extension used for files which contain JSX.

## Running TypeScript

* If you followed the instructions above, you should be able to run TypeScript for the first time.

```ts
yarn build
```

* If you use npm, run:

```ts
npm run build
```

* If you see no output, it means that it completed successfully.

## Type Definitions

* To be able to show errors and hints from other packages, the compiler relies on declaration files. A declaration file provides all the type information about a library. This enables us to use javascript libraries like those on npm in our project.

* There are two main ways to get declarations for a library:

* **Bundled -** The library bundles its own declaration file. This is great for us, since all we need to do is install the library, and we can use it right away. To check if a library has bundled types, look for an `index.d.ts` file in the project. Some libraries will have it specified in their package.json under the typings or types field.

* **DefinitelyTyped -** DefinitelyTyped is a huge repository of declarations for libraries that don’t bundle a declaration file. The declarations are crowd-sourced and managed by Microsoft and open source contributors. React for example doesn’t bundle its own declaration file. Instead we can get it from DefinitelyTyped. To do so enter this command in your terminal.

```ts
# yarn
yarn add --dev @types/react

# npm
npm i --save-dev @types/react
```

* **Local Declarations** Sometimes the package that you want to use doesn’t bundle declarations nor is it available on DefinitelyTyped. In that case, we can have a local declaration file. To do this, create a declarations.d.ts file in the root of your source directory. A simple declaration could look like this:

```ts
declare module 'querystring' {
    export function stringify(val: object): string
    export function parse(val: string): object
}
```

