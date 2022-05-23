import { ENDPOINTS } from "../constants";
import { axiosHTTPclient } from "../interceptors";
import { loadAbort } from "../utils";

export const loginService = (user) => {
  const controller = loadAbort();
  return {
    call: axiosHTTPclient.post(ENDPOINTS.LOGIN, user, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const registerUserService = (user) => {
  const controller = loadAbort();
  return {
    call: axiosHTTPclient.post(ENDPOINTS.REGISTER, user, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const validateTokenService = (token) => {
  const controller = loadAbort();
  return {
    call: axiosHTTPclient.get(`${ENDPOINTS.VALIDATE}/${token}`, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const recoverPasswordService = (username) => {
  const controller = loadAbort();
  return {
    call: axiosHTTPclient.post(`${ENDPOINTS.RECOVER}`, username, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const updateUserService = (id, user) => {
  const controller = loadAbort();
  return {
    call: axiosHTTPclient.put(`${ENDPOINTS.USER}/${id}`, user, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const getUserService = (id) => {
  const controller = loadAbort();
  return {
    call: axiosHTTPclient.get(`${ENDPOINTS.USER}/${id}`, {
      signal: controller.signal,
    }),
    controller,
  };
};
