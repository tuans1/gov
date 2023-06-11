import axios from "axios";
axios.interceptors.request.use(function (config) {
  config.headers.token_login =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNjg2NDczNTQ4LCJleHAiOjE2ODcwNzgzNDh9.1vbUJkqSwCeZNXU75BQiLfpSusQBr2O1bogAtPA53K4";

  return config;
});
