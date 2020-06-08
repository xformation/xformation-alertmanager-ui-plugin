import * as React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';
import { config } from '../../config';
import { CurrentAvrageWaitResponceTimeChart } from './CurrentAvrageWaitResponceTimeChart';
import { AlertVolumeByStatusChart } from './AlertVolumeByStatusChart';
import { AlertVolumeChart } from './AlertVolueChar';

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
                    <div className="common-container">
                        <a className="alert-blue-button">
                            <i className="fa fa-cog"></i>&nbsp;&nbsp;
                            Manage Alert Rule
                        </a>
                        <a className="alert-blue-button">
                            <i className="fa fa-cog"></i>&nbsp;&nbsp;
                            Manage Workflows
                        </a>
                        <a className="alert-blue-button">
                            <i className="fa fa-refresh"></i>&nbsp;&nbsp;
                            Refresh
                        </a>
                    </div>
                    <div className="alert-data-container row common-container">
                        <div className="alert-data-block col-lg-3 col-md-6 col-sm-12">
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
                        <div className="alert-data-block col-lg-3 col-md-6 col-sm-12">
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
                        <div className="alert-data-block col-lg-3 col-md-6 col-sm-12">
                            <a>
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
                            </a>
                        </div>
                    </div>
                    <div className="charts-container row common-container">
                        <div className="chart-block col-xl-4 col-lg-6 col-md-12 col-sm-12">
                            <div className="chart-inner alerts">
                                <div className="label">Top Alerts Today <i className="fa fa-cog"></i></div>
                                <div className="chart-data-table">
                                    <table className="table">
                                        <tbody>
                                            <tr className="chart-header">
                                                <th>Name</th>
                                                <th>Severity</th>
                                                <th>Time</th>
                                            </tr>
                                            <tr>
                                                <td>CPU</td>
                                                <td>
                                                    <div className="high">High</div>
                                                </td>
                                                <td>10 mins</td>
                                            </tr>
                                            <tr>
                                                <td>AWS S3</td>
                                                <td>
                                                    <div className="low">Low</div>
                                                </td>
                                                <td>12 mins</td>
                                            </tr>
                                            <tr>
                                                <td>Hard disk</td>
                                                <td>
                                                    <div className="medium">Medium</div>
                                                </td>
                                                <td>18 mins</td>
                                            </tr>
                                            <tr>
                                                <td>Network</td>
                                                <td>
                                                    <div className="high">High</div>
                                                </td>
                                                <td>25 mins</td>
                                            </tr>
                                            <tr>
                                                <td>vCenter</td>
                                                <td>
                                                    <div className="medium">Medium</div>
                                                </td>
                                                <td>53 mins</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="chart-block col-xl-4 col-lg-6 col-md-12 col-sm-12">
                            <div className="chart-inner current">
                                <div className="label">Current Wait Time <i className="fa fa-cog"></i></div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="current-text">
                                            21<sub>mm</sub>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="current_time_chart">
                                            <CurrentAvrageWaitResponceTimeChart />
                                        </div>
                                    </div>
                                </div>
                                <div className="current-bottom row">
                                    <div className="col-sm-8">
                                        <select>
                                            <option>Yesterday's avaerage</option>
                                            <option>Yesterday's avaerage</option>
                                            <option>Yesterday's avaerage</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-4 minutes-text">23 minutes</div>
                                </div>
                            </div>
                        </div>
                        <div className="chart-block col-xl-4 col-lg-6 col-md-12 col-sm-12">
                            <div className="chart-inner alert-volume">
                                <div className="label">Alert Volume Today <i className="fa fa-cog"></i></div>
                                <div className="current_time_chart">
                                    <AlertVolumeChart />
                                </div>
                            </div>
                        </div>
                        <div className="chart-block col-xl-4 col-lg-6 col-md-12 col-sm-12">
                            <div className="chart-inner alerts">
                                <div className="label">Alert Volume By Status <i className="fa fa-cog"></i></div>
                                <div className="current_time_chart">
                                    <AlertVolumeByStatusChart />
                                </div>
                            </div>
                        </div>
                        <div className="chart-block col-xl-4 col-lg-6 col-md-12 col-sm-12">
                            <div className="chart-inner current average">
                                <div className="label">Average Response Time <i className="fa fa-cog"></i></div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="current-text">
                                            11<sub>mm</sub>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="current_time_chart">
                                            <CurrentAvrageWaitResponceTimeChart />
                                        </div>
                                    </div>
                                </div>
                                <div className="current-bottom row">
                                    <div className="col-sm-8">
                                        <select>
                                            <option>Yesterday's avaerage</option>
                                            <option>Yesterday's avaerage</option>
                                            <option>Yesterday's avaerage</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-4 minutes-text">23 minutes</div>
                                </div>
                            </div>
                        </div>
                        <div className="chart-block col-xl-4 col-lg-6 col-md-12 col-sm-12">
                            <div className="chart-inner alert-volume">
                                <div className="label">Team Metrics <i className="fa fa-cog"></i></div>
                                <div className="chart-data-table">
                                    <table className="table">
                                        <tbody>
                                            <tr className="chart-header">
                                                <th>Agent</th>
                                                <th>Alerts</th>
                                                <th>Time</th>
                                            </tr>
                                            <tr>
                                                <td>John</td>
                                                <td>276</td>
                                                <td>17 mins</td>
                                            </tr>
                                            <tr>
                                                <td>Bill</td>
                                                <td>180</td>
                                                <td>19 mins</td>
                                            </tr>
                                            <tr>
                                                <td>Lynda</td>
                                                <td>219</td>
                                                <td>43 mins</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};