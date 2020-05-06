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

## Adding a Second Input

* Our new requirement is that, in addition to a Celsius input, we provide a Fahrenheit input, and they are kept in sync.
* We can start by extracting a TemperatureInput component from Calculator. 
* We will add a new scale prop to it that can either be "c" or "f":

```ts
const scaleNames = {
    c: 'Celcius',
    f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { temperature: '' };     
    }

    handleChange(e) {
        this.setState({ temperature: e.target.value });
    }

    render() {
        const temperature = this.state.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}: </legend>
                <input value={temperature}
                    onChange={this.handleChange} />
            </fieldset>
        );
    }
}
```

```ts
class Calculator extends React.Component {
    render() {
        return(
            <div>
                <TemperatureInput scale="c" />
                <TemperatureInput scale="f" />
            </div>
        );
    }
}
```

* We have two inputs now, but when you enter the temperature in one of them, the other doesn’t update. 
* This contradicts our requirement: we want to keep them in sync.
* We also can’t display the BoilingVerdict from Calculator. 
* The Calculator doesn’t know the current temperature because it is hidden inside the TemperatureInput.

## Writing Conversion Functions

```ts
function toCelsius(fahrenheit) {
    return (fahrenheit-32) * 5 / 9;
}

function toFahrenheit(celcius) {
    return (celcius * 9 / 5) + 32;
}
```

* These two functions convert numbers. 
* We will write another function that takes a string temperature and a converter function as arguments and returns a string. 
* We will use it to calculate the value of one input based on the other input.
* It returns an empty string on an invalid temperature, and it keeps the output rounded to the third decimal place:

```ts
function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output*1000)/1000;
    return rounded.toString();
}
```

```ts
tryConvert('abc', toCelsius) // returns an empty string
tryConvert('10.22', toFahrenheit) // returns '50.396'.
```

## Lifting State Up

* Currently, both TemperatureInput components independently keep their values in the local state:


```ts

```