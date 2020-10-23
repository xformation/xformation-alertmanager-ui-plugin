import * as React from 'react';
import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import { Breadcrumbs } from '../Breadcrumbs';
import { config } from '../../config';
import { StartECPopup } from './StartECPopup';
import { InstancePopup } from './InstancePopup';
import { OpenNewTicketPopup } from '../../../../xformation-servicedesk-ui-plugin/src/components/OpenNewTicketPopup';
import { RestService } from '../_service/RestService';
import Table from './../../components/table';

export class AllTickets extends React.Component<any, any> {
    breadCrumbs: any;
    startECRef: any;
    instanceRef: any;
    openNewTicketRef: any;
    constructor(props: any) {
        super(props);
        this.openNewTicketRef = React.createRef();
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
                                <button className="btn btn-link">
                                    <i className="fa fa-edit"></i>
                                </button>
                                <button className="btn btn-link">
                                    <i className="fa fa-trash"></i>
                                </button>
                                <button className="btn btn-link" id={`PopoverFocus-${alert.id}`}>
                                    <i className="fa fa-ellipsis-h"></i>
                                </button>
                                <UncontrolledPopover trigger="legacy" placement="bottom" target={`PopoverFocus-${alert.id}`}>
                                    <PopoverBody>
                                        <span className="bold-label colored-label pointer-label" onClick={this.onClickStartEC2}>Start EC2</span>
                                        <br />
                                        <span className="bold-label colored-label pointer-label">Start EC2 with prompt</span>
                                    </PopoverBody>
                                </UncontrolledPopover>
                            </div>
                        </td>
                    }
                },
            ],
            ticketDataList: [{
                "createdAt": "2020-10-09T07:33:15.663Z",
                "subject": "pp",
                "assignedToName": null,
                "id": 1102,
                "priority": "Medium"
            }],
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
    async componentDidMount() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const guid = urlParams.get('guid');
        const alertName=urlParams.get('alertName');
        
        this.setState({
            guid: guid,
            alertName: alertName,
        });
        // try {
        //     await RestService.getData(config.GET_TICKETS_BY_GUID_URL + "/" + guid, null, null).then(
        //         (response: any) => {

        //             this.setState({
        //                 ticketDataList: response,
        //             });
        //         })
        // } catch (err) {
        //     console.log("Loading ticket data failed. Error: ", err);
        // }
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

                                    <button className="alert-white-button" onClick={this.onClickOpenNewTicket} >
                                        <i className="fa fa-plus"></i>&nbsp;&nbsp;
                                        Create Ticket
                                    </button>
                                    <button className="alert-white-button">
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
                    <OpenNewTicketPopup guid={state.guid} alertName={state.alertName}  ref={this.openNewTicketRef} />
                </div>
            </div>
        );
    }
};