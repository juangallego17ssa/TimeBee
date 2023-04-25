import axios from "axios";

// const baseURL =
//   process.env.NODE_ENV === "production"
//     ? process.env.REACT_APP_API_BASE_URL_PROD
//     : process.env.REACT_APP_API_BASE_URL_DEV;
const baseURL = 'http://localhost:8000/backend/api/'

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
    Authorization: `Bearer ${localStorage.getItem("access")}`,
    "Content-Type": "application/json",
  },
});

export const axiosTimeBee = axios.create({
  baseURL: baseURL,
});

export const authHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
      "Content-Type": "application/json",
    }
  }
}