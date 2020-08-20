import * as React from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, UncontrolledPopover, PopoverBody } from 'reactstrap';
import { Breadcrumbs } from '../Breadcrumbs';
import { config } from '../../config';
import { PopupContent } from './PopupContent';
import { EditAlertPopup } from './EditAlertPopup';
import { severityDS } from '../_utilities/commonDS';
import { RestService } from '../_service/RestService';
import { TimePicker } from 'react-time-picker';

export class AllAlerts extends React.Component<any, any> {
    editAlertRef: any;
    breadCrumbs: any;
    resourceGroup: any;
    resources: any;
    monitoringServices: any;
    alertTypes: any;
    severity: any;
    alertStates: any;
    timeRangeRef: any;
    constructor(props: any) {
        super(props);
        this.state = {
            alertData: [],
            modal: false,
            resourceGroup: "",
            resource: "",
            monitorService: "",
            alertType: "",
            severity: "",
            alertState: "",
            currentTime: 'Last 6 hours',
            fromTime: 'now-6h',
            toTime: 'now',
            filterCheckbox:false,
            TimeOption: [
                { from: 'now-5m', to: 'now', display: 'Last 5 minutes', section: 3 },
                { from: 'now-15m', to: 'now', display: 'Last 15 minutes', section: 3 },
                { from: 'now-30m', to: 'now', display: 'Last 30 minutes', section: 3 },
                { from: 'now-1h', to: 'now', display: 'Last 1 hour', section: 3 },
                { from: 'now-3h', to: 'now', display: 'Last 3 hours', section: 3 },
                { from: 'now-6h', to: 'now', display: 'Last 6 hours', section: 3 },
                { from: 'now-12h', to: 'now', display: 'Last 12 hours', section: 3 },
                { from: 'now-24h', to: 'now', display: 'Last 24 hours', section: 3 },
                { from: 'now-2d', to: 'now', display: 'Last 2 days', section: 3 },
                { from: 'now-7d', to: 'now', display: 'Last 7 days', section: 3 },
                { from: 'now-30d', to: 'now', display: 'Last 30 days', section: 3 },
                { from: 'now-90d', to: 'now', display: 'Last 90 days', section: 3 },
                { from: 'now-6M', to: 'now', display: 'Last 6 months', section: 3 },
                { from: 'now-1y', to: 'now', display: 'Last 1 year', section: 3 },
                { from: 'now-2y', to: 'now', display: 'Last 2 years', section: 3 },
                { from: 'now-5y', to: 'now', display: 'Last 5 years', section: 3 },
            ],
            otherOptions: [
                { from: 'now-1d/d', to: 'now-1d/d', display: 'Yesterday', section: 3 },
                { from: 'now-2d/d', to: 'now-2d/d', display: 'Day before yesterday', section: 3 },
                { from: 'now-7d/d', to: 'now-7d/d', display: 'This day last week', section: 3 },
                { from: 'now-1w/w', to: 'now-1w/w', display: 'Previous week', section: 3 },
                { from: 'now-1M/M', to: 'now-1M/M', display: 'Previous month', section: 3 },
                { from: 'now-1y/y', to: 'now-1y/y', display: 'Previous year', section: 3 },
                { from: 'now/d', to: 'now/d', display: 'Today', section: 3 },
                { from: 'now/d', to: 'now', display: 'Today so far', section: 3 },
                { from: 'now/w', to: 'now/w', display: 'This week', section: 3 },
                { from: 'now/w', to: 'now', display: 'This week so far', section: 3 },
                { from: 'now/M', to: 'now/M', display: 'This month', section: 3 },
                { from: 'now/M', to: 'now', display: 'This month so far', section: 3 },
                { from: 'now/y', to: 'now/y', display: 'This year', section: 3 },
                { from: 'now/y', to: 'now', display: 'This year so far', section: 3 },
              ],
        };
        this.breadCrumbs = [
            {
                label: "Home",
                route: `/`
            },
            {
                label: "Monitor | Alerts",
                route: `${config.basePath}/monitoralerts`
            },
            {
                label: "All Alerts",
                isCurrentPage: true
            }
        ];
        this.resourceGroup = [{
            label: "Compute",
            value: "Compute"
        }, {
            label: "Jobs",
            value: "Jobs"
        }, {
            label: "Network",
            value: "Network"
        }];
        this.resources = {
            "Compute": [{
                label: "Node",
                value: "Node"
            }, {
                label: "Database",
                value: "Database"
            }, {
                label: "Storage",
                value: "Storage"
            }, {
                label: "App",
                value: "App"
            }],
            "Jobs": [{
                label: "SHELL JOBS",
                value: "SHELL JOBS"
            }, {
                label: "ETL JOBS",
                value: "ETL JOBS"
            }],
            "Network": [{
                label: "VPC",
                value: "VPC"
            }, {
                label: "VPN",
                value: "VPN"
            }]
        };
        this.monitoringServices = [{
            label: "Native AWS",
            value: "Native AWS"
        }, {
            label: "Native AZURE",
            value: "Native AZURE"
        }];
        this.alertTypes = [{
            label: "Metrics",
            value: "Metrics"
        }, {
            label: "Logs",
            value: "Logs"
        }];
        this.severity = [{
            label: "Urgent",
            value: severityDS.URGENT
        }, {
            label: "Critical",
            value: severityDS.CRITICAL
        }, {
            label: "High",
            value: severityDS.HIGH
        }, {
            label: "Medium",
            value: severityDS.MEDIUM
        }, {
            label: "Low",
            value: severityDS.LOW
        }];
        this.alertStates = [{
            label: "New",
            value: "New"
        }, {
            label: "InProgress",
            value: "InProgress"
        }, {
            label: "Closed",
            value: "Closed"
        }];
        this.editAlertRef = React.createRef();
    }
    refreshData=()=>{
        try {
            RestService.getData(config.GET_ALL_ALERT_FROM_DB, null, null).then(
                (response: any) => {
                    // let ary = [];
                    // for(let i=0; i<response.length; i++){
                    //     let j = JSON.parse(response[i]);   
                    //     ary.push(j);
                    // }
                    this.setState({
                        alertData: response
                    });
                    console.log("alert data : ", response);
                }
            );
        } catch (err) {
            console.log("Loading alert data from elastic failed. Error: ", err);
        }
    }

