import init from '../domain/ManageAlertRuleApp';

export class ManageAlertRule {
    static templateUrl = '/partials/alerts.html';
    constructor() {
        init();
    }
}
