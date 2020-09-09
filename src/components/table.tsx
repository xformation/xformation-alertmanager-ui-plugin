import * as React from 'react';
import { EditAlertPopup } from '../domain/AllAlerts/EditAlertPopup';
import { config } from '../config';
import ConfirmDialog from './ConfirmDialog';
import { RestService } from '../domain/_service/RestService';
const sortEnum = {
    NONE: 0,
    ASCENDING: 1,
    DESCENDING: 2
};

export class Table extends React.Component<any, any> {
    editAlertRef: any;
    constructor(props: any) {
        super(props);
        this.state = {
            displayData: this.props.valueFromData.AlertData,
            searchData: this.props.valueFromData.AlertData,
            perPageLimit: this.props.perPageLimit,
            noOfRecordPerPage: this.props.perPageLimit,
            columns: this.props.valueFromData.columns,
            storeColumsData: this.props.valueFromData.columns,
            totalPages: '',
            currentPage: 0,
            start_index: 1,
            searchKey: '',
            ending_index: this.props.perPageLimit,

            isConfirmDialogOpen: false,
            confirmTitleMessage: null,
            objectType: null,
            objectId: null,
            object: null,

            message: null,
            severity: "",
            isAlertOpen: false,

            isAllChecked: false,
        }
        this.editAlertRef = React.createRef();
    };

    componentDidMount() {
        this.calculateTotalPages(this.state.displayData);
        
    }
    
