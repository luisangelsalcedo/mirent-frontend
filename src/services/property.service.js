import { ENDPOINTS } from "../constants";
import { axiosHTTPclient } from "../interceptors";
import { loadAbort } from "../utils";

export const getAllPropertyService = () => {
  const controller = loadAbort();
  return {
    call: axiosHTTPclient.get(ENDPOINTS.PROPERTY, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const createPropertyService = (property) => {
  const controller = loadAbort();
  return {
    call: axiosHTTPclient.post(ENDPOINTS.PROPERTY, property, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const updatePropertyService = (id, property) => {
  const controller = loadAbort();
  return {
    call: axiosHTTPclient.put(`${ENDPOINTS.PROPERTY}/${id}`, property, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const deletePropertyService = (id) => {
  const controller = loadAbort();
  return {
    call: axiosHTTPclient.delete(`${ENDPOINTS.PROPERTY}/${id}`, {
      signal: controller.signal,
    }),
    controller,
  };
};
