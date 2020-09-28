# useEffect async

When use useEffect() hook with async operation inside,

```ts
const UseEffectAsync: FC<TData> = (props: TData) => {
    let [data, setData] = useState('initial data');

    useEffect(() => {
        const asyncOp = async () => {
            await sleep(10*1000);
            setData(props.updatedData);
        };

        asyncOp()
            .then(...)      // ❗ Promises must be resolved properly
            .catch(...);    // ❗ Don't forget to handle exceptions
    }, [props.updatedData]);

    return (
        <RenderCounter color="red">
            <div>{data}</div>
        </RenderCounter>
    );
};
```

Note: wait 10 seconds and look how data get updated. After that click few times on "re-render" button and look how data will start update sequentially and render each data change, when promise resolves.

make sure you always return cleanup function, which will cancel/ignore function:

```ts
const UseEffectAsyncWithCleanup: FC<TData> = (props: TData) => {
  let [data, setData] = useState("initial data");

  useEffect(() => {
      let cancel = false;
      const asyncOp = async () => {
          await sleep(10*1000);
          if (cancel) {
              return;
          }

          setData(props.updatedData);
      };

      asyncOp()
        .then(...)  // ❗ Promises must be resolved properly
        .catch(...) // ❗ Don't forget to handle exceptions

    return () => {
        cancel = true;
    };
  },
  [props.updatedData]);

  return (
    <RenderCounter color="green">
      <div>{data}</div>
    </RenderCounter>
  );
};
```

otherwise you might gat stale data, when the promise resolves later than expected.

more detailed information in the following [article](https://dev.to/n1ru4l/homebrew-react-hooks-useasynceffect-or-how-to-handle-async-operations-with-useeffect-1fa8).

https://smykhailov.github.io/react-patterns/#/hook-use-effect
