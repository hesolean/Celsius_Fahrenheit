function BoilerVerdict({celsius}) {
    const message = celsius>100 ? "L'eau bout" : "L'eau ne bout pas"
    return <p className="alert">{message}</p>
}

class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            temperature: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChange(e) {
        const celsius = e.target.value
        this.setState({
            temperature: celsius
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const data = JSON.stringify(this.state)
        return data
    }
    render() {
        // on destructure pour ne plus à avoir à ajouter à chaque fois this.state.temperature
        const {temperature} = this.state
        return <form className="container" onSubmit={this.handleSubmit}>
            <label htmlFor="celsius">Donner une température en Celsius : </label>
            <input 
                type="text" 
                className="form-control"
                id="celsius" 
                name="celsius"
                value={temperature}
                onChange={this.handleChange}
            />
            {/* {JSON.stringify(this.state)} */}
            <BoilerVerdict celsius={parseFloat(temperature)}/>
        </form>
        
    }
}

function Home () {
    return <div>
            <Calculator />
            
        </div>
}
ReactDOM.render(<Home/>, document.querySelector('#app'))