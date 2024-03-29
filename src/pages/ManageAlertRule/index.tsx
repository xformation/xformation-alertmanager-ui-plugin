import * as React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';
import { config } from '../../config';
import Table from './../../components/table';
import Rbac from './../../components/Rbac'
import { UnimplementedFeaturePopup } from '../../components/UnimplementedFeaturePopup';
import { PLUGIN_BASE_URL } from '../../constants';

export class ManageAlertRule extends React.Component<any, any> {
    alertsRulesData: any;
    alertsScriptsData: any;
    breadCrumbs: any;
    tableValue: any;
    perPageLimit: any;
    checkboxValue: any;
    scriptValue: any;
    unimplementedFeatureModalRef: any;
    constructor(props: any) {
        super(props);
        this.tableValue = {
            columns: [
                {
                    label: 'Name',
                    key: 'name'
                },
                {
                    label: 'Rule Type',
                    key: 'ruleType'
                },
                {
                    label: 'Message',
                    key: 'message'
                },
                {
                    label: 'Alert Handlers',
                    key: 'alertHandlers'
                },
                {
                    label: 'Action',
                    key: 'action',
                    renderCallback: () => {
                        return <td>
                            <div className="d-inline-block">
                                <div className="enabled"></div>
                                <Rbac parentName={config.PARENT_NAME} childName="managealertrule-index-ruletbl-editbtn">
                                    <button className="btn btn-link" onClick={() => this.onClickUnImplementedFeature("")}><i className="fa fa-edit"></i></button>
                                </Rbac>
                                <Rbac parentName={config.PARENT_NAME} childName="managealertrule-index-ruletbl-deletebtn">
                                    <button className="btn btn-link" onClick={() => this.onClickUnImplementedFeature("")}><i className="fa fa-trash"></i></button>
                                </Rbac>
                            </div>
                        </td>
                    }
                },
            ],
            data: [
                {
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
                }
            ],
        };
        this.scriptValue = {
            columns: [
                {
                    label: 'Name',
                    key: 'name'
                },
                {
                    label: 'Type',
                    key: 'type'
                },
                {
                    label: 'Action',
                    key: 'action',
                    renderCallback: () => {
                        return <td>
                            <div className="d-inline-block">
                                <div className="enabled"></div>
                                <Rbac parentName={config.PARENT_NAME} childName="managealertrule-index-scripttbl-editbtn">
                                    <button className="btn btn-link" onClick={() => this.onClickUnImplementedFeature("")}><i className="fa fa-edit"></i></button>
                                </Rbac>
                                <Rbac parentName={config.PARENT_NAME} childName="managealertrule-index-scripttbl-deletebtn">
                                    <button className="btn btn-link" onClick={() => this.onClickUnImplementedFeature("")}><i className="fa fa-trash"></i></button>
                                </Rbac>

                            </div>
                        </td>
                    }
                },
            ],
            data: [
                {
                    name: 'CPU Percentage',
                    type: 'Slack (default)',
                }, {
                    name: 'Disk Read Bytes	',
                    type: 'Slack (default)',
                }, {
                    name: 'Disk Write Bytes	',
                    type: 'Slack (default)',
                }
            ],
        };
        this.perPageLimit = 3,
            this.checkboxValue = true,
            this.state = {
            };
        this.breadCrumbs = [
            {
                label: "Home",
                route: `/`
            },
            {
                label: "Monitor | Alerts",
                route: `${PLUGIN_BASE_URL}/monitor-alerts`
            },
            {
                label: "Manage Alert Rule",
                isCurrentPage: true
            }
        ];
        this.unimplementedFeatureModalRef = React.createRef();
        // this.alertsRulesData = [{
        //     name: 'CPU Percentage',
        //     ruleType: 'Threshold',
        //     message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
        //     alertHandlers: 'Slack (default)'
        // }, {
        //     name: 'Disk Read Bytes	',
        //     ruleType: 'Threshold',
        //     message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
        //     alertHandlers: 'Slack (default)'
        // }, {
        //     name: 'Disk Write Bytes	',
        //     ruleType: 'Threshold',
        //     message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
        //     alertHandlers: 'Slack (default)'
        // }];
        // this.alertsScriptsData = [{
        //     name: 'CPU Percentage',
        //     type: 'Slack (default)',
        // }, {
        //     name: 'Disk Read Bytes	',
        //     type: 'Slack (default)',
        // }, {
        //     name: 'Disk Write Bytes	',
        //     type: 'Slack (default)',
        // }];
    }
    onClickUnImplementedFeature = (link: any) => {
        this.unimplementedFeatureModalRef.current.setLink(link);
        this.unimplementedFeatureModalRef.current.toggle();
    };
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
                        <div className="d-inline-block">
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

