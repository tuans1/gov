import axios from "axios";
const SITE_URI_PREFIX = "/v1/site";
const SITE_URIS = {
  GET_LIST_SITE: `${SITE_URI_PREFIX}/list`,
  GET_LIST_IMPORT_CONFIRM: `${SITE_URI_PREFIX}/list-confirm`,
  IMPORT_CONTINUE: `${SITE_URI_PREFIX}/import-continue`,
  GET_DETAIL_HISTORY_SITE : `${SITE_URI_PREFIX}/detail-history`,
  
};
export default {
  login(data) {
    return axios
      .get("https://www.boredapi.com/api/activity")
      .then((res) => {
        return res
      });
  },
  test() {
    return axios
      .get("https://www.boredapi.com/api/activity")
      .then((res) => res);
  },
};
