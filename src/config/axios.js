import axios from "axios";
import createNotification from "../utils/notification";

axios.interceptors.request.use(function (config) {
  config.headers.token_login =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNjg4MzA0MjE4LCJleHAiOjE2ODg5MDkwMTh9.gQXvV0IDT0SCI7j1yj3of6OKnCz18FLoKtRa5cglIBc";

  return config;
});

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    console.log(error)
    createNotification("error", error.response.data.message);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
