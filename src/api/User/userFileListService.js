import axios from "axios";
const PREFIX = "http://document-manager.herokuapp.com";
const URIS = {
  LIST_FILE: `${PREFIX}/get-file?`,
};
export default {
  getListFile(data) {
    return axios
      .get(URIS.LIST_FILE + new URLSearchParams(data))
      .then((res) => res);
  },
  test() {
    return axios
      .get("https://www.boredapi.com/api/activity")
      .then((res) => res);
  },
};
