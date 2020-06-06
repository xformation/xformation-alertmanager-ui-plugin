import * as React from 'react';

export class AlertHandler extends React.Component<any, any>{
    render() {
        return (
            <div className="alert_details">
                <div className="alert_details_name">
                    <label>Alert Handler</label>
                </div>
                <div className="alert_details_description">
                    <div className="time_series_box">
                        <div className="row">
                            <div className="col-lg-2 col-md-3 col-sm-6">
                                <label>Send this alert to:</label>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <select className="form-control" id="rousourceGroup">
                                    <option>post</option>
                                    <option>tcp</option>
                                    <option>exec</option>
                                    <option>log</option>
                                    <option>stack(default)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="alert_handler_box">
                        <div className="row">
                            <div className="col-lg-2 col-md-3 col-sm-6">
                                <div className="alert_left_box">
                                    <label>Post</label>
                                    <i className="fa fa-close alert_icon"></i>
                                    <label>tcp</label>
                                    <i className="fa fa-close alert_icon"></i>
                                    <label>exec</label>
                                    <i className="fa fa-close alert_icon"></i>
                                    <label>log</label>
                                    <i className="fa fa-close alert_icon"></i>
                                </div>
                            </div>

                            <div className="col-lg-9 col-md-9 col-sm-6 alert_description">
                                <span className="alert_handler_span">Parameters for this Alert Handler</span>
                                <label className="alert_handler_label">HTTP endpoint for POST request</label>
                                <input type="text" className="form-control" />
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12 alert_handler_datainput">
                                        <label>Header Key</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12 alert_handler_datainput">
                                        <label>Heade Value</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}