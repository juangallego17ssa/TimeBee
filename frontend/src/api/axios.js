import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_BASE_URL_PROD
    : process.env.REACT_APP_API_BASE_URL_DEV;

export const axiosWithoutToken = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const axiosWithToken = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    "Content-Type": "application/json",
  },
});