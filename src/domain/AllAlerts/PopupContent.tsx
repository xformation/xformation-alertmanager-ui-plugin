import * as React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { RestService } from '../_service/RestService';
import { config } from '../../config';

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
            historyTableArray: [],
            diagnosticsTableArray:this.props.popupcontentData.alertObjAry,
            iFrameLoaded: false
        };
    }

    setActiveTab = (activeTab: any) => {
        this.setState({
            activeTab
        });
    };
    async componentDidMount(){
        let guid=this.props.guid;
        try {
            await RestService.getData(config.GET_ALERT_ACTIVITIES+"/"+guid, null, null).then(
                (response: any) => {
                    console.log("Response : ", response)
                    this.setState({
                        historyTableArray: response,
                    });
                })
        } catch (err) {
            console.log("Loading company data failed. Error: ", err);
        }
    }
    
    historyTable = () => {
        const retData = [];
        const { historyTableArray } = this.state;
        for (let i = 0; i < historyTableArray.length; i++) {
            const historyTable = historyTableArray[i];
            retData.push(
                <tr>
                    <td>{historyTable.action}</td>
                    <td>{historyTable.actionDescription}</td>
                    <td>{historyTable.updatedOn}</td>
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
                    <td><i className="fa fa-exclamation-triangle"></i> {diagnosticsTable.monitorcondition}</td>
                    <td>{diagnosticsTable.alertState}</td>
                    <td>{diagnosticsTable.affectedresource}</td>
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
                                        <th>Action</th>
                                        <th>Action Description</th>
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