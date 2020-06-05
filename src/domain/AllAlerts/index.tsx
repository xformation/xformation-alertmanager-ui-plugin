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
                        {/* <a className="alert-white-button">
                            <i className="fa fa-cog"></i>&nbsp;&nbsp;
                            Manage Alert Rule
                        </a> */}
                        {/* <a className="alert-white-button">
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
                        </a> */}
                        <a className="alert-white-button">
                            <i className="fa fa-refresh"></i>&nbsp;&nbsp;
                            Refresh
                        </a>
                        <a className="alert-white-button float-right">
                            <i className="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;
                            Back
                        </a>
                    </div>
                    <div className="filter-container form-row common-container">
                        <div className="form-group filter-control-group col-md-2 col-sm-12">
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
                        {/* <div className="form-group filter-control-group col-md-6 col-sm-12">
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
                        </div> */}
                        <div className="form-group filter-control-group col-md-2 col-sm-12">
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
                        <div className="form-group filter-control-group col-md-2 col-sm-12">
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
                        <div className="form-group filter-control-group col-md-2 col-sm-12">
                            <label htmlFor="monitorServices">
                                Monitor services&nbsp;&nbsp;&nbsp;
                            <i className="fa fa-info-circle"></i>
                            </label>
                            <select className="form-control" id="monitorServices">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        {/* <div className="form-group filter-control-group col-md-6 col-sm-12">
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
                        </div> */}
                        {/* <div className="form-group filter-control-group col-md-4 col-sm-12">
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
                        </div> */}
                        <div className="form-group filter-control-group col-md-2 col-sm-12">
                            <label htmlFor="alertType">
                                Alert Type&nbsp;&nbsp;&nbsp;
                            <i className="fa fa-info-circle"></i>
                            </label>
                            <select className="form-control" id="alertType">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="form-group filter-control-group col-md-2 col-sm-12">
                            <label htmlFor="serverity">
                                Serverity&nbsp;&nbsp;&nbsp;
                            <i className="fa fa-info-circle"></i>
                            </label>
                            <select className="form-control" id="serverity">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="form-group filter-control-group col-md-2 col-sm-12">
                            <label htmlFor="alertState">
                                Alert state&nbsp;&nbsp;&nbsp;
                            <i className="fa fa-info-circle"></i>
                            </label>
                            <select className="form-control" id="alertState">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="col-md-2 col-sm-12">
                            <input type="checkbox" className="form-control" />
                            <label htmlFor="archive">
                                Archive&nbsp;&nbsp;&nbsp;
                            </label>
                        </div>
                        <div className="col-md-2 col-sm-12">
                            <input type="checkbox" className="form-control" />
                            <label htmlFor="clearFilter">
                                Clear All Filters&nbsp;&nbsp;&nbsp;
                            </label>
                        </div>
                    </div>
                    <div className="filter-container form-row row common-container">
                        <div className="col-md-6 col-sm-12">
                            <label htmlFor="allallerts">
                                All Alerts&nbsp;&nbsp;&nbsp;
                            </label>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="ft_r">
                                <div className="form-group filter-control-group col-md-6 col-sm-12">
                                    <select className="form-control" id="bulkaction">
                                        <option>Delete</option>
                                        <option>Archive</option>
                                        <option>Processed</option>
                                        <option>Create Ticket</option>
                                        <option>Execute Workflow</option>
                                    </select>
                                </div>
                                <div className="form-group filter-control-group col-md-6 col-sm-12">
                                    <div className="input-group-text"><i className="fa fa-search"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="alert-data-table-container common-container">
                        <table className="alert-data-table">
                            <tbody>
                                <tr className="alert-data-table-header">
                                    <th><input type="checkbox" /> Name</th>
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
                                        <div className="pointer-label" onClick={this.toggle}><input type="checkbox" className="checkbox" /> Percentage CPU</div>
                                    </td>
                                    <td>
                                        <div className="severity-urgent">Urgent</div>
                                    </td>
                                    <td>Fired</td>
                                    <td>New</td>
                                    <td>Prod_DB_SYN14</td>
                                    <td>Prometheus</td>
                                    <td>Metrics</td>
                                    <td>17/03/2020, 11:29:00</td>
                                    <td>Alert Management</td>
                                    <td>None</td>
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
                                <tr className="">
                                    <td className="">
                                        <div className="pointer-label"><input type="checkbox" className="checkbox" /> CPU Credits</div>
                                    </td>
                                    <td>
                                        <div className="severity-critical">Critical</div>
                                    </td>
                                    <td>Fired</td>
                                    <td>New</td>
                                    <td>Prod_DB_SYN14</td>
                                    <td>Prometheus</td>
                                    <td>Metrics</td>
                                    <td>17/03/2020, 11:29:00</td>
                                    <td>Alert Management</td>
                                    <td>None</td>
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
                                <tr className="">
                                    <td className="">
                                        <div className="pointer-label"><input type="checkbox" className="checkbox" /> Network In</div>
                                    </td>
                                    <td>
                                        <div className="severity-high  ">High</div>
                                    </td>
                                    <td>Fired</td>
                                    <td>New</td>
                                    <td>Prod_DB_SYN14</td>
                                    <td>Prometheus</td>
                                    <td>Metrics</td>
                                    <td>17/03/2020, 11:29:00</td>
                                    <td>Alert Management</td>
                                    <td>None</td>
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
                                <tr className="">
                                    <td className="">
                                        <div className="pointer-label"><input type="checkbox" className="checkbox" /> Disk Read Bytes</div>
                                    </td>
                                    <td>
                                        <div className="severity-medium  ">Medium</div>
                                    </td>
                                    <td>Fired</td>
                                    <td>New</td>
                                    <td>Prod_DB_SYN14</td>
                                    <td>Prometheus</td>
                                    <td>Metrics</td>
                                    <td>17/03/2020, 11:29:00</td>
                                    <td>Alert Management</td>
                                    <td>None</td>
                                    <td>
                                        <   div className="d-flex">
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
                                <tr className="">
                                    <td className="">
                                        <div className="pointer-label"><input type="checkbox" className="checkbox" /> Disk Write Bytes</div>
                                    </td>
                                    <td>
                                        <div className="severity-medium  ">Medium</div>
                                    </td>
                                    <td>Fired</td>
                                    <td>New</td>
                                    <td>Prod_DB_SYN14</td>
                                    <td>Prometheus</td>
                                    <td>Metrics</td>
                                    <td>17/03/2020, 11:29:00</td>
                                    <td>Alert Management</td>
                                    <td>None</td>
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
                                <tr className="">
                                    <td className="">
                                        <div className="pointer-label"><input type="checkbox" className="checkbox" /> Power Off Machine</div>
                                    </td>
                                    <td>
                                        <div className="severity-medium  ">Medium</div>
                                    </td>
                                    <td>Fired</td>
                                    <td>New</td>
                                    <td>Prod_DB_SYN14</td>
                                    <td>Prometheus</td>
                                    <td>Metrics</td>
                                    <td>17/03/2020, 11:29:00</td>
                                    <td>Alert Management</td>
                                    <td>None</td>
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
                                <tr className="">
                                    <td className="">
                                        <div className="pointer-label"><input type="checkbox" className="checkbox" /> Percentage CPU</div>
                                    </td>
                                    <td>
                                        <div className="severity-urgent  ">Urgent</div>
                                    </td>
                                    <td>Fired</td>
                                    <td>New</td>
                                    <td>Prod_DB_SYN14</td>
                                    <td>Prometheus</td>
                                    <td>Metrics</td>
                                    <td>17/03/2020, 11:29:00</td>
                                    <td>Alert Management</td>
                                    <td>None</td>
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