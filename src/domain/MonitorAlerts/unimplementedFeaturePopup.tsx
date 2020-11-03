import * as React from 'react';
import { Link } from 'react-router-dom';
import { config } from '../../config';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class UnimplementedFeaturePopup extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            modal: false,
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    render() {
        const state = this.state;
        return (
            <Modal isOpen={state.modal} toggle={this.toggle} className="modal-container unimplemented-modal-container">
                <ModalHeader toggle={this.toggle}>Unimplemented Feature</ModalHeader>
                <ModalBody style={{ overflowY: 'auto', overflowX: "hidden" }}>
                    <p>The feature you are asking is not implemented yet. Do you want to continue?</p>
                </ModalBody>
                <ModalFooter>
                    <div className="d-block text-center">
                        <Link to={`${config.basePath}/manage-workflows`} onClick={this.toggle} className="alert-blue-button m-b-0" >Continue</Link>
                        <button className="alert-gray-button m-r-0 m-b-0" onClick={this.toggle}>Cancel</button>
                    </div>
                </ModalFooter>
            </Modal>
        );
    }
}