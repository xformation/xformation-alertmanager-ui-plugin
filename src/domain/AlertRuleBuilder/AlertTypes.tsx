import * as React from 'react';

export class AlertTypes extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            retantionPolicy: true,
            messurementTag: true,
            fields: true
        };
    }

    sendAlertType = (val:any) => {
        this.props.parentCallback(val);
   }

    DBRetentionPolicy() {
        let retantionData = (
            <div className="database">
                <ul>
                    <li className="active"><a href="#">Database_1</a></li>
                    <li><a href="#">Database_2</a></li>
                    <li><a href="#">Database_3</a></li>
                </ul>
            </div>);
        return retantionData;
    }

    messurementTag() {
        let messurement = (
            <div className="database-selected">
                <ul>
                    <li className="selected">
                        <a href="#">Cq</a>
                        <div className="toggle">=</div>
                        <div className="toggle-box">
                            <ul>
                                <li className="selected">
                                    <a href="#">hostname-1</a>
                                    <div className="hostname">Group By hostname</div>
                                    <div className="hostname-search">
                                        <button><i className="fa fa-search"></i></button>
                                        <input type="text" className="input-group-text" placeholder="Filter within hostname" />
                                    </div>
                                    <div className="hostip">ip-172-16-1-210</div>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a href="#">database</a>
                    </li>
                    <li>
                        <a href="#">httpd</a>
                    </li>
                    <li>
                        <a href="#">queryExecutor</a>
                    </li>
                    <li>
                        <a href="#">runtime</a>
                    </li>
                </ul>
            </div>
        );
        return messurement;
    }

    fieldData() {
        let fields = (
            <div className="measurement-selected">
                <ul>
                    <li className="selected">
                        <a href="#">queryFail</a>
                        <div className="functions">0 Functions</div>
                        <div className="functions-box">
                            <ul>
                                <li><a href="#">mean</a></li>
                                <li><a href="#">median</a></li>
                                <li><a href="#">count</a></li>
                                <li><a href="#">min</a></li>
                                <li><a href="#">max</a></li>
                                <li><a href="#">sum</a></li>
                                <li><a href="#">first</a></li>
                                <li><a href="#">last</a></li>
                                <li><a href="#">spread</a></li>
                                <li><a href="#">stddev</a></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a href="#">queryOk</a>
                    </li>
                </ul>
            </div>
        );
        return fields;
    }

    changeAlertTypeData(tabValue: any) {
        if (tabValue === 'Threshold' || tabValue === 'Relative') {
            this.setState({
                retantionPolicy: true,
                messurementTag: true,
                fields: true
            });
            this.sendAlertType(tabValue);
        } else if (tabValue === 'Availability') {
            this.setState({
                retantionPolicy: true,
                messurementTag: true,
                fields: false
            });
            this.sendAlertType(tabValue);
        }
    }
    render() {
        const { retantionPolicy, messurementTag, fields } = this.state;
        return (
            <div className="alert-details">
                <div className="alert-details-name">
                    <label>Alert Type</label>
                    <div className="choose-one-box">
                        <span>Choose One:</span>
                        <ul>
                            <li onClick={() => { this.changeAlertTypeData('Threshold') }} className="active"><a href="#">Threshold</a></li>
                            <li onClick={() => { this.changeAlertTypeData('Relative') }}><a href="#">Relative</a></li>
                            <li onClick={() => { this.changeAlertTypeData('Availability') }}><a href="#">Availability</a></li>
                        </ul>
                    </div>
                </div>
                <div className="alert-details-description">
                    <label>Time Series</label>
                    <div className="time-series-box">
                        <div className="time-series-inner">
                            <div className="time-series-header">
                                {retantionPolicy ? <div className="heading retention-policy">DB.RetentionPolicy</div> : <div></div>}
                                {messurementTag ? <div className="heading measurements">Measurements & Tags</div> : <div></div>}
                                {fields ? <div className="heading fields">Fields</div> : <div></div>}
                            </div>
                            <div className="time-series-body">
                                {retantionPolicy ? this.DBRetentionPolicy() : null}
                                {messurementTag ? this.messurementTag() : null}
                                {fields ? this.fieldData() : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}