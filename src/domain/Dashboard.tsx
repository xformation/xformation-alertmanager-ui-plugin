import * as React from 'react';
import monitorImg from '../img/dashboard/example.png';
import '../css/dashboard.css';

export class Dashboard extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="container dashboard-container">
                <div className="dashboard-header">
                    Monitor your applications and infrastructure
                </div>
                <div className="dashboard-description">
                    Get full stack visibility, find and fix problems, optimize your performance, and understand customer behavior all in one place.
                    <a href="#">Learn more</a>
                </div>
                <div className="row">
                    <div className="col-md-4 dashboard-item-container">
                        <img src={monitorImg} className="item-image"/>
                        <div className="item-header">Monitor &amp; Visualize Metrics</div>
                        <div className="item-description">
                            Metrics are numerical values available from Azure Resources helping you understand the health, operation &amp; performance of your system.
                        </div>
                    </div>
                    <div className="col-md-4 dashboard-item-container">
                        <img src={monitorImg} className="item-image"/>
                        <div className="item-header">Monitor &amp; Visualize Metrics</div>
                        <div className="item-description">
                            Metrics are numerical values available from Azure Resources helping you understand the health, operation &amp; performance of your system.
                        </div>
                    </div>
                    <div className="col-md-4 dashboard-item-container">
                        <img src={monitorImg} className="item-image"/>
                        <div className="item-header">Monitor &amp; Visualize Metrics</div>
                        <div className="item-description">
                            Metrics are numerical values available from Azure Resources helping you understand the health, operation &amp; performance of your system.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};