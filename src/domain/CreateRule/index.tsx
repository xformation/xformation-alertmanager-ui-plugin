import * as React from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Breadcrumbs } from '../Breadcrumbs';
import { config } from '../../config';

export class CreateRule extends React.Component<any, any> {
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
                label: "Create Rule",
                isCurrentPage: true
            }
        ];
    }

    render() {
        return (
            <div className="create-rule-container">
                <Breadcrumbs breadcrumbs={this.breadCrumbs} />
                <div className="page-header-container">
                    <span className="page-header">Create Rule</span>
                </div>
                <div className="row data-block m-t-2">
                    <div className="col-sm-12">
                        <div className="border-bottom bold-label main-header gray-label">
                            Select Resource
                        </div>
                        <div className="gray-label italic-label m-t-1">
                            Select the target(s) that you wish to monitor
                        </div>
                        <div className="m-t-1">
                            <button className="btn btn-secondary">Select Resource</button>
                        </div>
                    </div>
                </div>
                <div className="row data-block m-t-2">
                    <div className="col-sm-12">
                        <div className="border-bottom bold-label main-header gray-label">
                            Condition
                        </div>
                        <div className="gray-label italic-label m-t-1">
                            No condition is defined. Click 'Add' to add a signal and define its logic
                        </div>
                        <div className="m-t-1">
                            <button className="btn btn-secondary">Add Condition</button>
                        </div>
                    </div>
                </div>
                <div className="row data-block m-t-2">
                    <div className="col-sm-12">
                        <div className="border-bottom bold-label main-header gray-label">
                            Action Group
                        </div>
                        <table className="alert-data-table m-t-1">
                            <tbody>
                                <tr>
                                    <th>Action group name</th>
                                    <th>Contain action</th>
                                </tr>
                                <tr className="gray-label">
                                    <td colSpan={2}>No action group selected</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="m-t-1">
                            <button className="btn btn-secondary m-r-2">Add Action</button>
                            <button className="btn btn-secondary">Create Action</button>
                        </div>
                    </div>
                </div>
                <div className="row data-block m-t-2 m-b-3">
                    <div className="col-sm-12">
                        <div className="border-bottom bold-label main-header gray-label">
                            Alert Details
                        </div>
                        <div className="form-group filter-control-group col-md-6 col-sm-12 m-t-1">
                            <label htmlFor="ruleName" className="bold-label gray-label">
                                Alert Rule Name
                            </label>
                            <input type="text" className="form-control" id="ruleName" />
                        </div>
                        <div className="form-group filter-control-group col-md-6 col-sm-12">
                            <label htmlFor="description" className="bold-label gray-label">
                                Description
                            </label>
                            <textarea className="form-control" id="description"></textarea>
                        </div>
                        <div className="m-t-1">
                            <button className="btn btn-secondary m-r-2">Save &amp; enable</button>
                            <button className="btn btn-secondary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};