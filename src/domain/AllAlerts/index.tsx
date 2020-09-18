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
import AlertMessage from '../../components/AlertMessage';
import ConfirmDialog from '../../components/ConfirmDialog';
import { now } from 'lodash';
import Table from './../../components/table';

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
    tableValue: any;
    perPageLimit: any;
    checkboxValue: any;
    constructor(props: any) {
        super(props);
        this.state = {
            isConfirmDialogOpen: false,
            confirmTitleMessage: null,
            objectType: null,
            objectId: null,
            object: null,
            message: null,
            severity: "",
            isAlertOpen: false,
            alertData: [],
            modal: false,
            resourceGroup: "",
            resource: "",
            monitorService: "",
            alertType: "",
            alertState: "",
            currentTime: 'Last 6 hours',
            fromTime: 'now-6h',
            toTime: 'now',
            filterCheckbox: false,
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
            columns: [
                {
                    label: 'Name',
                    key: 'name',
                    renderCallback: (value: any) => {
                        return (
                            <td>
                                <div className="pointer-label" onClick={this.toggle}>{value}</div>
                            </td>
                        );
                    }
                },
                {
                    label: 'Severity',
                    key: 'severity',
                    renderCallback: (value: any) => {
                        let strClass = "";
                        if (value === "High") {
                            strClass = "severity-high";
                        } else if (value === "Low") {
                            strClass = "severity-low";
                        } else if (value === "Urgent") {
                            strClass = "severity-urgent";
                        } else if (value === "Critical") {
                            strClass = "severity-critical";
                        } else if (value === "Medium") {
                            strClass = "severity-medium";
                        }
                        return <td><span className={strClass}>{value}</span></td>
                    }
                },
                {
                    label: 'Monitor Condition',
                    key: 'monitorcondition'
                },
                {
                    label: 'Alert State',
                    key: 'alertstate'
                },
                {
                    label: 'Affected Resource',
                    key: 'affectedresource'
                },
                {
                    label: 'Monitor Service',
                    key: 'monitorservice'
                },
                {
                    label: 'Signal Type',
                    key: 'signaltype'
                },
                {
                    label: 'Fired Time',
                    key: 'firedtime'
                },
                {
                    label: 'Subscription',
                    key: 'brcsubscription'
                },
                {
                    label: 'Suppression State',
                    key: 'suppressionstate'
                },
                {
                    label: 'Resources',
                    key: 'resources'
                },
                {
                    label: 'Action',
                    key: 'action',
                    renderCallback: () => {
                        return <td>
                            <div className="d-inline-block">
                                <button className="btn btn-link">
                                    <i onClick={e => this.onClickEditAlert(e, alert)} className="fa fa-edit"></i>
                                </button>
                                <button className="btn btn-link">
                                    <i onClick={e => this.onClickDeleteAlert(e, alert)} className="fa fa-trash"></i>
                                </button>
                                <button className="btn btn-link" id="PopoverFocus">
                                    <i className="fa fa-ellipsis-h"></i>
                                </button>
                            </div>
                        </td>
                    }
                },
            ],
        };
        this.perPageLimit = 6;
        this.checkboxValue = true;
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

    refreshData = () => {
        try {
            this.fetchData();
        } catch (err) {
            console.log("Alert data refresh failed. Error: ", err);
        }
    }
    componentWillMount() {
        this.refreshData();
    }

    componentDidMount() {
        try {
            this.fetchData();
        } catch (err) {
            console.log("AllAlert page. Loading alert data from elastic failed. Error: ", err);
        }
    }

    fetchData = () => {
        RestService.getData(config.GET_ALL_ALERT_FROM_ELASTIC, null, null).then(
            (response: any) => {
                let ary = [];
                for (let i = 0; i < response.length; i++) {
                    let j = JSON.parse(response[i]);
                    ary.push(j);
                }
                this.setState({
                    alertData: ary
                });
                console.log("alert data : ", response);
            }
        );
    }

    onClickopenTimeRangePopup = (e: any) => {
        let status = !this.state.openTimeRange;
        this.setState({
            openTimeRange: status,
        })
    };

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
            filterCheckbox: true
        });
        if (name === "resourceGroup") {
            this.setState({
                resource: ""
            });
        }
    };

    onClickEditAlert = (e: any, selectedAlert: any) => {
        console.log("Opening edit alert box. alert : ", selectedAlert);
        this.editAlertRef.current.toggle(selectedAlert);
    };

    updateAlertList = (alertList: any) => {
        console.log("Updated alert list :::: ", alertList);
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
    displayOtherTimeRange = () => {
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
                filterCheckbox: true
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

    clearAllFilters = () => {
        this.setState(
            {
                resourceGroup: "",
                resource: "",
                monitorService: "",
                alertType: "",
                severity: "",
                alertState: "",
                currentTime: 'Last 6 hours',
                filterCheckbox: false,
                fromTime: 'now-6h',
                toTime: 'now',
            }
        )
    }

    handleCloseConfirmDialog = () => {
        this.setState({
            isConfirmDialogOpen: false
        })
    }

    handleConfirmDelete = (objectType: any, object: any) => {
        let url = config.DELETE_ALERT + `/` + object.guid;
        let res = this.callDeleteApi(url);

        res.then((result: any) => {
            try {
                let r = JSON.parse(result);
                if (r.length > 0) {
                    console.log("Updating alert list : ", r);
                    let ary = [];
                    for (let i = 0; i < r.length; i++) {
                        let j = JSON.parse(r[i]);
                        ary.push(j);
                    }
                    this.setState({
                        alertData: ary
                    });
                } else {
                    this.setState({
                        alertData: []
                    });
                }
            } catch (e) {
                console.log("Some error in deleting alert data");
                this.setState({
                    severity: config.SEVERITY_ERROR,
                    message: 'Alert could not be deleted. Please check the service logs for details',
                    isAlertOpen: true,
                });
            }
        })

        this.setState({
            isConfirmDialogOpen: false,
        })

        // setTimeout(
        //     () => this.setState({
        //         severity: config.SEVERITY_SUCCESS,
        //         message: 'Alert deleted successfully',
        //         isAlertOpen: true,
        //     }), 2000
        // )

    }

    async callDeleteApi(url: any) {
        let res: any;
        await RestService.deleteObject(url).then(response => {
            res = response;
        });
        return res;
    }

    handleCloseAlert = (e: any) => {
        this.setState({
            isAlertOpen: false
        })
    }
    showData = () => {
        console.log("State Data=", this.state.alertData)
    }
    onClickDeleteAlert = (e: any, alert: any) => {
        console.log("Alert : " + alert);
        this.setState({
            confirmTitleMessage: "Delete Alert",
            message: "Are you sure, you want to delete the alert?",
            isConfirmDialogOpen: true,
            objectType: "alert",
            object: alert,
        });
    };

    render() {
        const { resourceGroup, resource, openTimeRange, monitorService, alertType, severity, currentTime, alertState, fromTime, toTime, filterCheckbox, objectType, object,
            isConfirmDialogOpen, confirmTitleMessage, message, isAlertOpen, columns, alertData } = this.state;
        return (
            <div className="all-alerts-container">
                <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="MONITOR | ALL ALERTS" />
                <ConfirmDialog objectType={objectType} objectId={object} handleCloseConfirmDialog={this.handleCloseConfirmDialog} handleConfirmDelete={this.handleConfirmDelete} open={isConfirmDialogOpen} titleMsg={confirmTitleMessage} msg={message}></ConfirmDialog>
                <AlertMessage handleCloseAlert={this.handleCloseAlert} open={isAlertOpen} severity={severity} msg={message}></AlertMessage>

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
                                            <label htmlFor="From" className="d-block">From</label>
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
                        {
                            filterCheckbox &&
                            <div className="col-lg-2 col-md-3 col-sm-12">
                                <div className="form-check filter-control-group clear-filters">
                                    <input className="form-check-input clear-all-filter" value={filterCheckbox} type="checkbox" checked={filterCheckbox} name="clearAllFilter" onChange={this.clearAllFilters} />
                                    <label className="form-check-label" htmlFor="clearFilter">
                                        <span>Clear All Filters</span>
                                    </label>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="alert-data-table-container allalert-data-table-container common-container border-bottom-0">
                        <div className="heading">
                            <h2>All Alerts</h2>
                        </div>
                        <Table valueFromData={{ columns: columns, data: alertData }} perPageLimit={this.perPageLimit} visiblecheckboxStatus={this.checkboxValue}
                            tableClasses={{ table: "alert-data-tabel", tableParent: "alerts-data-tabel", parentClass: "all-alert-data-table" }} searchKey="name" />
                    </div>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="" modalClassName="alert-modal-container">
                    <ModalHeader toggle={this.toggle}>Percentage CPU</ModalHeader>
                    <ModalBody style={{ height: 'calc(100vh - 210px)', overflowY: 'auto', overflowX: "hidden" }}>
                        <PopupContent />
                    </ModalBody>
                </Modal>
                {/* {alertTable.isDataPresent &&
                    <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverFocus">
                        <PopoverBody>
                            <Link className=" " to={`${config.basePath}/alltickets`}>Create Ticket</Link>
                            <Link className=" " to="">Silence</Link>
                        </PopoverBody>
                    </UncontrolledPopover>
                } */}
                <EditAlertPopup onSaveUpdate={this.updateAlertList} ref={this.editAlertRef} />
            </div>
        );
    }
};