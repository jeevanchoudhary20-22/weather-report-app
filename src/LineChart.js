
import React, { Component } from "react";
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";



class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    render() {
        const dates = this.props.data.map(item => new Date(item.dt * 1000).toLocaleDateString());
        const data = {
            labels: dates,
            datasets: [
                {
                    label: "Weather Report",
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: this.props.data.map(item => item.temp.max),
                },
            ],
        };
        return (
            <div>
                <Line data={data} />
            </div>
        );
    }
};

export default LineChart;