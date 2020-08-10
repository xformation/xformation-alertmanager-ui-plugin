const IP = "100.64.108.25";

const searchSrvUrl = `http://${IP}:8092`;
const alertSrvUrl = `http://${IP}:5050`;

export const config = {
  basePath: "/plugins/xformation-alertmanager-ui-plugin/page",
  GET_ALL_ALERT_FROM_ELASTIC: `${searchSrvUrl}/search/query?q=alert&pageSize=100`,
  GET_ALL_ALERT_FROM_DB: `${alertSrvUrl}/api/listAlert`,
  UPDATE_ALERT: `${alertSrvUrl}/api/updateAlert`,

  SEVERITY_ERROR: "error",
  SEVERITY_SUCCESS: "success",
  SERVER_ERROR_MESSAGE:
    "Operation failed. Please check service logs for details",
  UPDATE_ALERT_SUCCESS_MESSAGE: "Alert updated successfully"
};
