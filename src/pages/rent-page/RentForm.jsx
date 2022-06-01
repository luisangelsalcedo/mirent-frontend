import React, { useContext, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { rentAdapter } from "../../adapters";
import {
  Btn,
  InputForm,
  ModalContext,
  TitleField,
} from "../../components/designSystem";
import { useFetchAndLoad } from "../../hooks";
import { createRentService } from "../../services";
import { createRentAction } from "../../redux/actions";

export const RentForm = ({ id }) => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const { closeModal } = useContext(ModalContext);

  const { property } = useSelector((state) => state.property);
  const [payDate, setPayDate] = useState(null);
  const paydateRef = useRef();
  // const nameRef = useRef();
  const amountRef = useRef();
  const btnRef = useRef();
  const detailsRef = useRef();

  const dispatch = useDispatch();

  const handleChange = () => {};

  const handleChangeDate = (date) => (ref) => (setState) => {
    ref.current = date;
    setState(date);
    let isDisabled = true;
    if (paydateRef.current) isDisabled = false;
    btnRef.current.disabled = isDisabled;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doc = {
      name: "", // nameRef.current.value
      paydate: paydateRef.current,
      amount: amountRef.current.value,
      details: detailsRef.current.value,
    };

    const result = await callEndpoint(createRentService(id, doc));
    const { rent } = rentAdapter(result);
    if (rent) {
      dispatch(createRentAction(rent));
      closeModal();
    }
  };

  return (
    <div>
      <TitleField text="Nuevo pago" center />
      <form onSubmit={handleSubmit}>
        <div className="item-label">Vencimiento de pago</div>
        <DatePicker
          selected={payDate}
          onChange={(date) => handleChangeDate(date)(paydateRef)(setPayDate)}
          dateFormat="d MMMM, yyyy"
          minDate={new Date()}
        />
        {/* <InputForm
          ref={nameRef}
          placeholder="Nombre de referencia"
          fa="tag"
          onChange={handleChange}
        /> */}

        <InputForm
          ref={amountRef}
          placeholder="Cantidad a pagar (USD)"
          fa="money"
          onChange={handleChange}
          required
          pattern=".*^(?:\+|-)?\d+$.*"
          title="Ingresa solo números"
          defaultValue={property?.price}
          disabled
        />
        <InputForm
          ref={detailsRef}
          placeholder="Deja un comentario"
          fa="comment"
          onChange={handleChange}
        />

        <Btn
          ref={btnRef}
          fa={loading ? "circle-o-notch fa-spin fa-fw" : ""}
          label={loading ? "Cargando..." : "Crear"}
          btn="main"
          className="btn-block"
          type="submit"
          disabled
        />
      </form>
    </div>
  );
};
