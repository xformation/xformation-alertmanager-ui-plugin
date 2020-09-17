import * as React from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Breadcrumbs } from '../Breadcrumbs';
import { config } from '../../config';
import Table from './../../components/table';

export class Rules extends React.Component<any, any> {
    ruleData: any;
    breadCrumbs: any;
    tableValue: any;
    perPageLimit: any;
    checkboxValue: any;
    constructor(props: any) {
        super(props);
        this.tableValue = {
            columns: [
                {
                    label: 'Name',
                    key: 'name'
                },
                {
                    label: 'Condition',
                    key: 'condition'
                },
                {
                    label: 'Status',
                    key: 'status',
                    renderCallback: (value: any) => {
                        let strClass = "isEnabled";
                        return <td>
                            <div className="enabled-disabled-container">
                                <div className={`${strClass ? 'enabled' : 'disabled'}`}></div>
                            </div>
                        </td>
                    }
                },
                {
                    label: 'Target resource',
                    key: 'targetResource'
                },
                {
                    label: 'Action',
                    key: 'action',
                    renderCallback: () => {
                        return <td>
                            <div className="d-inline-block">
                                <button className="btn btn-link">
                                    <i className="fa fa-edit"></i>
                                </button>
                                <button className="btn btn-link">
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    }
                },
            ],
            data: [
                {
                    name: 'Percentage CPU',
                    condition: 'Percentage CPU greater or equal to 0',
                    isEnabled: false,
                    targetResource: 'kub-master-146783',
                    checkStatus: false
                },
                {
                    name: 'Disk Write Bytes',
                    condition: 'Disk Write Bytes alert is greater than 10GB',
                    isEnabled: true,
                    targetResource: 'Metrics',
                    checkStatus: false
                },
                {
                    name: 'Network Out',
                    condition: 'Network Out GreaterThan 3333',
                    isEnabled: true,
                    targetResource: 'Ser08-Test-11',
                    checkStatus: false
                },
                {
                    name: 'Network In',
                    condition: 'Network In GreatThan 3333',
                    isEnabled: false,
                    targetResource: 'Ser08-Test-11',
                    checkStatus: false
                }
            ],
        };
        this.perPageLimit = 2,
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
                        <div className="row">
                            <div className="col-md-9 col-sm-12">
                                <Link to={`${config.basePath}/managealertrule`} className="alert-white-button">
                                    <i className="fa fa-plus"></i>&nbsp;&nbsp;
                                    New Alert Rule
                                </Link>
                                <a className="alert-white-button">
                                    <i className="fa fa-refresh"></i>&nbsp;&nbsp;
                                    Refresh
                                </a>
                            </div>
                            <div className="col-md-3 col-sm-12">
                                <Link to={`${config.basePath}/managealertrule`} className="alert-white-button float-right">
                                    <i className="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;
                                    Back
                                </Link>
                            </div>
                        </div>
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
                    <div className="alert-data-table-container rulesalert-data-table-container common-container border-bottom-0">
                        <Table valueFromData={this.tableValue} perPageLimit={this.perPageLimit} visiblecheckboxStatus={this.checkboxValue} tableClasses={{ table: "alert-data-tabel", tableParent: "alerts-data-tabel", parentClass: "all-alert-data-table" }} searchKey="name" />
                    </div>
                </div>
            </div>
        );
    }
};