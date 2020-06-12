import * as React from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Breadcrumbs } from '../Breadcrumbs';
import { config } from '../../config';

export class Rules extends React.Component<any, any> {
    ruleData: any;
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
                route: `${config.basePath}/monitoralerts`
            },
            {
                label: "Rules",
                isCurrentPage: true
            }
        ];
        this.ruleData = [{
            name: 'Percentage CPU',
            condition: 'Percentage CPU greater or equal to 0',
            isEnabled: true,
            targetResource: 'kub-master-146783'
        }, {
            name: 'Disk Write Bytes',
            condition: 'Disk Write Bytes alert is greater than 10GB',
            isEnabled: true,
            targetResource: 'Metrics'
        }, {
            name: 'Network Out',
            condition: 'Network Out GreaterThan 3333',
            isEnabled: true,
            targetResource: 'Ser08-Test-11'
        }, {
            name: 'Network In',
            condition: 'Network In GreatThan 3333',
            isEnabled: false,
            targetResource: 'Ser08-Test-11'
        }];
    }

    createRuleTable = () => {
        const retData = [];
        const totalRules = this.ruleData.length;
        for (let i = 0; i < totalRules; i++) {
            const rule = this.ruleData[i];
            retData.push(
                <tr className="">
                    <td><input type="checkbox" />&nbsp;&nbsp;&nbsp;&nbsp;{rule.name}</td>
                    <td>{rule.condition}</td>
                    <td>
                        <div className="enabled-disabled-container">
                            <div className={`${rule.isEnabled ? 'enabled' : 'disabled'}`}></div>
                        </div>
                    </td>
                    <td>{rule.targetResource}</td>
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
            );
        }
        return retData;
    };

    render() {
        return (
            <div className="all-alerts-container">
                <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="MONITOR | ALERTS" />
                <div className="alert-page-container">
                    <div className="common-container">

                        <Link to={`${config.basePath}/createrule`} className="alert-white-button">
                            <i className="fa fa-plus"></i>&nbsp;&nbsp;
                            New Alert Rule
                        </Link>

                        <a className="alert-white-button">
                            <i className="fa fa-refresh"></i>&nbsp;&nbsp;
                            Refresh
                        </a>
                        <Link to={`${config.basePath}/monitoralerts`} className="alert-white-button float-right">
                            <i className="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;
                            Back
                        </Link>
                    </div>
                    <div className="filter-container form-row common-container">
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
                    <div className="alert-data-table-container common-container border-bottom-0 ">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="enabled-rule-text">24 Rules | 20 Enabled</div>
                            </div>
                            <div className="col-md-6 col-sm-12 text-right">
                                <div className="bulk-action">
                                    <select className="form-control">
                                        <option>Bulk Action</option>
                                        <option>Bulk Action</option>
                                        <option>Bulk Action</option>
                                        <option>Bulk Action</option>
                                        <option>Bulk Action</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group filter-control-group filter-alerts">
                            <form>
                                <input type="text" className="input-group-text" placeholder="Filter alerts" />
                                <button><i className="fa fa-search"></i></button>
                            </form>
                        </div>
                    </div>
                    <div className="alert-data-table-container common-container">
                        <div className="container-inner">
                            <table className="alert-data-table rules-data-table">
                                <tbody>
                                    <tr className="alert-data-table-header">
                                        <th><input type="checkbox" />&nbsp;&nbsp;&nbsp;&nbsp;Name</th>
                                        <th>Condition</th>
                                        <th>Status</th>
                                        <th>Target resource</th>
                                        <th>Action</th>
                                    </tr>
                                    {this.createRuleTable()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};