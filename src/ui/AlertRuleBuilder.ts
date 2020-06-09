import init from '../domain/AlertRuleBuilderApp';

export class AlertRuleBuilder {
    static templateUrl = '/partials/alerts.html';
    constructor() {
        init();
    }
}
