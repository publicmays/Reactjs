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

The Quadruped component above looks like a Function Component that takes a single prop. So naturally it makes sense to have the developer of Animal to think that you can use the <Component /> syntax aka Rendering to render the component. So case in point:

```ts
const Animal = ({ name, body: Body }) => {
  return (
    <Box>
      <boxy name={name} />
    </Box>
  );
};
```

So far this works just fine, but what if the consumer decided to do define the body property inline, i.e.

```ts
const Dog = () => (
  <Animal name="dog" body={({ name }) => <Legs keys={name} count={4} />} />
);
```

Now your constructor of the body component i.e. Body is going to be a different function on every render. This means irrespective of whether the underlying DOM/Logic has changed or not, your React component is going to be destroyed (unmounted) and recreated (mounted) on every render as reconciliation states that, if the constructor changes, then re-create it. This is because when you do <Body /> you are basically invoking React.createElement which will return a different \$\$type on every render as the constructors are different.

## Ok so may be we'll stick to the Calling syntax?

https://smykhailov.github.io/react-patterns/#/hooks-render-props
