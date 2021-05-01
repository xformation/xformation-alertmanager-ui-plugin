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
import Rbac from './../../components/Rbac';
import { CommonService } from '../_common/common';
import * as moment from 'moment';

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
            totalAlerts: 0,
            dateRange: new Date(),
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
            alertObject: {},
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
                    isCaseInsensitive: false
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
                    key: 'fired_time',
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
                        // console.log("ALERT OBJ : ",alert);
                        return <td>
                            <div className="d-inline-block">
                                <Rbac parentName={config.PARENT_NAME} childName="allalerts-index-alerttbl-editbtn">
                                    <button className="btn btn-link">
                                        <i onClick={e => this.onClickEditAlert(e, alert)} className="fa fa-edit"></i>
                                    </button>
                                </Rbac>
                                <Rbac parentName={config.PARENT_NAME} childName="allalerts-index-alerttbl-deletebtn">
                                    <button className="btn btn-link">
                                        <i onClick={e => this.onClickDeleteAlert(e, alert)} className="fa fa-trash"></i>
                                    </button>
                                </Rbac>
                                <button className="btn btn-link" id={`PopoverFocus-${alert.guid}`}>

                                    <i className="fa fa-ellipsis-h"></i>
                                </button>
                                <UncontrolledPopover trigger="legacy" placement="bottom" target={`PopoverFocus-${alert.guid}`}>
                                    <PopoverBody>
                                        <Rbac parentName={config.PARENT_NAME} childName="allalerts-index-alerttbl-createticketbtn">
                                            <Link className=" " to={`${config.basePath}/alltickets?guid=` + alert.guid + "&alertName=" + alert.name+ "&id=" + alert.id+ "&createdOn=" + alert.created_on+ "&alertState=" + alert.alert_state}>Create Ticket</Link>
                                        </Rbac>
                                        <Rbac parentName={config.PARENT_NAME} childName="allalerts-index-alerttbl-silencebtn">
                                            <Link className=" " to="#">Silence</Link>
                                        </Rbac>
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
            value: "New"
        }, {
            label: "InProgress",
            value: "InProgress"
        }, {
            label: "Closed",
            value: "Closed"
        }];
        this.editAlertRef = React.createRef();
        // this.onSaveUpdate = this.onSaveUpdate.bind(this);
        this.getTotalAlerts = this.getTotalAlerts.bind(this);
        this.getAllAlerts = this.getAllAlerts.bind(this);
    }

    toggleModal = (value: any, alert: any) => {
        // let data = '';
        // for (let i = 0; i < this.state.alertData.length; i++) {
        //     let row = this.state.alertData[i];
        //     if (row.name == value) {
        //         data = row.clientUrl;
        //     }
        // }
        console.log("toggleModal Alert : ", alert)
        let alertObjAry = [];
        alertObjAry.push(alert);
        this.setState({
            modal: !this.state.modal,
            alertName: value,
            client_url: alert.client_url,
            alertObject: alert,
        });
    }

    refreshData = async () => {
        console.log("Calling refreshData()");
        try {
            // this.fetchData();
            await this.getTotalAlerts();
            // await this.getAllAlerts(this.state.totalAlerts);
            // this.getAllAlerts();
        } catch (err) {
            console.log("Alert data refresh failed. Error: ", err);
        }
    }

    getTotalAlerts = async () => {
        console.log("calling getTotalAlerts")
        var requestOptions = await CommonService.requestOptionsForGetRequest();
        await fetch(config.GET_TOTAL_XF_ALERT_FROM_ELASTIC, requestOptions)
            .then(response => response.json())
            .then(result => {
                    console.log("Total alerts :::: ",result.all_shards.documents.count)
                    this.setState({
                        totalAlerts: result.all_shards.documents.count
                    })
                    this.getAllAlerts(result.all_shards.documents.count);
                }
            ).catch(error => console.log('error', error));
        
    }

    componentDidMount() {
        try {
            // this.fetchData();
            const prms = new URLSearchParams(this.props.location.search);
            const tl = prms.get('totalAlerts');
            
            this.getAllAlerts(tl);
        } catch (err) {
            console.log("AllAlert page. Loading alert data from elastic failed. Error: ", err);
        }
    }

    // fetchData = () => {
    //     RestService.getData(config.GET_ALL_ALERT_FROM_ELASTIC, null, null).then(
    //         (response: any) => {
    //             // let ary = [];
    //             // for (let i = 0; i < response.length; i++) {
    //             //     let j = JSON.parse(response[i]);
    //             //     ary.push(j);
    //             // }
    //             console.log("alert data : ", response);
    //             this.setState({
    //                 alertData: response,
    //             });
    //         }
    //     );
    // }

    getAllAlerts = async (tl: any) => {
        console.log("Calling getAllAlerts");
        var requestOptions = await CommonService.requestOptionsForGetRequest();
        var dt = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
        var qryOpt=config.GET_ALL_XF_ALERT_FROM_ELASTIC+'query=client&from=2020-01-01T01:00:00.000Z&to='+dt+'Z&limit='+tl+'&filter=streams:'+config.XF_ALERT_STREAM_ID;
        console.log("AllAlerts api url : ",qryOpt);
        await fetch(qryOpt, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log("Alerts list : ", result.messages[0].message);
                    // for (let i = 0; i < result.messages.length; i++) {
                    //     console.log("alert data : ", result.messages[i].message);
                    // }
                    this.setState({
                        alertData: result.messages
                    });
            }
            ).catch(error => console.log('error', error));
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
        const { alertData, resourceGroup, resource, monitorService, alertType, severity, alertState, dateRange } = this.state;
        if (alertData && alertData.length > 0) {
            const length = alertData.length;
            // console.log("applyFilters() alert list : ",alertData);
            for (let i = 0; i < length; i++) {
                var msg = JSON.parse(alertData[i].message.message.substring(20));
                // console.log("HELO : ",msg);
                const alert = msg; //.records[0].value;//alertData[i];
                alert.id = alertData[i].message._id;
                // console.log("Alert Object : ",alert);
                
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
                            isMatched = alertState === data; //.toLowerCase();
                        } else {
                            isMatched = false;
                        }
                    } else {
                        isMatched = false;
                    }
                }
                if (isMatched && dateRange && dateRange.length > 1) {
                    let index = lowerCaseKeys.indexOf("fired_time");
                    if (index !== -1) {
                        let key = alertKeys[index];
                        let data = alert[key];
                        let firedTime = data.split(",")[1];
                        if (firedTime) {
                            firedTime = firedTime.trim();
                            firedTime = parseInt(firedTime, 10);
                            firedTime = new Date(firedTime);
                            if (firedTime >= dateRange[0] && firedTime <= dateRange[1]) {
                                isMatched = true;
                            } else {
                                isMatched = false
                            }
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

    // updateAlertList = (alertObj: any) => {
    //     console.log("onSaveUpdate called. Updated alert object :::: ", alertObj);
    //     this.getTotalAlerts();
    // }

    // sendAlertActivityAsGelf = async (alertObj: any) => {
    //     console.log("Calling sendAlertActivityAsGelf : ",alertObj);
    //     await RestService.add(config.SEND_XF_ALERT_ACTIVITY, alertObj).then(response => {
    //         console.log("Alert activity response : ",response)
    //     })
    // }

    // onSaveUpdate (){
    //     console.log("Calling onSaveUpate");
    //     this.getTotalAlerts();
    // }

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
        RestService.deleteObject(url).then(response => {
            try {
                this.setState({
                    alertData: response
                });
            } catch (e) {
                console.log("Some error in deleting alert data");
                this.setState({
                    severity: config.SEVERITY_ERROR,
                    message: 'Alert could not be deleted. Please check the service logs for details',
                    isAlertOpen: true,
                });
            }
        });
        // let res = this.callDeleteApi(url);

        // res.then((result: any) => {
        //     try {
        //         this.setState({
        //             alertData: result
        //         });
        //         // let r = JSON.parse(result);
        //         // if (result.length > 0) {
        //         //     // console.log("Updating alert list : ", r);
        //         //     // let ary = [];
        //         //     // for (let i = 0; i < r.length; i++) {
        //         //     //     let j = JSON.parse(r[i]);
        //         //     //     ary.push(j);
        //         //     // }
        //         //     this.setState({
        //         //         alertData: result
        //         //     });
        //         // } else {
        //         //     this.setState({
        //         //         alertData: []
        //         //     });
        //         // }
        //     } catch (e) {
        //         console.log("Some error in deleting alert data");
        //         this.setState({
        //             severity: config.SEVERITY_ERROR,
        //             message: 'Alert could not be deleted. Please check the service logs for details',
        //             isAlertOpen: true,
        //         });
        //     }
        // })

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
        console.log("alertData: ", this.state.alertData)
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
        this.setState({
            dateRange: value,
        })
    }

    render() {
        const { resourceGroup, resource, openTimeRange, monitorService, alertType, severity, alertState, filterCheckbox, objectType, object,
            isConfirmDialogOpen, confirmTitleMessage, message, isAlertOpen, columns, dateRange, alertObject } = this.state;
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
                            <label htmlFor="severity">
                                Severity&nbsp;&nbsp;&nbsp;
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
                                value={dateRange}
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
                                <button className="alert-blue-button m-r-0 m-b-0 clear-btn" onChange={this.clearAllFilters}>Clear All Filters</button>
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
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-container alert-modal-container" modalClassName="alert-modal-container">
                    <ModalHeader toggle={this.toggle}>{this.state.alertName}</ModalHeader>
                    <ModalBody style={{ height: 'calc(100vh - 210px)', overflowY: 'auto', overflowX: "hidden" }}>
                        <PopupContent alert={alertObject} />
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
                <EditAlertPopup refreshParm={this.refreshData} ref={this.editAlertRef} />
            </div>
        );
    }
};
