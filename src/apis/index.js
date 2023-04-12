import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.pre-onboarding-selection-task.shop/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

export default instance;
