import * as React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Line } from 'react-chartjs-2';

export class PopupContent extends React.Component<any, any> {
    options = {
        // responsive: true,
        title: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    stepSize: 20,
                    suggestedMin: 0,
                    callback: function (value: any, index: any, values: any) {
                        return value + "%";
                    }
                }
            }]
        }
    };
    dummyData = {
        label: "",
        backgroundColor: "#21AFC3",
        borderColor: "#21AFC3",
        fill: false,
        data: [80, 81, 84, 82, 79, 76, 78, 80]
    };
    labels = ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"];
    constructor(props: any) {
        super(props);
        this.state = {
            activeTab: 0,
            client_url: this.props.popupcontentData.url,
            historyTableArray: [
                {
                    name: 'Action group email to Siddhesh executed (configured on alert rule)',
                    user: 'Automated',
                    dateAndTime: '17/03/2020, 11:28:02'
                },
                {
                    name: 'Alert fired',
                    user: 'Automated',
                    dateAndTime: '17/03/2020, 11:29:56'
                },
                {
                    name: 'Ticked generated Ticket ID 144',
                    user: 'Papu',
                    dateAndTime: '01/04/2020, 13:28:05'
                },
                {
                    name: 'Start EC2 Instance',
                    user: 'Papu',
                    dateAndTime: '01/04/2020, 12:34:30'
                },
                {
                    name: 'Close ticket',
                    user: 'Papu',
                    dateAndTime: '01/04/2020, 12:58:34'
                }
            ],
            diagnosticsTableArray: [
                {
                    name: 'Percentage CPU',
                    severity: 'Urgent',
                    monitorCondition: 'Fired',
                    alertState: 'New',
                    affectedResource: 'Prod_DB_SYN14'
                }
            ],
            iFrameLoaded: false
        };
    }

    setActiveTab = (activeTab: any) => {
        this.setState({
            activeTab
        });
    };

    historyTable = () => {
        const retData = [];
        const { historyTableArray } = this.state;
        for (let i = 0; i < historyTableArray.length; i++) {
            const historyTable = historyTableArray[i];
            retData.push(
                <tr>
                    <td>{historyTable.name}</td>
                    <td>{historyTable.user}</td>
                    <td>{historyTable.dateAndTime}</td>
                </tr>
            )
        }
        return retData;
    }

    diagnosticsTable = () => {
        const retData = [];
        const { diagnosticsTableArray } = this.state;
        for (let i = 0; i < diagnosticsTableArray.length; i++) {
            const diagnosticsTable = diagnosticsTableArray[i];
            retData.push(
                <tr>
                    <td><span>{diagnosticsTable.name}</span></td>
                    <td>
                        <span className="urgent">{diagnosticsTable.severity}</span>
                    </td>
                    <td><i className="fa fa-exclamation-triangle"></i> {diagnosticsTable.monitorCondition}</td>
                    <td>{diagnosticsTable.alertState}</td>
                    <td>{diagnosticsTable.affectedResource}</td>
                </tr>
            )
        }
        return retData;
    }

    onIframeLoaded = () => {
        setTimeout(() => {
            this.setState({
                iFrameLoaded: true
            });
        }, 500);
    };

    render() {
        const { activeTab, iFrameLoaded } = this.state;
        return (
            <div className="percentage-tabs">
                <ul>
                    <li className={activeTab === 0 ? "active-tab" : ''} onClick={e => this.setActiveTab(0)}>
                        <a href="#">Summary</a>
                    </li>
                    <li className={activeTab === 1 ? "active-tab" : ''} onClick={e => this.setActiveTab(1)}>
                        <a href="#">History</a>
                    </li>
                    <li className={activeTab === 2 ? "active-tab" : ''} onClick={e => this.setActiveTab(2)}>
                        <a href="#">Diagnostics</a>
                    </li>
                </ul>
                <div className="tab-container">
                    {activeTab === 0 &&
                        <div>
                            <div style={{ display: iFrameLoaded ? '' : 'none' }}>
                                <iframe style={{ width: "100%", height: "450px", border: "none" }} src={this.state.client_url} onLoad={this.onIframeLoaded}></iframe>
                            </div>
                            <div style={{ textAlign: "center", display: iFrameLoaded ? 'none' : '' }}>
                                Data is loading...
                            </div>
                        </div>
                    }
                    {activeTab === 1 &&
                        <div>
                            <table style={{ width: "100%" }} className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>User</th>
                                        <th>Date/Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.historyTable()}
                                </tbody>
                            </table>
                        </div>
                    }
                    {activeTab === 2 &&
                        <div>
                            <table style={{ width: "100%" }} className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Severity</th>
                                        <th>Monitor Condition</th>
                                        <th>Alert State</th>
                                        <th>Affected Resource</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.diagnosticsTable()}
                                </tbody>
                            </table>
                        </div>
                    }

                </div>


            </div>
        );
    }
};