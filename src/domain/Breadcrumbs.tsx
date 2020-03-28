import * as React from 'react';
import { Link } from 'react-router-dom';
import '../css/breadcrumbs.css';

export class Breadcrumbs extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { breadcrumbs } = this.props;
        return (
            <div className="breadcrumbs-container">
                {
                    breadcrumbs.map((breadcrumb: any, index: any) => {
                        if (breadcrumb.isCurrentPage) {
                            return <span className="current-page">{breadcrumb.label}</span>
                        } else {
                            return (
                            <React.Fragment>
                                <Link to={`${breadcrumb.route}`} className="breadcrumbs-link">{breadcrumb.label}</Link>
                                <span className="separator">&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-chevron-right"></i>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </React.Fragment>);
                        }
                    })
                }
            </div>
        );
    }
};