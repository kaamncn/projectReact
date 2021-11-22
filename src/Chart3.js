import React, { Component } from "react";
import Chart from 'react-apexcharts';
import { parse } from "papaparse";

class Chart3 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: []
                }
            },
            series: [
                {
                    name: "series-1",
                    data: []
                }
            ]
        };
    }
    componentDidMount() {
        parse("http://localhost:2000/csv", {
            download: true,
            header: true,
            complete: (e) => {
                console.log(e);
                this.setdata(e.data);
            }
        })
    }
    setdata(data) {
        //console.log(data)
        var sc = [];
        var i1 = 0, i2 = 0, i3 = 0, i4 = 0;
        var sc1 = [], sc2 = [], sc3 = [], sc4 = [];
        for (let i = 0; i < data.length; i++) {
            sc[i] = parseInt(data[i].scores.substring(0, 2));
            if (sc[i] <= 20) {
                sc1[i1] = sc[i];
                i1++;
            }
            else if (sc[i] <= 40) {
                sc2[i2] = sc[i];
                i2++;
            }
            else if (sc[i] <= 60) {
                sc3[i3] = sc[i];
                i3++;
            }
            else if (sc[i] <= 80) {
                sc4[i4] = sc[i];
                i4++;
            }
        }
        //console.log(sc);

        this.setState({
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: ["0-20", "21-40", "41-60", "61-80"]
                }
            },
            series: [
                {
                    name: "series-1",
                    data: [sc1.length,sc2.length,sc3.length,sc4.length]
                }
            ]
        })
    }

    render() {
        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart options={this.state.options} series={this.state.series} type="bar" width={500} height={320} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Chart3;