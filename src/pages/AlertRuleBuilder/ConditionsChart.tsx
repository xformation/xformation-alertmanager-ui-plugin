import * as React from 'react';
import { Line } from 'react-chartjs-2';

export class ConditionsChart extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            labels: ['', '05:18', '05:20', '05:22', '05:24', '05:26', '05:28', ''],
        };
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div className="chart-select-menu">
                    <label>Send Data from</label>
                    <div className="select-menu">
                        <i className="fa fa-clock-o"></i>
                        <select>
                            <option value="Past 15m">Past 15m</option>
                            <option value="Past 20m">Past 20m</option>
                            <option value="Past 25m">Past 25m</option>
                            <option value="Past 30m">Past 30m</option>
                        </select>
                    </div>
                </div>
                <div className="cq-query-text">
                    <span>cq-queryOK</span>
                </div>
                <div className="line-chart">
                    <Line
                        ref=""
                        data={this.state}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        stepSize: 0.5,
                                        beginAtZero: true
                                    }
                                }],
                            },
                            
                        }}
                    />
                </div>
            </div>
        );
    }

};