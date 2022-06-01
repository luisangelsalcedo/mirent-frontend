import React, { useContext, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import {
  Btn,
  ModalContext,
  TitleField,
  NotificationContext,
} from "../../components/designSystem";
import { useFetchAndLoad } from "../../hooks";
import { createAgreementService } from "../../services";
import { agreementAdapter } from "../../adapters";
import {
  createAgreementAction,
  getOnePropertyAction,
  updatePropertyAction,
} from "../../redux/actions";

export const AgreementForm = ({ id }) => {
  const { openNotice } = useContext(NotificationContext);
  const { closeModal } = useContext(ModalContext);
  const { loading, callEndpoint } = useFetchAndLoad();
  const btnRef = useRef();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const startDateRef = useRef();
  const endDateRef = useRef();
  const dispatch = useDispatch();

  const handleChange = (date) => (ref) => (setState) => {
    ref.current = date;
    setState(date);
    let isDisabled = true;
    if (startDateRef.current && endDateRef.current) isDisabled = false;
    btnRef.current.disabled = isDisabled;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAgreement = {
      property: id,
      startdate: startDateRef.current,
      enddate: endDateRef.current,
    };
    const result = await callEndpoint(createAgreementService(id, newAgreement));
    const { message, agreement } = agreementAdapter(result);
    const { property } = agreement;

    if (agreement) {
      dispatch(createAgreementAction(agreement));
      dispatch(updatePropertyAction(property));
      closeModal();
      openNotice(message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TitleField text="Nuevo contrato de alquiler" center />

        <div className="item-label">Fecha de inicio</div>
        <DatePicker
          selected={startDate}
          onChange={(date) => handleChange(date)(startDateRef)(setStartDate)}
          dateFormat="d MMMM, yyyy"
          minDate={new Date()}
        />
        <div className="item-label">Fecha de expiración</div>
        <DatePicker
          selected={endDate}
          onChange={(date) => handleChange(date)(endDateRef)(setEndDate)}
          dateFormat="d MMMM, yyyy"
          minDate={new Date()}
        />
        <Btn
          ref={btnRef}
          fa={loading ? "circle-o-notch fa-spin fa-fw" : ""}
          label={loading ? "Cargando..." : "Crear contrato"}
          btn="main"
          className="btn-block"
          type="submit"
          disabled
        />
      </form>
    </>
  );
};
