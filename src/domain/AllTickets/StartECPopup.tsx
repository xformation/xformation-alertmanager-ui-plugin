import * as React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

export class StartECPopup extends React.Component<any, any> {
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
                <ModalHeader toggle={this.toggle}>Start EC2</ModalHeader>
                <ModalBody style={{ height: 'calc(100vh - 210px)', overflowY: 'auto', overflowX: "hidden" }}>
                    <div className="select-resource-container">
                        <div className="italic-label gray-label m-b-1">
                            This Job executes start EC2 action whenever a CloudWatch Events alert with "Instance Stopped" message is received
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="enablejob" />
                            <label className="form-check-label" htmlFor="enablejob">Enable Job</label>
                        </div>
                        <div className="bold-label gray-label">If following conditions are met</div>
                        <select className="form-control col-sm-6 m-t-1">
                            <option>Default select</option>
                        </select>
                        <div className="form-row m-t-1">
                            <div className="form-group filter-control-group col-sm-3">
                                <select className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                            <div className="form-group filter-control-group col-sm-3">
                                <select className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                            <div className="form-group filter-control-group col-sm-3">
                                <select className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                            <div className="col-sm-3 pointer-label">
                                <i className="fa fa-times"></i>
                            </div>
                        </div>
                        <div className="form-row m-t-1">
                            <div className="form-group filter-control-group col-sm-3">
                                <select className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                            <div className="form-group filter-control-group col-sm-3">
                                <select className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                            <div className="form-group filter-control-group col-sm-3">
                                <select className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                            <div className="col-sm-3 pointer-label">
                                <i className="fa fa-times"></i>
                            </div>
                        </div>
                        <div className="m-t-1 m-b-2">
                            <button className="btn btn-secondary">Add new condition</button>
                        </div>
                        <div className="bold-label gray-label">Then</div>
                        <div className="gray-label m-b-2">
                            Execute an action 
                            <select className="form-control" style={{width: "200px", display: "inline-block", margin: "0px 10px"}}>
                                <option>Start EC2 Instance</option>
                            </select>
                            Automatically
                            <select className="form-control" style={{width: "200px", display: "inline-block", margin: "0px 10px"}}>
                                <option value="">20 min</option>
                            </select>
                            after alert is created.
                        </div>
                        <div>
                            <button className="btn btn-secondary m-r-2">Create &amp; Enable</button>
                            <button className="btn btn-warning">Cancel</button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
};