import { ENDPOINTS } from "../constants";
import { axiosHTTPclient } from "../interceptors";
import { loadAbort } from "../utils";

export const getAllAgreementByPropertyService = (propertyID) => {
  const controller = loadAbort();
  const endpoint = `${ENDPOINTS.AGREEMENT}/property/${propertyID}`;
  return {
    call: axiosHTTPclient.get(endpoint, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const createAgreementService = (agreement) => {
  const controller = loadAbort();
  return {
    call: axiosHTTPclient.post(`${ENDPOINTS.AGREEMENT}`, agreement, {
      signal: controller.signal,
    }),
    controller,
  };
};
