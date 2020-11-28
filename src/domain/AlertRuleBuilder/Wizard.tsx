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
        this.props.onChangeStep(activeStep, activeStep === this.props.steps.length - 1);
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

    goToNextPage = () => {
        const { currentStep } = this.state;
        const { steps } = this.props;
        const nextStep = currentStep + 1;
        if (steps && nextStep < steps.length) {
            this.setState({
                currentStep: nextStep
            });
            this.props.onChangeStep(nextStep, nextStep === steps.length - 1);
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