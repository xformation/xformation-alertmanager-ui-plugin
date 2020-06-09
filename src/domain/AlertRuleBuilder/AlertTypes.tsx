import * as React from 'react';

export class AlertTypes extends React.Component<any,any>{
    render(){
        return (
        <div className="alert_details">
            <div className="alert_details_name">
                <label>Alert Type</label>
                <div className="choose_one_box">
                    <span>Choose One:</span>
                    <ul>
                        <li><a href="#">Threshold</a></li>
                        <li><a href="#">Relative</a></li>
                        <li><a href="#">Availability</a></li>
                    </ul>
                </div>
            </div>
            <div className="alert_details_description">
                <label>Time Series</label>
                <div className="time_series_box">
                    <div className="time_series_header">
                        <div className="heading retention_policy">DB.RetentionPolicy</div>
                        <div className="heading measurements">Measurements & Tags</div>
                        <div className="heading fields">Fields</div>
                    </div>
                    <div className="time_series_body">
                        <div className="database">
                            <ul>
                                <li>Database_1</li>
                                <li>Database_2</li>
                                <li>Database_3</li>
                            </ul>
                        </div>
                        <div className="database_selected">No Database selected</div>
                        <div className="measurement_selected">No Measurement selected</div>
                    </div>
                </div>
            </div>
            <div className="alert_details_next">
                <button className="btn next-btn">Next</button>
            </div>
        </div>
        );
    }
}