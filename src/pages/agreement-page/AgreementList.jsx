import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
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
  getPropertyService,
  updateAgreementService,
} from "../../services";
import { AgreementForm } from "./AgreementForm";
import { agreementAdapter } from "../../adapters/index";
import {
  getAllAgreementAction,
  updateAgreementAction,
  updatePropertyAction,
} from "../../redux/actions";
import { AgreementDelete } from "./AgreementDelete";
import { AgreementDetails } from "./AgreementDetails";
import { AgreementArchived } from "./AgreementArchived";
import { AgreementView } from "./AgreementView";

export const AgreementList = () => {
  moment.locale("es");
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const position = searchParams.get("pos");

  const { list, agreement } = useSelector((state) => state.agreement);
  const dispatch = useDispatch();

  const { loading, callEndpoint } = useFetchAndLoad();
  const { openModal, closeModal } = useContext(ModalContext);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleLoad = async () => {
    const result = await callEndpoint(getAllAgreementByPropertyService(id));
    const { agreement: arrAgreement } = agreementAdapter(result);

    if (arrAgreement?.length) {
      dispatch(getAllAgreementAction(arrAgreement));
    } else {
      dispatch(getAllAgreementAction([]));
    }
  };

  const loadDates = () => {
    setStartDate(moment(agreement?.startdate));
    setEndDate(moment(agreement?.enddate));
  };

  const handleActiveAgreement = async () => {
    const disabled = { status: { disabled: true } };
    const active = { status: { active: true } };

    const status = agreement?.status?.active ? disabled : active;

    const result = await callEndpoint(
      updateAgreementService(agreement?._id, status)
    );
    const { agreement: updated } = agreementAdapter(result);
    dispatch(updateAgreementAction(updated));
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

  const btnNewAgreement = (
    <>
      <Btn
        label="Crear nuevo contrato"
        btn="main"
        fa="plus"
        className="btn-block"
        onClick={() => openModal(<AgreementForm id={id} position={position} />)}
      />
    </>
  );

  const btnDestroyAgreement = (
    <>
      <AgreementDetails id={agreement?._id} />
      <Btn
        label="Eliminar contrato"
        btn="danger"
        className="btn-block"
        onClick={() =>
          openModal(<AgreementDelete id={agreement?._id} position={position} />)
        }
      />
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

  const btnArchivedAgreement = (
    <>
      {agreement?.status?.signed ? (
        <>
          <hr />
          <Btn
            label="Archivar contrato"
            fa="folder-open-o"
            btn="main"
            className="btn-block"
            onClick={() =>
              openModal(
                <AgreementArchived id={agreement?._id} position={position} />
              )
            }
          />
        </>
      ) : (
        ""
      )}
    </>
  );

  const checkActive = (
    <>
      <hr />
      {agreement?.status?.active ? "Contrato activado" : "Activar contrato"}

      <Check
        id={agreement?._id}
        check={agreement?.status?.active}
        changeMode={handleActiveAgreement}
      />
      {loading && (
        <>
          <Preloading className="inline" /> cargando...
        </>
      )}
    </>
  );

  useEffect(() => {
    handleLoad();
  }, []);

  useEffect(() => {
    loadDates();
  }, [agreement]);

  return (
    <div className="agreements">
      {agreementName}
      {!agreement?._id ? (
        btnNewAgreement
      ) : (
        <>
          {agreement?.status?.disabled ? btnDestroyAgreement : btnViewAgreement}

          {agreement?.details && !agreement?.status?.signed
            ? checkActive
            : btnArchivedAgreement}
        </>
      )}
    </div>
  );
};

/* Contrato
            {agreement?.status?.disabled && " no activo"}
            {agreement?.status?.active && " activo"}
            {agreement?.status?.signed && " firmado"} */

/* Activar contrato
 */