    componentDidMount() {
        try {
            RestService.getData(config.GET_ALL_ALERT_FROM_DB, null, null).then(
                (response: any) => {
                    // let ary = [];
                    // for(let i=0; i<response.length; i++){
                    //     let j = JSON.parse(response[i]);   
                    //     ary.push(j);
                    // }
                    this.setState({
                        alertData: response
                    });
                    console.log("alert data : ", response);
                }
            );
        } catch (err) {
            console.log("Loading alert data from elastic failed. Error: ", err);
        }
    }

    onClickopenTimeRangePopup = (e: any) => {
        let status = !this.state.openTimeRange;
        this.setState({
            openTimeRange: status,
        }) 
    };

    createAllAlertsTable = () => {
        const retData = [];
        let isDataPresent = true;
        const { alertData, resourceGroup, resource, monitorService, alertType, severity, alertState } = this.state;
        if (alertData && alertData.length > 0) {
            const length = alertData.length;
            for (let i = 0; i < length; i++) {
                const alert = alertData[i];
                let isMatched = true;
                if (resourceGroup) {
                    isMatched = resourceGroup === alert.resourcegroup;
                }
                if (isMatched && resource) {
                    isMatched = resource === alert.resources;
                }
                if (isMatched && monitorService) {
                    isMatched = monitorService === alert.monitorservice;
                }
                if (isMatched && alertType) {
                    isMatched = alertType === alert.signaltype;
                }
                if (isMatched && severity) {
                    isMatched = severity === alert.severity;
                }
                if (isMatched && alertState) {
                    isMatched = alertState === alert.alertstate;
                }
                if (isMatched) {
                    retData.push(
                        <tr className="">
                            <td className="">
                                <div className="pointer-label" onClick={this.toggle}><input type="checkbox" className="checkbox" /> {alert.name}</div>
                            </td>
                            <td>
                                {
                                    alert.severity === severityDS.URGENT &&
                                    <div className="severity-urgent">Urgent</div>
                                }
                                {
                                    alert.severity === severityDS.CRITICAL &&
                                    <div className="severity-critical">Critical</div>
                                }
                                {
                                    alert.severity === severityDS.HIGH &&
                                    <div className="severity-high">High</div>
                                }
                                {
                                    alert.severity === severityDS.MEDIUM &&
                                    <div className="severity-medium">Medium</div>
                                }
                                {
                                    alert.severity === severityDS.LOW &&
                                    <div className="severity-medium">Low</div>
                                }
                            </td>
                            <td>{alert.monitorcondition}</td>
                            <td>{alert.alertstate}</td>
                            <td>{alert.affectedresource}</td>
                            <td>{alert.monitorservice}</td>
                            <td>{alert.signaltype}</td>
                            <td>{alert.firedtime}</td>
                            <td>{alert.subscription}</td>
                            <td>{alert.suppressionstate}</td>
                            <td>
                                <div className="d-flex">
                                    <button className="btn btn-link">
                                        <i onClick={e => this.onClickEditAlert(e, alert)} className="fa fa-edit"></i>
                                    </button>
                                    <button className="btn btn-link">
                                        <i className="fa fa-trash"></i>
                                    </button>
                                    <button className="btn btn-link" id="PopoverFocus">
                                        <i className="fa fa-ellipsis-h"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                }
            }
            if (retData.length === 0) {
                retData.push(
                    <tr>
                        <td colSpan={12} style={{ textAlign: "center" }}>There is no data.</td>
                    </tr>
                );
                isDataPresent = false;
            }
        } else {
            retData.push(
                <tr>
                    <td colSpan={12} style={{ textAlign: "center" }}>There is no data.</td>
                </tr>
            );
            isDataPresent = false;
        }
        return {
            table: retData,
            isDataPresent
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    createSelectbox = (data: any) => {
        const retData = [];
        if (data) {
            const length = data.length;
            for (let i = 0; i < length; i++) {
                retData.push(
                    <option value={data[i].value}>{data[i].label}</option>
                );
            }
        }
        return retData;
    };

    handleStateChange = (e: any) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
            filterCheckbox:false
        });
        if (name === "resourceGroup") {
            this.setState({
                resource: ""
            });
        }
    };

