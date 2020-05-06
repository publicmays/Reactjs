# Lifting State Up

* Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor. Let’s see how this works in action.

* In this section, we will create a temperature calculator that calculates whether the water would boil at a given temperature.
* We will start with a component called `BoilingVerdict`. It accepts the celsius temperature as a prop, and prints whether it is enough to boil the water:

```ts
function BoilingVerdict(props) {
    if (props.celcius >= 100) {
        return <p> The water would boil. </p>;
    }
    return <p>The water would not boil.</p>;
}
```

* Next, we will create a component called Calculator. It renders an `<input>` that lets you enter the temperature, and keeps its value in `this.state.temperature`.
* Additionally, it renders the `BoilingVerdict` for the current input value.

```ts
class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {temperature: ''};
    }

    handleChange(e) {
        this.setState({
            temperature: e.target.value
        });
    }

    render() {
        const temperature = this.state.temperature;
        return(
            <fieldset>
                <legend>Enter temperature in Celcius</legend>
                <input 
                    value={temperature}
                    onChange={this.handleChange}/>
                <BoilingVerdict 
                    celcius={parseFloat(temperature)} />
            </fieldset>
        );
    }
}
```