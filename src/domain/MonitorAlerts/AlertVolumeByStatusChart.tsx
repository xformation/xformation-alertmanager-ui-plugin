import * as React from 'react';
import { Line } from 'react-chartjs-2';

export class AlertVolumeByStatusChart extends React.Component<any, any> {
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
                label: "Pendding",
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
            labels: ['', '', '', '', '', '']

        };
    }

    render() {
        return (
            <div className="padding-top" style={{width: "100%", height: "100%"}}>
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

