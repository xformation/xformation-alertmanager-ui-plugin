import * as React from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
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
                <Breadcrumbs breadcrumbs={this.breadCrumbs} />
                <div className="page-header-container">
                    <span className="page-header">All Alerts</span>
                    <Link to={`${config.basePath}/createrule`} className="header-button">
                        <i className="fa fa-plus"></i>
                        New Alert Rule
                    </Link>
                    <button className="header-button">
                        <i className="fa fa-table"></i>
                        Edit Columns
                    </button>
                    <button className="header-button">
                        <i className="fa fa-cog"></i>
                        Edit Columns
                    </button>
                    <button className="header-button">
                        <i className="fa fa-bell"></i>
                        View Classic Alerts
                    </button>
                    <button className="header-button">
                        <i className="fa fa-refresh"></i>
                        Refresh
                    </button>
                </div>
                <div className="filter-container form-row">
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
                <div className="alert-data-table-container">
                    <table className="alert-data-table">
                        <tbody>
                            <tr>
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
                            </tr>
                            <tr className="gray-label">
                                <td className="colored-label">
                                    <div className="pointer-label" onClick={this.toggle}>Percentage CPU</div>
                                </td>
                                <td>
                                    <div className="severity-urgent bold-label colored-label">Urgent</div>
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
                            </tr>
                            <tr className="gray-label">
                                <td className="colored-label">
                                    CPU Credits
                                </td>
                                <td>
                                    <div className="severity-critical bold-label colored-label">Critical</div>
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
                            </tr>
                            <tr className="gray-label">
                                <td className="colored-label">
                                    Network In
                                </td>
                                <td>
                                    <div className="severity-high bold-label colored-label">High</div>
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
                            </tr>
                            <tr className="gray-label">
                                <td className="colored-label">
                                    Disk Read Bytes
                                </td>
                                <td>
                                    <div className="severity-medium bold-label colored-label">Medium</div>
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
                            </tr>
                            <tr className="gray-label">
                                <td className="colored-label">
                                    Disk Write Bytes
                                </td>
                                <td>
                                    <div className="severity-medium bold-label colored-label">Medium</div>
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
                            </tr>
                            <tr className="gray-label">
                                <td className="colored-label">
                                    Power Off Machine
                                </td>
                                <td>
                                    <div className="severity-medium bold-label colored-label">Medium</div>
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
                            </tr>
                            <tr className="gray-label">
                                <td className="colored-label">
                                    Percentage CPU
                                </td>
                                <td>
                                    <div className="severity-urgent bold-label colored-label">Urgent</div>
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
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Modal isOpen={state.modal} toggle={this.toggle} className="" modalClassName="alert-modal-container">
                    <ModalHeader toggle={this.toggle}>Percentage CPU</ModalHeader>
                    <ModalBody style={{height: 'calc(100vh - 210px)', overflowY: 'auto', overflowX: "hidden"}}>
                        <PopupContent />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
};