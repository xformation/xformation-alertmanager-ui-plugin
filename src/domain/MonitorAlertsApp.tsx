import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { MonitorAlerts } from './MonitorAlerts';
import '../css/custom.css';
import '../css/monitor-alerts.css';
import { config } from '../config';

export default function init() {
  setTimeout(function () {
    ReactDOM.render(
      <BrowserRouter>
        <Switch>
          <Route path={`${config.basePath}/monitoralerts`} component={MonitorAlerts} />
        </Switch>
      </BrowserRouter>,
      document.getElementById('alert-main-container')
    );
  }, 100);
}