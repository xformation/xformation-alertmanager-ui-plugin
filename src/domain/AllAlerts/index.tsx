import * as React from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, UncontrolledPopover, PopoverBody } from 'reactstrap';
import { Breadcrumbs } from '../Breadcrumbs';
import { config } from '../../config';
import { PopupContent } from './PopupContent';

export class AllAlerts extends React.Component<any, any> {
    breadCrumbs: any;
    constructor(props: any) {
        super(props);
        this.state = {
            modal: false,
        };
        this.breadCrumbs = [
            {
                label: "Home",
                route: `${config.basePath}/home`
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
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    render() {
        const state = this.state;
        return (
            <div className="all-alerts-container">
                <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="MONITOR | ALL ALERTS" />
                <div className="alert-page-container">
                    <div className="common-container">
                        <Link to={`${config.basePath}/createrule`} className="alert-white-button">
                            <i className="fa fa-plus"></i>&nbsp;&nbsp;
                            New Alert Rule
                        </Link>
                        <a className="alert-white-button">
                            <i className="fa fa-cog"></i>&nbsp;&nbsp;
                            Manage Alert Rule
                        </a>
                        <a className="alert-white-button">
                            <i className="fa fa-table"></i>&nbsp;&nbsp;
                            Columns
                        </a>
                        <a className="alert-white-button">
                            <i className="fa fa-play-circle"></i>&nbsp;&nbsp;
                            Enable
                        </a>
                        <a className="alert-white-button">
                            <i className="fa fa-stop-circle"></i>&nbsp;&nbsp;
                            Disable
                        </a>
                        <a className="alert-white-button">
                            <i className="fa fa-refresh"></i>&nbsp;&nbsp;
                            Refresh
                        </a>
                        <a className="alert-white-button">
                            <i className="fa fa-trash"></i>&nbsp;&nbsp;
                            Delete
                        </a>
                    </div>
                    <div className="filter-container form-row common-container">
                        <div className="form-group filter-control-group col-md-4 col-sm-12">
                            <label htmlFor="rousourceGroup">
                                Rousource Group&nbsp;&nbsp;&nbsp;
                            <i className="fa fa-info-circle"></i>
                            </label>
                            <select className="form-control" id="rousourceGroup">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="form-group filter-control-group col-md-4 col-sm-12">
                            <label htmlFor="resources">
                                Rousources type&nbsp;&nbsp;&nbsp;
                            <i className="fa fa-info-circle"></i>
                            </label>
                            <select className="form-control" id="resources">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="form-group filter-control-group col-md-4 col-sm-12">
                            <label htmlFor="resources">
                                Rousources&nbsp;&nbsp;&nbsp;
                            <i className="fa fa-info-circle"></i>
                            </label>
                            <select className="form-control" id="resources">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="form-group filter-control-group col-md-4 col-sm-12">
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
                        <div className="form-group filter-control-group col-md-4 col-sm-12">
                            <label htmlFor="timeRange">
                                Smart group ID&nbsp;&nbsp;&nbsp;
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
                        <div className="form-group filter-control-group col-md-4 col-sm-12">
                            <label htmlFor="timeRange">
                                Monitor services&nbsp;&nbsp;&nbsp;
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
                        <div className="form-group filter-control-group col-md-4 col-sm-12">
                            <label htmlFor="timeRange">
                                Monitor condition&nbsp;&nbsp;&nbsp;
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
                        <div className="form-group filter-control-group col-md-4 col-sm-12">
                            <label htmlFor="timeRange">
                                Serverity&nbsp;&nbsp;&nbsp;
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
                        <div className="form-group filter-control-group col-md-4 col-sm-12">
                            <label htmlFor="timeRange">
                                Alert state&nbsp;&nbsp;&nbsp;
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
                    <div className="alert-data-table-container common-container">
                        <table className="alert-data-table">
                            <tbody>
                                <tr className="alert-data-table-header">
                                    <th>Name</th>
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
                                <tr className="">
                                    <td className="">
                                        <div className="pointer-label" onClick={this.toggle}>Percentage CPU</div>
                                    </td>
                                    <td>
                                        <div className="severity-urgent  ">Urgent</div>
                                    </td>
                                    <td>
                                        Fired
                                </td>
                                    <td>New</td>
                                    <td>Prod_DB_SYN14</td>
                                    <td>Prometheus</td>
                                    <td>Metrics</td>
                                    <td>17/03/2020, 11:29:00</td>
                                    <td>Alert Management</td>
                                    <td>None</td>
                                    <td>
                                        <button className="btn btn-link" id="PopoverFocus">
                                            <i className="fa fa-ellipsis-h"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="">
                                    <td className="">
                                        CPU Credits
                                </td>
                                    <td>
                                        <div className="severity-critical  ">Critical</div>
                                    </td>
                                    <td>
                                        Fired
                                </td>
                                    <td>New</td>
                                    <td>Prod_DB_SYN14</td>
                                    <td>Prometheus</td>
                                    <td>Metrics</td>
                                    <td>17/03/2020, 11:29:00</td>
                                    <td>Alert Management</td>
                                    <td>None</td>
                                    <td>
                                        <button className="btn btn-link" id="PopoverFocus">
                                            <i className="fa fa-ellipsis-h"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="">
                                    <td className="">
                                        Network In
                                </td>
                                    <td>
                                        <div className="severity-high  ">High</div>
                                    </td>
                                    <td>
                                        Fired
                                </td>
                                    <td>New</td>
                                    <td>Prod_DB_SYN14</td>
                                    <td>Prometheus</td>
                                    <td>Metrics</td>
                                    <td>17/03/2020, 11:29:00</td>
                                    <td>Alert Management</td>
                                    <td>None</td>
                                    <td>
                                        <button className="btn btn-link" id="PopoverFocus">
                                            <i className="fa fa-ellipsis-h"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="">
                                    <td className="">
                                        Disk Read Bytes
                                </td>
                                    <td>
                                        <div className="severity-medium  ">Medium</div>
                                    </td>
                                    <td>
                                        Fired
                                </td>
                                    <td>New</td>
                                    <td>Prod_DB_SYN14</td>
                                    <td>Prometheus</td>
                                    <td>Metrics</td>
                                    <td>17/03/2020, 11:29:00</td>
                                    <td>Alert Management</td>
                                    <td>None</td>
                                    <td>
                                        <button className="btn btn-link" id="PopoverFocus">
                                            <i className="fa fa-ellipsis-h"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="">
                                    <td className="">
                                        Disk Write Bytes
                                </td>
                                    <td>
                                        <div className="severity-medium  ">Medium</div>
                                    </td>
                                    <td>
                                        Fired
                                </td>
                                    <td>New</td>
                                    <td>Prod_DB_SYN14</td>
                                    <td>Prometheus</td>
                                    <td>Metrics</td>
                                    <td>17/03/2020, 11:29:00</td>
                                    <td>Alert Management</td>
                                    <td>None</td>
                                    <td>
                                        <button className="btn btn-link" id="PopoverFocus">
                                            <i className="fa fa-ellipsis-h"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="">
                                    <td className="">
                                        Power Off Machine
                                </td>
                                    <td>
                                        <div className="severity-medium  ">Medium</div>
                                    </td>
                                    <td>
                                        Fired
                                </td>
                                    <td>New</td>
                                    <td>Prod_DB_SYN14</td>
                                    <td>Prometheus</td>
                                    <td>Metrics</td>
                                    <td>17/03/2020, 11:29:00</td>
                                    <td>Alert Management</td>
                                    <td>None</td>
                                    <td>
                                        <button className="btn btn-link" id="PopoverFocus">
                                            <i className="fa fa-ellipsis-h"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="">
                                    <td className="">
                                        Percentage CPU
                                </td>
                                    <td>
                                        <div className="severity-urgent  ">Urgent</div>
                                    </td>
                                    <td>
                                        Fired
                                </td>
                                    <td>New</td>
                                    <td>Prod_DB_SYN14</td>
                                    <td>Prometheus</td>
                                    <td>Metrics</td>
                                    <td>17/03/2020, 11:29:00</td>
                                    <td>Alert Management</td>
                                    <td>None</td>
                                    <td>
                                        <button className="btn btn-link" id="PopoverFocus">
                                            <i className="fa fa-ellipsis-h"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modal isOpen={state.modal} toggle={this.toggle} className="" modalClassName="alert-modal-container">
                    <ModalHeader toggle={this.toggle}>Percentage CPU</ModalHeader>
                    <ModalBody style={{ height: 'calc(100vh - 210px)', overflowY: 'auto', overflowX: "hidden" }}>
                        <PopupContent />
                    </ModalBody>
                </Modal>
                <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverFocus">
                    <PopoverBody>
                        <Link className=" " to={`${config.basePath}/alltickets`}>Create Ticket</Link>
                        <br />
                        <Link className=" " to="">Silence</Link>
                    </PopoverBody>
                </UncontrolledPopover>
            </div>
        );
    }
};