import { createContext, useMemo, useState } from "react";
import { Notificaction } from "../Notificaction";
import { axiosHTTPclient } from "../../../../interceptors";

export const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({});

  const openAlert = (text) =>
    new Promise((resolve, reject) => {
      setNotification({
        message: text,
        type: "danger",
        fa: "exclamation-circle",
        res: resolve,
      });
    });

  const openNotice = (text) =>
    new Promise((resolve, reject) => {
      setNotification({
        message: text,
        type: "primary",
        fa: "bell",
        res: resolve,
      });
    });

  const closeNotification = () =>
    new Promise((resolve, reject) => {
      setNotification((n) => ({ ...n, message: "", res: resolve }));
    });

  //

  axiosHTTPclient.interceptors.response.use(
    (response) => response,
    (error) => {
      const { message } = error.response.data;

      openAlert(message);

      return Promise.reject(error);
    }
  );

  const valueMemo = useMemo(
    () => ({
      openAlert,
      openNotice,
    }),
    [notification]
  );

  return (
    <NotificationContext.Provider value={valueMemo}>
      {children}
      <Notificaction
        handleClose={closeNotification}
        type={notification.type}
        fa={notification.fa}
        res={notification.res}
      >
        {notification.message}
      </Notificaction>
    </NotificationContext.Provider>
  );
};
