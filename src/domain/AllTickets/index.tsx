import * as React from 'react';
import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import { Breadcrumbs } from '../Breadcrumbs';
import { config } from '../../config';
import { StartECPopup } from './StartECPopup';
import { InstancePopup } from './InstancePopup';
import { OpenNewTicketPopup } from '../../../../xformation-servicedesk-ui-plugin/src/components/OpenNewTicketPopup';
import { RestService } from '../_service/RestService';
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
            ticketDataList: [],
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
        this.setState({
            guid: guid,
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
    ticketsTable = () => {
        const retData = [];
        const { ticketDataList } = this.state;
        console.log("final ticket data : ", ticketDataList);
        for (let i = 0; i < ticketDataList.length; i++) {
            const ticketData = ticketDataList[i];
            retData.push(
                <tr className="gray-label">
                    <td className="gray-label bold-label">
                        <div className="pointer-label">{ticketData.id}</div>
                    </td>
                    <td>
                        {ticketData.subject}
                    </td>
                    <td>
                        <div className="severity-critical bold-label colored-label">{ticketData.priority}</div>
                    </td>
                    <td>{ticketData.createdAt}</td>
                    <td>{ticketData.assignedToName}</td>
                    <td>
                        <button className="btn btn-link" id="PopoverFocus">
                            <i className="fa fa-ellipsis-h"></i>
                        </button>
                    </td>
                    <td></td>
                </tr>
            )
        }
        console.log("Ui data : ", retData)
        return retData;
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
                <div className="page-header-container">
                    <span className="page-header">All Tickets</span>
                    <button className="header-button" onClick={this.onClickOpenNewTicket} >
                        <i className="fa fa-plus"></i>
                        Create Ticket
                    </button>
                    <button className="header-button">
                        <i className="fa fa-refresh"></i>
                        Refresh
                    </button>
                    <div className="form-group filter-control-group" style={{ display: "inline-block", marginRight: "30px", marginBottom: "0px" }}>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fa fa-search"></i>
                                </div>
                            </div>
                            <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="filter alerts" />
                        </div>
                    </div>
                    <button className="header-button">
                        <i className="fa fa-floppy-o"></i>
                        Save Search
                    </button>
                    <div className="form-group filter-control-group" style={{ display: "inline-block", marginRight: "30px", marginBottom: "0px" }}>
                        <select className="form-control">
                            <option>Sort by</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className="form-group filter-control-group" style={{ display: "inline-block", marginRight: "30px", marginBottom: "0px" }}>
                        <select className="form-control">
                            <option>Export</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                </div>
                <div className="alert-data-table-container">
                    <table className="alert-data-table">
                        <thead>
                            <tr>
                                <th>Ticket</th>
                                <th>Resource</th>
                                <th>Severity</th>
                                <th>Created At</th>
                                <th>Assignee</th>
                                <th>Action</th>
                                <th>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.ticketsTable()}
                            <tr className="gray-label">
                                <td className="gray-label bold-label">
                                    <div className="pointer-label" onClick={this.onClickInstance}>144</div>
                                </td>
                                <td>
                                    Instance ID: I-3545frds489
                                </td>
                                <td>
                                    <div className="severity-critical bold-label colored-label">Critical</div>
                                </td>
                                <td>17/03/2020, 11:29:00</td>
                                <td>Assign To</td>
                                <td>
                                    <button className="btn btn-link" id="PopoverFocus">
                                        <i className="fa fa-ellipsis-h"></i>
                                    </button>
                                </td>
                                <td></td>
                            </tr>
                            <tr className="gray-label">
                                <td className="gray-label bold-label">
                                    <div className="pointer-label">144</div>
                                </td>
                                <td>
                                    Instance ID: I-3545frds489
                                </td>
                                <td>
                                    <div className="severity-critical bold-label colored-label">Critical</div>
                                </td>
                                <td>17/03/2020, 11:29:00</td>
                                <td>Assign To</td>
                                <td>
                                    <button className="btn btn-link" id="PopoverFocus">
                                        <i className="fa fa-ellipsis-h"></i>
                                    </button>
                                </td>
                                <td></td>
                            </tr>
                            <tr className="gray-label">
                                <td className="gray-label bold-label">
                                    <div className="pointer-label">144</div>
                                </td>
                                <td>
                                    Instance ID: I-3545frds489
                                </td>
                                <td>
                                    <div className="severity-critical bold-label colored-label">Critical</div>
                                </td>
                                <td>17/03/2020, 11:29:00</td>
                                <td>Assign To</td>
                                <td>
                                    <button className="btn btn-link" id="PopoverFocus">
                                        <i className="fa fa-ellipsis-h"></i>
                                    </button>
                                </td>
                                <td></td>
                            </tr>
                            <tr className="gray-label">
                                <td className="gray-label bold-label">
                                    <div className="pointer-label">144</div>
                                </td>
                                <td>
                                    Instance ID: I-3545frds489
                                </td>
                                <td>
                                    <div className="severity-high bold-label colored-label">High</div>
                                </td>
                                <td>17/03/2020, 11:29:00</td>
                                <td>Assign To</td>
                                <td>
                                    <button className="btn btn-link" id="PopoverFocus">
                                        <i className="fa fa-ellipsis-h"></i>
                                    </button>
                                </td>
                                <td></td>
                            </tr>
                            <tr className="gray-label">
                                <td className="gray-label bold-label">
                                    <div className="pointer-label">144</div>
                                </td>
                                <td>
                                    Instance ID: I-3545frds489
                                </td>
                                <td>
                                    <div className="severity-low bold-label colored-label">Low</div>
                                </td>
                                <td>17/03/2020, 11:29:00</td>
                                <td>Assign To</td>
                                <td>
                                    <button className="btn btn-link" id="PopoverFocus">
                                        <i className="fa fa-ellipsis-h"></i>
                                    </button>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverFocus">
                    <PopoverBody>
                        <span className="bold-label colored-label pointer-label" onClick={this.onClickStartEC2}>Start EC2</span>
                        <br />
                        <span className="bold-label colored-label pointer-label">Start EC2 with prompt</span>
                    </PopoverBody>
                </UncontrolledPopover>
                <StartECPopup ref={this.startECRef} />
                <InstancePopup ref={this.instanceRef} />
                <OpenNewTicketPopup guid={state.guid} ref={this.openNewTicketRef} />
            </div>
        );
    }
};