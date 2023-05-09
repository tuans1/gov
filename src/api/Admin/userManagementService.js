import axios from "axios";
const PREFIX = "http://document-manager.herokuapp.com/api/v1";
const USER_URIS = {
  LIST_USER: `${PREFIX}/users?`,
  CREATE_USER: `${PREFIX}/user`,
};
export default {
  createUser(data) {
    return axios.post(USER_URIS.CREATE_USER, data).then((res) => {
      return res;
    });
  },
  deleteUser() {
    return axios
      .get("https://www.boredapi.com/api/activity")
      .then((res) => res);
  },
  getListUser(data) {
    return axios
      .get(USER_URIS.LIST_USER + new URLSearchParams(data))
      .then((res) => res);
  },
};
