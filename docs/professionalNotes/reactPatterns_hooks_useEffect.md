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

https://smykhailov.github.io/react-patterns/#/hook-use-effect
