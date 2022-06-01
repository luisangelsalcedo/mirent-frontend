import { ENDPOINTS } from "../constants";
import { axiosHTTPclient } from "../interceptors";
import { loadAbort } from "../utils";

export const getAllAgreementByPropertyService = (propertyID) => {
  const controller = loadAbort();
  const endpoint = `${ENDPOINTS.PROPERTY}/${propertyID}/agreement`;
  return {
    call: axiosHTTPclient.get(endpoint, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const createAgreementService = (propertyID, agreement) => {
  const controller = loadAbort();
  return {
    call: axiosHTTPclient.post(
      `${ENDPOINTS.PROPERTY}/${propertyID}/agreement`,
      agreement,
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const getAgreementService = (id) => {
  const controller = loadAbort();
  return {
    call: axiosHTTPclient.get(`${ENDPOINTS.AGREEMENT}/${id}`, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const deleteAgreementService = (id) => {
  const controller = loadAbort();
  return {
    call: axiosHTTPclient.delete(`${ENDPOINTS.AGREEMENT}/${id}`, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const updateAgreementService = (id, update) => {
  const controller = loadAbort();
  return {
    call: axiosHTTPclient.put(`${ENDPOINTS.AGREEMENT}/${id}`, update, {
      signal: controller.signal,
    }),
    controller,
  };
};
