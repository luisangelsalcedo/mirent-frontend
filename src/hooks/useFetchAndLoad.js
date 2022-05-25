import { useEffect, useState } from "react";

/**
 * ## useFetchAndLoad
 * * Hook to control the call of an api and the loading of data
 * **use:**
 * ```
 * const { loading, callEndpoint } = useFetchAndLoad()
 * ```
 * @returns {Object} - {boolean, Promise}
 */
export const useFetchAndLoad = () => {
  let controller;
  let result;

  const [loading, setLoading] = useState(false);

  /**
   * ## callEndpoint
   * * API request and load state handling
   * @param {Promise} axiosCall
   * @param {Axios Request} axiosCall.call - Call Api
   * @param {AbortController} axiosCall.controller - controller object that allows one or more requests to be aborted
   * @returns {Axios Response} - Response Api
   */
  const callEndpoint = async (axiosCall) => {
    if (axiosCall.controller) controller = axiosCall.controller;
    setLoading(true);
    try {
      result = await axiosCall.call;
    } catch (error) {
      /* empty */
    }
    setLoading(false);
    return result;
  };

  const cancelEndpoint = () => {
    setLoading(false);

    if (controller) controller.abort();
  };

  useEffect(
    () => () => {
      cancelEndpoint();
    },
    []
  );

  return { loading, callEndpoint };
};
