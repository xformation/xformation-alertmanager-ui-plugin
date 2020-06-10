import * as React from 'react';

export class Message extends React.Component<any,any>{
    render(){
        return (
        <div className="alert-details">
            <div className="alert-details-name">
                <label>Condition</label>
                <div className="condition-box">
                    <div className="condition-header">
                        <div className="send-alert-text">Message</div>
                    </div>
                    <div className="condition-message-box">
                        <div className="condition-message-examplex">
                            <pre>
                                <code>
                                    Example: &#0123;&#0123;.ID&#0125;&#0125; is &#0123;&#0123;.Level&#0125;&#0125; value: &#0123;&#0123;index.Fields "value"&#0125;&#0125;
                                </code>
                            </pre>
                        </div>
                        <div className="templates-text">
                            <ul>
                                <li>
                                <span>Templates:</span>
                                </li>
                                <li>
                                    <pre>
                                        <code>&#0123;&#0123;.ID&#0125;&#0125;</code>
                                    </pre>
                                </li>
                                <li>
                                    <pre>
                                        <code>&#0123;&#0123;.Name&#0125;&#0125;</code>
                                    </pre>
                                </li>
                                <li>
                                    <pre>
                                        <code>&#0123;&#0123;.TaskName&#0125;&#0125;</code>
                                    </pre>
                                </li>
                                <li>
                                    <pre>
                                        <code>&#0123;&#0123;.Group&#0125;&#0125;</code>
                                    </pre>
                                </li>
                                <li>
                                    <pre>
                                        <code>&#0123;&#0123;.Tags&#0125;&#0125;</code>
                                    </pre>
                                </li>
                                <li>
                                    <pre>
                                        <code>&#0123;&#0123;.index.Tags "value"&#0125;&#0125;</code>
                                    </pre>
                                </li>
                                <li>
                                    <pre>
                                        <code>&#0123;&#0123;.Level&#0125;&#0125;</code>
                                    </pre>
                                </li>
                                <li>
                                    <pre>
                                        <code>&#0123;&#0123;.Fields&#0125;&#0125;</code>
                                    </pre>
                                </li>
                                <li>
                                    <pre>
                                        <code>&#0123;&#0123;.index.Fields "value"&#0125;&#0125;</code>
                                    </pre>
                                </li>
                                <li>
                                    <pre>
                                        <code>&#0123;&#0123;.Time&#0125;&#0125;</code>
                                    </pre>
                                </li>
                                <li>
                                    <pre>
                                        <code>&#0123;&#0123;.else&#0125;&#0125;</code>
                                    </pre>
                                </li>
                                <li>
                                    <pre>
                                        <code>&#0123;&#0123;.end&#0125;&#0125;</code>
                                    </pre>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        );
    }
}