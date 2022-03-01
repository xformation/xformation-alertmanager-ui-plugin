import * as React from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './UnimplementedFeaturePopup.css';
import { PLUGIN_BASE_URL } from '../constants';

export class UnimplementedFeaturePopup extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            modal: false,
            link: ""
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    setLink = (link: any) => {
        this.setState({
            link
        });
    };

    render() {
        const state = this.state;
        return (
            <Modal isOpen={state.modal} toggle={this.toggle} className="modal-container alert-modal-container">
                <ModalHeader toggle={this.toggle}>Unimplemented Feature</ModalHeader>
                <ModalBody style={{ overflowY: 'auto', overflowX: "hidden" }}>
                    <p>The feature you are asking is not implemented yet. Do you want to continue?</p>
                </ModalBody>
                <ModalFooter>
                    <div className="d-block text-center">
                        {
                            state.link &&
                            <Link to={`${PLUGIN_BASE_URL}${state.link}`} onClick={this.toggle} className="alert-blue-button m-b-0" >Continue</Link>
                        }
                        <button className="alert-gray-button m-r-0 m-b-0" onClick={this.toggle}>Close</button>
                    </div>
                </ModalFooter>
            </Modal>
        );
    }
}