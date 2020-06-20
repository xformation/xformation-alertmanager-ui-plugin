import {
  ScriptEditor,
  MonitorAlerts,
  AllAlerts,
  Rules,
  CreateRule,
  AllTickets,
  AlertRuleBuilder,
  ManageAlertRule
} from "./ui";
import { ConfigCtrl } from "./ConfigCtrl";

// import { loadPluginCss } from '@grafana/runtime';
// Patch since @grafana/runtime is giving error on build
declare const window: any;
export function loadPluginCss() {
  if (window.grafanaBootData.user.lightTheme) {
    require('./css/alertmanager.light.css');
  } else {
    require('./css/alertmanager.dark.css');
  }
}

loadPluginCss();

export {
  ConfigCtrl,
  ScriptEditor,
  MonitorAlerts,
  AllAlerts,
  Rules,
  CreateRule,
  AllTickets,
  AlertRuleBuilder,
  ManageAlertRule
};
