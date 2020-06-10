import * as React from 'react';

export class Conditions extends React.Component<any,any>{
    render(){
        return (
        <div className="alert-details">
            <div className="alert-details-name">
                <label>Condition</label>
                <div className="condition-box">
                    <div className="condition-header">
                        <div className="send-alert-text">Send Alert where <span className="time-series-text">Select a Time-Series</span> is</div>
                        <div className="greater-select">
                            <select>
                                <option>Greater than</option>
                                <option>Greater than</option>
                                <option>Greater than</option>
                            </select>
                        </div>
                        <div className="greater-search">
                            <input type="text" />
                        </div>
                    </div>
                    <div className="time-series-preview-box">
                        Select a Time-Series to preview on a graph
                    </div>
                </div>
                
            </div>
            <div className="alert-details-next">
                <button className="btn next-btn">Next</button>
            </div>
        </div>
        );
    }
}