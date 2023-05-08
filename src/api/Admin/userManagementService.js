import axios from "axios";
const PREFIX = "http://document-manager.herokuapp.com/api/v1";
const USER_URIS = {
  LIST_USER: `${PREFIX}/users`,
};
export default {
  createUser(data) {
    console.log(data);
    return axios.get("https://www.boredapi.com/api/activity").then((res) => {
      return res;
    });
  },
  deleteUser() {
    return axios
      .get("https://www.boredapi.com/api/activity")
      .then((res) => res);
  },
  getListUser() {
    return axios.get(USER_URIS.LIST_USER).then((res) => res);
  },
};
