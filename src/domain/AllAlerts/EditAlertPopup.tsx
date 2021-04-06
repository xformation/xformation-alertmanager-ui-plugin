import * as React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import {RestService} from '../_service/RestService';
import { config } from '../../config';
import AlertMessage from '../../components/AlertMessage';
import { CommonService } from '../_common/common'

// export interface AlertProp extends React.HTMLAttributes<HTMLElement>{
//     onSaveUpdate?: any;
// }

export class EditAlertPopup extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            modal: false,
            isAlertOpen: false,
            message: null,
            severity: null,
            guid: null,
            id: null,
            alertState: ""
        };

        this.updateAlert = this.updateAlert.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleCloseAlert = this.handleCloseAlert.bind(this);
    }

    toggle = (selectedAlert: any) => {
        let alertState = "";
        const keys = Object.keys(selectedAlert);
        const lowerCaseKeys = keys.map((key)=>key); //key.toLowerCase()
        const index = lowerCaseKeys.indexOf("alert_state");
        if(index !== -1){
            const key = keys[index];
            if(selectedAlert[key]){
                alertState = selectedAlert[key]; //.toLowerCase();
            }
        }
        this.setState({
            modal: !this.state.modal,
            guid: selectedAlert.guid,
            id: selectedAlert.id,
            alertState: alertState,
        });
    };

    closeModel = () => {
        this.setState({
            modal: !this.state.modal,
            alertId: null,
            alertState: "",
            id: null,
        });
    }

    onChange = (e: any) => {
        const {name, value} = e.target;
        this.setState({
        [name]: value,
        });
    }

    handleCloseAlert = (e: any) =>{
        this.setState({
          isAlertOpen: false
        })
    }
    
    async updateAlert() {
        const {id, guid, alertState} = this.state;
        if(alertState === ""){
            console.log("Please select alert state");
            this.setState({
                severity : config.SEVERITY_ERROR,
                message: "Please select alert state",
                isAlertOpen: true,
            });
            return;
        }
        let obj = {
            guid: guid,
            alertState: alertState,
        } 
        console.log("Alert being update : ",obj);
        var requestOptions = CommonService.requestOptionsForPostRequest({});
        const URL = `${config.UPDATE_ALL_XF_ALERT_IN_ELASTIC}/${config.XF_ALERT_INDEX}/${id}/${alertState}`
        await fetch(URL, requestOptions) 
            .then(result => result.json())
            .then(response => {
        // await RestService.add(config.UPDATE_ALERT, obj).then(response => {
            console.log('update alert response: ', response.message.complete);
            if(response.message.complete == true){
                // let ary = [];
                // for (let i = 0; i < response.length; i++) {
                //     let j = JSON.parse(response[i]);
                //     ary.push(j);
                // }
                this.setState({
                    severity : config.SEVERITY_SUCCESS,
                    message: config.UPDATE_ALERT_SUCCESS_MESSAGE,
                    isAlertOpen: true,
                });
                var msg = JSON.parse(response.message.message.substring(20));
                const alert = msg.records[0].value;
                alert.id = response.message.id;
                this.props.onSaveUpdate(alert);
            }else {
                this.setState({
                    severity : config.SEVERITY_ERROR,
                    message: config.SERVER_ERROR_MESSAGE,
                    isAlertOpen: true,
                });
            } 
        });
    }

    render() {
        const state = this.state;
        return (
            <Modal isOpen={state.modal} toggle={this.closeModel} className="modal-container alert-modal-container" modalClassName="alert-modal-container">
                <AlertMessage handleCloseAlert={this.handleCloseAlert} open={state.isAlertOpen} severity={state.severity} msg={state.message}></AlertMessage>
                <ModalHeader toggle={this.closeModel}>Update Alert</ModalHeader>
                <ModalBody style={{ height: 'calc(100vh - 210px)', overflowY: 'auto', overflowX: "hidden" }}>
                    <div className="select-resource-container">
                        <div className="italic-label gray-label m-b-1">{' '}</div>
                        <div className="form-row m-t-1">
                            <div className="form-group filter-control-group col-sm-3">
                                <label htmlFor="selectAlertState">Select Alert State</label>
                                <select className="form-control" name="alertState" value={state.alertState} onChange={this.onChange}>
                                    <option key="" value="">Select Alert State</option>
                                    <option key="New" value="New">New</option>
                                    <option key="InProgress" value="InProgress">InProgress</option>
                                    <option key="Closed" value="Closed">Closed</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-secondary m-r-2" onClick={this.updateAlert}>Update</button>
                            <button className="btn btn-warning" onClick={this.closeModel}>Cancel</button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}