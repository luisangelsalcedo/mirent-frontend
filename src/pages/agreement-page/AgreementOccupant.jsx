import React, { useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userAdapter, agreementAdapter, propertyAdapter } from "../../adapters";
import {
  Btn,
  InputForm,
  NotificationContext,
  Avatar,
} from "../../components/designSystem";
import { useFetchAndLoad } from "../../hooks";
import {
  updateAgreementAction,
  updatePropertyAction,
} from "../../redux/actions";
import {
  deleteUserService,
  invitationUserService,
  sendInvitationUserService,
  updateAgreementService,
  updatePropertyService,
} from "../../services";

export const AgreementOccupant = ({ position }) => {
  const { id: propertyID } = useParams();
  const emailRef = useRef();
  const btnRef = useRef();
  const { loading, callEndpoint } = useFetchAndLoad();
  const { id: userId } = useSelector((state) => state.user.auth);
  const { property } = useSelector((state) => state.property);
  const dispatch = useDispatch();
  const { openNotice } = useContext(NotificationContext);

  const handleChange = () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = {
      email: emailRef.current.value,
    };
    const result = await callEndpoint(invitationUserService(userId, request));
    const { message, user } = userAdapter(result);

    if (user) {
      const update = {
        occupant: user._id,
      };
      const updated = await callEndpoint(
        updatePropertyService(propertyID, update)
      );
      const { property: propertyUpdated } = propertyAdapter(updated);

      dispatch(updatePropertyAction(propertyUpdated));
      openNotice(message);
    }
  };

  const sendInvitation = async () => {
    const result = await callEndpoint(
      sendInvitationUserService(userId, property?.occupant)
    );
    const { message, user } = userAdapter(result);

    openNotice(message);
  };

  const deleteInvitation = async () => {
    if (!property?.occupant?.active) {
      //
      const invited = await callEndpoint(
        deleteUserService(property?.occupant?._id)
      );
      const { success, message } = userAdapter(invited);
      if (success) openNotice(message);
    }
    const result = await callEndpoint(
      updatePropertyService(property?._id, { occupant: null })
    );
    const { property: propertyUpdated } = propertyAdapter(result);
    dispatch(updatePropertyAction(propertyUpdated));
    openNotice("invitation removed");
  };

  const invitationForm = (
    <>
      <div className="item-label">Agregar un inquilino</div>
      <form onSubmit={handleSubmit}>
        <InputForm
          ref={emailRef}
          placeholder="Ingresa su correo electrónico"
          fa="envelope"
          onChange={handleChange}
          type="email"
          required
        />
        <Btn
          ref={btnRef}
          fa={loading ? "circle-o-notch fa-spin fa-fw" : ""}
          label={loading ? "Cargando..." : "Enviar intivación"}
          className="btn-block"
          btn="main"
          type="submit"
          disabled={loading}
        />
      </form>
    </>
  );

  const btnsInvitation = (
    <>
      <Btn
        label={loading ? "Cargando..." : "Reenviar invitación"}
        btn="main"
        fa={loading ? "circle-o-notch fa-spin fa-fw" : "envelope"}
        onClick={sendInvitation}
        className="btn-block"
        disabled={loading}
      />
      <Btn
        label="Eliminar invitación"
        btn="danger"
        fa="user-times"
        onClick={deleteInvitation}
        className="btn-block"
        disabled={loading}
      />
      <hr />
      <div>Invitación pendiente, por aprobar</div>
    </>
  );

  const deleteOccupant = (
    <>
      <Btn
        label={loading ? "Cargando..." : "Eliminar Inquilino"}
        btn="danger"
        fa={loading ? "circle-o-notch fa-spin fa-fw" : "user-times"}
        onClick={deleteInvitation}
        className="btn-block"
        disabled={loading}
      />
      <hr />
      Queda esperar la firma del inquilino
    </>
  );
  // console.log(property);
  return (
    <div>
      {!property?.occupant ? (
        invitationForm
      ) : (
        <>
          <div>
            <div className="item-label">
              {!property?.occupant?.active && "Invitado"}
            </div>
            <Avatar
              name={property?.occupant?.name}
              img={property?.occupant?.image?.thumb}
            />
            {property?.occupant?.email}
          </div>

          <div>
            {property?.status?.available && (
              <>
                {!property?.occupant?.active ? btnsInvitation : deleteOccupant}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
