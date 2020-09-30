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
import TimeRange from './../../components/TimeRange';

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
            filterCheckbox: false,
            alertName: '',
            client_url: '',
            columns: [
                {
                    label: 'Name',
                    key: 'name',
                    renderCallback: (value: any) => {
                        return (
                            <td>
                                <div className="pointer-label" onClick={() => this.toggleModal(value)}>{value}</div>
                            </td>
                        );
                    }
                },
                {
                    label: 'Severity',
                    key: 'Severity',
                    renderCallback: (value: any) => {
                        let strClass = "";
                        if (value) {
                            value = value.toLowerCase();
                        }
                        if (value === "high") {
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
                    key: 'alert_state'
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
                                        <Link className=" " to={`${config.basePath}/alltickets`}>Create Ticket</Link>
                                        <Link className=" " to="">Silence</Link>
                                    </PopoverBody>
                                </UncontrolledPopover>
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

    toggleModal = (value: any) => {
        let data = '';
        for (let i = 0; i < this.state.alertData.length; i++) {
            let row = this.state.alertData[i];
            if (row.name == value) {
                data = row.client_url;
            }
        }
        this.setState({
            modal: !this.state.modal,
            alertName: value,
            client_url: data
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
                if (isMatched && severity && alert.Severity) {
                    isMatched = severity.toLowerCase() === alert.Severity.toLowerCase();
                }
                if (isMatched && alertState) {
                    isMatched = alertState === alert.alertState;
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

    render() {
        const { resourceGroup, resource, openTimeRange, monitorService, alertType, severity, alertState, filterCheckbox, objectType, object,
            isConfirmDialogOpen, confirmTitleMessage, message, isAlertOpen, columns, alertData } = this.state;
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
                    <div className="filter-container common-container">
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
                        <div className="form-group filter-control-group">
                            <TimeRange />
                        </div>
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
                        <Table valueFromData={{ columns: columns, data: tableData }} perPageLimit={this.perPageLimit} visiblecheckboxStatus={this.checkboxValue} tableClasses={{ table: "alert-data-tabel", tableParent: "alerts-data-tabel", parentClass: "all-alert-data-table" }} searchKey="name" showingLine="Showing %start% to %end% of %total%" />
                    </div>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="" modalClassName="alert-modal-container">
                    <ModalHeader toggle={this.toggle}>{this.state.alertName}</ModalHeader>
                    <ModalBody style={{ height: 'calc(100vh - 210px)', overflowY: 'auto', overflowX: "hidden" }}>
                        <PopupContent popupcontentData={{ url: this.state.client_url }} />
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