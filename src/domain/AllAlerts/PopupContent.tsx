import * as React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { RestService } from '../_service/RestService';
import { config } from '../../config';
import * as moment from 'moment';
import { CommonService } from '../_common/common';

export class PopupContent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            activeTab: 0,
            alert: this.props.alert,
            client_url: this.props.alert.client_url,
            historyTableArray: [],
            iFrameLoaded: false,
            guid: this.props.alert.guid
        };
    }

    setActiveTab = (activeTab: any) => {
        this.setState({
            activeTab
        });
    };
    async componentDidMount() {
        let guid = this.state.guid;
        var requestOptions = await CommonService.requestOptionsForGetRequest();
        // console.log("PopupContents componentDidMount()");
        try {
            var dt = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
            var qryOpt=config.GET_ALL_XF_ALERT_FROM_ELASTIC+'query='+guid+'&from=2020-01-01T01:00:00.000Z&to='+dt+'Z&limit=1000&filter=streams:'+config.XF_ALERT_ACTIVITY_STREAM_ID;
            await fetch(qryOpt, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log("Alert Activity list : ",result.messages);
                this.setState({
                    historyTableArray: result.messages,
                });
            }).catch(error => console.log('error', error));
            // await RestService.getData(config.GET_ALERT_ACTIVITIES + "/" + guid, null, null).then(
            //     (response: any) => {
            //         console.log("Response : ", response)
            //         this.setState({
            //             historyTableArray: response,
            //         });
            //     })
        } catch (err) {
            console.log("Loading company data failed. Error: ", err);
        }
    }

    historyTable = () => {
        const retData = [];
        const { historyTableArray } = this.state;
        console.log("All Activity Records : ",historyTableArray);
        for (let i = 0; i < historyTableArray.length; i++) {
            // const historyTable = historyTableArray[i];
            // console.log("historyTable() alert : ",historyTableArray[i].message);
            // var msg = JSON.parse(historyTableArray[i]);
            // console.log("historyTable() alert : ",msg);
            const historyTable = JSON.parse(historyTableArray[i].message.message.substring(20));
            
            retData.push(
                <tr>
                    <td>{historyTable.action}</td>
                    <td>{historyTable.action_description}</td>
                    <td>{historyTable.fired_time}</td>
                </tr>
            )
        }
        return retData;
    }

    diagnosticsTable = () => {
        const retData = [];
        const { alert } = this.state;
        retData.push(
            <tr>
                <td><span>{alert.name}</span></td>
                <td>
                    <span className="urgent">{alert.severity}</span>
                </td>
                <td><i className="fa fa-exclamation-triangle"></i> {alert.monitorcondition}</td>
                <td>{alert.alert_state}</td>
                <td>{alert.affectedresource}</td>
            </tr>
        )
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
        const { activeTab, iFrameLoaded, alert } = this.state;
        // console.log("Alert object  from parent ::::: ",alert);
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
                            {
                                alert.client === "EXTERNAL SERVICE" &&
                                <div style={{ textAlign: "center" }}>
                                    Client is the external data source.
                                </div>
                            }
                            {
                                alert.client !== "EXTERNAL SERVICE" &&
                                <>
                                    <div style={{ display: iFrameLoaded ? '' : 'none' }}>
                                        <iframe style={{ width: "100%", height: "450px", border: "none" }} src={alert.client_url} onLoad={this.onIframeLoaded}></iframe>
                                    </div>
                                    <div style={{ textAlign: "center", display: iFrameLoaded ? 'none' : '' }}>
                                        Data is loading...
                                    </div>
                                </>
                            }
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