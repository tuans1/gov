import axios from "axios";
import createNotification from "../utils/notification";

axios.interceptors.request.use(function (config) {
  config.headers.token_login =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNjg3MDg1MzE5LCJleHAiOjE2ODc2OTAxMTl9.Y4BLMcc1vlvRAbDQ_gbXG2vNmIZRZfuZx-pdEeqW-Vw";

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
