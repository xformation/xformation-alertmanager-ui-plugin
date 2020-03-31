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
                <Breadcrumbs breadcrumbs={this.breadCrumbs} />
                <div className="page-header-container">
                    <span className="page-header">Rules</span>
                    <button className="header-button">
                        <i className="fa fa-table"></i>
                        Columns
                    </button>
                    <button className="header-button">
                        <i className="fa fa-refresh"></i>
                        Refresh
                    </button>
                    <button className="header-button">
                        <i className="fa fa-plus"></i>
                        New Alert Rule
                    </button>
                    <button className="header-button">
                        <i className="fa fa-caret-right"></i>
                        Enable
                    </button>
                    <button className="header-button">
                        <i className="fa fa-square"></i>
                        Disable
                    </button>
                    <button className="header-button">
                        <i className="fa fa-trash"></i>
                        Delete
                    </button>
                </div>
                <div className="filter-container form-row">
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
                            Rousource group&nbsp;&nbsp;&nbsp;
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
                <div className="alert-data-table-container">
                    <table className="alert-data-table">
                        <tbody>
                            <tr>
                                <th><input type="checkbox"/>&nbsp;&nbsp;&nbsp;&nbsp;Name</th>
                                <th>Condition</th>
                                <th>Status</th>
                                <th>Target resource</th>
                            </tr>
                            <tr className="gray-label">
                                <td><input type="checkbox"/>&nbsp;&nbsp;&nbsp;&nbsp;Percentage CPU</td>
                                <td>Percentage CPU GreaterOrEqual 0</td>
                                <td>
                                    <div className="enabled-disabled-container">
                                        <div className="enabled"></div>
                                        <div className="text">Enabled</div>
                                    </div>
                                </td>
                                <td>kub-master-146783</td>
                            </tr>
                            <tr className="gray-label">
                                <td><input type="checkbox"/>&nbsp;&nbsp;&nbsp;&nbsp;Disk Write Bytes</td>
                                <td>Disk Write Bytes alert is greater than 10GB</td>
                                <td>
                                    <div className="enabled-disabled-container">
                                        <div className="enabled"></div>
                                        <div className="text">Enabled</div>
                                    </div>
                                </td>
                                <td>Metrics</td>
                            </tr>
                            <tr className="gray-label">
                                <td><input type="checkbox"/>&nbsp;&nbsp;&nbsp;&nbsp;Network Out</td>
                                <td>Network Out GreaterThan 3333</td>
                                <td>
                                    <div className="enabled-disabled-container">
                                        <div className="enabled"></div>
                                        <div className="text">Enabled</div>
                                    </div>
                                </td>
                                <td>Ser08-Test-11</td>
                            </tr>
                            <tr className="gray-label">
                                <td><input type="checkbox"/>&nbsp;&nbsp;&nbsp;&nbsp;Network In</td>
                                <td>Network In GreatThan 3333</td>
                                <td>
                                    <div className="enabled-disabled-container">
                                        <div className="enabled"></div>
                                        <div className="text">Enabled</div>
                                    </div>
                                </td>
                                <td>Ser08-Test-11</td>
                            </tr>
                            <tr className="gray-label">
                                <td><input type="checkbox"/>&nbsp;&nbsp;&nbsp;&nbsp;Network In</td>
                                <td>Network In GreatThan 3333</td>
                                <td>
                                    <div className="enabled-disabled-container">
                                        <div className="disabled"></div>
                                        <div className="text">Disabled</div>
                                    </div>
                                </td>
                                <td>Ser08-Test-11</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
};