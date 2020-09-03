const ALERT_URL = "alert.service.com";
const SEARCH_URL = "search.service.com";

const searchSrvUrl = `http://${SEARCH_URL}:8092`;
const alertSrvUrl = `http://${ALERT_URL}:5060`;

export const config = {
  basePath: "/plugins/xformation-alertmanager-ui-plugin/page",
  GET_ALL_ALERT_FROM_ELASTIC: `${searchSrvUrl}/search/query?q=alert&pageSize=5000`,
  GET_ALL_ALERT_FROM_DB: `${alertSrvUrl}/api/listAlert`,
  UPDATE_ALERT: `${alertSrvUrl}/api/updateAlert`,
  DELETE_ALERT: `${alertSrvUrl}/api/deleteAlert`,

  SEVERITY_ERROR: "error",
  SEVERITY_SUCCESS: "success",
  SERVER_ERROR_MESSAGE:
    "Operation failed. Please check service logs for details",
  UPDATE_ALERT_SUCCESS_MESSAGE: "Alert updated successfully"
};
