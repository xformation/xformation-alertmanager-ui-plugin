import * as React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';
import { config } from '../../config';


export class ScriptEditor extends React.Component<any, any> {
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
                <div className="alert-page-container">
                    <div className="common-container script-editor">
                        <div className="row">
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <div className="alert-heading">
                                    Script Editor
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-12 col-sm-12">
                                <div className="float-right script-editor-btn">
                                    <button className="alert-white-button">Editor</button>
                                    <button className="alert-white-button">Editor+ Logs</button>
                                    <button className="alert-white-button">Save New Script</button>
                                    <button className="alert-white-button">Exit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="common-container border-bottom-0 p-t-20 script-editor">
                        <div className="script-search">
                            <input type="text" className="input-group-text" placeholder="ID your Script" />
                        </div>
                        <div className="script-search-btn">
                            <button className="alert-white-button">Stream</button>
                            <button className="alert-white-button">Batch</button>
                        </div>
                        <div className="script-select">
                            <select>
                                <option>greater than</option>
                                <option>greater than</option>
                                <option>greater than</option>
                            </select>
                        </div>
                    </div>
                    <div className="common-container border-bottom-0 p-t-20 script-editor">
                        <div className="script-editor-code">
                            <pre>
                                <code>
                                    <span className="span1">var</span> <span className="span2">db</span> <span className="span3">=</span> <span className="span4">'_internal'</span> <br /><br />
                                    <span className="span1">var</span> <span className="span2">rp</span> <span className="span3">=</span> <span className="span4">'monitor'</span> <br /><br />
                                    <span className="span1">var</span> <span className="span2">measurement</span> <span className="span3">=</span> <span className="span4">'runtime'</span> <br /><br />
                                    <span className="span1">var</span> <span className="span2">groupBy</span> <span className="span3">=</span> <span className="span4">[]</span> <br /><br />
                                    <span className="span1">var</span> <span className="span2">whereFilter</span> <span className="span3">=</span> <span className="span4">lambda: ("hostname" == 'ip-172-16-1-210')</span> <br /><br />
                                    <span className="span1">var</span> <span className="span2">name</span> <span className="span3">=</span> <span className="span4">'Alert rule - Host Frees'</span> <br /><br />
                                    <span className="span1">var</span> <span className="span2">idVar</span> <span className="span3">=</span> <span className="span4">name</span> <br /><br />
                                    <span className="span1">var</span> <span className="span2">message</span> <span className="span3">=</span> <span className="span4">' &#0123;&#0123;.ID&#0125;&#0125; &#0123;&#0123;.Name&#0125;&#0125; &#0123;&#0123;.TaskName&#0125;&#0125; &#0123;&#0123;.Group&#0125;&#0125; &#0123;&#0123;.Tags&#0125;&#0125; &#0123;&#0123; index .Tags "value" &#0125;&#0125; &#0123;&#0123;.Level&#0125;&#0125; &#0123;&#0123;.Fields&#0125;&#0125; &#0123;&#0123; index .Fields "value" &#0125;&#0125; &#0123;&#0123;.Time&#0125;&#0125;'</span> <br /><br />
                                    <span className="span1">var</span> <span className="span2">idTag</span> <span className="span3">=</span> <span className="span4">'alertID'</span> <br /><br />
                                    <span className="span1">var</span> <span className="span2">levelTag</span> <span className="span3">=</span> <span className="span4">'level'</span> <br /><br />
                                    <span className="span1">var</span> <span className="span2">messageField</span> <span className="span3">=</span> <span className="span4">'message'</span> <br /><br />
                                    <span className="span1">var</span> <span className="span2">durationField</span> <span className="span3">=</span> <span className="span4">'duration var outputDB = 'chronograf'</span>
                                </code>
                            </pre>
                        </div>
                        <div className="validate-bottom-text"> > You have unsaved changes, save to validate TICKscript</div>
                    </div>
                    
                </div>
            </div>
        );
    }
};