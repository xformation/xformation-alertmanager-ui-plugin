import * as React from 'react';
// import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Bar } from 'react-chartjs-2';

export class CurrentAvrageWaitResponceTimeChart extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            datasets: [{
                label: 'Bar Dataset',
                data: [50, 50, 50, 10, 50, 50,30],
                backgroundColor: 'rgba(255,255,255,0.1)',
                // borderColor: 'rgba(0,0,0,0.1)',
                // borderWidth: 2,

            }, {
                label: 'Line Dataset',
                lineTension: 0.2,
                fill: false,
                borderColor: 'rgba(255,255,255,0.5)',
                data: [16, 12, 10, 18, 20, 10,30],
                borderWidth: 2,
                // Changes this dataset to become a line
                type: 'line'
            }],
            labels: ['Today', '', '', '']

        };
    }



    render() {
        return (
            <div className="" style={{width: "100%", height: "100%"}}>
                <Bar
                    data={this.state}
                    options={{
                        scales: {
                            yAxes: [{
                                ticks: {
                                    fontColor: "white",
                                    stepSize: 10,
                                    beginAtZero: true
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontColor: "white",
                                    stepSize: 10,
                                }
                            }]
                        },
                        legend: {
                            display: false,
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                    }}
                />
            </div>
        );
    }
};