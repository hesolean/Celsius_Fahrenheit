const scaleNames = {
    c: 'celsius',
    f: 'hrenheit'
}

function BoilerVerdict({celsius}) {
    const message = celsius>100 ? "L'eau bout" : "L'eau ne bout pas"
    return <p className="alert">{message}</p>
}

function toCelsius(fahrenheit) {
    return (fahrenheit-32)*5/9
}

function toFahrenheit(celsius) {
    return (celsius*9/5)+32
}

function tryConcert(temperature, convert){
    const value = parseFloat(temperature)
    if (Number.isNaN(value)) {
        return '';
    }
        // *100 /100 pour avoir une précision à 2 chiffres
    return (Math.round(convert(value)*100/100)).toString()
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value)
    }
    
    render() {
        const {temperature} = this.props
        const unite = scaleNames[this.props.scale]
        return <div className="form-group">
                <label htmlFor={unite}>Donner une température en {unite} : </label>
                <input 
                    type="text" 
                    className="form-control"
                    id={unite} 
                    value={temperature}
                    onChange={this.handleChange}
                />
            </div>
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scale: 'c',
            temperature: 20
        }
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)

    }

    handleCelsiusChange(temperature){
        this.setState({
            scale: "c",
            temperature
        })
    }

    handleFahrenheitChange(temperature){
        this.setState({
            scale: "f",
            temperature
        })
    }

    render() {
        
        // on destructure pour ne plus à avoir à ajouter à chaque fois this.state.temperature
        const {temperature, scale} = this.state
        
        const celsius = scale === 'c' ? temperature : tryConcert(temperature, toCelsius)
        const fahrenheit = scale === 'f'? temperature : tryConcert(temperature, toFahrenheit)

        return <div className='container'>
                <TemperatureInput 
                    scale="c" 
                    temperature={celsius} 
                    onTemperatureChange={this.handleCelsiusChange}
                />
                <TemperatureInput 
                    scale="f" 
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange}
                />
                {/* {JSON.stringify(this.state)} */}
                <BoilerVerdict celsius={parseFloat(celsius)}/>
            </div>
        }
}

function Home () {
    return <div>
            <Calculator />
            
        </div>
}
ReactDOM.render(<Home/>, document.querySelector('#app'))