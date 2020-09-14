const ALERT_URL = "alert.service.com";
const SEARCH_URL = "search.service.com";

const searchSrvUrl = `http://100.64.108.25:8092`;
const alertSrvUrl = `http://100.64.108.25:5060`;

export const config = {
  basePath: "/plugins/xformation-alertmanager-ui-plugin/page",
  GET_ALL_ALERT_FROM_ELASTIC: `${searchSrvUrl}/search/query?q=alert&pageSize=5000`,
  GET_ALL_ALERT_FROM_DB: `${alertSrvUrl}/api/listAlert`,
  UPDATE_ALERT: `${alertSrvUrl}/api/updateAlert`,
  DELETE_ALERT: `${alertSrvUrl}/api/deleteAlert`,
  TOTAL_ALERTS: `${searchSrvUrl}/search/totalRecords`,

  SEVERITY_ERROR: "error",
  SEVERITY_SUCCESS: "success",
  SERVER_ERROR_MESSAGE:
    "Operation failed. Please check service logs for details",
  UPDATE_ALERT_SUCCESS_MESSAGE: "Alert updated successfully"
};
