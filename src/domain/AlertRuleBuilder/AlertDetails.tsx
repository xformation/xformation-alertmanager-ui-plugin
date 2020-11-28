import * as React from 'react';

export class AlertDetails extends React.Component<any,any>{
    render(){
        return (
        <div className="alert-details">
            <div className="alert-details-name">
                <label>Name this Alert Rule</label>
                <input type="text" placeholder="Untitled Rule" className="input-group-text" />
            </div>
            <div className="alert-details-description">
                <label>Description</label>
                <textarea placeholder="Specify alert rule description"></textarea>
            </div>
        </div>
        );
    }
}