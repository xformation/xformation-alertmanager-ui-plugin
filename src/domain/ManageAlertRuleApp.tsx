import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ManageAlertRule } from './ManageAlertRule';
import { config } from '../config';

export default function init() {
  setTimeout(function () {
    ReactDOM.render(
      <BrowserRouter>
        <Switch>
          <Route path={`${config.basePath}/managealertrule`} component={ManageAlertRule} />
        </Switch>
      </BrowserRouter>,
      document.getElementById('alert-main-container')
    );
  }, 100);
}