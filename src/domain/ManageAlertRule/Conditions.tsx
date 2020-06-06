import * as React from 'react';

export class Conditions extends React.Component<any,any>{
    render(){
        return (
        <div className="alert_details">
            <div className="alert_details_name">
                <label>Condition</label>
                <div className="condition_box">
                    <div className="condition_header">
                        <div className="send_alert_text">Send Alert where <span className="time_series_text">Select a Time-Series</span> is</div>
                        <div className="greater_select">
                            <select>
                                <option>Greater than</option>
                                <option>Greater than</option>
                                <option>Greater than</option>
                            </select>
                        </div>
                        <div className="greater_search">
                            <input type="text" />
                        </div>
                    </div>
                    <div className="time_series_preview_box">
                        Select a Time-Series to preview on a graph
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