import * as React from 'react';

export class Message extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            messageData: '',
        };
    }

    addMessages = (val: any) => {
        const { messageData } = this.state;
        let retData = '';
        retData = messageData;
        retData+= '{{'+val+'}}'+' '+' ';
        this.setState({
            messageData: retData
        });
    };

    combineMessages = (event: any) => {
        console.log(event.target.value);
        const { messageData } = this.state;
        this.setState({
            messageData: event.target.value
        });
    }

    render() {
        const { messageData } = this.state;
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
                                <textarea placeholder="Example: &#0123;&#0123;.ID&#0125;&#0125; 
                                is &#0123;&#0123;.Level&#0125;&#0125; value: &#0123;&#0123;
                                index.Fields 'value'&#0125;&#0125;" onChange={e => { this.combineMessages(e) }}
                                 value={messageData}>

                                </textarea>

                            </div>
                            <div className="templates-text">
                                <ul>
                                    <li>
                                        <span>Templates:</span>
                                    </li>
                                    <li onClick={() => { this.addMessages('.ID') }}>
                                        <pre>
                                            <code>&#0123;&#0123;.ID&#0125;&#0125;</code>
                                        </pre>
                                    </li>
                                    <li onClick={() => { this.addMessages('.Name') }}>
                                        <pre>
                                            <code>&#0123;&#0123;.Name&#0125;&#0125;</code>
                                        </pre>
                                    </li>
                                    <li onClick={() => { this.addMessages('.TaskName') }}>
                                        <pre>
                                            <code>&#0123;&#0123;.TaskName&#0125;&#0125;</code>
                                        </pre>
                                    </li>
                                    <li onClick={() => { this.addMessages('.Group') }}>
                                        <pre>
                                            <code>&#0123;&#0123;.Group&#0125;&#0125;</code>
                                        </pre>
                                    </li>
                                    <li onClick={() => { this.addMessages('.Tags') }}>
                                        <pre>
                                            <code>&#0123;&#0123;.Tags&#0125;&#0125;</code>
                                        </pre>
                                    </li>
                                    <li onClick={() => { this.addMessages('.index.Tags "value"') }}>
                                        <pre>
                                            <code>&#0123;&#0123;.index.Tags "value"&#0125;&#0125;</code>
                                        </pre>
                                    </li>
                                    <li onClick={() => { this.addMessages('.Level') }}>
                                        <pre>
                                            <code>&#0123;&#0123;.Level&#0125;&#0125;</code>
                                        </pre>
                                    </li>
                                    <li onClick={() => { this.addMessages('.Fields') }}>
                                        <pre>
                                            <code>&#0123;&#0123;.Fields&#0125;&#0125;</code>
                                        </pre>
                                    </li>
                                    <li onClick={() => { this.addMessages('.index.Fields "value"') }}>
                                        <pre>
                                            <code>&#0123;&#0123;.index.Fields "value"&#0125;&#0125;</code>
                                        </pre>
                                    </li>
                                    <li onClick={() => { this.addMessages('.Time') }}>
                                        <pre>
                                            <code>&#0123;&#0123;.Time&#0125;&#0125;</code>
                                        </pre>
                                    </li>
                                    <li onClick={() => { this.addMessages('.else') }}>
                                        <pre>
                                            <code>&#0123;&#0123;.else&#0125;&#0125;</code>
                                        </pre>
                                    </li>
                                    <li onClick={() => { this.addMessages('.end') }}>
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