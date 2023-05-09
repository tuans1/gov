import axios from "axios";
axios.interceptors.request.use(function (config) {
  config.headers.token_login =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNjgzNjM4NzkwLCJleHAiOjE2ODQyNDM1OTB9.lwHpG_KASMK0lT1CdXgMIu06BZqwhK-xhgYtHyxuHmM";

  return config;
});
