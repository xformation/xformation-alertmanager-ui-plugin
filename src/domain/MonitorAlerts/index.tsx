import * as React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';
import { config } from '../../config';
import { CurrentAvrageWaitResponceTimeChart } from './CurrentAvrageWaitResponceTimeChart';
import { AlertVolumeByStatusChart } from './AlertVolumeByStatusChart';
import { AlertVolumeChart } from './AlertVolumeChart';
import { RestService } from '../_service/RestService';
import { UnimplementedFeaturePopup } from './unimplementedFeaturePopup';

export class MonitorAlerts extends React.Component<any, any> {
    
    breadCrumbs: any;
    unimplementedFeatureRef: any;
    constructor(props: any) {
        super(props);
        this.state = {
            totalAlerts: 0,
            topAlertsTodayData: [],
            teamMetricsData: [],
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
                label: "Monitor Alerts",
                isCurrentPage: true
            }
        ];
    }
    createTopAlertsTodayTable = () => {
        const retData = [];
        const topAlertsToday = this.state.topAlertsTodayData.length;
        for (let i = 0; i < topAlertsToday; i++) {
            const topAlerts = this.state.topAlertsTodayData[i];
            retData.push(
                <tr>
                    <td>{topAlerts.name}</td>
                    <td>
                        {
                            topAlerts.severity === 'high' && 
                            <div className="high">High</div>
                        }
                        {
                            topAlerts.severity === 'low' && 
                            <div className="low">Low</div>
                        }
                        {
                            topAlerts.severity === 'medium' && 
                            <div className="medium">Medium</div>
                        }
                        {
                            topAlerts.severity === 'critical' &&
                            <div className="medium">Critical</div>
                        }
                        {
                            topAlerts.severity === 'urgent' &&
                            <div className="medium">Urgent</div>
                        }


                    </td>
                    <td>{topAlerts.time} mins</td>
                </tr>
            );
        }
        return retData;
    }

    componentDidMount(){
        try {
            this.fetchData();
        } catch (err) {
            console.log("MonitorAlert page. Loading total alerts from elastic failed. Error: ", err);
        }
        try {
            this.fetchDatatopAlertToday();
        } catch (err) {
            console.log("failed to load top alert today ", err);
        }

        try {
            this.fetchTeamMatricsData();
        } catch (err) {
            console.log("failed to load Team Matrics Data ", err);
        }
    }
    fetchDatatopAlertToday = () => {
        RestService.getData(config.TOP_ALERT_TODAY, null, null).then(
            (response: any) => {
                // this.topAlertsTodayData=response;
                this.setState({
                    topAlertsTodayData: response,
                })
                console.log("top alert data :::::: ", response);
            }
        );
    }
    fetchTeamMatricsData = () => {
        RestService.getData(config.GET_TEAM_MATRICS_DATA_URL, null, null).then(
            (response: any) => {
                // this.teamMetricsData=response;
                this.setState({
                    teamMetricsData: response,
                });
                console.log("Team Matrics data :::::: ", response);
            }
        );
    }

    fetchData = () => {
        RestService.getData(config.TOTAL_ALERTS+'?type=alert&index=alert', null, null).then(
            (response: any) => {
                this.setState({
                    totalAlerts: response
                })
                console.log("Total alert data :::::: ", response);
            }
        );
    }
    
    createteamMetricsTable = () => {
        const retData = [];
        const teamMetrics = this.state.teamMetricsData.length;
        for (let i = 0; i < teamMetrics; i++) {
            const teamMetrics = this.state.teamMetricsData[i];
            retData.push(
                <tr>
                    <td>{teamMetrics.agentName}</td>
                    <td>{teamMetrics.totalAlert}</td>
                    <td>{teamMetrics.timeSinceLastTicketCreated} mins</td>
                </tr>
            );
        }
        return retData;
    }

    onClickonClickUnimplementedFeature = (e: any) => {
        this.unimplementedFeatureRef.current.toggle();
    };

    render() {
        const {totalAlerts} = this.state;
        return (
            <div className="monitor-alerts-container">
                <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="MONITOR | ALERTS" />
                <div className="alert-page-container">
                    <div className="common-container">
                        <Link to={`${config.basePath}/managealertrule`} className="alert-blue-button">
                            <i className="fa fa-cog"></i>&nbsp;&nbsp;
                            Manage Alert Rule
                        </Link>
                        <a className="alert-blue-button" onClick={this.onClickonClickUnimplementedFeature}>
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
                                    {totalAlerts}
                                </div>
                                <div className="alert-data-meta">
                                    &nbsp;
                                </div> 
                            </Link>
                        </div>
                        <div className="alert-data-block col-lg-3 col-md-6 col-sm-12">
                            <Link to={`${config.basePath}/rules`}>
                                <div className="alert-data-label">
                                    Total alert rules
                                </div>
                                <div className="alert-data">
                                    0
                                </div>
                                <div className="alert-data-meta">
                                    Enabled 0
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
                                    0
                                </div>
                                <div className="alert-data-meta">
                                    Enabled 0
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
                                            {this.createTopAlertsTodayTable()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="chart-block col-xl-4 col-lg-6 col-md-12 col-sm-12">
                            <div className="chart-inner current">
                                <div className="label">Current Wait Time <i className="fa fa-cog"></i></div>
                                <div className="row">
                                    <div className="col-sm-5 p-r-0">
                                        <div className="current-text">
                                            21<sub>mm</sub>
                                        </div>
                                    </div>
                                    <div className="col-sm-7 p-l-0">
                                        <div className="current-responce-time-chart">
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
                                <div className="label">Alert Volume <i className="fa fa-cog"></i></div>
                                <div className="current-time-chart row" style={{ margin: "0px" }}>
                                    <AlertVolumeChart />
                                </div>
                            </div>
                        </div>
                        <div className="chart-block col-xl-4 col-lg-6 col-md-12 col-sm-12">
                            <div className="chart-inner alerts">
                                <div className="label">Alert Volume By Status <i className="fa fa-cog"></i></div>
                                <div className="current-time-chart row" style={{margin: "0px"}}>
                                    <AlertVolumeByStatusChart />
                                </div>
                            </div>
                        </div>
                        <div className="chart-block col-xl-4 col-lg-6 col-md-12 col-sm-12">
                            <div className="chart-inner current average">
                                <div className="label">Average Response Time <i className="fa fa-cog"></i></div>
                                <div className="row">
                                    <div className="col-sm-5 p-r-0">
                                        <div className="current-text">
                                            11<sub>mm</sub>
                                        </div>
                                    </div>
                                    <div className="col-sm-7 p-l-0">
                                        <div className="current-responce-time-chart">
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
                                            {this.createteamMetricsTable()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <UnimplementedFeaturePopup ref={this.unimplementedFeatureRef} />
            </div>
        );
    }
};