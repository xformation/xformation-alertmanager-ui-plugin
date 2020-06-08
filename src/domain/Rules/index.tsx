import * as React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Breadcrumbs } from '../Breadcrumbs';
import { config } from '../../config';

export class Rules extends React.Component<any, any> {

    breadCrumbs: any;
    constructor(props: any) {
        super(props);
        this.state = {
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
                label: "Rules",
                isCurrentPage: true
            }
        ];
    }

    render() {
        return (
            <div className="all-alerts-container">
                <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="MONITOR | ALERTS" />
                <div className="alert-page-container">
                    <div className="common-container">
                        <a className="alert-white-button">
                            <i className="fa fa-plus"></i>&nbsp;&nbsp;
                            New Alert Rule
                        </a>
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
                                Subscription&nbsp;&nbsp;&nbsp;
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
                                Rousources Group&nbsp;&nbsp;&nbsp;
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
                    </div>
                    <div className="alert-data-table-container common-container">
                        <div className="container_inner">
                            <table className="alert-data-table">
                            <tbody>
                                <tr className="alert-data-table-header">
                                    <th><input type="checkbox" />&nbsp;&nbsp;&nbsp;&nbsp;Name</th>
                                    <th>Condition</th>
                                    <th>Status</th>
                                    <th>Target resource</th>
                                    <th>Action</th>
                                </tr>
                                <tr className="">
                                    <td><input type="checkbox" />&nbsp;&nbsp;&nbsp;&nbsp;Percentage CPU</td>
                                    <td>Percentage CPU GreaterOrEqual 0</td>
                                    <td>
                                        <div className="enabled-disabled-container">
                                            <div className="enabled"></div>
                                        </div>
                                    </td>
                                    <td>kub-master-146783</td>
                                    <td>
                                        <div className="d-flex">
                                            <button className="btn btn-link">
                                                <i className="fa fa-edit"></i>
                                            </button>
                                            <button className="btn btn-link">
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="">
                                    <td><input type="checkbox" />&nbsp;&nbsp;&nbsp;&nbsp;Disk Write Bytes</td>
                                    <td>Disk Write Bytes alert is greater than 10GB</td>
                                    <td>
                                        <div className="enabled-disabled-container">
                                            <div className="enabled"></div>
                                        </div>
                                    </td>
                                    <td>Metrics</td>
                                    <td>
                                        <div className="d-flex">
                                            <button className="btn btn-link">
                                                <i className="fa fa-edit"></i>
                                            </button>
                                            <button className="btn btn-link">
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="">
                                    <td><input type="checkbox" />&nbsp;&nbsp;&nbsp;&nbsp;Network Out</td>
                                    <td>Network Out GreaterThan 3333</td>
                                    <td>
                                        <div className="enabled-disabled-container">
                                            <div className="enabled"></div>
                                        </div>
                                    </td>
                                    <td>Ser08-Test-11</td>
                                    <td>
                                        <div className="d-flex">
                                            <button className="btn btn-link">
                                                <i className="fa fa-edit"></i>
                                            </button>
                                            <button className="btn btn-link">
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="">
                                    <td><input type="checkbox" />&nbsp;&nbsp;&nbsp;&nbsp;Network In</td>
                                    <td>Network In GreatThan 3333</td>
                                    <td>
                                        <div className="enabled-disabled-container">
                                            <div className="enabled"></div>
                                        </div>
                                    </td>
                                    <td>Ser08-Test-11</td>
                                    <td>
                                        <div className="d-flex">
                                            <button className="btn btn-link">
                                                <i className="fa fa-edit"></i>
                                            </button>
                                            <button className="btn btn-link">
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="">
                                    <td><input type="checkbox" />&nbsp;&nbsp;&nbsp;&nbsp;Network In</td>
                                    <td>Network In GreatThan 3333</td>
                                    <td>
                                        <div className="enabled-disabled-container">
                                            <div className="disabled"></div>
                                        </div>
                                    </td>
                                    <td>Ser08-Test-11</td>
                                    <td>
                                        <div className="d-flex">
                                            <button className="btn btn-link">
                                                <i className="fa fa-edit"></i>
                                            </button>
                                            <button className="btn btn-link">
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};