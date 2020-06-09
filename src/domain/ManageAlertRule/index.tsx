import * as React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';
import { config } from '../../config';


export class ManageAlertRule extends React.Component<any, any> {
    breadCrumbs: any;
    constructor(props: any) {
        super(props);
        this.state = {
        };
        this.breadCrumbs = [
            {
                label: "Home",
                route: `${config.basePath}/home`
            },
            {
                label: "Monitor | Alerts",
                isCurrentPage: true
            }
        ];
    }

    render() {
        return (
            <div className="monitor-alerts-container">
                <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="MONITOR | ALERTS" />
            </div>
        );
    }
};