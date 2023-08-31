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
            temperature: 20
        }
        this.handleTemperatureChange = this.handleTemperatureChange.bind(this)
    }

    handleTemperatureChange(temperature){
        this.setState({temperature})
    }
    render() {
        
        // on destructure pour ne plus à avoir à ajouter à chaque fois this.state.temperature
        const {temperature} = this.state
        
        const celsius = temperature
        const fahrenheit = toFahrenheit(celsius)

        return <div className='container'>
                <TemperatureInput 
                    scale="c" 
                    temperature={celsius} 
                    onTemperatureChange={this.handleTemperatureChange}/>
                <TemperatureInput scale="f" temperature={fahrenheit}/>
                {/* {JSON.stringify(this.state)} */}
                <BoilerVerdict celsius={parseFloat(temperature)}/>
            </div>
        }
}

function Home () {
    return <div>
            <Calculator />
            
        </div>
}
ReactDOM.render(<Home/>, document.querySelector('#app'))