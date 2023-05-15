import axios from "axios";
const PREFIX = "http://document-manager.herokuapp.com/api/v1";
const URIS = {
  LIST_FILE: `${PREFIX}/get-file?`,
  ASSIGN_USER: `${PREFIX}/file/assign`,
};
export default {
  assignUser(data) {
    return axios.post(URIS.ASSIGN_USER, data).then((res) => {
      console.log(res)
      return res;
    });
  },
  deleteUser() {
    return axios
      .get("https://www.boredapi.com/api/activity")
      .then((res) => res);
  },
  getListFile(data) {
    return axios
      .get(URIS.LIST_FILE + new URLSearchParams(data))
      .then((res) => res);
  },
};
