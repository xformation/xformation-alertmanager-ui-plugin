import init from '../domain/MonitorAlertsApp';

export class MonitorAlerts {
    static templateUrl = '/partials/alerts.html';
    constructor() {
        init();
    }
}
