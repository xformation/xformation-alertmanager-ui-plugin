import init from "../domain/SearchAlertApp";

export class SearchAlert {
  static templateUrl = "/partials/alerts.html";
  constructor() {
    init();
  }
}
