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
import { updateAgreementService } from "../../services";

export const AgreementArchived = ({ id, position }) => {
  const dispatch = useDispatch();

  const { loading, callEndpoint } = useFetchAndLoad();
  const { openNotice } = useContext(NotificationContext);
  const { closeModal } = useContext(ModalContext);

  const handleArchived = async () => {
    const udpate = { status: { archived: true } };
    const result = await callEndpoint(updateAgreementService(id, udpate));
    const { agreement: deleted, message, success } = agreementAdapter(result);

    if (success) {
      const { property } = deleted;
      dispatch(deleteAgreementAction(id));
      dispatch(updatePropertyAction(property));

      openNotice(message);
      closeModal();
    }
  };

  return (
    <div className="delete">
      <TitleField text="Estas seguro?" fa="exclamation-triangle" />
      <p>
        <b>El contrato</b> se archivará de forma permanente
      </p>
      <Btn
        label="Archivalo, estoy seguro"
        btn="main"
        fa="folder-o"
        className="btn-block"
        disabled={loading}
        onClick={handleArchived}
      />
    </div>
  );
};
