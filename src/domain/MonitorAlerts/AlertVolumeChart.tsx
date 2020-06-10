import * as React from 'react';
import { Line } from 'react-chartjs-2';

export class AlertVolumeChart extends React.Component<any, any> {
    chart: any;
    constructor(props: any) {
        super(props);
        this.state = {
            datasets: [{
                label: "New 156",
                lineTension: 0.1,
                fill: false,
                borderColor: "rgba(252, 203, 80, 1)",
                // backgroundColor: "rgba(255, 255,255, 0.1)",
                data: [20, 29, 34, 11, 46, 25, 49]
            },
            {
                label: "Resolved 75",
                lineTension: 0.1,
                fill: false,
                borderColor: "rgba(73, 183, 234, 1)",
                // backgroundColor: "rgba(255, 255,255, 0.1)",
                data: [40, 19, 38, 20, 26, 70, 39]
            }
            ],
            labels: ['', '', '', '', '', ''],
            legends: []
        };
        this.chart = null;
    }

    componentDidMount() {
        if (this.chart) {
            this.setState({
                legends: this.chart.chartInstance.legend.legendItems
            });
        }
    }

    createLegend = () => {
        const text = [];
        const { legends } = this.state;
        if (legends && legends.length > 0) {
            for (var i = 0; i < legends.length; i++) {
                text.push(
                    <li>
                        <div className="chart-legend">
                            <span className="legend-background" style={{ backgroundColor: legends[i].fillStyle }}></span>
                            <span className="legend-label">
                                {legends[i].text}
                            </span>
                        </div>
                    </li>
                );
                text.push(
                    
                );
            }
        }
        return text;
    };

    render() {
        return (
            <div className="row" style={{ width: "100%", height: "100%", marginLeft: "0px" }}>
                <Line
                    ref={ref => (this.chart = ref)}
                    data={this.state}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    stepSize: 10,
                                    beginAtZero: true
                                }
                            }],
                        },
                        legend: {
                            display: false,
                            position: 'bottom'
                        }
                    }}
                />
                <div className="legend-container">
                    <ul className="custom-chart-legends">
                        {this.createLegend()}
                    </ul>
                </div>
            </div>
        );
    }

};