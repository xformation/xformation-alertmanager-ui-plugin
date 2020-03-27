import init from '../domain/AlertManagerApp';

export class AlertManagerMainClass {
    static templateUrl = '/partials/alerts.html';
    constructor() {
        init();
    }
}
