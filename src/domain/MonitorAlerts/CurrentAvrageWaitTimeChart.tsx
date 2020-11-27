import * as React from 'react';
// import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import { RestService } from '../_service/RestService';
import { config } from '../../config';
export class CurrentAvrageWaitTimeChart extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            datasets: [{
                /*  bar data set
                          label: 'Bar Dataset',
                          data: [50, 50, 50, 10, 50, 50,30],
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          // borderColor: 'rgba(0,0,0,0.1)',
                          // borderWidth: 2,
                          */
            }, {
                label: 'Line Dataset',
                lineTension: 0.2,
                fill: false,
                borderColor: 'rgba(255,255,255,0.5)',
                data: [50,20,40,30,80,70,78],
                borderWidth: 2,
                // Changes this dataset to become a line
                type: 'line'
            }],
            labels: [10,20,30,40,50,60,70]

        };
    }
    // componentDidMount() {
    //     try {
    //         this.fetchData();
    //     } catch (err) {
    //         console.log("Avarage response time data load failed. Error: ", err);
    //     }
    // }
    fetchData = () => {
        RestService.getData(config.GET_AVG_WAIT_TIME_DATA, null, null).then(
            (response: any) => {
                this.setState({
                    datasets: [{
                        /*  bar data set
                        label: 'Bar Dataset',
                        data: [50, 50, 50, 10, 50, 50,30],
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        // borderColor: 'rgba(0,0,0,0.1)',
                        // borderWidth: 2,
                        */
                    }, {
                        label: 'Line Dataset',
                        lineTension: 0.2,
                        fill: false,
                        borderColor: 'rgba(255,255,255,0.5)',
                        data: response.lineDataSetList,
                        borderWidth: 2,
                        // Changes this dataset to become a line
                        type: 'line'
                    }],
                    labels: response.daysList,
                })
                console.log("Avg Resp Time Data :::::: ", response);
            }
        );
    }



    render() {
        return (
            <div className="" style={{ width: "100%", height: "100%" }}>
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