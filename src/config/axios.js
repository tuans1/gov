import axios from "axios";
axios.interceptors.request.use(function (config) {
  config.headers.token_login =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNjg1NDYzMTE3LCJleHAiOjE2ODYwNjc5MTd9.BVvsjXnqj1ksc1HJx6_17ZjvbseUX7VaKLelibSefWo";

  return config;
});
