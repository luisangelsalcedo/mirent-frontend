import { ENDPOINTS } from "../constants";
import { axiosHTTPclient } from "../interceptors";
import { loadAbort } from "../utils";

export const getAllRentByPropertyService = (propertyID) => {
  const controller = loadAbort();
  const endpoint = `${ENDPOINTS.PROPERTY}/${propertyID}/rent`;
  return {
    call: axiosHTTPclient.get(endpoint, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const createRentService = (propertyID, rent) => {
  const controller = loadAbort();
  return {
    call: axiosHTTPclient.post(
      `${ENDPOINTS.PROPERTY}/${propertyID}/rent`,
      rent,
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

// export const getAgreementService = (id) => {
//   const controller = loadAbort();
//   return {
//     call: axiosHTTPclient.get(`${ENDPOINTS.AGREEMENT}/${id}`, {
//       signal: controller.signal,
//     }),
//     controller,
//   };
// };

export const deleteRentService = (id) => {
  const controller = loadAbort();
  return {
    call: axiosHTTPclient.delete(`${ENDPOINTS.RENT}/${id}`, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const payRentService = (id, rent) => {
  const controller = loadAbort();
  return {
    call: axiosHTTPclient.post(`${ENDPOINTS.RENT}/${id}/pay`, rent, {
      signal: controller.signal,
    }),
    controller,
  };
};
