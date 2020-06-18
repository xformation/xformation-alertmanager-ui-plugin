import * as React from 'react';
import { useState } from 'react';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

export class AlertHandler extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            activeTab: 0,
            tabData: [],
        };
    }

    handleChange(event: any) {
        const { tabData } = this.state;
        tabData.push(event.target.value);
        this.setState({
            tabData
        });
    };

    toggleTab = (activeTab: any) => {
        this.setState({
            activeTab
        });
    };

    deleteTabData = (index: any, val:any) => {
        const {tabData} = this.state;
        for (let i = 0; i < tabData.length; i++) {
            let deleted_index = tabData.indexOf(val);
            if(tabData.indexOf(val)=== i){
                tabData.splice(deleted_index,1);
            }
        }
    };

    createTabs = (tabData: any) => {
        const retData = [];
        const { activeTab } = this.state;
        for (let i = 0; i < tabData.length; i++) {
            retData.push(
                <NavItem>
                    <NavLink className={`${activeTab == i ? 'side-active' : ''}`}
                        onClick={() => { this.toggleTab({ i }); }}
                    >
                        {tabData[i]}
                    <i className="fa fa-close" onClick={() => { this.deleteTabData(i, tabData[i]) }}></i>
                    </NavLink>
                </NavItem>
            );
        }
        return retData;
    };

    render() {
        const { activeTab, tabData } = this.state;
        return (
            <div className="alert-details">
                <div className="alert-details-name">
                    <label>Condition</label>
                    <div className="condition-box">
                        <div className="condition-header">
                            <div className="send-alert-text">Send this alert to:</div>
                            <div className="greater-select">
                                <select className="form-control" id="rousourceGroup" onChange={e => this.handleChange(e)}>
                                    <option value="Add another Handler">Add another Handler</option>
                                    <option value="post">post</option>
                                    <option value="tcp">tcp</option>
                                    <option value="exec">exec</option>
                                    <option value="log">log</option>
                                    <option value="stack(default)">stack(default)</option>
                                    <option value="email">email</option>
                                    <option value="alerta">alerta</option>
                                    <option value="hipChat">hipChat</option>
                                    <option value="Kafka (localhost)">Kafka (localhost)</option>
                                </select>
                            </div>
                        </div>
                        <div className="alert-handler-box">
                            <section className="tab-container row vertical-tab-container">
                                <div className="col-lg-2 col-md-3 col-sm-6">
                                    <div className="alert-left-box">
                                        <Nav tabs>
                                            {this.createTabs(tabData)}
                                        </Nav>
                                    </div>
                                </div>
                                <div className="col-lg-9 col-md-9 col-sm-6 alert-description">
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId={0}>
                                            <span className="alert-handler-span">Parameters for this Alert Handler</span>
                                            <div className="row">
                                                <div className="col-lg-12 col-md-12 col-sm-12 alert-handler-datainput">
                                                    <label className="alert-handler-label">HTTP endpoint for POST request</label>
                                                    <input type="text" className="form-control" placeholder="ex:http://example.com/api/alert" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-12 alert-handler-datainput">
                                                    <label className="alert-handler-label">Header Key</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 alert-handler-datainput">
                                                    <label className="alert-handler-label">Heade Value</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                        </TabPane>
                                        <TabPane tabId={1}>
                                            <Row>
                                                <Col sm="6">
                                                    <Card body>
                                                        <CardTitle>Special Title Treatment</CardTitle>
                                                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                                        <Button>Go somewhere</Button>
                                                    </Card>
                                                </Col>
                                                <Col sm="6">
                                                    <Card body>
                                                        <CardTitle>Special Title Treatment</CardTitle>
                                                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                                        <Button>Go somewhere</Button>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId={2}>
                                            <Row>
                                                <Col sm="6">
                                                    <Card body>
                                                        <CardTitle>Special Title Treatment</CardTitle>
                                                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                                        <Button>Go somewhere</Button>
                                                    </Card>
                                                </Col>
                                                <Col sm="6">
                                                    <Card body>
                                                        <CardTitle>Special Title Treatment</CardTitle>
                                                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                                        <Button>Go somewhere</Button>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </TabPane>
                                    </TabContent>
                                </div>
                            </section>
                            {/* <div className="col-lg-9 col-md-9 col-sm-6 alert_description">
                                    <span className="alert_handler_span">Parameters for this Alert Handler</span>
                                    <label className="alert_handler_label">HTTP endpoint for POST request</label>
                                    <input type="text" className="form-control" />
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-12 alert_handler_datainput">
                                            <label>Header Key</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 alert_handler_datainput">
                                            <label>Heade Value</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div> */}
                        </div>
                    </div>
                </div>
                <div className="alert-details-next"><button className="alert-blue-button next-btn">Next</button></div>
            </div >
        )
    };
}