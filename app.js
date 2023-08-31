const scaleNames = {
    c: 'celsius',
    f: 'hrenheit'
}

function BoilerVerdict({celsius}) {
    const message = celsius>100 ? "L'eau bout" : "L'eau ne bout pas"
    return <p className="alert">{message}</p>
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            temperature: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({
            temperature: e.target.value
        })
    }
    
    render(){
        const {temperature} = this.state
        const {unite} = scaleNames[this.props.scale]
        return <div className="form-group">
                <label htmlFor={unite}>Donner une température en {unite} : </label>
                <input 
                    type="text" 
                    className="form-control"
                    id={unite} 
                    name={unite}
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
            temperature: ""
        }
    }

    render() {
        // on destructure pour ne plus à avoir à ajouter à chaque fois this.state.temperature
        const {temperature} = this.state
        return <div className='container'>
                <TemperatureInput scale="c" />
                <TemperatureInput scale="f" />
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