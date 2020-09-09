import * as React from 'react';
import { severityDS } from '../_utilities/commonDS';
// import { parse } from 'query-string';
import { config } from '../../config';
import { RestService } from '../_service/RestService';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, UncontrolledPopover, PopoverBody } from 'reactstrap';
import { Breadcrumbs } from '../Breadcrumbs';
import { EditAlertPopup } from '../AllAlerts/EditAlertPopup';
import '../../css/alertmanager.search.css';
// import { studentServices } from '../_services/students.service';
// import wsCmsBackendServiceClient from '../../../wsCmsBackendServiceClient';
import ConfirmDialog from '../../components/ConfirmDialog';
import AlertMessage from '../../components/AlertMessage';
import Table from './../../components/table';

export class SearchAlert extends React.Component<any, any> {
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
    constructor(props: any) {
        super(props);
        this.tableValue = {
            columns: [
                { label: 'Name', key: 'name' },
                { label: 'Severity', key: 'severity' },
                { label: 'Monitor Condition', key: 'monitorcondition' },
                { label: 'Alert State', key: 'alertstate' },
                { label: 'Affected Resource', key: 'affectedresource' },
                { label: 'Monitor Service', key: 'monitorservice' },
                { label: 'Signal Type', key: 'signaltype' },
                { label: 'Fired Time', key: 'firedtime' },
                { label: 'Subscription', key: 'brcsubscription' },
                { label: 'Suppression State', key: 'suppressionstate' },
                { label: 'Action', key: 'action' },
            ],
            AlertData:[ 
                {
                    severity: "High",
                    resourcegroup: "Compute",
                    monitorservice: "Native AWS",
                    signaltype: "Logs",
                    resources: "Node",
                    firedtime: "03/06/2020, 1596616397872",
                    monitorcondition: "Fired",
                    affectedresource: "Prod_DB_SYN14",
                    brcsubscription: "Alert Management",
                    suppressionstate: "Archive",
                    name: "Network In",
                    guid: "c7a8c429-a531-4729-9431-bbc5d6205947",
                    alertstate: "InProgress",
                    id: "66"
                },
                {
                    severity: "Low",
                    resourcegroup: "Compute",
                    monitorservice: "Native AZURE",
                    signaltype: "Metrics",
                    resources: "App",
                    firedtime: "03/06/2020, 1596616397872",
                    monitorcondition: "Fired",
                    affectedresource: "Prod_Service_20",
                    brcsubscription: "Alert Management",
                    suppressionstate: "DeDup",
                    name: "Disk Read Bytes",
                    guid: "9d9cba56-6ccd-4b27-916d-60c58e1cec02",
                    alertstate: "Closed",
                    id: "43"
                },
                {
                    severity: "Urgent",
                    resourcegroup: "Compute",
                    monitorservice: "Native AZURE",
                    signaltype: "Metrics",
                    resources: "Storage",
                    firedtime: "03/06/2020, 1596616397872",
                    monitorcondition: "Fired",
                    affectedresource: "Prod_DB_SYN14",
                    brcsubscription: "Alert Management",
                    suppressionstate: "Silence",
                    name: "Disk Read Bytes",
                    guid: "3825288c-d9e5-4cd1-928c-a132c471d58e",
                    alertstate: "New",
                    id: "44"
                },
                {
                    severity: "Urgent",
                    resourcegroup: "Compute",
                    monitorservice: "Native AZURE",
                    signaltype: "Metrics",
                    resources: "Node",
                    firedtime: "03/06/2020, 1596616397872",
                    monitorcondition: "Fired",
                    affectedresource: "Prod_Service_20",
                    brcsubscription: "Alert Management",
                    suppressionstate: "None",
                    name: "Percentage CPU",
                    guid: "3c4a824f-387e-44dd-98eb-b6f66e2d03ba",
                    alertstate: "New",
                    id: "89"
                } 
            ],
        };
        this.perPageLimit = 8,
        this.state = {
            isConfirmDialogOpen: false,
            confirmTitleMessage: null,
            objectType: null,
            objectId: null,
            object: null,

            message: null,
            severity: "",
            isAlertOpen: false,
            
            alertData: [
                {
                    severity: "High",
                    resourcegroup: "Compute",
                    monitorservice: "Native AWS",
                    signaltype: "Logs",
                    resources: "Node",
                    firedtime: "03/06/2020, 1596616397872",
                    monitorcondition: "Fired",
                    affectedresource: "Prod_DB_SYN14",
                    brcsubscription: "Alert Management",
                    suppressionstate: "Archive",
                    name: "Network In",
                    guid: "c7a8c429-a531-4729-9431-bbc5d6205947",
                    alertstate: "InProgress",
                    id: "66"
                },
                {
                    severity: "Low",
                    resourcegroup: "Compute",
                    monitorservice: "Native AZURE",
                    signaltype: "Metrics",
                    resources: "App",
                    firedtime: "03/06/2020, 1596616397872",
                    monitorcondition: "Fired",
                    affectedresource: "Prod_Service_20",
                    brcsubscription: "Alert Management",
                    suppressionstate: "DeDup",
                    name: "Disk Read Bytes",
                    guid: "9d9cba56-6ccd-4b27-916d-60c58e1cec02",
                    alertstate: "Closed",
                    id: "43"
                },
                {
                    severity: "Urgent",
                    resourcegroup: "Compute",
                    monitorservice: "Native AZURE",
                    signaltype: "Metrics",
                    resources: "Storage",
                    firedtime: "03/06/2020, 1596616397872",
                    monitorcondition: "Fired",
                    affectedresource: "Prod_DB_SYN14",
                    brcsubscription: "Alert Management",
                    suppressionstate: "Silence",
                    name: "Disk Read Bytes",
                    guid: "3825288c-d9e5-4cd1-928c-a132c471d58e",
                    alertstate: "New",
                    id: "44"
                },
                {
                    severity: "Urgent",
                    resourcegroup: "Compute",
                    monitorservice: "Native AZURE",
                    signaltype: "Metrics",
                    resources: "Node",
                    firedtime: "03/06/2020, 1596616397872",
                    monitorcondition: "Fired",
                    affectedresource: "Prod_Service_20",
                    brcsubscription: "Alert Management",
                    suppressionstate: "None",
                    name: "Percentage CPU",
                    guid: "3c4a824f-387e-44dd-98eb-b6f66e2d03ba",
                    alertstate: "New",
                    id: "89"
                }
            ],
            modal: false,
            resourceGroup: "",
            resource: "",
            monitorService: "",
            alertType: "",
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

            
            attendance: {
                min: "",
                max: ""
            },
            grades: {
                min: "",
                max: ""
            },
            aggregate: {
                min: "",
                max: ""
            },
            isApiCalled: false,
            // studentsData: [],
            allData: [],
            itemsPerPage: 5,
            totalPages: 1,
            currentPage: 0,
            searchName: "",
            isAllChecked: false,
            branchId: null,
            academicYearId: null,
            departmentId: null,
            user: null,
            departmentList: null,
            batchList: null,
            sectionList: null,
            selectedDepartmentId: null,
            selectedBatchId: null,
            selectedSectionId: null,
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
                label: "Search Alerts",
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
        this.clearAllFilters = this.clearAllFilters.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.searchAlert = this.searchAlert.bind(this);
        this.calculateTotalPages = this.calculateTotalPages.bind(this);
        this.onCheckAlert = this.onCheckAlert.bind(this);
        this.checkAllAlerts = this.checkAllAlerts.bind(this);
        this.createSelectbox = this.createSelectbox.bind(this);
        this.onChangeSelectDropDown = this.onChangeSelectDropDown.bind(this);
        this.refreshData = this.refreshData.bind(this);
    }

    async componentDidMount() {
        this.setState({
            isApiCalled: true
        });
        try {
            this.fetchData();
        } catch (err) {
            this.setState({
                isApiCalled: false
            });
            console.log("SearchAlert page. Loading alert data from elastic failed. Error: ", err);
        }
    }

    fetchData = () => {
        RestService.getData(config.GET_ALL_ALERT_FROM_ELASTIC, null, null).then(
            (response: any) => {
                let ary = [];
                for(let i=0; i<response.length; i++){
                    let j = JSON.parse(response[i]);   
                    ary.push(j);
                }
                this.setState({
                    alertData: ary,
                    allData: ary
                });
                this.calculateTotalPages(ary);
                this.setState({
                    isApiCalled: false
                });
                console.log("Alerts: ", response);
            }
        );
    }

    searchAlert(e: any) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
        let result = [];
        const { allData } = this.state;
        if (value !== "") {
            if (allData && allData.length > 0) {
                for (let i = 0; i < allData.length; i++) {
                    let alert = allData[i];
                    let name =  alert.name + " " + alert.severity + " " + alert.monitorcondition 
                                + " " + alert.alertstate + " " + alert.affectedresource + " " + alert.monitorservice
                                + " " + alert.signaltype + " " + alert.firedtime + " " + alert.brcsubscription 
                                + " " + alert.suppressionstate;
                    name = name.toLowerCase();
                    if (name.indexOf(value.toLowerCase()) !== -1) {
                        result.push(alert);
                    }
                }
                this.setState({
                    alertData: result
                });
                this.calculateTotalPages(result);
            }
        } else {
            this.setState({
                alertData: allData
            });
            this.calculateTotalPages(allData);
        }
    }

