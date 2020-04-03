import * as React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

export class SelectResourcePopup extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            modal: 0
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    render() {
        const state = this.state;
        return (
            <Modal isOpen={state.modal} toggle={this.toggle} className="" modalClassName="alert-modal-container">
                <ModalHeader toggle={this.toggle}>Select Resource</ModalHeader>
                <ModalBody style={{ height: 'calc(100vh - 210px)', overflowY: 'auto', overflowX: "hidden" }}>
                    <div className="select-resource-container">
                        <div className="italic-label gray-label">Select the target(s) that you wish to monitor</div>
                        <div className="form-row m-t-1">
                            <div className="form-group filter-control-group col-md-6 col-sm-12">
                                <label htmlFor="resourcetype" className="bold-label gray-label">
                                    Filter by resource type
                                </label>
                                <select className="form-control" id="resourcetype">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                            <div className="form-group filter-control-group col-md-6 col-sm-12">
                                <label htmlFor="location" className="bold-label gray-label">
                                    Filter by location
                                </label>
                                <select className="form-control" id="location">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                            <div className="form-group filter-control-group col-md-12 col-sm-12">
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fa fa-search"></i></div>
                                    </div>
                                    <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="filter alerts" />
                                </div>
                            </div>
                        </div>
                        <div className="row data-block m-t-2 m-b-3">
                            <div className="col-sm-12">
                                <div className="border-bottom bold-label main-header gray-label">
                                    Action Group
                                </div>
                                <table className="alert-data-table m-t-1">
                                    <tbody>
                                        <tr>
                                            <th><input type="checkbox"/></th>
                                            <th className="colored-label">Demo resource group</th>
                                        </tr>
                                        <tr className="gray-label">
                                            <td><input type="checkbox" /></td>
                                            <td className="colored-label bold-label">Prod_DB_SYN14</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="m-t-3 m-b-2">
                            <div className="italic-label gray-label">Selection Preview</div>
                            <div className="bold-label colored-label">Prod_DB_SYN14</div>
                        </div>
                        <div>
                            <button className="btn btn-secondary">Done</button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
};