    calculateTotalPages(displayData: any) {
        const { perPageLimit } = this.state;
        let indexOfLastData = Math.ceil(displayData.length / perPageLimit);
        this.setState({
            totalPages: indexOfLastData,
        });
    }
    tableHeader() {
        const { columns } = this.state;
        const { tableClasses } = this.props;
        const length = columns.length;
        const retData = [];
        for (let i = 0; i < length; i++) {
            const item = columns[i];
            retData.push(
                <th key={i}>
                    {item.label == 'Name' && 
                        <input type="checkbox" className="checkbox" name="AllCheck" onChange={this.checkAllAlerts} checked={this.state.isAllChecked} />
                    }
                    {item.label}
                </th>
            );
        }
        return retData;
    }
    tableBodyData() {
        const { displayData, perPageLimit, currentPage, start_index, ending_index } = this.state;
        const { tableClasses } = this.props;
        const retuData = [];
        const length = displayData.length;
        if (length > 0) {
            for (let i = 0; i < length; i++) {
                const row = displayData[i];
                if ((i >= currentPage * perPageLimit && i <= (currentPage * perPageLimit + (perPageLimit - 1)))||(i >= start_index - 1 && i <= ending_index - 1)) {
                    retuData.push(
                        <tr>
                            <td>
                                <div className="pointer-label">
                                    <input type="checkbox" className="checkbox" name={row.name} onChange={e => this.onCheckAlert(alert, e)} checked={row.isChecked}/> 
                                    {row.name}
                                </div> 
                            </td>
                            {(tableClasses.severityClassHigh != undefined && tableClasses.severityClassLow != undefined && tableClasses.severityClassUrgent != undefined) && 
                            <td>
                                <span className={row.severity == 'High' ? tableClasses.severityClassHigh : row.severity == 'Low' ? tableClasses.severityClassLow : tableClasses.severityClassUrgent}>{row.severity}</span>
                            </td>}
                            <td>{row.monitorcondition}</td>
                            <td>{row.alertstate}</td>
                            <td>{row.affectedresource}</td>
                            <td>{row.monitorservice}</td>
                            <td>{row.signaltype}</td>
                            <td>{row.firedtime}</td>
                            <td>{row.brcsubscription}</td>
                            <td>{row.suppressionstate}</td>
                            <td>
                                <div className="d-flex">
                                    <button className="btn btn-link" onClick={e => this.onClickEditAlert(e, alert)}>
                                        <i className="fa fa-edit"></i>
                                    </button>
                                    <button className="btn btn-link" onClick={e => this.onClickDeleteAlert(e, alert)}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                    <button className="btn btn-link" id="PopoverFocus">
                                        <i className="fa fa-ellipsis-h"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                } 
            }
        } else {
            retuData.push(<tr><td className="there-no-data" colSpan={12}>There is no data</td></tr>);
        }
        return retuData;
    }
    onClickEditAlert = (e: any, selectedAlert: any) => {
        this.editAlertRef.current.toggle(selectedAlert);
    };
    onClickDeleteAlert = (e: any, alert: any) => {
        console.log("Alert : " + alert);
        this.setState({
            confirmTitleMessage: "Delete Alert",
            message: "Are you sure, you want to delete the alert?",
            isConfirmDialogOpen: true,
            objectType: "alert",
            object: alert,
        });
    };

    peginationOfTable() {
        const { currentPage, totalPages } = this.state;
        let rows = [];
        for (let i = 0; i < totalPages; i++) {
            rows.push(<li className="page-item" key={i}><a className={currentPage === i ? 'page-link active' : 'page-link deactive'} href="#" onClick={(e) => this.navigatePage('btn-click', e, i)}>{i + 1}</a></li >);
        }
        return (
            <ul>
                <li className="page-item previous">
                    <a className={currentPage === 0 ? 'page-link desable' : 'page-link enable'} href="#" onClick={(e) => this.navigatePage('pre', e, '')}> <i className="fa fa-chevron-left"></i> Prev</a>
                </li>
                {rows}
                <li className="page-item next">
                    <a className={currentPage === this.state.totalPages - 1 ? 'page-link desable' : 'page-link enable'} href="#" onClick={(e) => this.navigatePage('next', e, '')}>Next <i className="fa fa-chevron-right"></i></a>
                </li>
            </ul>
        );
    }

    navigatePage(target: any, e: any, i: any) {
        const { totalPages, currentPage, start_index, perPageLimit, ending_index, displayData } = this.state;
        e.preventDefault();
        switch (target) {
            case 'pre':
                if (currentPage !== 0) {
                    this.setState({
                        currentPage: currentPage - 1,
                        start_index: start_index - perPageLimit,
                    });
                    if (ending_index != displayData.length) {
                        this.setState({
                            ending_index: ending_index - perPageLimit,
                        });
                    } else {
                        this.setState({
                            ending_index: ending_index - (displayData.length - start_index + 1),
                        });
                    }
                }
                break;
            case 'next':
                if (currentPage !== totalPages - 1) {
                    this.setState({
                        currentPage: currentPage + 1,
                        start_index: start_index + perPageLimit,
                    });
                    if ((ending_index + perPageLimit) < displayData.length) {
                        this.setState({
                            ending_index: ending_index + perPageLimit,
                        });
                    } else {
                        this.setState({
                            ending_index: ending_index + (displayData.length - ending_index),
                        });
                    }
                }
                break;
            case 'btn-click':
                if ((i + 1) * perPageLimit < displayData.length) {
                    this.setState({
                        currentPage: i,
                        start_index: (i * perPageLimit) + 1,
                        ending_index: ((i + 1) * perPageLimit),
                    });
                } else if (displayData.length >= (ending_index + (displayData.length - ending_index))) {
                    this.setState({
                        currentPage: i,
                        start_index: (i * perPageLimit) + 1,
                        ending_index: (ending_index + (displayData.length - ending_index)),
                    });
                } else {
                    this.setState({
                        currentPage: i,
                        start_index: (displayData.length - (displayData.length - ending_index) + 1),
                        ending_index: (parseInt(ending_index) + parseInt(displayData.length) - parseInt(ending_index)),
                    })
                }
                break;
        }
    }

    handleChange = (e: any) => {
        const { displayData } = this.state;
        const totalData = displayData.length;
        if (e.target.value !== 'all') {
            let indexOfLastData = Math.ceil(totalData / e.target.value);
            this.setState({
                perPageLimit: e.target.value,
                totalPages: indexOfLastData,
                start_index: 1,
                ending_index: e.target.value,
            });
        } else {
            let indexOfLastData = Math.ceil(totalData / totalData);
            this.setState({
                perPageLimit: totalData,
                totalPages: indexOfLastData,
                start_index: 1,
                ending_index: totalData
            });
        }
    }

    displayShowPageLimit() {
        const { noOfRecordPerPage, displayData } = this.state;
        let pageData = [];
        let i = noOfRecordPerPage;
        while (i <= displayData.length) {
            pageData.push(
                <option value={i}>{i}</option>
            )
            i = i + noOfRecordPerPage;
        }
        pageData.push(
            <option value="all">All</option>
        )
        return pageData;
    }

    onSearchChange = (e: any) => {
        const { value } = e.target;
        this.setState({
            searchKey: value,
        });
        const { searchData } = this.state;
        var searchResult = [];
        for (let i = 0; i < searchData.length; i++) {
            if (searchData[i].name.indexOf(value) !== -1 || value === '') {
                searchResult.push(searchData[i]);
            } else if (searchData[i].name.toLowerCase().indexOf(value) !== -1 || value === '') {
                searchResult.push(searchData[i]);
            }
        }
        this.calculateTotalPages(searchResult);
        this.setState({
            displayData: searchResult,
            currentPage: 0
        });
    }
    handleCloseConfirmDialog = () => {
        this.setState({
            isConfirmDialogOpen: false
        })
    }
    handleConfirmDelete = (objectType: any, object: any) => {
        console.log("Deleting alert. Alert object : ", object);
        let url = config.DELETE_ALERT + `/` + object.guid;
        this.callDeleteApi(url);
        console.log("Alert data is ",this.state.alertData)
        this.setState({
            isConfirmDialogOpen: false
        })
    }

    async callDeleteApi(url: any) {
        await RestService.deleteObject(url).then(response => {
            console.log('Delete alert response: ', response);
        });
        this.setState({
            severity: config.SEVERITY_SUCCESS,
            message: 'Alert deleted successfully',
            isAlertOpen: true,
        });
    }

    checkAllAlerts(e: any) {
        const { checked } = e.target;
        const { displayData } = this.state;
        this.setState({
            isAllChecked: checked
        });
        let length = displayData.length;
        for (let i = 0; i < length; i++) {
            const alert = displayData[i];
            alert.isChecked = checked;
        }
        this.setState({
            displayData: displayData
        });
    }
    onCheckAlert(row: any, e: any) {
        const { name, checked } = e.target;
        row.isChecked = checked;
    }

    render() {
        const { displayData, start_index, ending_index, perPageLimit, objectType, object, isConfirmDialogOpen, confirmTitleMessage, message } = this.state;
        const { tableClasses } = this.props;
        return (
            <div className={tableClasses.allAlertData}>
                <ConfirmDialog objectType={objectType} objectId={object} handleCloseConfirmDialog={this.handleCloseConfirmDialog} handleConfirmDelete={this.handleConfirmDelete} open={isConfirmDialogOpen} titleMsg={confirmTitleMessage} msg={message}></ConfirmDialog>
                <div className="filter-container">
                    <div className="row">
                        <div className="col-lg-8 col-md-8 col-sm-12">
                            <div className="d-inline-block showby">
                                <label className="d-inline-block">Show</label>
                                <select onChange={this.handleChange} className="form-control">
                                    {this.displayShowPageLimit()}
                                </select>
                                <span className="d-inline-block">entries per page</span>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 text-right">
                            <div className="d-inline-block form-group filter-search-control">
                                <form>
                                    <input type="text" className="input-group-text" onChange={this.onSearchChange} value={this.state.searchKey} placeholder="Search Alerts"  />
                                    <button>
                                        <i className="fa fa-search"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="top-head">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 left">
                            <input type="checkbox" className="checkbox" name="AllCheck" onChange={this.checkAllAlerts} checked={this.state.isAllChecked} />
                            <ul>
                                <li>
                                    <a className="fa fa-refresh" href="#"></a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 text-right pagination">
                            {this.peginationOfTable()}
                        </div>
                    </div>
                </div>
                <div className={tableClasses.alertsDataTable}>
                    <table className={tableClasses.alertDataTable}>
                        <thead>
                            <tr>
                                {this.tableHeader()}
                            </tr>
                        </thead>

                        <tbody>
                            {this.tableBodyData()}
                        </tbody>
                    </table>
                </div>  
                <EditAlertPopup ref={this.editAlertRef} />              
            </div>
        );
    }
}

export default Table;