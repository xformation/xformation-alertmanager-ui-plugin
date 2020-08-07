import * as React from 'react';
import { Modal, ModalHeader, ModalBody, UncontrolledPopover, PopoverBody } from 'reactstrap';


export class TimeRangePopup extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            modal: false,
            TimeOption: [
                { from: 'now-5m', to: 'now', display: 'Last 5 minutes', section: 3 },
                { from: 'now-15m', to: 'now', display: 'Last 15 minutes', section: 3 },
                { from: 'now-30m', to: 'now', display: 'Last 30 minutes', section: 3 },
                { from: 'now-1h', to: 'now', display: 'Last 1 hour', section: 3 },
                { from: 'now-3h', to: 'now', display: 'Last 3 hours', section: 3 },
                { from: 'now-6h', to: 'now', display: 'Last 6 hours', section: 3 },
                { from: 'now-12h', to: 'now', display: 'Last 12 hours', section: 3 },
                { from: 'now-24h', to: 'now', display: 'Last 24 hours', section: 3 },
                { from: 'now-2d', to: 'now', display: 'Last 2 days', section: 3 },
                { from: 'now-7d', to: 'now', display: 'Last 7 days', section: 3 },
                { from: 'now-30d', to: 'now', display: 'Last 30 days', section: 3 },
                { from: 'now-90d', to: 'now', display: 'Last 90 days', section: 3 },
                { from: 'now-6M', to: 'now', display: 'Last 6 months', section: 3 },
                { from: 'now-1y', to: 'now', display: 'Last 1 year', section: 3 },
                { from: 'now-2y', to: 'now', display: 'Last 2 years', section: 3 },
                { from: 'now-5y', to: 'now', display: 'Last 5 years', section: 3 },
            ],
        }
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    displayTimeRange = () => {
        const retuData = [];
        for (let i = 0; i < this.state.TimeOption.length; i++) {
            let data = this.state.TimeOption[i];
            retuData.push(
                <option value={data.display}>{data.display}</option>
            );
        }
        return retuData;
    }

    render() {
        const state = this.state;
        return (
            <Modal isOpen={state.modal} toggle={this.toggle} className="" modalClassName="alert-modal-container">
                <ModalHeader toggle={this.toggle}></ModalHeader>
                <ModalBody style={{ height: 'calc(100vh - 210px)', overflowY: 'auto', overflowX: "hidden" }}>
                    <div className="absolute-time-range-box">
                        <div className="absolute-time-range-left">
                            <h3>Absolute time range</h3>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="From" className="d-block">From</label>
                                    <input type="text" className="input-group-text" placeholder="now-3h" value="" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="To" className="d-block">To</label>
                                    <input type="text" className="input-group-text" placeholder="now" value="" />
                                </div>
                                <div className="form-group">
                                    <button className="blue-button">Apply time range</button>
                                </div>
                            </form>
                            <div className="absolute-time-text">
                                It looks like you haven't used this timer picker before. As soon as you enter some time intervals, recently used intervals will appear here.
                                Read the documentation to find out more about how to enter custom time ranges.
                                         </div>
                        </div>
                        <div className="absolute-time-range-right">
                            <select className="form-control" id="timeRange">
                                {this.displayTimeRange()}
                            </select>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

        );
    }
}