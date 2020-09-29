# When worlds collide: React hooks + RenderProps

Function Components are awesome and so are React hooks. While we continue to adopt them in our code, we need to be aware of certain gotchas when you cross FunctionComponents and RenderProps.

Before hooks, RenderProps allowed you to compose behaviors using reusable React components. Take the following code as an example: (Yes you can write this in a different way using hooks, but this example is intentional)

```ts
const Animal = ({ name, body }) => {
  return <Box>{body({ name })}</Box>;
};

const Biped = ({ name }) => <Legs keys={name} count={2} />;
const Quadruped = ({ name }) => <Legs key={name} count={4} />;
```

Now we can describe different animals:

```ts
const Dog = () => <Animal name="dog" body={Quadruped} />;
const Cat = () => <Animal name="cat" body={Quadruped} />;
const Human = () => <Animal name="human" body={Biped} />;
const Ostrich = () => <Animal name="ostrich" body={Biped} />;
```

So far so good. Notice the syntax in supplying the body. If you break it down, it is similar to doing something like:

```ts
const Dog = () => (
  <Animal name="dog" body={({ name }) => <Legs keys={name} count={4} />} />
);
```

The only reason not to do the above is that we want to control our re-renders by maintaining the referential identity of body. So before we begin on the main topic, let's quickly look at the difference between Calling and Rendering.

## Rendering

https://smykhailov.github.io/react-patterns/#/hooks-render-props
