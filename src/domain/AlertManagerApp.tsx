import * as React from 'react'; 
import * as ReactDOM from 'react-dom';

import { Dashboard } from './Dashboard';
import '../css/custom.css';

export default function init() {
  setTimeout(function () {
    ReactDOM.render(
      <Dashboard />,
      document.getElementById('alert-main-container')
    );
  }, 100);
}