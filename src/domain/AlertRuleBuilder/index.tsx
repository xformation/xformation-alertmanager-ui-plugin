import * as React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';
import { config } from '../../config';
import { Wizard } from './Wizard';
import { AlertDetails } from './AlertDetails';
import { AlertTypes } from './AlertTypes';
import { Conditions } from './Conditions';
import { AlertHandler } from './AlertHandler'
import { Message } from './Message';
export class AlertRuleBuilder extends React.Component<any, any> {
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
            component: <AlertTypes />
        },{
            name: "Conditions",
            component: <Conditions />
        },{
            name: "Alert Handlers",
            component: <AlertHandler/>
        },{
            name: "Message",
            component: <Message />
        }];
    }

    render() {
        const state = this.state;
        return (
            <div className="manage-alert-rule-container">
                <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="MANAGE ALERT RULE" />
                <div className="alert-page-container">
                    <div className="common-container">
                        <div className="row">
                            <div className="col-md-5 col-sm-12">
                                <div className="alert-heading">
                                    Alert Rule Builder
                                </div>
                            </div>
                            <div className="col-md-7 col-sm-12">
                                <div className="float-right common-right-btn">
                                    <button className="alert-white-button save-rule">
                                        Save Rule
                                    </button>
                                    <button className="alert-white-button">
                                        <i className="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="common-container wizard-container">
                        <Wizard steps={this.steps} />
                    </div>
                </div>
            </div>
        );
    }
};