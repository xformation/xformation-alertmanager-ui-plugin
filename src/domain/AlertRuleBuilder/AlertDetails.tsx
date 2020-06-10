import * as React from 'react';

export class AlertDetails extends React.Component<any,any>{
    render(){
        return (
        <div className="alert-details">
            <div className="alert-details-name">
                <label>Name this Alert Rule</label>
                <select>
                    <option>Untitled Rule</option>
                    <option>Untitled Rule</option>
                    <option>Untitled Rule</option>
                    <option>Untitled Rule</option>
                    <option>Untitled Rule</option>
                </select>
            </div>
            <div className="alert-details-description">
                <label>Description</label>
                <textarea placeholder="Specify alert rule description"></textarea>
            </div>
            <div className="alert-details-next">
                <button className="btn next-btn">Next</button>
            </div>
        </div>
        );
    }
}