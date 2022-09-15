import { Component } from "react";
import { connect } from "react-redux";
import LineChart from "./LineChart";
import { updateStoreData } from "./redux/actions";

class WeatherApp extends Component {
    componentDidMount() {
        const storedData = JSON.parse(localStorage.getItem('weatherReport'))
        if (storedData) {
            this.props.updateStoreData(storedData)
            this.getForeCast(storedData.units)
        }
    }

    getForeCast = async (unit) => {
        const storedData = JSON.parse(localStorage.getItem('weatherReport'))
        const units = unit === 'celsius' ? 'metric' : 'imperial';
        var city = this.props.city, zipCode = this.props.zipCode;
        if (storedData) {
            city = storedData.city; zipCode = storedData.zipCode
        }
        fetch(`https://pro.openweathermap.org/data/2.5/forecast/climate?q=${city}&zip=${zipCode}&units=${units}&appid=9de243494c0b295cca9337e1e96b00e2`)
            .then(res => res.json())
            .then(response => {
                this.props.updateStoreData({ ...this.props, data: response.list || [] })
                localStorage.setItem('weatherReport', JSON.stringify({ ...this.props, data: response.list || [] }))
            })
    }

    onChangeValue = (event) => {
        this.getForeCast(event.target.value)
        this.props.updateStoreData({ ...this.props, units: event.target.value })
    }

    onInputChange = (event) => {
        const { name, value } = event.target
        this.props.updateStoreData({ ...this.props, [name]: value })
    }
    render() {
        const { units, zipCode, data, city } = this.props
        return (
            <>
                <p>Weather Component</p>
                <div >
                    <input type="radio" value="celsius" name="Celsius" checked={units === 'celsius'} onChange={this.onChangeValue} /> Celsius
                    <input type="radio" value="fahrenheit" name="Fahrenheit" checked={units === 'fahrenheit'} onChange={this.onChangeValue} /> Fahrenheit
                    <input type='text' name='zipCode' placeholder="Zip Code" value={zipCode} onChange={this.onInputChange} />
                    <input type='text' name='city' placeholder="City" value={city} onChange={this.onInputChange} />
                    <button onClick={() => this.getForeCast(units)}>Get Report</button>
                </div>
                {data.length ? <LineChart data={data} /> : null}
            </>
        )
    }

}

function mapStateToProps(state) {
    const { units, data, zipCode, city } = state
    return ({
        units,
        data,
        zipCode,
        city
    })
}

const mapDispatchToProps = {
    updateStoreData
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherApp)