import React, { useContext, useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch } from "react-redux";
import { config } from "../../config";
import {
  Btn,
  FaIcon,
  ModalContext,
  NotificationContext,
} from "../../components/designSystem";
import "./pay-page.scss";
import { useFetchAndLoad } from "../../hooks";
import { payRentService } from "../../services";
import { rentAdapter } from "../../adapters";

import { updateRentAction } from "../../redux/actions";
import { TitleField } from "../../components/designSystem/TitleField/TitleField";

const stripePromise = loadStripe(`${config.stripe.publicKey}`);

const CheckoutForm = ({ rent }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { loading, callEndpoint } = useFetchAndLoad();
  const { openAlert } = useContext(NotificationContext);
  const { closeModal } = useContext(ModalContext);
  const { _id: rentID } = rent;
  const dispatch = useDispatch();
  const [successfull, setSuccessfull] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;
      const result = await callEndpoint(payRentService(rentID, { id }));
      const { success, rent: rentPaymented } = rentAdapter(result);
      if (success) {
        setSuccessfull(success);
        dispatch(updateRentAction(rentPaymented));
        setTimeout(() => {
          closeModal();
        }, 3000);
      }
    } else openAlert("Enter a correct card number");
  };

  return (
    <div className="paypage">
      {successfull ? (
        <>
          <FaIcon
            fa="check-circle"
            size={6}
            className="faicon-block"
            color="main"
          />
          <TitleField text="¡Enhorabuena!" center size={2.3} />
          <center>
            Su pago fue realizado con éxito
            <br />
            <br />
            <TitleField text="¡Gracias!" center />
          </center>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <FaIcon fa="credit-card" size={3} className="faicon-block" />
            <TitleField text="Realizar pago" center size={1.8} />
            <hr />
            <b>Pago: </b> {rent.name}
            <hr />
            <b>Monto: </b> {rent.amount} (USD)
            <hr />
            <div className="item-label">Ingresa tu tarjeta</div>
            <CardElement />
            <Btn
              label={loading ? "Cargando..." : "Pagar"}
              fa={loading ? "circle-o-notch fa-spin fa-fw" : "credit-card"}
              btn="main"
              type="submit"
              className="btn-block"
              disabled={loading}
            />
          </form>
        </>
      )}
    </div>
  );
};

export const PayPage = (props) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm {...props} />
  </Elements>
);
