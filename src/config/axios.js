import axios from "axios";
axios.interceptors.request.use(function (config) {
  config.headers.token_login =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNjg0ODU2NTU0LCJleHAiOjE2ODU0NjEzNTR9.T_BrnmP5nS3TA3x8pIoianraq_FBxdLAjaTh5Y91b4Y";

  return config;
});