    onClickEditAlert = (e: any, selectedAlert: any) => {
        this.editAlertRef.current.toggle(selectedAlert);
    };

    updateAlertList(alertList: any) {
        console.log("Updated alert list : ", alertList);
        this.setState({
            alertData: alertList
        });
    }
    
    displayTimeRange = () => {
        const retuData = [];
        for (let i = 0; i < this.state.TimeOption.length; i++) {
            let data = this.state.TimeOption[i];
            retuData.push(
                <option value={data.display}>{data.display}</option>
            );
        }
        return retuData;
    }
    displayOtherTimeRange = ()=>{
        const retData = [];
        for (let i = 0; i < this.state.otherOptions.length; i++) {
            let data = this.state.otherOptions[i];
            retData.push(
                <option value={data.display}>{data.display}</option>
            );
        }
        return retData;
    }

    setTimeValue = (e: any) => {
        console.log(e.target.value);
        this.setState(
            {
                filterCheckbox:false
            }
        );
        for (let i = 0; i < this.state.TimeOption.length; i++) {
            const timeData = this.state.TimeOption[i];
            if (timeData.display == e.target.value) {
                this.setState({
                    currentTime: timeData.display,
                    fromTime: timeData.from,
                    toTime: timeData.to,
                })
            }
            // } else {
            //     this.setState({
            //         currentTime: e.target.value,
            //         fromTime: e.target.value,
            //         toTime: e.target.value,
            //     })
            // }
        }
    }
    clearAllFilters= () =>{
                this.setState(
                    {
                        resourceGroup: "",
                        resource: "",
                        monitorService: "",
                        alertType: "",
                        severity: "",
                        alertState: "",
                        currentTime: 'Last 6 hours',
                        filterCheckbox:true
                        
                    }
                )

    }
    render() {
        const { resourceGroup, resource, openTimeRange, monitorService, alertType, severity, currentTime, alertState, fromTime, toTime,filterCheckbox } = this.state;
        const alertTable = this.createAllAlertsTable();
        return (
            <div className="all-alerts-container">
                <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="MONITOR | ALL ALERTS" />
                <div className="alert-page-container">
                    <div className="common-container">
                        <Link to={`${config.basePath}/managealertrule`} className="alert-white-button">
                            <i className="fa fa-plus"></i>&nbsp;&nbsp;
                            New Alert Rule
                        </Link>
                        <a className="alert-white-button" onClick={this.refreshData}>
                            <i className="fa fa-refresh"></i>&nbsp;&nbsp;
                            Refresh
                        </a>
                        <Link to={`${config.basePath}/managealertrule`} className="alert-white-button float-right">
                            <i className="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;
                            Back
                        </Link>
                    </div>
                    <div className="filter-container row common-container">
                        <div className="col-lg-2 col-md-3 col-sm-12">
                            <div className="form-group filter-control-group">
                                <label htmlFor="resourceGroup">
                                    Resource Group&nbsp;&nbsp;&nbsp;
                                <i className="fa fa-info-circle"></i>
                                </label>
                                <select className="form-control" name="resourceGroup" value={resourceGroup} onChange={this.handleStateChange}>
                                    <option value="">Select Resource Group</option>
                                    {this.createSelectbox(this.resourceGroup)}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-12">
                            <div className="form-group filter-control-group">
                                <label htmlFor="resources">
                                    Resources&nbsp;&nbsp;&nbsp;
                                <i className="fa fa-info-circle"></i>
                                </label>
                                <select className="form-control" name="resource" value={resource} onChange={this.handleStateChange}>
                                    <option value="">Select Resources</option>
                                    {this.createSelectbox(this.resources[resourceGroup])}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-12">
                            <div className="form-group filter-control-group">
                                <label htmlFor="timeRange">
                                    Time Range&nbsp;&nbsp;&nbsp;
                                <i className="fa fa-info-circle"></i>
                                </label>
                                <input className="form-control time-range" readOnly value={currentTime} onClick={this.onClickopenTimeRangePopup} id="timeRange" />
                                <i className="fa fa-angle-down time-range-icon"></i>
                            </div>
                            {openTimeRange && <div className="absolute-time-range-box">
                                <div className="absolute-time-range-left">
                                    <h3>Absolute time range</h3>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="From"  className="d-block">From</label>
                                            {/* <TimePicker
                                                onChange={this.setTimeValue}
                                            value=""
                                            /> */}
                                            <input type="text" className="input-group-text" value={fromTime} />
                                            {/* <input type="date" className="input-group-text" value="" /> */}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="To" className="d-block">To</label>
                                            {/* <input type="date" className="input-group-text" value="" /> */}
                                            <input type="text" className="input-group-text" placeholder="now" value={toTime} />
                                        </div>
                                        <div className="form-group">
                                            <button className="alert-blue-button">Apply time range</button>
                                        </div>
                                    </form>
                                    <div className="absolute-time-text">
                                        It looks like you haven't used this timer picker before. As soon as you enter some time intervals, recently used intervals will appear here.
                                        Read the documentation to find out more about how to enter custom time ranges.
                                         </div>
                                </div>
                                <div className="absolute-time-range-right">
                                    <select className="form-control" value={currentTime} onChange={this.setTimeValue} id="timeRange">
                                        {this.displayTimeRange()}
                                    </select>
                                    {/* <select className="form-control" value={currentTime} onChange={this.setTimeValue} id="otherRange">
                                        {this.displayOtherTimeRange()}
                                    </select> */}
                                </div>
                            </div>}
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-12">
                            <div className="form-group filter-control-group">
                                <label htmlFor="monitorservices">
                                    Monitor services&nbsp;&nbsp;&nbsp;
                                <i className="fa fa-info-circle"></i>
                                </label>
                                <select className="form-control" name="monitorService" value={monitorService} onChange={this.handleStateChange}>
                                    <option value="">Select Monitor Services</option>
                                    {this.createSelectbox(this.monitoringServices)}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-12">
                            <div className="form-group filter-control-group">
                                <label htmlFor="alertType">
                                    Alert Type&nbsp;&nbsp;&nbsp;
                                <i className="fa fa-info-circle"></i>
                                </label>
                                <select className="form-control" name="alertType" value={alertType} onChange={this.handleStateChange}>
                                    <option value="">Select Alert Type</option>
                                    {this.createSelectbox(this.alertTypes)}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-12">
                            <div className="form-group filter-control-group">
                                <label htmlFor="serverity">
                                    Serverity&nbsp;&nbsp;&nbsp;
                                <i className="fa fa-info-circle"></i>
                                </label>
                                <select className="form-control" name="severity" value={severity} onChange={this.handleStateChange}>
                                    <option value="">Select Severity</option>
                                    {this.createSelectbox(this.severity)}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-12">
                            <div className="form-group filter-control-group">
                                <label htmlFor="alertState">
                                    Alert state&nbsp;&nbsp;&nbsp;
                                <i className="fa fa-info-circle"></i>
                                </label>
                                <select className="form-control" name="alertState" value={alertState} onChange={this.handleStateChange}>
                                    <option value="Select Alert State">Select Alert State</option>
                                    {this.createSelectbox(this.alertStates)}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-12">
                            <div className="form-group filter-control-group archive">
                                <label htmlFor="archive">
                                    <input type="checkbox" className="form-control" checked />
                                    <span>Archive</span>
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-12">
                            <div className="form-group filter-control-group clear-filters">
                               
                                <label htmlFor="clearFilter" >
                                <input className="clearAllFilter" value={filterCheckbox} type="checkbox" checked={filterCheckbox} name="clearAllFilter" onClick={this.clearAllFilters} /> <span>Clear All Filters</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="filter-container form-row row common-container">
                        <div className="col-md-3 col-sm-12">
                            <label htmlFor="allallerts" className="all-alerts">
                                All Alerts
                            </label>
                        </div>
                        <div className="col-md-9 col-sm-12">
                            <div className="alerts-right-form">
                                <div className="row">
                                    <div className="col-md-4 col-sm-12">
                                        <div className="form-group filter-control-group">
                                            <select className="form-control" id="bulkaction">
                                                <option value="Delete">Delete</option>
                                                <option value="Archive">Archive</option>
                                                <option value="Processed">Processed</option>
                                                <option value="Create Ticket">Create Ticket</option>
                                                <option value="Execute Workflow">Execute Workflow</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-8 col-sm-12">
                                        <div className="form-group filter-control-group">
                                            <form>
                                                <input type="text" className="input-group-text" />
                                                <button>
                                                    <i className="fa fa-search"></i>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="alert-data-table-container common-container">
                        <div className="container-inner">
                            <table className="alert-data-table">
                                <tbody>
                                    <tr className="alert-data-table-header">
                                        <th>
                                            <div className="pointer-label" onClick={this.toggle}><input type="checkbox" className="checkbox" /> Name</div>
                                        </th>
                                        <th>Severity</th>
                                        <th>Monitor Condition</th>
                                        <th>Alert State</th>
                                        <th>Affected Resource</th>
                                        <th>Monitor Service</th>
                                        <th>Signal Type</th>
                                        <th>Fired Time</th>
                                        <th>Subscription</th>
                                        <th>Suppression State</th>
                                        <th>Action</th>
                                    </tr>
                                    {alertTable.table}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* <Modal isOpen={state.modal} toggle={this.toggle} className="" modalClassName="alert-modal-container">
                    <ModalHeader toggle={this.toggle}>Percentage CPU</ModalHeader>
                    <ModalBody style={{ height: 'calc(100vh - 210px)', overflowY: 'auto', overflowX: "hidden" }}>
                        <PopupContent />
                    </ModalBody>
                </Modal> */}
                {alertTable.isDataPresent &&
                    <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverFocus">
                        <PopoverBody>
                            <Link className=" " to={`${config.basePath}/alltickets`}>Create Ticket</Link>
                            <Link className=" " to="">Silence</Link>
                        </PopoverBody>
                    </UncontrolledPopover>
                }
                <EditAlertPopup ref={this.editAlertRef} />
            </div>
        );
    }
};