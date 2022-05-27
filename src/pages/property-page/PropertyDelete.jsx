import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { propertyAdapter } from "../../adapters";
import {
  Btn,
  ModalContext,
  NotificationContext,
  TitleField,
} from "../../components/designSystem";
import { useFetchAndLoad } from "../../hooks";
import { deletePropertyAction } from "../../redux/actions";
import { deletePropertyService } from "../../services";

export const PropertyDelete = ({ id }) => {
  const toReturn = "/dashboard";
  const { property } = useSelector((state) => state.property);
  const dispatch = useDispatch();

  const { loading, callEndpoint } = useFetchAndLoad();
  const { openNotice } = useContext(NotificationContext);
  const { closeModal } = useContext(ModalContext);

  const handleDelete = async () => {
    const result = await callEndpoint(deletePropertyService(id));
    const { message, success } = propertyAdapter(result);
    if (success) {
      dispatch(deletePropertyAction(id));
      openNotice(message);
      closeModal();
      window.location.replace(toReturn);
    }
  };
  return (
    <div>
      <TitleField text="Estas seguro?" fa="exclamation-triangle" />
      <p>
        <b>{property?.name}</b> se eliminará de forma permanente
      </p>
      <Btn
        label="Eliminar"
        btn="danger"
        className="btn-block"
        disabled={loading}
        onClick={handleDelete}
      />
    </div>
  );
};
