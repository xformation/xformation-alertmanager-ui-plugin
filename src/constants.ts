import pluginJson from "./plugin.json";
import { NavItem } from "types";

export const PLUGIN_BASE_URL = `/a/${pluginJson.id}`;

export enum ROUTES {
  MonitorAlerts = "monitor-alerts",
  AllAlerts = "all-alerts",
  Rules = "rules",
  CreateRule = "create-rule",
  AllTickets = "all-tickets",
  AlertRuleBuilder = "alert-rule-builder",
  ManageAlertRule = "manage-alert-rule",
  ScriptEditor = "script-editor",
  SearchAlert = "search-alert",
}

export const NAVIGATION_TITLE = "Basic App Plugin";
export const NAVIGATION_SUBTITLE = "Some extra description...";

// Add a navigation item for each route you would like to display in the navigation bar
export const NAVIGATION: Record<string, NavItem> = {};
