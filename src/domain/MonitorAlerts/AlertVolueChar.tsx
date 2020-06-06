import * as React from 'react';
import { Line } from 'react-chartjs-2';

export class AlertVolumeChart extends React.Component<any, any> {
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
            labels: ['', '', '', '', '', '']

        };
    }

    render() {
        return (
            <div className="padding-top">
                <Line
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
                            display: true,
                            position: 'bottom'
                        }
                    }}
                />
            </div>
        );
    }

};