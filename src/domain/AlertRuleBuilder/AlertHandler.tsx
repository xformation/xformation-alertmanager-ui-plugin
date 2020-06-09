import * as React from 'react';
import { useState } from 'react';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

export class AlertHandler extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            activeTab: 0
        };
    }

    toggleTab = (activeTab: any) => {
        this.setState({
            activeTab
        });
    };

    render() {
        const { activeTab } = this.state;
        return (
            <div className="alert_details">
                <div className="alert_details_name">
                    <label>Condition</label>
                    <div className="condition_box">
                        <div className="condition_header">
                            <div className="send_alert_text">Send this alert to:</div>
                            <div className="greater_select">
                                <select className="form-control" id="rousourceGroup">
                                    <option>post</option>
                                    <option>tcp</option>
                                    <option>exec</option>
                                    <option>log</option>
                                    <option>stack(default)</option>
                                </select>
                            </div>
                        </div>
                        <div className="alert_handler_box">
                            <section className="tab-container row vertical-tab-container">
                            <div className="col-lg-2 col-md-3 col-sm-6">
                                <div className="alert_left_box">
                                    <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={`${activeTab == 0 ? 'side-active' : ''}`}
                                            onClick={() => { this.toggleTab(0); }}
                                        >
                                            Post &nbsp; &nbsp; <i className="fa fa-close alert_icon"></i>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={`${activeTab == 1 ? 'side-active' : ''}`}
                                            onClick={() => { this.toggleTab(1); }}
                                        >
                                            Tcp &nbsp; &nbsp; <i className="fa fa-close alert_icon"></i>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={`${activeTab == 2 ? 'side-active' : ''}`}
                                            onClick={() => { this.toggleTab(2); }}
                                        >
                                            Exec &nbsp; &nbsp; <i className="fa fa-close alert_icon"></i>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={`${activeTab == 3 ? 'side-active' : ''}`}
                                            onClick={() => { this.toggleTab(3); }}
                                        >
                                            Log &nbsp; &nbsp; <i className="fa fa-close alert_icon"></i>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-9 col-sm-6 alert_description">
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId={0}>
                                        <span className="alert_handler_span">Parameters for this Alert Handler</span>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 alert_handler_datainput">
                                                <label className="alert_handler_label">HTTP endpoint for POST request</label>
                                                <input type="text" className="form-control" placeholder="ex:http://example.com/api/alert" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-12 alert_handler_datainput">
                                                <label className="alert_handler_label">Header Key</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12 alert_handler_datainput">
                                                <label className="alert_handler_label">Heade Value</label>
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
                <div className="alert_details_next"><button className="btn next-btn">Next</button></div>                
            </div>
        )
    };
}