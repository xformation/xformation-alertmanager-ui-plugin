import * as React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Line } from 'react-chartjs-2';

export class PopupContent extends React.Component<any, any> {
    options = {
        // responsive: true,
        title: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    stepSize: 20,
                    suggestedMin: 0,
                    callback: function (value: any, index: any, values: any) {
                        return value + "%";
                    }
                }
            }]
        }
    };
    dummyData = {
        label: "",
        backgroundColor: "#21AFC3",
        borderColor: "#21AFC3",
        fill: false,
        data: [80, 81, 84, 82, 79, 76, 78, 80]
    };
    labels = ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"];
    constructor(props: any) {
        super(props);
        this.state = {
            activeTab: 0
        };
    }

    setActiveTab = (activeTab: any) => {
        this.setState({
            activeTab
        });
    };

    render() {
        const state = this.state;
        const { activeTab } = this.state;
        return (
            <div className="percentage-tabs">
                <ul>
                    <li className={activeTab === 0?"active-tab":''} onClick={e=>this.setActiveTab(0)}>
                        <a href="#">Percentage CPU</a>
                    </li>
                    <li className={activeTab === 1?"active-tab":''} onClick={e=>this.setActiveTab(1)}>
                        <a href="#">Percentage Text</a>
                    </li>
                </ul>
                <div className="tab-container">
                    { activeTab === 0 &&
                        <div>
                            <iframe style={{width: "100%", height: "450px", border: "none"}} src="http://localhost:3002/d/d9loIgNGz/test-dash?editPanel=6&orgId=1&removeOptions=1&tab=alert"></iframe>
                        </div>
                    }
                    { activeTab === 1 &&
                        <div>
                            testing testing testing
                        </div>
                    }

                </div>
                 
                   
            </div>
        );
    }
};