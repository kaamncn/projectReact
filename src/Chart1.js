import { parse } from 'papaparse';
import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class Chart1 extends Component {

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
        parse("http://localhost:5000/csv",{
            download: true,
            header: true,
            complete: (e) => {
                console.log(e);
                this.setdata(e.data);
            }
        })
    }
    setdata(data) {
        //console.log(data[0].scores.substring(0,2));
        // data.forEach((word, index, arr) => {
        //     console.log(word.substring(0,2))

        // });
        var sc = [];
        var sc1 = [];
        var sc2 = [];
        var sc3 = [];
        var sc4 = [];
        var i1 = 0,i2= 0,i3= 0,i4= 0;
        for(let i = 0;i<data.length;i++)
        {
            sc[i] = data[i].scores.substring(0,2)
            if (parseInt(sc[i])<=20)
            {
                sc1[i1] = parseInt(sc[i]);
                i1++;
            } 
            else if (parseInt(sc[i])<=40)
            {
                sc2[i2] = parseInt(sc[i]);
                i2++;
            } 
            else if (parseInt(sc[i])<=60)
            {
                sc3[i3] = parseInt(sc[i]);
                i3++;
            } 
            else if (parseInt(sc[i])<=80)
            {
                sc4[i4] = parseInt(sc[i]);
                i4++;
            }
                
        }
        //console.log(sc2);
        this.setState({
            options: {
                chart: {
                    id: 'apexchart-example'
                },
                xaxis: {
                    categories: ["0-20", "21-40", "41-60", "61-80"]
                }
            },
            series: [{
                name: 'series-1',
                data: [sc1.length, sc2.length,sc3.length,sc4.length]
            }]
        })
    }

    render() {
        return (
            <Chart options={this.state.options} series={this.state.series} type="bar" width={500} height={320} />
        )
    }
}

export default Chart1;
