import * as React from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, UncontrolledPopover, PopoverBody } from 'reactstrap';
import { Breadcrumbs } from '../Breadcrumbs';
import { config } from '../../config';
import { PopupContent } from './PopupContent';
import { EditAlertPopup } from './EditAlertPopup';
import { RestService } from '../_service/RestService';
import { TimePicker } from 'react-time-picker';
import AlertMessage from '../../components/AlertMessage';
import ConfirmDialog from '../../components/ConfirmDialog';
import { now } from 'lodash';
import Table from './../../components/table';
import TimeRange from './../../components/TimeRange';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';

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
    constructor(props: any) {
        super(props);
        this.state = {
            datevalue: new Date(),
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
            filterCheckbox: false,
            alertName: '',
            client_url: '',
            alertObjAry: null,
            columns: [
                {
                    label: 'Name',
                    key: 'name',
                    renderCallback: (value: any, alert: any) => {
                        return (
                            <td>
                                <div className="pointer-label" onClick={() => this.toggleModal(value, alert)}>{value}</div>
                            </td>
                        );
                    },
                    isCaseInsensitive: true
                },
                {
                    label: 'Severity',
                    key: 'severity',
                    renderCallback: (value: any) => {
                        let strClass = "";
                        if (value) {
                            value = value.toLowerCase();
                        }
                        if (value === "high") {
                            strClass = "severity-high";
                        } else if (value === "low") {
                            strClass = "severity-low";
                        } else if (value === "urgent") {
                            strClass = "severity-urgent";
                        } else if (value === "critical") {
                            strClass = "severity-critical";
                        } else if (value === "medium") {
                            strClass = "severity-medium";
                        }
                        return <td><span className={strClass}>{value}</span></td>
                    },
                    isCaseInsensitive: true
                },
                {
                    label: 'Monitor Condition',
                    key: 'monitorcondition',
                    isCaseInsensitive: true
                },
                {
                    label: 'Alert State',
                    key: 'alert_state',
                    isCaseInsensitive: true
                },
                {
                    label: 'Affected Resource',
                    key: 'affectedresource',
                    isCaseInsensitive: true
                },
                {
                    label: 'Monitor Service',
                    key: 'monitorservice',
                    isCaseInsensitive: true
                },
                {
                    label: 'Signal Type',
                    key: 'signaltype',
                    isCaseInsensitive: true
                },
                {
                    label: 'Fired Time',
                    key: 'firedtime',
                    isCaseInsensitive: true
                },
                {
                    label: 'Subscription',
                    key: 'brcsubscription',
                    isCaseInsensitive: true
                },
                {
                    label: 'Suppression State',
                    key: 'suppressionstate',
                    isCaseInsensitive: true
                },
                {
                    label: 'Resources',
                    key: 'resources',
                    isCaseInsensitive: true
                },
                {
                    label: 'Action',
                    key: 'action',
                    renderCallback: (value: any, alert: any) => {
                        return <td>
                            <div className="d-inline-block">
                                <button className="btn btn-link">
                                    <i onClick={e => this.onClickEditAlert(e, alert)} className="fa fa-edit"></i>
                                </button>
                                <button className="btn btn-link">
                                    <i onClick={e => this.onClickDeleteAlert(e, alert)} className="fa fa-trash"></i>
                                </button>
                                <button className="btn btn-link" id={`PopoverFocus-${alert.guid}`}>
                                    <i className="fa fa-ellipsis-h"></i>
                                </button>
                                <UncontrolledPopover trigger="legacy" placement="bottom" target={`PopoverFocus-${alert.guid}`}>
                                    <PopoverBody>
                                        <Link className=" " to={`${config.basePath}/alltickets?guid=` + alert.guid+"&alertName="+alert.name}>Create Ticket</Link>
                                        <Link className=" " to="">Silence</Link>
                                    </PopoverBody>
                                </UncontrolledPopover>
                            </div>
                        </td>
                    },
                    isCaseInsensitive: true
                },
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
            value: "compute"
        }, {
            label: "Jobs",
            value: "jobs"
        }, {
            label: "Network",
            value: "network"
        }];
        this.resources = {
            "compute": [{
                label: "Node",
                value: "node"
            }, {
                label: "Database",
                value: "database"
            }, {
                label: "Storage",
                value: "storage"
            }, {
                label: "App",
                value: "app"
            }],
            "jobs": [{
                label: "SHELL JOBS",
                value: "shell jobs"
            }, {
                label: "ETL JOBS",
                value: "etl jobs"
            }],
            "network": [{
                label: "VPC",
                value: "vpc"
            }, {
                label: "VPN",
                value: "vpn"
            }]
        };
        this.monitoringServices = [{
            label: "Native AWS",
            value: "native aws"
        }, {
            label: "Native AZURE",
            value: "native azure"
        }];
        this.alertTypes = [{
            label: "Metrics",
            value: "metrics"
        }, {
            label: "Logs",
            value: "logs"
        }];
        this.severity = [{
            label: "Urgent",
            value: 'urgent'
        }, {
            label: "Critical",
            value: 'critical'
        }, {
            label: "High",
            value: 'high'
        }, {
            label: "Medium",
            value: 'medium'
        }, {
            label: "Low",
            value: 'low'
        }];
        this.alertStates = [{
            label: "New",
            value: "new"
        }, {
            label: "InProgress",
            value: "inprogress"
        }, {
            label: "Closed",
            value: "closed"
        }];
        this.editAlertRef = React.createRef();
    }

    toggleModal = (value: any, alert: any) => {
        let data = '';
        for (let i = 0; i < this.state.alertData.length; i++) {
            let row = this.state.alertData[i];
            if (row.name == value) {
                data = row.client_url;
            }
        }
        console.log("Alert : ", alert)
        let alertObjAry = [];
        alertObjAry.push(alert);
        this.setState({
            modal: !this.state.modal,
            alertName: value,
            client_url: data,
            alertObjAry: alertObjAry,
        });
    }

    refreshData = () => {
        try {
            this.fetchData();
        } catch (err) {
            console.log("Alert data refresh failed. Error: ", err);
        }
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
                console.log("alert data : ", response);
                this.setState({
                    alertData: ary,
                });
            }
        );
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
            filterCheckbox: true
        });
        if (name === "resourceGroup") {
            this.setState({
                resource: ""
            });
        }
    };

    applyFilters = () => {
        const retData = [];
        const { alertData, resourceGroup, resource, monitorService, alertType, severity, alertState } = this.state;
        if (alertData && alertData.length > 0) {
            const length = alertData.length;
            for (let i = 0; i < length; i++) {
                const alert = alertData[i];
                const alertKeys = Object.keys(alert);
                const lowerCaseKeys = alertKeys.map((key) => key.toLocaleLowerCase());
                let isMatched = true;
                if (resourceGroup) {
                    let index = lowerCaseKeys.indexOf("resourcegroup");
                    if (index !== -1) {
                        let key = alertKeys[index];
                        let data = alert[key];
                        if (data) {
                            isMatched = resourceGroup === data.toLowerCase();
                        } else {
                            isMatched = false;
                        }
                    } else {
                        isMatched = false;
                    }
                }
                if (isMatched && resource) {
                    let index = lowerCaseKeys.indexOf("resources");
                    if (index !== -1) {
                        let key = alertKeys[index];
                        let data = alert[key];
                        if (data) {
                            isMatched = resource === data.toLowerCase();
                        } else {
                            isMatched = false;
                        }
                    } else {
                        isMatched = false;
                    }
                }
                if (isMatched && monitorService) {
                    let index = lowerCaseKeys.indexOf("monitorservice");
                    if (index !== -1) {
                        let key = alertKeys[index];
                        let data = alert[key];
                        if (data) {
                            isMatched = monitorService === data.toLowerCase();
                        } else {
                            isMatched = false;
                        }
                    } else {
                        isMatched = false;
                    }
                }
                if (isMatched && alertType) {
                    let index = lowerCaseKeys.indexOf("signaltype");
                    if (index !== -1) {
                        let key = alertKeys[index];
                        let data = alert[key];
                        if (data) {
                            isMatched = alertType === data.toLowerCase();
                        } else {
                            isMatched = false;
                        }
                    } else {
                        isMatched = false;
                    }
                }
                if (isMatched && severity) {
                    let index = lowerCaseKeys.indexOf("severity");
                    if (index !== -1) {
                        let key = alertKeys[index];
                        let data = alert[key];
                        if (data) {
                            isMatched = severity === data.toLowerCase();
                        } else {
                            isMatched = false;
                        }
                    } else {
                        isMatched = false;
                    }
                }
                if (isMatched && alertState) {
                    let index = lowerCaseKeys.indexOf("alert_state");
                    if (index !== -1) {
                        let key = alertKeys[index];
                        let data = alert[key];
                        if (data) {
                            isMatched = alertState === data.toLowerCase();
                        } else {
                            isMatched = false;
                        }
                    } else {
                        isMatched = false;
                    }
                }
                if (isMatched) {
                    retData.push(
                        alert
                    );
                }
            }
        }
        return retData;
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

    onChange = (value: any) => {
        console.log('New date is: ', value);
        this.setState({
            datevalue: value,
        })
    }

    render() {
        const { resourceGroup, resource, openTimeRange, monitorService, alertType, severity, alertState, filterCheckbox, objectType, object,
            isConfirmDialogOpen, confirmTitleMessage, message, isAlertOpen, columns, datevalue } = this.state;
        const tableData = this.applyFilters();
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

                        {/* <TimeRange /> */}
                        {/* <div className="col-lg-2 col-md-3 col-sm-12">
                            <DateTimeRangePicker
                                onChange={this.onChange}
                                value={value}
                            />
                            <TimeRange />
                        </div> */}
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
                        <div className="form-group filter-control-group date-time-range-picker">
                            <label htmlFor="timerange">
                                Time Range&nbsp;&nbsp;&nbsp;
                                <i className="fa fa-info-circle"></i>
                            </label>
                            <DateTimeRangePicker
                                onChange={this.onChange}
                                value={datevalue}
                                rangeDivider="to"
                            />
                        </div>
                        <div className="form-group filter-control-group archive">
                            <label htmlFor="archive">
                                <input type="checkbox" className="form-control" checked />
                                <span>Archive</span>
                            </label>
                        </div>
                        {
                            filterCheckbox &&
                            <div className="form-check filter-control-group clear-filters">
                                <input className="form-check-input clear-all-filter" value={filterCheckbox} type="checkbox" checked={filterCheckbox} name="clearAllFilter" onChange={this.clearAllFilters} />
                                <label className="form-check-label" htmlFor="clearFilter">
                                    <span>Clear All Filters</span>
                                </label>
                            </div>
                        }
                    </div>
                    <div className="alert-data-table-container allalert-data-table-container common-container border-bottom-0">
                        <div className="heading">
                            <h2>All Alerts</h2>
                        </div>
                        <Table valueFromData={{ columns: columns, data: tableData }} perPageLimit={6} visiblecheckboxStatus={true} tableClasses={{ table: "alert-data-tabel", tableParent: "alerts-data-tabel", parentClass: "all-alert-data-table" }} searchKey="name" showingLine="Showing %start% to %end% of %total%" />
                    </div>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="" modalClassName="alert-modal-container">
                    <ModalHeader toggle={this.toggle}>{this.state.alertName}</ModalHeader>
                    <ModalBody style={{ height: 'calc(100vh - 210px)', overflowY: 'auto', overflowX: "hidden" }}>
                        <PopupContent popupcontentData={{ url: this.state.client_url, alertObjAry: this.state.alertObjAry }} />
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
