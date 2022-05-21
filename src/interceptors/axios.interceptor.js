import axios from "axios";
import { config as configuring } from "../config";

/**
 * * AXIOS INSTANCE
 */
export const axiosHTTPclient = axios.create({
  baseURL: configuring.api.url,
  // timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

/**
 * * REQUEST INTERCEPTOR
 */
axiosHTTPclient.interceptors.request.use(
  (config) => {
    if (config.url.indexOf("/api") === -1) return config;
    const { token } = JSON.parse(localStorage.getItem("auth")) || {
      token: "",
    };
    const newHeaders = {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    config.headers = newHeaders;
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * * RESPONSE INTERCEPTOR
 */
axiosHTTPclient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.request.status === 401) {
      setTimeout(() => {
        localStorage.setItem("auth", JSON.stringify({ logger: false }));
        window.location.href = "/";
      }, 2000);
    }
    // debug provicional
    console.log("error", error.response.data);

    return Promise.reject(error);
  }
);
