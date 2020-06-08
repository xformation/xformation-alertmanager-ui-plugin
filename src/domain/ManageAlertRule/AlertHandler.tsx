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
                    <label>Alert Handler</label>
                </div>
                <div className="alert_details_description">
                    <div className="time_series_box">
                        <div className="row">
                            <div className="col-lg-2 col-md-3 col-sm-6">
                                <label>Send this alert to:</label>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <select className="form-control" id="rousourceGroup">
                                    <option>post</option>
                                    <option>tcp</option>
                                    <option>exec</option>
                                    <option>log</option>
                                    <option>stack(default)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="alert_handler_box">
                        <section className="tab-container row vertical-tab-container">
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
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId={0}>
                                <Row>
                                    <Col sm="12">
                                        <h4>Tab 1 Contents</h4>
                                    </Col>
                                </Row>
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
        )
    };
}