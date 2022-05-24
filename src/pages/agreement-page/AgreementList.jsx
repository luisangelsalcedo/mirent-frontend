import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Btn, Modal, ModalContext } from "../../components/designSystem";
import { useFetchAndLoad } from "../../hooks";
import { getAllAgreementByPropertyService } from "../../services";
import { AgreementForm } from "./AgreementFrom";

export const AgreementList = () => {
  const { id } = useParams();
  const { loading, callEndpoint } = useFetchAndLoad();
  const { openModal, closeModal } = useContext(ModalContext);

  const handleLoad = async () => {
    // const result = await callEndpoint(getAllAgreementByPropertyService(id));
    // console.log(result.data);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className="agreements">
      <Btn
        label="Crear nuevo contrato"
        btn="main"
        fa="plus"
        className="btn-block"
        onClick={() => openModal(<AgreementForm />)}
      />
      <div className="">&nbsp;</div>
    </div>
  );
};
