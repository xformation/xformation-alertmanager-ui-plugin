import * as React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Line } from 'react-chartjs-2';

export class AddConditionPopup extends React.Component<any, any> {
    options = {
        responsive: true,
        title: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    stepSize: 20,
                    suggestedMin: 0,
                    callback: function (value: any, index: any, values: any) {
                        return value + "%";
                    }
                }
            }]
        }
    };
    dummyData = {
        label: "",
        backgroundColor: "#21AFC3",
        borderColor: "#21AFC3",
        fill: false,
        data: [80, 81, 84, 82, 79, 76, 78, 80]
    };
    labels = ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"];

    constructor(props: any) {
        super(props);
        this.state = {
            modal: 0,
            isDefineLogic: false
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            isDefineLogic: false
        });
    };

    toggleDefineLogic = (bShow: any) => {
        this.setState({
            isDefineLogic: bShow
        });
    };

    render() {
        const state = this.state;
        return (
            <Modal isOpen={state.modal} toggle={this.toggle} className="" modalClassName="alert-modal-container">
                <ModalHeader toggle={this.toggle}>Configure signal logic</ModalHeader>
                <ModalBody style={{ height: 'calc(100vh - 210px)', overflowY: 'auto', overflowX: "hidden" }}>
                    {!state.isDefineLogic &&
                        <React.Fragment>
                            <div className="select-resource-container">
                                <div className="italic-label gray-label">
                                    Choose a signal below and configure the logic on the next screen to define the alert condition
                                </div>
                                <div className="form-row m-t-1">
                                    <div className="form-group filter-control-group col-md-6 col-sm-12">
                                        <label htmlFor="signalType" className="bold-label gray-label">
                                            Signal Type
                                </label>
                                        <select className="form-control" id="signalType">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                    <div className="form-group filter-control-group col-md-6 col-sm-12">
                                        <label htmlFor="services" className="bold-label gray-label">
                                            Monitor Services
                                </label>
                                        <select className="form-control" id="services">
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
                                            Displaying 1-5 signals out of 10
                                </div>
                                        <table className="alert-data-table m-t-1">
                                            <tbody>
                                                <tr>
                                                    <th>Signal name</th>
                                                    <th>Signal type</th>
                                                    <th>Monitor services</th>
                                                </tr>
                                                <tr className="">
                                                    <td className="colored-label">
                                                        <div className="pointer-label" onClick={e => this.toggleDefineLogic(true)}>Percentage CPU</div>
                                                    </td>
                                                    <td className="gray-label">Metric</td>
                                                    <td className="gray-label">Platform</td>
                                                </tr>
                                                <tr className="">
                                                    <td className="colored-label">Disk Write Bytes</td>
                                                    <td className="gray-label">Metric</td>
                                                    <td className="gray-label">Platform</td>
                                                </tr>
                                                <tr className="">
                                                    <td className="colored-label">Disk Read Bytes</td>
                                                    <td className="gray-label">Metric</td>
                                                    <td className="gray-label">Platform</td>
                                                </tr>
                                                <tr className="">
                                                    <td className="colored-label">Network In</td>
                                                    <td className="gray-label">Metric</td>
                                                    <td className="gray-label">Platform</td>
                                                </tr>
                                                <tr className="">
                                                    <td className="colored-label">Network Out</td>
                                                    <td className="gray-label">Metric</td>
                                                    <td className="gray-label">Platform</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="m-t-2">
                                    <button className="btn btn-secondary">Done</button>
                                </div>
                            </div>
                        </React.Fragment>
                    }
                    {
                        state.isDefineLogic &&
                        <React.Fragment>
                            <div className="italic-label gray-label">
                                Define the logic for triggering an alert. Use the chart to view trends in the data.
                            </div>
                            <Line data={{ labels: this.labels, datasets: [this.dummyData] }} options={this.options} height={320} />
                            <div className="row m-t-3">
                                <div className="col-sm-12">
                                    <div style={{ display: "table-row" }}>
                                        <div style={{ display: "table-cell" }}>
                                            <div className="gray-label bold-label" >Percentage CPU</div>
                                            <div className="colored-label bold-label" >Prod_DB_SYN14</div>
                                        </div>
                                        <div className="gray-label bold-label" style={{ display: "table-cell", fontSize: "30px", verticalAlign: "middle", paddingLeft: "15px" }}>82%</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bold-label gray-label m-t-1" style={{ fontSize: "20px" }}>Alert Logic</div>
                            <div className="bold-label gray-label">Threshold</div>
                            <div className="form-row">
                                <div className="form-group filter-control-group col-md-4 col-sm-12">
                                    <label htmlFor="operator" className="bold-label gray-label">
                                        Operator
                                    </label>
                                    <select className="form-control" id="operator">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                                <div className="form-group filter-control-group col-md-4 col-sm-12">
                                    <label htmlFor="aggregation" className="bold-label gray-label">
                                        Aggregation Type
                                    </label>
                                    <select className="form-control" id="aggregation">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                                <div className="form-group filter-control-group col-md-4 col-sm-12">
                                    <label htmlFor="threshold" className="bold-label gray-label">
                                        Threshold value
                                    </label>
                                    <select className="form-control" id="threshold">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                            </div>
                            <div className="m-t-1 m-b-1">
                                <div className="bold-label gray-label">Condition preview</div>
                                <div className="italic-label gray-label">
                                    Whenever the CPU percentage is greater than 5%
                                </div>
                            </div>
                            <div className="bold-label gray-label">
                                Evaluated base on
                            </div>
                            <div className="form-row">
                                <div className="form-group filter-control-group col-md-4 col-sm-12">
                                    <label htmlFor="granularity" className="bold-label gray-label">
                                        Aggregation granularity
                                    </label>
                                    <select className="form-control" id="granularity">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                                <div className="form-group filter-control-group col-md-4 col-sm-12">
                                    <label htmlFor="evaluation" className="bold-label gray-label">
                                        Frequency of evaluation
                                    </label>
                                    <select className="form-control" id="evaluation">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                            </div>
                            <div className="m-t-2">
                                <button className="btn btn-secondary m-r-1">Done</button>
                                <button className="btn btn-secondary m-r-1" onClick={e => this.toggleDefineLogic(false)}>Back</button>
                            </div>
                        </React.Fragment>
                    }
                </ModalBody>
            </Modal>
        );
    }
};