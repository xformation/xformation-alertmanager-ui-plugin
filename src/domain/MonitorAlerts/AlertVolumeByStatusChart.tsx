import * as React from 'react';
import { Line } from 'react-chartjs-2';

export class AlertVolumeByStatusChart extends React.Component<any, any> {
    chart: any;
    constructor(props: any) {
        super(props);
        this.state = {
            datasets: [{
                label: "New",
                backgroundColor: "rgba(252, 203, 80, 0.7)",
                borderColor: "rgba(252, 203, 80, 1)",
                data: [20, 29, 34, 11, 46, 25, 49]
            },
            {
                label: "Open",
                backgroundColor: "rgba(73, 183, 234, 0.7)",
                borderColor: "rgba(73, 183, 234, 1)",
                data: [20, 39, 38, 50, 56, 70, 39]
            },
            {
                label: "Pending",
                backgroundColor: "rgba(109, 219, 146, 0.7)",
                borderColor: "rgba(109, 219, 146, 1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            },
            {
                label: "Resolved",
                backgroundColor: "rgba(250, 125, 137, 0.7)",
                borderColor: "rgba(250, 125, 137, 1)",
                data: [60, 49, 68, 31, 66, 75, 49]
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
            }
        }
        return text;
    };

    render() {
        return (
            <div className="row" style={{width: "100%", height: "100%", marginLeft: "0px"}}>
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

