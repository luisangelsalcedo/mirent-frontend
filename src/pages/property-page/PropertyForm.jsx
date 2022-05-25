import React, { useContext, useEffect, useRef } from "react";

import { useDispatch } from "react-redux";
import { propertyAdapter } from "../../adapters";
import {
  InputForm,
  Btn,
  ModalContext,
  TitleField,
  NotificationContext,
} from "../../components/designSystem";

import { useFetchAndLoad } from "../../hooks";
import { createPropertyService } from "../../services/property.service";
import { createPropertyAction } from "../../redux/actions";

export const PropertyForm = () => {
  const { openNotice } = useContext(NotificationContext);
  const { closeModal } = useContext(ModalContext);
  const { loading, callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const nameRef = useRef();
  const priceRef = useRef();
  const addressRef = useRef();
  const detailsRef = useRef();
  const btnRef = useRef();

  const handleChange = () => {
    const nameVal = nameRef.current.value;
    const priceVal = priceRef.current.value;
    let isDisable = true;
    if (nameVal.length && priceVal.length) isDisable = false;
    btnRef.current.disabled = isDisable;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProperty = {
      name: nameRef.current.value,
      price: priceRef.current.value,
      address: addressRef.current.value,
      details: detailsRef.current.value,
    };

    const { property, message } = propertyAdapter(
      await callEndpoint(createPropertyService(newProperty))
    );

    if (property) {
      dispatch(createPropertyAction(property));
      openNotice(message);
      closeModal();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TitleField text="Crea un nuevo inmueble" size="1.2" center />
        <InputForm
          ref={nameRef}
          placeholder="¿Comó se llamará?"
          fa="home"
          onChange={handleChange}
          required
        />
        <InputForm
          ref={priceRef}
          placeholder="Precio del aquiler"
          fa="money"
          onChange={handleChange}
          required
        />
        <InputForm
          ref={addressRef}
          placeholder="Dirección del inmueble"
          fa="map-marker"
          onChange={handleChange}
        />
        <InputForm
          ref={detailsRef}
          placeholder="Agrega otros detalles"
          fa="info-circle"
          onChange={handleChange}
        />
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
