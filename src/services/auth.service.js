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

export const loginGoogleService = (profileObj) => {
  const controller = loadAbort();
  return {
    call: axiosHTTPclient.post(ENDPOINTS.LOGIN_GOOGLE, profileObj, {
      signal: controller.signal,
    }),
    controller,
  };
};
