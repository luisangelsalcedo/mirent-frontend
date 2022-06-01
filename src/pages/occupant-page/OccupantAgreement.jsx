import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  Btn,
  Check,
  ModalContext,
  TitleField,
  Preloading,
} from "../../components/designSystem";
import { useFetchAndLoad } from "../../hooks";
import {
  getAllAgreementByPropertyService,
  updateAgreementService,
} from "../../services";

import { agreementAdapter } from "../../adapters/index";
import {
  getAllAgreementAction,
  updateAgreementAction,
} from "../../redux/actions";

import { AgreementView } from "../agreement-page/AgreementView";

export const OccupantAgreement = () => {
  moment.locale("es");
  const { id } = useParams();

  const { loading, callEndpoint } = useFetchAndLoad();
  const { openModal } = useContext(ModalContext);
  const { agreement } = useSelector((state) => state.agreement);
  const dispatch = useDispatch();

  const handleLoad = async () => {
    const result = await callEndpoint(getAllAgreementByPropertyService(id));
    const { agreement: arrAgreement } = agreementAdapter(result);

    if (arrAgreement?.length) {
      dispatch(getAllAgreementAction(arrAgreement));
    } else {
      dispatch(getAllAgreementAction([]));
    }
  };

  const handleSignedAgreement = async () => {
    const { _id: agreementID } = agreement;
    const signtrue = { sign: true };
    const signfalse = { sign: false };
    const signed = agreement.sign ? signfalse : signtrue;

    const result = await callEndpoint(
      updateAgreementService(agreementID, signed)
    );
    const { agreement: updated } = agreementAdapter(result);
    if (updated) {
      dispatch(updateAgreementAction(updated));
    }
  };

  const handleConfirm = async () => {
    const { _id: agreementID } = agreement;
    const update = { status: { signed: true } };

    const result = await callEndpoint(
      updateAgreementService(agreementID, update)
    );
    const { agreement: updated } = agreementAdapter(result);

    if (updated) {
      dispatch(updateAgreementAction(updated));
    }
  };

  const agreementName = (
    <>
      {!agreement?.status?.rented && agreement?._id && (
        <div>
          <TitleField
            text={`Contrato ${moment(agreement?.startdate).format("LL")}`}
            fa="file-text-o"
            size={1.2}
            center
          />
        </div>
      )}
    </>
  );

  const btnViewAgreement = (
    <>
      <Btn
        label="Ver contenido"
        fa="eye"
        btn="primary"
        className="btn-block"
        onClick={() => openModal(<AgreementView content={agreement} />)}
      />
    </>
  );

  const checkSign = (
    <>
      <hr />
      {agreement?.sign ? "Contrato firmado" : "Firmar contrato"}

      <Check
        id={agreement?._id}
        check={agreement?.sign}
        changeMode={handleSignedAgreement}
      />
      {loading && (
        <>
          {!agreement?.status?.signed && (
            <>
              <Preloading className="inline" /> cargando...
            </>
          )}
        </>
      )}
      {agreement?.sign && (
        <>
          <Btn
            label="Confirmar Firma"
            btn="main"
            fa={agreement?.status?.signed && `check`}
            onClick={handleConfirm}
            disabled={agreement?.status?.signed}
          />
        </>
      )}
    </>
  );

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className="agreements">
      {agreementName}
      {agreement?._id && <>{agreement?.status?.disabled || btnViewAgreement}</>}
      {checkSign}
    </div>
  );
};
