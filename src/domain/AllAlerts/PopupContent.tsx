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
            activeTab: 0
        };
    }

    setActiveTab = (activeTab: any) => {
        this.setState({
            activeTab
        });
    };

    render() {
        const state = this.state;
        return (
            <div className="">
                <Nav tabs>
                    <NavItem>
                        <NavLink className={`${state.activeTab === 0 ? 'active' : ''}`} onClick={() => { this.setActiveTab(0); }} >
                            Summary
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={`${state.activeTab === 1 ? 'active' : ''}`} onClick={() => { this.setActiveTab(1); }} >
                            History
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={`${state.activeTab === 2 ? 'active' : ''}`} onClick={() => { this.setActiveTab(2); }} >
                            Diagnostics
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={state.activeTab}>
                    <TabPane tabId={0}>
                        <div className="row m-b-3">
                            <div className="col-sm-2">
                                <div>Severity</div>
                                <div className="severity-urgent bold-label gray-label">Urgent</div>
                            </div>
                            <div className="col-sm-2">
                                <div>Affected Resource</div>
                                <div className="bold-label colored-label">Prod_DB_SYN14</div>
                            </div>
                            <div className="col-sm-2">
                                <div>State</div>
                                <div className="bold-label gray-label">New</div>
                            </div>
                            <div className="col-sm-2">
                                <div>Monitor Condition</div>
                                <div className="bold-label gray-label">Fired</div>
                            </div>
                            <div className="col-sm-2">
                                <div>Fired Time</div>
                                <div className="bold-label gray-label">17/03/2020, 11:29:02</div>
                            </div>
                        </div>
                        <Line data={{ labels: this.labels, datasets: [this.dummyData] }} options={this.options} />
                        <div className="row m-t-3">
                            <div className="col-sm-12">
                                <div style={{ display: "table-row" }}>
                                    <div style={{ display: "table-cell" }}>
                                        <div className="gray-label bold-label" >Percentage CPU</div>
                                        <div className="colored-label bold-label" >Prod_DB_SYN14</div>
                                    </div>
                                    <div className="gray-label bold-label" style={{ display: "table-cell", fontSize: "30px", verticalAlign: "middle", paddingLeft: "15px" }}>82%</div>
                                </div>
                            </div>
                        </div>
                        <div className="row m-t-2">
                            <div className="col-sm-4 gray-label">
                                Evaluation window start time ( for which alert fired ) 3/18/2020, 3:17:17 PM
                            </div>
                            <div className="col-sm-4 gray-label">
                                Evaluation window start time ( for which alert fired ) 3/18/2020, 3:17:17 PM
                            </div>
                        </div>
                        <div className="m-t-2 bold-label gray-label">Criterion</div>
                        <div className="m-t-2 row">
                            <div className="col-sm-4">
                                <div className="bold-label gray-label">Metric name</div>
                                <div className="gray-label">Percentage CPU</div>
                            </div>
                            <div className="col-sm-4">
                                <div className="bold-label gray-label">Metric namespace</div>
                                <div className="gray-label">Microsoft.Compute/virtualMachines</div>
                            </div>
                        </div>
                        <div className="m-t-2 row">
                            <div className="col-sm-4">
                                <div className="bold-label gray-label">Time aggregation</div>
                                <div className="gray-label">Average</div>
                                <div className="gray-label">Threshold: 0.2 %</div>
                            </div>
                            <div className="col-sm-4">
                                <div className="bold-label gray-label">Operator</div>
                                <div className="gray-label">GreaterThan</div>
                                <div className="gray-label">Metric value (when alert fired): 0.62 %</div>
                            </div>
                        </div>
                        <div className="m-t-2 row">
                            <div className="col-sm-4">
                                <div className="bold-label gray-label">Dimension name</div>
                                <div className="gray-label">microsoft.resourceID</div>
                                <div className="gray-label">microsoft.resourceType</div>
                            </div>
                            <div className="col-sm-4">
                                <div className="bold-label gray-label">Dimension value</div>
                                <div className="gray-label">/subscription/05be45dtrt43e-5450-ddrws-345566dbsaf/resourcegroups/Demo...</div>
                                <div className="gray-label">Microsoft.Compute/virtualMachines</div>
                            </div>
                        </div>
                        <div className="m-t-2 row">
                            <div className="col-sm-4">
                                <div className="bold-label gray-label">Description</div>
                                <div className="gray-label">CPU alert, greater than 80.0%</div>
                            </div>
                            <div className="col-sm-4">
                                <div className="bold-label gray-label">Target resource type</div>
                                <div className="gray-label">Microsoft.Compute/virtualMachines</div>
                            </div>
                        </div>
                        <div className="m-t-2 row">
                            <div className="col-sm-4">
                                <div className="bold-label gray-label">Monitor service</div>
                                <div className="gray-label">Platform</div>
                            </div>
                            <div className="col-sm-4">
                                <div className="bold-label gray-label">Signal Type</div>
                                <div className="gray-label">Metric</div>
                            </div>
                        </div>
                        <div className="m-t-2 row">
                            <div className="col-sm-4">
                                <div className="bold-label gray-label">Alert ID</div>
                                <div className="gray-label">9edrekedfghv-lksfagj-232434d-dfd3red</div>
                            </div>
                            <div className="col-sm-4">
                                <div className="bold-label gray-label">Alert rule</div>
                                <div className="gray-label">CPU alert</div>
                            </div>
                        </div>
                        <div className="m-t-2 m-b-3 row">
                            <div className="col-sm-4">
                                <div className="bold-label gray-label">Suppression status</div>
                                <div className="gray-label">None</div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tabId={1}>
                        <table className="alert-data-table history-data-table">
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Date/Time</th>
                                </tr>
                                <tr className="gray-label">
                                    <td>Action group <a href="" className="colored-label">email to Siddhesh</a> executed (configured on alert rule)</td>
                                    <td>17/03/2020, 11:29:00</td>
                                </tr>
                                <tr className="gray-label">
                                    <td>Alert fired</td>
                                    <td>17/03/2020, 11:28:56</td>
                                </tr>
                            </tbody>
                        </table>
                    </TabPane>
                    <TabPane tabId={2}>
                        <table className="alert-data-table diagnostics-data-table">
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Serverity</th>
                                    <th>Monitor Condition</th>
                                    <th>Alert State</th>
                                    <th>Affected Resource</th>
                                </tr>
                                <tr className="gray-label">
                                    <td className="colored-label">Percentage CPU</td>
                                    <td><div className="severity-urgent bold-label colored-label">Urgent</div></td>
                                    <td>Fired</td>
                                    <td>New</td>
                                    <td>Prod_DB_SYN14</td>
                                </tr>
                            </tbody>
                        </table>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
};