    isLightTheme() {
        const w: any = window;
        if (w.grafanaBootData && w.grafanaBootData.user) {
            return w.grafanaBootData.user.lightTheme;
        }
        return false;
    }

    render() {
        return (
            <div className="monitor-alerts-container manage-alert-rule">
                <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="MONITOR | ALERTS" />
                <div className="alert-page-container">
                    <div className="common-container">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <button className="alert-gray-button kpi-btn active" onClick={() => this.onClickUnImplementedFeature("")}>KPI</button>
                                <button className="alert-gray-button log-btn" onClick={() => this.onClickUnImplementedFeature("")}>Log</button>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="float-right common-right-btn">
                                    <Link to={`${PLUGIN_BASE_URL}/monitor-alerts`} className="alert-white-button min-width-inherit"><i className="fa fa-arrow-circle-left"></i>&nbsp;&nbsp; Back</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="common-container manage-container">
                        <div className="row">
                            <div className="col-lg-8 col-md-12 col-sm-12 manage-rules-search">
                                <div className="manage-rules-search-text">3 Alert Rules</div>
                                {/* <div className="manage-rules-search-box">
                                    <form>
                                        <input type="text" className="input-group-text" placeholder="Search Rule" />
                                        <button><i className="fa fa-search"></i></button>
                                    </form>
                                </div> */}
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12 manage-rules-btn">
                                <Rbac parentName={config.PARENT_NAME} childName="managealertrule-index-createalertrulebtn">
                                    <div className="float-right common-right-btn">
                                        <Link to={`${PLUGIN_BASE_URL}/alert-rule-builder`} className="alert-blue-button m-r-0 create-rule-btn">Create Alert Rule</Link>
                                    </div>
                                </Rbac>
                            </div>
                        </div>
                        <div className="alert-data-table-container managealertrules-data-table-container">
                            <Table valueFromData={this.tableValue} perPageLimit={this.perPageLimit} visiblecheckboxStatus={this.checkboxValue}
                                tableClasses={{ table: "alert-data-tabel", tableParent: "alerts-data-tabel", parentClass: "all-alert-data-table" }} searchKey="name" showingLine="Showing %start% to %end% of %total%" dark={!this.isLightTheme()} />

                        </div>
                    </div>
                    <div className="common-container manage-container">
                        <div className="row">
                            <div className="col-lg-8 col-md-12 col-sm-12 manage-rules-search">
                                <div className="manage-rules-search-text">3 Scripts</div>
                                {/* <div className="manage-rules-search-box">
                                    <form>
                                        <input type="text" className="input-group-text" placeholder="Search Script" />
                                        <button><i className="fa fa-search"></i></button>
                                    </form>
                                </div> */}
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12 manage-rules-btn">
                                <div className="float-right common-right-btn">
                                    <Rbac parentName={config.PARENT_NAME} childName="managealertrule-index-writescriptbtn">
                                        <Link to={`${PLUGIN_BASE_URL}/script-editor`} className="alert-blue-button m-r-0 create-rule-btn">Write Script</Link>
                                    </Rbac>
                                </div>
                            </div>
                        </div>
                        <div className="alert-data-table-container managealertrules-data-table-container">
                            <Table valueFromData={this.scriptValue} perPageLimit={this.perPageLimit} visiblecheckboxStatus={this.checkboxValue}
                                tableClasses={{ table: "alert-data-tabel", tableParent: "alerts-data-tabel", parentClass: "all-alert-data-table" }} searchKey="name" showingLine="Showing %start% to %end% of %total%" dark={!this.isLightTheme()}/>

                        </div>
                    </div>
                </div>
                <UnimplementedFeaturePopup ref={this.unimplementedFeatureModalRef} />
            </div>
        );
    }
};