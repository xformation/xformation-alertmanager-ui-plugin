import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { MonitorAlerts } from "../../pages/MonitorAlerts";
import { AllAlerts } from "../../pages/AllAlerts";
import { Rules } from "../../pages/Rules";
import { CreateRule } from "../../pages/CreateRule";
import { AllTickets } from "../../pages/AllTickets";
import { AlertRuleBuilder } from "../../pages/AlertRuleBuilder";
import { ManageAlertRule } from "../../pages/ManageAlertRule";
import { ScriptEditor } from "../../pages/ScriptEditor";
import { SearchAlert } from "../../pages/SearchAlert";
import { useNavigation, prefixRoute } from "../../utils/utils.routing";
import { ROUTES } from "../../constants";

export const Routes = () => {
  useNavigation();

  return (
    <Switch>
      <Route exact path={prefixRoute(ROUTES.Rules)} component={Rules} />
      <Route exact path={prefixRoute(ROUTES.MonitorAlerts)} component={MonitorAlerts} />
      <Route exact path={prefixRoute(ROUTES.AllAlerts)} component={AllAlerts} />
      <Route exact path={prefixRoute(ROUTES.CreateRule)} component={CreateRule} />
      <Route exact path={prefixRoute(ROUTES.AllTickets)} component={AllTickets} />
      <Route exact path={prefixRoute(ROUTES.AlertRuleBuilder)} component={AlertRuleBuilder} />
      <Route exact path={prefixRoute(ROUTES.ManageAlertRule)} component={ManageAlertRule} />
      <Route exact path={prefixRoute(ROUTES.ScriptEditor)} component={ScriptEditor} />
      <Route exact path={prefixRoute(ROUTES.SearchAlert)} component={SearchAlert} />
    </Switch>
  );
};
