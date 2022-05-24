import React, { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { propertyAdapter } from "../../adapters";
import {
  Btn,
  InputForm,
  NotificationContext,
} from "../../components/designSystem";
import { useFetchAndLoad } from "../../hooks";
import {
  deletePropertyAction,
  updatePropertyAction,
} from "../../redux/actions";
import { deletePropertyService, updatePropertyService } from "../../services";

export const PropertyEdit = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const position = searchParams.get("pos");
  const navigate = useNavigate();

  const { property } = useSelector((state) => state.property);
  const dispatch = useDispatch();

  const nameRef = useRef();
  const priceRef = useRef();
  const addressRef = useRef();
  const detailsRef = useRef();
  const btnRef = useRef();
  const { openNotice } = useContext(NotificationContext);
  const { loading, callEndpoint } = useFetchAndLoad();

  const handleChange = () => {
    const nameVal = nameRef.current.value;
    const priceVal = priceRef.current.value;
    let isDisable = true;
    if (nameVal.length && priceVal.length) isDisable = false;
    btnRef.current.disabled = isDisable;
  };

  const handleDelete = async () => {
    const result = await callEndpoint(deletePropertyService(id));
    const { message, success } = propertyAdapter(result);
    if (success) {
      dispatch(deletePropertyAction(id));
      openNotice(message);
      navigate("/dashboard", { replace: true });
    }
  };

  const setValues = () => {
    nameRef.current.value = property?.name;
    priceRef.current.value = property?.price;
    addressRef.current.value = property?.address;
    detailsRef.current.value = property?.details;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = {
      name: nameRef.current.value,
      price: priceRef.current.value,
      address: addressRef.current.value,
      details: detailsRef.current.value,
    };

    const result = await callEndpoint(updatePropertyService(id, updated));
    const { property: updatedProperty, message } = propertyAdapter(result);
    if (updatedProperty) {
      dispatch(updatePropertyAction(updatedProperty, position));
      openNotice(message);
    }
  };
  useEffect(() => {
    setValues();
  }, [property]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputForm
          ref={nameRef}
          placeholder="¿Comó se llamará?"
          fa="home"
          onChange={handleChange}
          required
          disabled={property?.status?.available}
          defaultValue={property?.name}
        />
        <InputForm
          ref={priceRef}
          placeholder="Precio del aquiler"
          fa="money"
          onChange={handleChange}
          required
          disabled={property?.status?.available}
          defaultValue={property?.price}
        />
        <InputForm
          ref={addressRef}
          placeholder="Dirección del inmueble"
          fa="map-marker"
          onChange={handleChange}
          disabled={property?.status?.available}
          defaultValue={property?.address}
        />
        <InputForm
          ref={detailsRef}
          placeholder="Agrega otros detalles"
          fa="info-circle"
          onChange={handleChange}
          disabled={property?.status?.available}
          defaultValue={property?.details}
        />
        {property?.status?.available || (
          <Btn
            ref={btnRef}
            fa={loading ? "circle-o-notch fa-spin fa-fw" : ""}
            label={loading ? "Cargando..." : "Actualizar"}
            btn="main"
            className="btn-block"
            type="submit"
            disabled={loading}
          />
        )}
        <Btn
          ref={btnRef}
          fa={loading ? "circle-o-notch fa-spin fa-fw" : ""}
          label={loading ? "Cargando..." : "Eliminar"}
          btn="danger"
          className="btn-block"
          disabled={loading}
          onClick={handleDelete}
        />
      </form>
    </>
  );
};