    clearAllFilters= () => {
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

    calculateTotalPages(students: any) {
        const { itemsPerPage } = this.state;
        if (students && students.length > 0) {
            let totalPages = Math.ceil(students.length / itemsPerPage);
            this.setState({
                totalPages: totalPages,
                currentPage: 0
            });
        } else {
            this.setState({
                totalPages: 1,
                currentPage: 0
            });
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onClickEditAlert = (e: any, selectedAlert: any) => {
        this.editAlertRef.current.toggle(selectedAlert);
    };
    /*
        Alert code
    */
   handleCloseAlert = (e: any) => {
    this.setState({
        isAlertOpen: false
    })
}

    /*
        Alert code
    */
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
    handleCloseConfirmDialog = () => {
        this.setState({
            isConfirmDialogOpen: false
        })
    }
    handleConfirmDelete = (objectType: any, object: any) => {
        console.log("Deleting alert. Alert object : ", object);
        let url = config.DELETE_ALERT + `/` + object.guid;
        this.callDeleteApi(url);
        console.log("Alert data is ",this.state.alertData)
        this.setState({
            isConfirmDialogOpen: false
        })
    }
    // async callDeleteApi(url: any) {
    //     await RestService.deleteObject(url).then((response: any) => {
    //         console.log("Delete Response : ", response);
    //         response=eval(response);
    //        let ary = [];
    //         for (let i = 0; i < response.length; i++) {
    //             let j = JSON.parse(response[i]);
    //             ary.push(j);
    //         }
    //         console.log("Array is=",ary) 
    //         this.setState({
    //              alertData: ary,
    //             severity: config.SEVERITY_SUCCESS,
    //             message: 'Alert deleted successfully',
    //             isAlertOpen: true,
    //         });
        
    //     }).catch(error => {
    //         console.log('Deletion error', error);
    //         this.setState({
    //             severity: config.SEVERITY_ERROR,
    //             message: 'Alert could not be deleted. Please check the service logs for details',
    //             isAlertOpen: true,
    //         });
    //     });
    // }

    async callDeleteApi(url: any) {
        await RestService.deleteObject(url).then(response => {
            console.log('Delete alert response: ', response);
        });
        this.setState({
            severity: config.SEVERITY_SUCCESS,
            message: 'Alert deleted successfully',
            isAlertOpen: true,
        });

        // await RestService.deleteObject(url).then((response: any) => {
        //     console.log("AllAlert : Delete Response : ", response);
            // response=eval(response);
         /*  let ary = [];
            for (let i = 0; i < response.length; i++) {
                let j = JSON.parse(response[i]);
                ary.push(j);
            }
            console.log("Array is=",ary)
             */
            //alertData: ary,
            // this.setState({
            //     severity: config.SEVERITY_SUCCESS,
            //     message: 'Alert deleted successfully',
            //     isAlertOpen: true,
            // });
            
            //this.refreshData();
        
        // }).catch(error => {
        //     console.log('Deletion error', error);
        //     this.setState({
        //         severity: config.SEVERITY_ERROR,
        //         message: 'Alert could not be deleted. Please check the service logs for details',
        //         isAlertOpen: true,
        //     });
        // });
    }

    createAllAlertsTable = () => {
        const retData = [];
        let isDataPresent = true;
        const { alertData, resourceGroup, resource, monitorService, alertType, severity, alertState, isApiCalled, currentPage, itemsPerPage } = this.state;
        if (alertData && alertData.length > 0) {
            const length = alertData.length;
            for (let i = 0; i < length; i++) {
                const alert = alertData[i];
                const pageFactor = Math.floor(i / itemsPerPage);
                if (pageFactor === currentPage) {
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
                                    <div className="pointer-label" onClick={this.toggle}><input type="checkbox" className="checkbox" name={alert.name} onChange={e => this.onCheckAlert(alert, e)} checked={alert.isChecked}/> {alert.name}</div>
                                </td>
                                <td><div className={"severity-"+alert.severity.toLowerCase()}>{alert.severity}</div></td>
                                <td>{alert.monitorcondition}</td>
                                <td>{alert.alertstate}</td>
                                <td>{alert.affectedresource}</td>
                                <td>{alert.monitorservice}</td>
                                <td>{alert.signaltype}</td>
                                <td>{alert.firedtime}</td>
                                <td>{alert.brcsubscription}</td>
                                <td>{alert.suppressionstate}</td>
                                <td>
                                    <div className="d-flex">
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
                            </tr>
                        );
                    }
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

    changeCurrentPage(currentPage: any) {
        this.setState({
            currentPage: currentPage
        });
    }

    // createPaginationJSX() {
    //     const { totalPages, currentPage } = this.state;
    //     let retData = [];
    //     for (let i = 0; i < totalPages; i++) {
    //         retData.push(
    //             <li className={(currentPage === i ? ' active' : '')}><a href="#" onClick={e => this.changeCurrentPage(i)}>{i + 1}</a></li>
    //         )
    //     }
    //     return retData;
    // }

    // onClickPrev() {
    //     const { currentPage } = this.state;
    //     if (currentPage - 1 >= 0) {
    //         this.setState({
    //             currentPage: currentPage - 1
    //         });
    //     }
    // }

    // onClickNext() {
    //     const { currentPage, totalPages } = this.state;
    //     if ((currentPage + 1) < totalPages) {
    //         this.setState({
    //             currentPage: currentPage + 1
    //         });
    //     }
    // }

    onCheckAlert(alert: any, e: any) {
        const { name, checked } = e.target;
        alert.isChecked = checked;
    }

    checkAllAlerts(e: any) {
        const { checked } = e.target;
        const { alertData } = this.state;
        this.setState({
            isAllChecked: checked
        });
        let length = alertData.length;
        for (let i = 0; i < length; i++) {
            const alert = alertData[i];
            alert.isChecked = checked;
        }
        this.setState({
            alertData: alertData
        });
    }

    onChangeSelectDropDown = (e: any) => {
        e.preventDefault();
        const { name, value } = e.nativeEvent.target;
        this.setState({
                [name]: value
        });
    }

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

    refreshData () {
        console.log("Refreshed.....");
        try {
            this.fetchData();
        } catch (err) {
            console.log("Alert data refresh failed. Error: ", err);
        }
    }

    render() {
        const state = this.state;
        const { isConfirmDialogOpen,objectType,isAlertOpen,message,object,confirmTitleMessage,resourceGroup, resource, openTimeRange, monitorService, alertType, severity, currentTime, alertState, fromTime, toTime,filterCheckbox } = this.state;
        const alertTable = this.createAllAlertsTable();
        return (
            <div className="all-alerts-container">
                <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="MONITOR | ALL ALERTS" />
                <ConfirmDialog objectType={objectType} objectId={object} handleCloseConfirmDialog={this.handleCloseConfirmDialog} handleConfirmDelete={this.handleConfirmDelete} open={isConfirmDialogOpen} titleMsg={confirmTitleMessage} msg={message}></ConfirmDialog>
                <AlertMessage handleCloseAlert={this.handleCloseAlert} open={isAlertOpen} severity={severity} msg={message}></AlertMessage>
                <div className="alert-page-container searchalert-container">
                    <div className="common-container border-bottom-0">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-12">
                                <div className="bg-white filters-box">
                                    <div className="heading">
                                        <label>Filters</label>
                                    </div>
                                    <div className="filters-btn">
                                        <button className="btn btn-secondary" onClick={this.clearAllFilters} >Clear All Filters</button>
                                        {/* <button className="btn btn-secondary apply-btn" onClick={this.onClickApply} disabled={state.isApiCalled}>Apply</button> */}
                                    </div>
                                    <div className="filterbox">
                                        <div className="box">
                                            <label>Resource Group</label>
                                            <div className="rainge">
                                                <div className="min-box">
                                                    <select className="form-control" name="resourceGroup" value={resourceGroup} onChange={this.handleStateChange}>
                                                        <option value="">Select Resource Group</option>
                                                        {this.createSelectbox(this.resourceGroup)}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box">
                                            <label>Resources</label>
                                            <div className="rainge">
                                                <div className="min-box">
                                                    <select className="form-control" name="resource" value={resource} onChange={this.handleStateChange}>
                                                        <option value="">Select Resources</option>
                                                        {this.createSelectbox(this.resources[resourceGroup])}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box">
                                            <label>Monitor services</label>
                                            <div className="rainge">
                                                <div className="min-box">
                                                    <select className="form-control" name="monitorService" value={monitorService} onChange={this.handleStateChange}>
                                                        <option value="">Select Monitor Services</option>
                                                        {this.createSelectbox(this.monitoringServices)}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box">
                                            <label>Alert Type</label>
                                            <div className="rainge">
                                                <div className="min-box">
                                                    <select className="form-control" name="alertType" value={alertType} onChange={this.handleStateChange}>
                                                        <option value="">Select Alert Type</option>
                                                        {this.createSelectbox(this.alertTypes)}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box">
                                            <label>Serverity</label>
                                            <div className="rainge">
                                                <div className="min-box">
                                                    <select className="form-control" name="severity" value={severity} onChange={this.handleStateChange}>
                                                        <option value="">Select Severity</option>
                                                        {this.createSelectbox(this.severity)}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box">
                                            <label>Alert state</label>
                                            <div className="rainge">
                                                <div className="min-box">
                                                    <select className="form-control" name="alertState" value={alertState} onChange={this.handleStateChange}>
                                                        <option value="Select Alert State">Select Alert State</option>
                                                        {this.createSelectbox(this.alertStates)}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8 col-sm-12">
                                
                                <div className="alert-data-table-container common-container border-bottom-0">
                                <div className="heading">
                                    <h2>Alerts</h2>
                                </div>
                                <Table valueFromData={this.tableValue} perPageLimit={this.perPageLimit}
                                tableClasses={{ alertsDataTable: "alerts-data-tabel", alertDataTable: "alert-data-tabel", allAlertData: "all-alert-data-table", severityClassHigh: "severity-high", severityClassLow: "severity-low", severityClassUrgent: "severity-urgent" }} />

                                    {/* <div className="top-head">
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-12 col-md-6 left">
                                                <input type="checkbox" className="checkbox" name="AllCheck" onChange={this.checkAllAlerts} checked={this.state.isAllChecked} />
                                                <ul>
                                                    <li>
                                                        <a className="fa fa-refresh" href="#" onClick={this.refreshData}></a>
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="container-inner">
                                        <table className="alert-data-table">
                                            <tbody>
                                                <tr className="alert-data-table-header">
                                                    <th>
                                                        <div className="pointer-label" onClick={this.toggle}><input type="checkbox" className="checkbox" onChange={this.checkAllAlerts} checked={this.state.isAllChecked} /> Name</div>
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
                                 */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
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
}
