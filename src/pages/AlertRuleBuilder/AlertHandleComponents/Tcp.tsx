import * as React from 'react';

export class Tcp extends React.Component<any, any>{
    render() {
        return (
            <React.Fragment>
                    <span className="alert-handler-span">Parameters for this Alert Handler</span>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 alert-handler-datainput">
                            <label className="alert-handler-label">Address</label>
                            <input type="text" className="form-control" placeholder="ex:exampleendpoint.com:5678" />
                        </div>
                    </div>
            </React.Fragment>
        );
    }
}