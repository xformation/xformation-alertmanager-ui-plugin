import * as React from 'react';

export class AlertTypes extends React.Component<any,any>{
    render(){
        return (
        <div className="alert-details">
            <div className="alert-details-name">
                <label>Alert Type</label>
                <div className="choose-one-box">
                    <span>Choose One:</span>
                    <ul>
                        <li className="active"><a href="#">Threshold</a></li>
                        <li><a href="#">Relative</a></li>
                        <li><a href="#">Availability</a></li>
                    </ul>
                </div>
            </div>
            <div className="alert-details-description">
                <label>Time Series</label>
                <div className="time-series-box">
                    <div className="time-series-inner">
                        <div className="time-series-header">
                            <div className="heading retention-policy">DB.RetentionPolicy</div>
                            <div className="heading measurements">Measurements & Tags</div>
                            <div className="heading fields">Fields</div>
                        </div>
                        <div className="time-series-body">
                        <div className="database">
                            <ul>
                                <li className="active"><a href="#">Database_1</a></li>
                                <li><a href="#">Database_2</a></li>
                                <li><a href="#">Database_3</a></li>
                            </ul>
                        </div>
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
                    </div>
                    </div>
                </div>
            </div>
            <div className="alert-details-next">
                <button className="alert-blue-button next-btn">Next</button>
            </div>
        </div>
        );
    }
}