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
        return (
            <div className="">
                <iframe src="http://localhost:3002"></iframe>    
            </div>
        );
    }
};