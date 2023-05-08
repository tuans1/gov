import axios from "axios";
const PREFIX = "https://document-manager.herokuapp.com";
const LOGIN_URIS = {
  LOGIN: `${PREFIX}/login`,
};
console.log(LOGIN_URIS.LOGIN)
export default {
  login(data) {
    return axios.post(LOGIN_URIS.LOGIN, {data}).then((res) => {
      return res;
    });
  },
  test() {
    return axios
      .get("https://www.boredapi.com/api/activity")
      .then((res) => res);
  },
};
