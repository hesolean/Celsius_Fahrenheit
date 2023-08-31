// on établit les 2 unités utilisées
const scaleNames = {
    c: 'celsius',
    f: 'hrenheit'
}

/**
 * permet de renvoyer l'information sur l'état de l'eau en fonction de la valeur de la température en celsius
 * @param {number} param0 température en celsius 
 * @returns 
 */
function BoilerVerdict({celsius}) {
    const message = celsius>100 ? "L'eau bout" : "L'eau ne bout pas"
    return <p className="alert">{message}</p>
}

/**
 * convertit de celsius en fahrenheit
 * @param {number} fahrenheit 
 * @returns 
 */
function toCelsius(fahrenheit) {
    return (fahrenheit-32)*5/9
}

/**
 * convertit de fahrenheit en celsius
 * @param {number} celsius 
 * @returns 
 */
function toFahrenheit(celsius) {
    return (celsius*9/5)+32
}

/**
 * vérifie que la valeur saisie est un number et arrondit le résultat avec une précision de 2 chiffres
 * @param {number} temperature 
 * @param {fonction} convert 
 * @returns 
 */
function tryConcert(temperature, convert){
    const value = parseFloat(temperature)
    if (Number.isNaN(value)) {
        return '';
    }
        // *100 /100 pour avoir une précision à 2 chiffres
    return (Math.round(convert(value)*100/100)).toString()
}

/**
 * composant de champ de saisie de température quelque soit l'unité choisit
 */
class TemperatureInput extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    /**
     * récupère la valeur saisie par l'opérateur dans l'input
     * @param {event} e 
     */
    handleChange(e) {
        this.props.onTemperatureChange(e.target.value)
    }
    
    render() {
        // on récupère la température dans champ
        const {temperature} = this.props

        // on choisit l'unité de travail en fonction du champ dans lequel l'utilisateur saisie sa valeur
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

/**
 * composant qui affiche les 2 champs, affiche la conversion et donne le verdict de l'état de l'eau
 */
class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scale: 'c',
            temperature: 20
        }

        // on différencie l'action en fonction du champ utilisé
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)

    }

    /**
     * on définit l'unité celsius et la valeur de la température
     * @param {number} temperature 
     */
    handleCelsiusChange(temperature){
        this.setState({
            scale: "c",
            temperature
        })
    }

    /**
     * on définit l'unité fahrenheit et la valeur de la température
     * @param {number} temperature 
     */
    handleFahrenheitChange(temperature){
        this.setState({
            scale: "f",
            temperature
        })
    }

    render() {
        
        // on destructure pour ne plus à avoir à ajouter à chaque fois this.state.temperature
        const {temperature, scale} = this.state
        
        //suivant le champ sélectionné, on lance la conversion adaptée
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

ReactDOM.render(<Calculator/>, document.querySelector('#app'))