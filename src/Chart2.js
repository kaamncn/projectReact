import { parse } from 'papaparse';
import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class Chart2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: {
                chart: {
                    id: 'apexchart-example'
                },
                xaxis: {
                    categories: []
                }
            },
            series: [{
                name: 'series-1',
                data: []
            }]
        }
    }

    componentDidMount() {
        parse("http://localhost:5000/csv", {
            download: true,
            header: true,
            complete: (e) => {
                console.log(e);
                this.setdata(e.data);
            }
        })
    }
    setdata(data) {
        var sc = []
        for (let i = 0; i < data.length; i++) {
            sc[i] = parseInt(data[i].scores.substring(0, 2))
        }
        const distinct = (value, index, self) => {
            return self.indexOf(value) === index
        }
        const distinctSc = sc.filter(distinct)
        console.log(distinctSc.sort())
        const counts = {};
        // const c= [];
        sc.forEach(function (x) {if(!isNaN(x)) counts[x] = (counts[x] || 0) + 1; });
        var result = Object.keys(counts).map((key) => counts[key]);
        
        this.setState({
            options: {
                chart: {
                    id: 'apexchart-example'
                },
                xaxis: {
                    categories: distinctSc
                }
            },
            series: [{
                name: 'series-1',
                data: result
            }]
        })
    }

    render() {
        return (
            <Chart options={this.state.options} series={this.state.series} type="line" width={500} height={320} />

        )
    }
}

export default Chart2;
