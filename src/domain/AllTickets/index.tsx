import * as React from 'react';
import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import { Breadcrumbs } from '../Breadcrumbs';
import { config } from '../../config';
import { StartECPopup } from './StartECPopup';
import { InstancePopup } from './InstancePopup';
import { OpenNewTicketPopup } from '../../../../xformation-servicedesk-ui-plugin/src/components/OpenNewTicketPopup';
import { RestService } from '../_service/RestService';
import Table from './../../components/table';
import Rbac from './../../components/Rbac'
import { UnimplementedFeaturePopup } from '../../components/UnimplementedFeaturePopup';
export class AllTickets extends React.Component<any, any> {
    unimplementedFeatureModalRef: any;
    breadCrumbs: any;
    startECRef: any;
    instanceRef: any;
    openNewTicketRef: any;
    constructor(props: any) {
        super(props);
        this.openNewTicketRef = React.createRef();
        this.unimplementedFeatureModalRef = React.createRef();
        this.state = {
            guid: '',
            alertName: '',
            columns: [
                {
                    label: 'ID',
                    key: 'id',
                },
                {
                    label: 'Priority',
                    key: 'priority',
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
                    label: 'Subject',
                    key: 'subject'
                },
                {
                    label: 'Assigned To',
                    key: 'assignedToName'
                },
                {
                    label: 'Created At',
                    key: 'createdAt'
                },
                {
                    label: 'Action',
                    key: 'action',
                    renderCallback: (value: any, alert: any) => {
                        return <td>
                            <div className="d-inline-block">
                                <Rbac parentName={config.PARENT_NAME} childName="alltickets-index-tickettbl-editbtn">
                                    <button className="btn btn-link" onClick={() => this.onClickUnImplementedFeature("")}>
                                        <i className="fa fa-edit"></i>
                                    </button>
                                </Rbac>
                                <Rbac parentName={config.PARENT_NAME} childName="alltickets-index-tickettbl-deletebtn">
                                    <button className="btn btn-link" onClick={() => this.onClickUnImplementedFeature("")}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </Rbac>
                                {/* <button className="btn btn-link" id={`PopoverFocus-${alert.id}`} onClick={() => this.onClickUnImplementedFeature("")}> */}
                                <button className="btn btn-link" onClick={() => this.onClickUnImplementedFeature("")}>
                                    <i className="fa fa-ellipsis-h"></i>
                                </button>
                                {/* <UncontrolledPopover trigger="legacy" placement="bottom" target={`PopoverFocus-${alert.id}`}>
                                    <PopoverBody>
                                        <Rbac parentName={config.PARENT_NAME} childName="alltickets-index-tickettbl-startec2btn">
                                            <span className="bold-label colored-label pointer-label" onClick={this.onClickStartEC2}>Start EC2</span>
                                        </Rbac>
                                        <br />
                                        <Rbac parentName={config.PARENT_NAME} childName="alltickets-index-tickettbl-startec2withpromptbtn">
                                            <span className="bold-label colored-label pointer-label">Start EC2 with prompt</span>
                                        </Rbac>
                                    </PopoverBody>
                                </UncontrolledPopover> */}
                            </div>
                        </td>
                    }
                },
            ],
            ticketDataList: [
                { "severity": "Urgent", "client_url": "http:\/\/100.64.108.25:3000\/d\/6hVzaKOMk\/alerttest?tab=alert&editPanel=2&orgId=1&removeOptions=1", "RESOURCEGROUP": "JOBS", "monitorservice": "JASMIN", "signaltype": "Metrics", "resources": "SHELL JOBS", "description": "", "updatedon": "1601483077544", "firedtime": "03\/06\/2020, 1596616397872", "createdon": "1601483077544", "alert_state": "Closed", "monitorcondition": "Fired", "affectedresource": "Prod_Service_20", "brcsubscription": "Alert Management", "suppressionstate": "Archive", "name": "JASMIN", "guid": "e6fc1d43-e309-4aa9-85c5-b1f9197bfff5", "client": "Grafana", "details": "Triggered metrics:\\n\\nA-series: 27.912\\n", "incident_key": "alertId-1" }, { "severity": "High", "client_url": "http:\/\/100.64.108.25:3000\/d\/6hVzaKOMk\/alerttest?tab=alert&editPanel=2&orgId=1&removeOptions=1", "resourcegroup": "JOBS", "monitorservice": "Synectiks", "signaltype": "Logs", "resources": "ETL JOBS", "description": "", "updatedon": "1601483077554", "firedtime": "03\/06\/2020, 1596616397872", "createdon": "1601483077554", "alert_state": "New", "monitorcondition": "Fired", "affectedresource": "Prod_Service_20", "brcsubscription": "Alert Management", "suppressionstate": "None", "name": "Power Off Machine", "guid": "3e578db1-51df-411a-a309-710b2578b299", "client": "Grafana", "details": "Triggered metrics:\\n\\nA-series: 27.912\\n", "incident_key": "alertId-1" },
                { "severity": "Critical", "client_url": "http:\/\/100.64.108.25:3000\/d\/6hVzaKOMk\/alerttest?tab=alert&editPanel=2&orgId=1&removeOptions=1", "resourcegroup": "JOBS", "monitorservice": "Native AZURE", "signaltype": "Metrics", "resources": "ETL JOBS", "description": "", "updatedon": "1601483077560", "firedtime": "03\/06\/2020, 1596616397872", "createdon": "1601483077560", "alert_state": "InProgress", "monitorcondition": "Fired", "affectedresource": "Prod_DB_SYN14", "brcsubscription": "Alert Management", "suppressionstate": "None", "name": "Power Off Machine", "guid": "51e1b820-72ea-4999-991d-ba1513d3ccb9", "client": "Grafana", "details": "Triggered metrics:\\n\\nA-series: 27.912\\n", "incident_key": "alertId-1" },
                { "severity": "urgent", "client_url": "http:\/\/100.64.108.25:3000\/d\/6hVzaKOMk\/alerttest?tab=alert&editPanel=2&orgId=1&removeOptions=1", "resourcegroup": "Compute", "monitorservice": "Native AWS", "signaltype": "Logs", "resources": "App", "description": "", "updatedon": "1601483460944", "firedtime": "03\/06\/2020, 1596616397872", "createdon": "1601483460944", "alert_state": "InProgress", "monitorcondition": "Fired", "affectedresource": "Prod_Service_20", "brcsubscription": "Alert Management", "suppressionstate": "DeDup", "name": "Disk Read Bytes", "guid": "24b42e91-139c-4119-9cf4-11f1b06e7036", "client": "Grafana", "details": "Triggered metrics:\\n\\nA-series: 27.912\\n", "incident_key": "alertId-1" },
                { "severity": "critical", "client_url": "http:\/\/100.64.108.25:3000\/d\/6hVzaKOMk\/alerttest?tab=alert&editPanel=2&orgId=1&removeOptions=1", "resourcegroup": "Compute", "monitorservice": "Native AWS", "signaltype": "Logs", "resources": "App", "description": "", "updatedon": "1601483460950", "firedtime": "03\/06\/2020, 1596616397872", "createdon": "1601483460950", "alert_state": "New", "monitorcondition": "Fired", "affectedresource": "Prod_Service_20", "brcsubscription": "Alert Management", "suppressionstate": "DeDup", "name": "Power Off Machine", "guid": "e2301574-3b00-4332-bcad-299af59b5aae", "client": "Grafana", "details": "Triggered metrics:\\n\\nA-series: 27.912\\n", "incident_key": "alertId-1" }
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
                label: "Create Ticket",
                isCurrentPage: true
            }
        ];
        this.startECRef = React.createRef();
        this.instanceRef = React.createRef();
    }
    onClickUnImplementedFeature = (link: any) => {
        this.unimplementedFeatureModalRef.current.setLink(link);
        this.unimplementedFeatureModalRef.current.toggle();
    };

