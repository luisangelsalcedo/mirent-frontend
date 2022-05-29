import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { agreementAdapter } from "../../adapters";
import {
  Btn,
  ModalContext,
  NotificationContext,
  TitleField,
} from "../../components/designSystem";
import { useFetchAndLoad } from "../../hooks";
import {
  deleteAgreementAction,
  getOnePropertyAction,
  updatePropertyAction,
} from "../../redux/actions";
import { deleteAgreementService } from "../../services";

export const AgreementDelete = ({ id, position }) => {
  const dispatch = useDispatch();

  const { loading, callEndpoint } = useFetchAndLoad();
  const { openNotice } = useContext(NotificationContext);
  const { closeModal } = useContext(ModalContext);

  const handleDelete = async () => {
    const result = await callEndpoint(deleteAgreementService(id));
    const { agreement: deleted, message, success } = agreementAdapter(result);

    if (success) {
      const { property } = deleted;

      dispatch(deleteAgreementAction(id));
      dispatch(updatePropertyAction(property, position));
      dispatch(getOnePropertyAction(property._id));

      openNotice(message);
      closeModal();
    }
  };

  return (
    <div className="delete">
      <TitleField text="Estas seguro?" fa="exclamation-triangle" />
      <p>
        <b>El contrato</b> se eliminará de forma permanente
      </p>
      <Btn
        label="Elimínalo, estoy seguro"
        btn="danger"
        className="btn-block"
        disabled={loading}
        onClick={handleDelete}
      />
    </div>
  );
};
