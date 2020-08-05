import * as React from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, UncontrolledPopover, PopoverBody } from 'reactstrap';
import { Breadcrumbs } from '../Breadcrumbs';
import { config } from '../../config';
import { PopupContent } from './PopupContent';
import { severityDS } from '../_utilities/commonDS';

//This is temporary. when data come from server, please remove this.
const allAlertsData = [{
    "name": "Percentage CPU",
    "severity": "Low",
    "monitorCondition": "Fired",
    "alertState": "InProgress",
    "affectedResource": "Prod_Service_20",
    "monitorService": "Native AWS",
    "signalType": "Logs",
    "firedTimed": "03/06/2020, 1596616397872",
    "subscription": "Alert Management",
    "suppressionState": "None",
    "resourceGroup": "Compute",
    "resources": "App"
}, {
    "name": "CPU Credits",
    "severity": "High",
    "monitorCondition": "Fired",
    "alertState": "InProgress",
    "affectedResource": "Prod_Service_20",
    "monitorService": "Native AWS",
    "signalType": "Logs",
    "firedTimed": "03/06/2020, 1596616397872",
    "subscription": "Alert Management",
    "suppressionState": "None",
    "resourceGroup": "Compute",
    "resources": "Node"
}, {
    "name": "Network In",
    "severity": "Medium",
    "monitorCondition": "Fired",
    "alertState": "InProgress",
    "affectedResource": "Prod_Service_20",
    "monitorService": "Native AWS",
    "signalType": "Logs",
    "firedTimed": "03/06/2020, 1596616397872",
    "subscription": "Alert Management",
    "suppressionState": "None",
    "resourceGroup": "Compute",
    "resources": "Storage"
}, {
    "name": "Disk Read Bytes",
    "severity": "Medium",
    "monitorCondition": "Fired",
    "alertState": "InProgress",
    "affectedResource": "Prod_Service_20",
    "monitorService": "Native AWS",
    "signalType": "Logs",
    "firedTimed": "03/06/2020, 1596616397872",
    "subscription": "Alert Management",
    "suppressionState": "None",
    "resourceGroup": "Compute",
    "resources": "Database"
}, {
    "name": "Disk Write Bytes",
    "severity": "Medium",
    "monitorCondition": "Fired",
    "alertState": "InProgress",
    "affectedResource": "Prod_Service_20",
    "monitorService": "Native AWS",
    "signalType": "Logs",
    "firedTimed": "03/06/2020, 1596616397872",
    "subscription": "Alert Management",
    "suppressionState": "None",
    "resourceGroup": "Jobs",
    "resources": "SHELL JOBS"
}, {
    "name": "Power Off Machine",
    "severity": "Medium",
    "monitorCondition": "Fired",
    "alertState": "InProgress",
    "affectedResource": "Prod_Service_20",
    "monitorService": "Native AWS",
    "signalType": "Logs",
    "firedTimed": "03/06/2020, 1596616397872",
    "subscription": "Alert Management",
    "suppressionState": "None",
    "resourceGroup": "Jobs",
    "resources": "ETL JOBS"
}, {
    "name": "Power Off Machine",
    "severity": "Medium",
    "monitorCondition": "Fired",
    "alertState": "InProgress",
    "affectedResource": "Prod_Service_20",
    "monitorService": "Native AWS",
    "signalType": "Logs",
    "firedTimed": "03/06/2020, 1596616397872",
    "subscription": "Alert Management",
    "suppressionState": "None",
    "resourceGroup": "Compute",
    "resources": "App"
}];

export class AllAlerts extends React.Component<any, any> {
    breadCrumbs: any;
    resourceGroup: any;
    resources: any;
    monitoringServices: any;
    alertTypes: any;
    severity: any;
    alertStates: any;
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
            alertState: ""
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
    }

    componentDidMount() {
        //Below timeout is to mimic the API call
        setTimeout(() => {
            this.setState({
                alertData: allAlertsData
            });
        }, 3000);
    }

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
                    isMatched = resourceGroup === alert.resourceGroup;
                }
                if (isMatched && resource) {
                    isMatched = resource === alert.resources;
                }
                if (isMatched && monitorService) {
                    isMatched = monitorService === alert.monitorService;
                }
                if (isMatched && alertType) {
                    isMatched = alertType === alert.signalType;
                }
                if (isMatched && severity) {
                    isMatched = severity === alert.severity;
                }
                if (isMatched && alertState) {
                    isMatched = alertState === alert.alertState;
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
                            <td>{alert.monitorCondition}</td>
                            <td>{alert.alertState}</td>
                            <td>{alert.affectedResource}</td>
                            <td>{alert.monitorService}</td>
                            <td>{alert.signalType}</td>
                            <td>{alert.firedTime}</td>
                            <td>{alert.subscription}</td>
                            <td>{alert.suppressionState}</td>
                            <td>
                                <div className="d-flex">
                                    <button className="btn btn-link">
                                        <i className="fa fa-edit"></i>
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
            [name]: value
        });
        if (name === "resourceGroup") {
            this.setState({
                resource: ""
            });
        }
    };

    render() {
        const state = this.state;
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
                        <a className="alert-white-button">
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
                                    Rousource Group&nbsp;&nbsp;&nbsp;
                                <i className="fa fa-info-circle"></i>
                                </label>
                                <select className="form-control" name="resourceGroup" value={state.resourceGroup} onChange={this.handleStateChange}>
                                    <option value="">Select Resource Group</option>
                                    {this.createSelectbox(this.resourceGroup)}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-12">
                            <div className="form-group filter-control-group">
                                <label htmlFor="resources">
                                    Rousources&nbsp;&nbsp;&nbsp;
                                <i className="fa fa-info-circle"></i>
                                </label>
                                <select className="form-control" name="resource" value={state.resource} onChange={this.handleStateChange}>
                                    <option value="">Select Resources</option>
                                    {this.createSelectbox(this.resources[state.resourceGroup])}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-12">
                            <div className="form-group filter-control-group">
                                <label htmlFor="timeRange">
                                    Time Range&nbsp;&nbsp;&nbsp;
                                <i className="fa fa-info-circle"></i>
                                </label>
                                <select className="form-control" id="timeRange">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-12">
                            <div className="form-group filter-control-group">
                                <label htmlFor="monitorServices">
                                    Monitor services&nbsp;&nbsp;&nbsp;
                                <i className="fa fa-info-circle"></i>
                                </label>
                                <select className="form-control" name="monitorService" value={state.monitorService} onChange={this.handleStateChange}>
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
                                <select className="form-control" name="alertType" value={state.alertType} onChange={this.handleStateChange}>
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
                                <select className="form-control" name="severity" value={state.severity} onChange={this.handleStateChange}>
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
                                <select className="form-control" name="alertState" value={state.alertState} onChange={this.handleStateChange}>
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
                                <label htmlFor="clearFilter">
                                    <span>Clear All Filters</span>
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
                {   alertTable.isDataPresent && 
                    <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverFocus">
                        <PopoverBody>
                            <Link className=" " to={`${config.basePath}/alltickets`}>Create Ticket</Link>
                            <Link className=" " to="">Silence</Link>
                        </PopoverBody>
                    </UncontrolledPopover>
                }
            </div>
        );
    }
};