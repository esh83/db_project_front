import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
export const API_URL = "http://localhost:8080/";

export function isAuth() {
  try {
    let decoded = jwtDecode(Cookies.get("token") ?? "");
    return decoded;
  } catch (err) {
    return null;
  }
}

export const axiosCustom = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// Add a request interceptor
axiosCustom.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = `Bearer ${Cookies.get("token")}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
