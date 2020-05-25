import * as React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';
import { config } from '../../config';

export class MonitorAlerts extends React.Component<any, any> {
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
                isCurrentPage: true
            }
        ];
    }

    render() {
        return (
            <div className="monitor-alerts-container">
                <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="MONITOR | ALERTS" />
                <div className="alert-page-container">
                    <div className="button-main-container">
                        <button className="alert-button">
                            <i className="fa fa-cog"></i>&nbsp;&nbsp;
                            Manage Alert Rule
                        </button>
                        <button className="alert-button">
                            <i className="fa fa-cog"></i>&nbsp;&nbsp;
                            Manage Workflows
                        </button>
                        <button className="alert-button">
                            <i className="fa fa-refresh"></i>&nbsp;&nbsp;
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
                    </div>
                    <div className="alert-data-container row">
                        <div className="alert-data-block col-sm-3">
                            <Link to={`${config.basePath}/allalerts`}>
                                <div className="alert-data-label">
                                    Total alerts
                                </div>
                                <div className="alert-data">
                                    26482
                                </div>
                                <div className="alert-data-meta">
                                    Since 16/03/2020, 07:00 PM
                                </div>
                            </Link>
                        </div>
                        <div className="alert-data-block col-sm-3">
                            <div className="alert-data-label">
                                Smart group (Preview)&nbsp;&nbsp;&nbsp;
                            <i className="fa fa-question-circle"></i>
                            </div>
                            <div className="alert-data">
                                367
                            </div>
                            <div className="alert-data-meta">
                                90% Reduction
                            </div>
                        </div>
                        <div className="alert-data-block col-sm-3">
                            <Link to={`${config.basePath}/rules`}>
                                <div className="alert-data-label">
                                    Total alert rules
                                </div>
                                <div className="alert-data">
                                    24
                                </div>
                                <div className="alert-data-meta">
                                    Enabled 451
                                </div>
                            </Link>
                        </div>
                        <div className="alert-data-block col-sm-3">
                            <div className="alert-data-label">
                                Workflows&nbsp;&nbsp;&nbsp;
                                <i className="fa fa-question-circle"></i>
                            </div>
                            <div className="alert-data">
                                67
                            </div>
                            <div className="alert-data-meta">
                                Enabled 55
                            </div>
                        </div>
                    </div>
                    <div className="alert-data-table-container">
                        <table className="alert-data-table">
                            <tbody>
                                <tr className="alert-data-table-header">
                                    <th>Severity</th>
                                    <th>Total Alerts</th>
                                    <th>New</th>
                                    <th>Acknowledge</th>
                                    <th>Closed</th>
                                </tr>
                                <tr className="">
                                    <td>
                                        <div className="severity-urgent">Urgent</div>
                                    </td>
                                    <td className="">
                                        <div className="progress-label">30</div>
                                        {/* <div className="progress">
                                            <div className="progress-bar" style={{ width: "30%" }}></div>
                                        </div> */}
                                    </td>
                                    <td>2185</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                                <tr className="">
                                    <td>
                                        <div className="severity-critical">Critical</div>
                                    </td>
                                    <td className="">
                                        <div className="progress-label">80</div>
                                        {/* <div className="progress">
                                            <div className="progress-bar" style={{ width: "80%" }}></div>
                                        </div> */}
                                    </td>
                                    <td>2185</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                                <tr className="">
                                    <td>
                                        <div className="severity-high">High</div>
                                    </td>
                                    <td className="">
                                        <div className="progress-label">100</div>
                                        {/* <div className="progress">
                                            <div className="progress-bar" style={{ width: "100%" }}></div>
                                        </div> */}
                                    </td>
                                    <td>2185</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                                <tr className="">
                                    <td>
                                        <div className="severity-medium">Medium</div>
                                    </td>
                                    <td className="">
                                        <div className="progress-label">10</div>
                                        {/* <div className="progress">
                                            <div className="progress-bar" style={{ width: "10%" }}></div>
                                        </div> */}
                                    </td>
                                    <td>2185</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                                <tr className="">
                                    <td>
                                        <div className="severity-low">Low</div>
                                    </td>
                                    <td className="">
                                        <div className="progress-label">19</div>
                                        {/* <div className="progress">
                                            <div className="progress-bar" style={{ width: "19%" }}></div>
                                        </div> */}
                                    </td>
                                    <td>2185</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
};