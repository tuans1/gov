import axios from "axios";
import createNotification from "../utils/notification";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
axios.interceptors.request.use(function (config) {
  config.headers.token_login = cookies.get("token_login");
  return config;
});

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    console.log(error);
    createNotification("error", error.response.data.message);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
