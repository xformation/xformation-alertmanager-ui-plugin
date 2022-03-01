import * as React from 'react';

export class Hipchat extends React.Component<any, any>{
    render() {
        return (
            <React.Fragment>
                <span className="alert-handler-alerta-span">This Handler is not enabled</span>
                <div className="exit-rule-config">
                    <a href="#" className="exit-rule-config-box"><span>Exit Rule and Configure this Alert Handler</span></a>
                </div>
            </React.Fragment>
        );
    }
}