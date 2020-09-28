import * as React from 'react';

export class TimeRange extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentTime: 'Last 6 hours',
            fromTime: 'now-6h',
            toTime: 'now',
            filterCheckbox: false,
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
            otherOptions: [
                { from: 'now-1d/d', to: 'now-1d/d', display: 'Yesterday', section: 3 },
                { from: 'now-2d/d', to: 'now-2d/d', display: 'Day before yesterday', section: 3 },
                { from: 'now-7d/d', to: 'now-7d/d', display: 'This day last week', section: 3 },
                { from: 'now-1w/w', to: 'now-1w/w', display: 'Previous week', section: 3 },
                { from: 'now-1M/M', to: 'now-1M/M', display: 'Previous month', section: 3 },
                { from: 'now-1y/y', to: 'now-1y/y', display: 'Previous year', section: 3 },
                { from: 'now/d', to: 'now/d', display: 'Today', section: 3 },
                { from: 'now/d', to: 'now', display: 'Today so far', section: 3 },
                { from: 'now/w', to: 'now/w', display: 'This week', section: 3 },
                { from: 'now/w', to: 'now', display: 'This week so far', section: 3 },
                { from: 'now/M', to: 'now/M', display: 'This month', section: 3 },
                { from: 'now/M', to: 'now', display: 'This month so far', section: 3 },
                { from: 'now/y', to: 'now/y', display: 'This year', section: 3 },
                { from: 'now/y', to: 'now', display: 'This year so far', section: 3 },
            ],
        }
    };

    onClickopenTimeRangePopup = (e: any) => {
        let status = !this.state.openTimeRange;
        this.setState({
            openTimeRange: status,
        })
    };

    setTimeValue = (e: any) => {
        this.setState(
            {
                filterCheckbox: true
            }
        );
        for (let i = 0; i < this.state.TimeOption.length; i++) {
            const timeData = this.state.TimeOption[i];
            if (timeData.display == e.target.value) {
                this.setState({
                    currentTime: timeData.display,
                    fromTime: timeData.from,
                    toTime: timeData.to,
                })
            }
        }
    }

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

    displayOtherTimeRange = () => {
        const retData = [];
        for (let i = 0; i < this.state.otherOptions.length; i++) {
            let data = this.state.otherOptions[i];
            retData.push(
                <option value={data.display}>{data.display}</option>
            );
        }
        return retData;
    }

    render() {
        const { openTimeRange, toTime, fromTime, currentTime } = this.state;
        return (
            <div>
                <div className="form-group filter-control-group">
                    <label htmlFor="timeRange">
                        Time Range&nbsp;&nbsp;&nbsp;
                                <i className="fa fa-info-circle"></i>
                    </label>
                    <input className="form-control time-range" readOnly value={currentTime} onClick={this.onClickopenTimeRangePopup} id="timeRange" />
                    <i className="fa fa-angle-down time-range-icon"></i>
                </div>
                {openTimeRange && <div className="absolute-time-range-box">
                    <div className="absolute-time-range-left">
                        <h3>Absolute time range</h3>
                        <form>
                            <div className="form-group">
                                <label htmlFor="From" className="d-block">From</label>
                                <input type="text" className="input-group-text" value={fromTime} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="To" className="d-block">To</label>
                                <input type="text" className="input-group-text" placeholder="now" value={toTime} />
                            </div>
                            <div className="form-group">
                                <button className="alert-blue-button">Apply time range</button>
                            </div>
                        </form>
                        <div className="absolute-time-text">
                            It looks like you haven't used this timer picker before. As soon as you enter some time intervals, recently used intervals will appear here.
                            Read the documentation to find out more about how to enter custom time ranges.
                                         </div>
                    </div>
                    <div className="absolute-time-range-right">
                        <select className="form-control" value={currentTime} onChange={this.setTimeValue} id="timeRange">
                            {this.displayTimeRange()}
                        </select>
                        {/* <select className="form-control" value={currentTime} onChange={this.setTimeValue} id="otherRange">
                                        {this.displayOtherTimeRange()}
                                    </select> */}
                    </div>
                </div>}

            </div>
        );
    }
}

export default TimeRange;