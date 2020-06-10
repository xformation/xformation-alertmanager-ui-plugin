import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ScriptEditor } from './ScriptEditor';
import '../css/custom.css';
import '../css/script-editor.css';
import { config } from '../config';

export default function init() {
  setTimeout(function () {
    ReactDOM.render(
      <BrowserRouter>
        <Switch>
          <Route path={`${config.basePath}/scripteditor`} component={ScriptEditor} />
        </Switch>
      </BrowserRouter>,
      document.getElementById('alert-main-container')
    );
  }, 100);
}