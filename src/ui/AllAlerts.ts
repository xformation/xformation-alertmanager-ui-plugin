import init from '../domain/AllAlertsApp';

export class AllAlerts {
    static templateUrl = '/partials/alerts.html';
    constructor() {
        init();
    }
}
