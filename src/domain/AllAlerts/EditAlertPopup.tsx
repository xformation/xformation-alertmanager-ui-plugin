import * as React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import {RestService} from '../_service/RestService';
import { config } from '../../config';
import AlertMessage from '../../components/AlertMessage';
import { CommonService } from '../_common/common'
import * as moment from 'moment';

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
            alertState: null,
            alertData: []
        };

        this.updateAlert = this.updateAlert.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleCloseAlert = this.handleCloseAlert.bind(this);
        this.sendAlertActivityAsGelf = this.sendAlertActivityAsGelf.bind(this);
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

    closeModel = (e: any) => {
        this.handleCloseAlert(e);
        this.setState({
            modal: !this.state.modal,
            alertId: null,
            alertState: null,
            id: null,
            // severity : null, (commented to solve page break error)
            message: null,
            
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
        console.log("Calling update alert : ",obj);
        var requestOptions = CommonService.requestOptionsForPostRequest({});
        const URL = `${config.UPDATE_ALL_XF_ALERT_IN_ELASTIC}/${config.XF_ALERT_INDEX}/${id}/${alertState}`
        await fetch(URL, requestOptions) 
            .then(result => result.json())
            .then(response => {
            // console.log('response after alert update: ', response);
            if(response.message.complete == true){
                this.setState({
                    severity : config.SEVERITY_SUCCESS,
                    message: config.UPDATE_ALERT_SUCCESS_MESSAGE,
                    isAlertOpen: true,
                });
                if (this.props.refreshParm) {
                    let refreshMethod = this.props.refreshParm;
                    refreshMethod();
                }
                this.sendAlertActivityAsGelf(response, alertState);
            }else {
                this.setState({
                    severity : config.SEVERITY_ERROR,
                    message: config.SERVER_ERROR_MESSAGE,
                    isAlertOpen: true,
                });
            }
        });
        // this.getTotalAlerts();
        
        // setTimeout(this.closeModel, 3000); 
                
    }

    sendAlertActivityAsGelf = async (resp: any, alertState: any) => {
        var msg = JSON.parse(resp.message.message.substring(20));
        const alertActivity = msg; //.records[0].value;
        alertActivity.id = resp.message.id;
        alertActivity.alert_state = alertState;
        alertActivity.user_name = 'Automated';
        alertActivity.event_type = 'Update';
        alertActivity.action = 'Alert Updated';
        alertActivity.action_description = 'Alert Updated. State changed to: '+alertState;
        
        console.log("Calling sendAlertActivityAsGelf. Alert activity : ",alertActivity);
        await RestService.add(config.SEND_XF_ALERT_ACTIVITY, alertActivity).then(response => {
            console.log("Alert activity response : ",response)
        })
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