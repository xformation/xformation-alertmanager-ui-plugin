import init from '../domain/RulesApp';

export class Rules {
    static templateUrl = '/partials/alerts.html';
    constructor() {
        init();
    }
}
