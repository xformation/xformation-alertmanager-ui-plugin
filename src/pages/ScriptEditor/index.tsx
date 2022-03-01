import * as React from 'react';
import { Breadcrumbs } from '../Breadcrumbs';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';

require('codemirror/mode/javascript/javascript');
require('codemirror/theme/material.css');
import { PLUGIN_BASE_URL } from '../../constants';

export class ScriptEditor extends React.Component<any, any> {
  breadCrumbs: any;
  constructor(props: any) {
    super(props);
    this.state = {
      codeEditorValue: '',
    };
    this.breadCrumbs = [
      {
        label: 'Home',
        route: `/`,
      },
      {
        label: 'Monitor | Alerts',
        route: `${PLUGIN_BASE_URL}/monitor-alerts`,
      },
      {
        label: 'Script Editor',
        isCurrentPage: true,
      },
    ];
  }

  render() {
    return (
      <div className="monitor-alerts-container">
        <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="MONITOR | ALERTS" />
        <div className="alert-page-container">
          <div className="common-container script-editor">
            <div className="row">
              <div className="col-lg-3 col-md-12 col-sm-12">
                <div className="alert-heading">Script Editor</div>
              </div>
              <div className="col-lg-9 col-md-12 col-sm-12">
                <div className="float-right script-editor-btn">
                  <button className="alert-white-button">Editor</button>
                  <button className="alert-white-button">Editor+ Logs</button>
                  <button className="alert-white-button">Save New Script</button>
                  <button className="alert-white-button">Exit</button>
                </div>
              </div>
            </div>
          </div>
          <div className="common-container border-bottom-0 p-t-20 script-editor">
            <div className="script-search">
              <input type="text" className="input-group-text" placeholder="ID your Script" />
            </div>
            <div className="script-search-btn">
              <button className="alert-white-button">Stream</button>
              <button className="alert-white-button">Batch</button>
            </div>
            <div className="script-select">
              <select>
                <option>greater than</option>
                <option>greater than</option>
                <option>greater than</option>
              </select>
            </div>
          </div>
          <div className="common-container border-bottom-0 p-t-20 script-editor">
            <CodeMirror
              value={this.state.codeEditorValue}
              options={{
                mode: 'javascript',
                lineNumbers: true,
                theme: 'material',
              }}
              onBeforeChange={(value: any) => {
                this.setState({ codeEditorValue: value });
              }}
            />
            <div className="validate-bottom-text"> &gt; You have unsaved changes, save to validate TICKscript</div>
          </div>
        </div>
      </div>
    );
  }
}
