import * as React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

export class SelectResourcePopup extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            modal: false
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
                        <div className="italic-label p-t-1 primary-color-label">
                            No condition defined, click on 'Add' to select a signal and define its logic
                        </div>
                        <div className="form-row m-t-1">
                            <div className="form-group filter-control-group col-md-6 col-sm-12">
                                <label htmlFor="resourcetype" className="primary-color-label">
                                    Filter by resource type
                                </label>
                                <select className="form-control primary-select-box" id="resourcetype">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                            <div className="form-group filter-control-group col-md-6 col-sm-12">
                                <label htmlFor="location" className="primary-color-label">
                                    Filter by location
                                </label>
                                <select className="form-control primary-select-box" id="location">
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
                                <div className="primary-color-label main-header">
                                    Resources
                                </div>
                                <table className="resource-table">
                                    <tbody>
                                        <tr>
                                            <td><input type="checkbox"/></td>
                                            <td className="primary-color-label">
                                                <select className="form-control primary-select-box" id="location">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr className="gray-label">
                                            <td><input type="checkbox" /></td>
                                            <td className="primary-color-label">Prod_DB_SYN14</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="m-t-3 m-b-2 border-bottom-dashed p-b-2">
                            <div className="italic-label primary-color-label">Selection Preview</div>
                            <div className="primary-color-label">Prod_DB_SYN14</div>
                        </div>
                        <div>
                            <button className="alert-blue-button">Done</button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
};