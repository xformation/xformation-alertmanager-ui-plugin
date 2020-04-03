import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { CreateRule } from './CreateRule';
import '../css/custom.css';
import '../css/create-rule.css';
import '../css/modal.css';
import { config } from '../config';

export default function init() {
  setTimeout(function () {
    ReactDOM.render(
      <BrowserRouter>
        <Switch>
          <Route path={`${config.basePath}/createrule`} component={CreateRule} />
        </Switch>
      </BrowserRouter>,
      document.getElementById('alert-main-container')
    );
  }, 100);
}