import axios from "axios";
import createNotification from "../utils/notification";

axios.interceptors.request.use(function (config) {
  config.headers.token_login =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNjg2NDczNTQ4LCJleHAiOjE2ODcwNzgzNDh9.1vbUJkqSwCeZNXU75BQiLfpSusQBr2O1bogAtPA53K4";

  return config;
});

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    createNotification("error", error.message);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
