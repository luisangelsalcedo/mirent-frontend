import { createContext, useMemo, useState } from "react";
import { Modal } from "../Modal";

export const ModalContext = createContext({});

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({ show: false, component: "" });

  const openModal = (view) => {
    setModal({ show: true, component: view });
  };
  const closeModal = () => {
    setModal({ show: false, component: "" });
  };

  const valueMemo = useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    [modal]
  );

  return (
    <ModalContext.Provider value={valueMemo}>
      <Modal show={modal.show} close={closeModal}>
        {modal.component}
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};
