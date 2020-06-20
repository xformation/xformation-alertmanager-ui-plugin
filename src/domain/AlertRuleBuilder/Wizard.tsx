import * as React from 'react';

export class Wizard extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            currentStep: 0
        };
    }

    onClickStepButton = (activeStep: any) => {
        this.setState({
            currentStep: activeStep
        });
    };

    createStepLine = () => {
        const { steps } = this.props;
        const { currentStep } = this.state;
        const retData = [];
        if (steps && steps.length > 0) {
            const totalSteps = steps.length;
            for (let i = 0; i < totalSteps; i++) {
                const step = steps[i];
                retData.push(<div className={`wizard-step-button ${currentStep === i ? 'active' : ''}`} onClick={e => this.onClickStepButton(i)}>{step.name}</div>);
            }
            return retData;
        }
    };

    createStepContainer = () => {
        const { steps } = this.props;
        const { currentStep } = this.state;
        const retData = [];
        if (steps && steps.length > 0) {
            const totalSteps = steps.length;
            for (let i = 0; i < totalSteps; i++) {
                const step = steps[i];
                retData.push(<div className={`wizard-step-component ${currentStep === i ? '' : 'd-none'}`}>{step.component}</div>);
            }
        }
        return retData;
    };

    render() {
        return (
            <div>
                <div className="wizard-step-line-container">
                    {this.createStepLine()}
                </div>
                <div className="wizard-step-component-container">
                    {this.createStepContainer()}
                </div>
            </div>
        );
    }
}