    async componentDidMount() {
        this.fetchTicketOnAlert();
    }
    onRefreshClick = () => {
        console.log("refresh method called");
        this.fetchTicketOnAlert();
    }
    fetchTicketOnAlert = async () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const guid = urlParams.get('guid');
        const alertName = urlParams.get('alertName');

        this.setState({
            guid: guid,
            alertName: alertName,
        });
        try {
            await RestService.getData(config.GET_TICKETS_BY_GUID_URL + "/" + guid, null, null).then(
                (response: any) => {

                    this.setState({
                        ticketDataList: response,
                    });
                })
        } catch (err) {
            console.log("Loading ticket data failed. Error: ", err);
        }
    }

    onClickStartEC2 = (e: any) => {
        e.preventDefault();
        this.startECRef.current.toggle();
    };

    onClickInstance = (e: any) => {
        e.preventDefault();
        this.instanceRef.current.toggle();
    };
    onClickOpenNewTicket = (e: any) => {
        console.log("on click event fired")
        this.openNewTicketRef.current.toggle();
    };

    render() {
        const state = this.state;
        return (
            <div className="all-alerts-container">
                <Breadcrumbs breadcrumbs={this.breadCrumbs} />
                <div className="alert-page-container">
                    <div className="common-container">
                        <div className="row">
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <div className="alert-heading">All Tickets</div>
                            </div>
                            <div className="col-lg-9 col-md-12 col-sm-12">
                                <div className="float-right script-editor-btn">
                                    <Rbac parentName={config.PARENT_NAME} childName="alltickets-index-createticketbtn">
                                        <button className="alert-white-button" onClick={this.onClickOpenNewTicket} >
                                            <i className="fa fa-plus"></i>&nbsp;&nbsp;
                                        Create Ticket
                                    </button>
                                    </Rbac>
                                    <button className="alert-white-button" onClick={this.onRefreshClick}>
                                        <i className="fa fa-refresh"></i>&nbsp;&nbsp;
                                        Refresh
                                    </button>
                                    <button className="alert-white-button">
                                        <i className="fa fa-floppy-o"></i>&nbsp;&nbsp;
                                        Save Search
                                    </button>
                                    <div className="form-group filter-control-group" style={{ display: "inline-block", marginRight: "15px", marginBottom: "0px" }}>
                                        <select className="form-control">
                                            <option>Export</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>

                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="alert-data-table-container allalert-data-table-container common-container border-bottom-0">
                        <Table valueFromData={{ columns: state.columns, data: state.ticketDataList }} perPageLimit={5} visiblecheckboxStatus={false} tableClasses={{ table: "alert-data-tabel", tableParent: "alerts-data-tabel", parentClass: "all-alert-data-table" }} searchKey="name" showingLine="Showing %start% to %end% of %total%" />
                    </div>
                    <StartECPopup ref={this.startECRef} />
                    <InstancePopup ref={this.instanceRef} />
                    <OpenNewTicketPopup guid={state.guid} alertName={state.alertName} ref={this.openNewTicketRef} refreshParm={this.onRefreshClick} />
                </div>
                <UnimplementedFeaturePopup ref={this.unimplementedFeatureModalRef} />
            </div>
        );
    }
};