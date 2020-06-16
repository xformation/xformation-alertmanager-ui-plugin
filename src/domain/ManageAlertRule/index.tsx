import * as React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';
import { config } from '../../config';


export class ManageAlertRule extends React.Component<any, any> {
    alertsRulesData: any;
    alertsScriptsData: any;
    breadCrumbs: any;
    constructor(props: any) {
        super(props);
        this.state = {
        };
        this.breadCrumbs = [
            {
                label: "Home",
                route: `/`
            },
            {
                label: "Monitor | Alerts",
                isCurrentPage: true
            }
        ];
        this.alertsRulesData = [{
            name: 'CPU Percentage',
            ruleType: 'Threshold',
            message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
            alertHandlers: 'Slack (default)'
        }, {
            name: 'Disk Read Bytes	',
            ruleType: 'Threshold',
            message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
            alertHandlers: 'Slack (default)'
        }, {
            name: 'Disk Write Bytes	',
            ruleType: 'Threshold',
            message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
            alertHandlers: 'Slack (default)'
        }];
        this.alertsScriptsData = [{
            name: 'CPU Percentage',
            type: 'Slack (default)',
        }, {
            name: 'Disk Read Bytes	',
            type: 'Slack (default)',
        }, {
            name: 'Disk Write Bytes	',
            type: 'Slack (default)',
        }];
    }
    createAlertsRulesTable = () => {
        const retData = [];
        const alertsRules = this.alertsRulesData.length;
        for (let i = 0; i < alertsRules; i++) {
            const alerts = this.alertsRulesData[i];
            retData.push(
                <tr>
                    <td>{alerts.name}</td>
                    <td>{alerts.ruleType}</td>
                    <td>
                        <pre>
                            <code>{alerts.message}</code>
                        </pre>
                    </td>
                    <td>
                        <pre>
                            <code>{alerts.alertHandlers}</code>
                        </pre>
                    </td>
                    <td>
                        <div className="d-flex">
                            <div className="enabled"></div>
                            <button className="btn btn-link"><i className="fa fa-edit"></i></button>
                            <button className="btn btn-link"><i className="fa fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            );
        }
        return retData;
    }
    createAlertsScriptsTable = () => {
        const retData = [];
        const alertsScripts = this.alertsScriptsData.length;
        for (let i = 0; i < alertsScripts; i++) {
            const scripts = this.alertsScriptsData[i];
            retData.push(
                <tr>
                    <td>{scripts.name}</td>
                    <td>
                        <pre>
                            <code>{scripts.type}</code>
                        </pre>
                    </td>
                    <td>
                        <div className="d-flex">
                            <div className="enabled"></div>
                            <button className="btn btn-link"><i className="fa fa-edit"></i></button>
                            <button className="btn btn-link"><i className="fa fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            );
        }
        return retData;
    }

    render() {
        return (
            <div className="monitor-alerts-container manage-alert-rule">
                <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="MONITOR | ALERTS" />
                <div className="alert-page-container">
                    <div className="common-container">
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <button className="alert-gray-button kpi-btn">KPI</button>
                                <button className="alert-gray-button log-btn">Log</button>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="float-right common-right-btn">
                                    <Link to={`${config.basePath}/monitoralerts`} className="alert-white-button min-width-inherit"><i className="fa fa-arrow-circle-left"></i>&nbsp;&nbsp; Back</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="common-container manage-container">
                        <div className="row">
                            <div className="col-lg-8 col-md-12 col-sm-12 manage-rules-search">
                                <div className="manage-rules-search-text">3 Alert Rules</div>
                                <div className="manage-rules-search-box">
                                    <form>
                                        <input type="text" className="input-group-text" placeholder="Search Rule" />
                                        <button><i className="fa fa-search"></i></button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12 manage-rules-btn">
                                <div className="float-right common-right-btn">
                                    <Link to={`${config.basePath}/alertrulebuilder`} className="alert-blue-button create-rule-btn">Create Alert Rule</Link>
                                </div>
                            </div>
                        </div>
                        <div className="manage-data-table">
                            <div className="manage-data-table-inner">
                                <div className="table-scroll">
                                    <table className="table">
                                    <thead>
                                        <tr>
                                            <td>Name</td>
                                            <td>Rule Type</td>
                                            <td>Message</td>
                                            <td>Alert Handlers</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.createAlertsRulesTable()}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="common-container manage-container">
                        <div className="row">
                            <div className="col-lg-8 col-md-12 col-sm-12 manage-rules-search">
                                <div className="manage-rules-search-text">3 Scripts</div>
                                <div className="manage-rules-search-box">
                                    <form>
                                        <input type="text" className="input-group-text" placeholder="Search Script" />
                                        <button><i className="fa fa-search"></i></button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12 manage-rules-btn">
                                <div className="float-right common-right-btn">
                                    <button className="alert-blue-button create-rule-btn">Write Script</button>
                                </div>
                            </div>
                        </div>
                        <div className="manage-data-table">
                            <div className="manage-data-table-inner">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <td>Name</td>
                                            <td>Type</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.createAlertsScriptsTable()}
                                        <tr>
                                            <td>CPU Percentage</td>
                                            <td>
                                                <pre>
                                                    <code>Slack (default)</code>
                                                </pre>
                                            </td>
                                            <td>
                                                <div className="d-flex">
                                                    <div className="enabled"></div>
                                                    <button className="btn btn-link"><i className="fa fa-edit"></i></button>
                                                    <button className="btn btn-link"><i className="fa fa-trash"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Disk Read Bytes</td>
                                            <td>
                                                <pre>
                                                    <code>Slack (default)</code>
                                                </pre>
                                            </td>
                                            <td>
                                                <div className="d-flex">
                                                    <div className="enabled"></div>
                                                    <button className="btn btn-link"><i className="fa fa-edit"></i></button>
                                                    <button className="btn btn-link"><i className="fa fa-trash"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Disk Write Bytes</td>
                                            <td>
                                                <pre>
                                                    <code>Slack (default)</code>
                                                </pre>
                                            </td>
                                            <td>
                                                <div className="d-flex">
                                                    <div className="enabled"></div>
                                                    <button className="btn btn-link"><i className="fa fa-edit"></i></button>
                                                    <button className="btn btn-link"><i className="fa fa-trash"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        );
    }
};