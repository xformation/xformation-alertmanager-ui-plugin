import * as React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';
import { config } from '../../config';
import { Wizard } from './Wizard';
import { AlertDetails } from './AlertDetails';
export class ManageAlertRule extends React.Component<any, any> {
    breadCrumbs: any;
    steps: any;
    constructor(props: any) {
        super(props);
        this.state = {
            modal: false,
        };
        this.breadCrumbs = [
            {
                label: "Home",
                route: `${config.basePath}/home`
            },
            {
                label: "Alert Rule Builder",
                isCurrentPage: true
            }
        ];

        this.steps = [{
            name: "Alert Details",
            component: <AlertDetails />
        },{
            name: "Alert Type",
            component: <div>This is alert type</div>
        },{
            name: "Conditions",
            component: <div>This is conditions</div>
        },{
            name: "Alert Handlers",
            component: <div>This is alert handlers</div>
        },{
            name: "Message",
            component: <div>This is message</div>
        }];
    }

    render() {
        const state = this.state;
        return (
            <div className="manage-alert-rule-container">
                <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="MANAGE ALERT RULE" />
                <div className="alert-page-container">
                    <div className="common-container">
                        Alert Rule Builder
                        <button className="alert-white-button">
                            <i className="fa fa-refresh"></i>&nbsp;&nbsp;
                            Save
                        </button>
                        <a className="alert-white-button float-right">
                            <i className="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;
                            Back
                        </a>
                    </div>
                    <div className="wizard-container">
                        <Wizard steps={this.steps} />
                    </div>
                </div>
            </div>
        );
    }
};