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

export const AgreementForm = () => {
  const { openNotice } = useContext(NotificationContext);
  const { closeModal } = useContext(ModalContext);
  const { loading, callEndpoint } = useFetchAndLoad();

  const btnRef = useRef();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleChange = () => {
    // console.log("editar campo de texto");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Guardar contrato");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TitleField text="Nuevo contrato de alquiler" size="1.2" center />
        <div>Fecha de inicio</div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="d MMMM, yyyy"
          minDate={new Date()}
        />

        <div>Fecha de final</div>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="d MMMM, yyyy"
          minDate={new Date()}
        />

        <div>Detalles del contrato</div>
        <textarea name="" id="" cols="30" rows="10" onChange={handleChange} />

        <Btn
          ref={btnRef}
          fa={loading ? "circle-o-notch fa-spin fa-fw" : ""}
          label={loading ? "Cargando..." : "Crear"}
          btn="main"
          className="btn-block"
          type="submit"
          disabled={loading}
        />
      </form>
    </>
  );
};
