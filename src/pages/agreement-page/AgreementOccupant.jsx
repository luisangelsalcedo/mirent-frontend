import React, { useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAdapter, agreementAdapter } from "../../adapters";
import {
  Btn,
  InputForm,
  NotificationContext,
  Avatar,
} from "../../components/designSystem";
import { useFetchAndLoad } from "../../hooks";
import { updateAgreementAction } from "../../redux/actions";
import {
  deleteUserService,
  invitationUserService,
  sendInvitationUserService,
  updateAgreementService,
} from "../../services";

export const AgreementOccupant = () => {
  const emailRef = useRef();
  const btnRef = useRef();
  const { loading, callEndpoint } = useFetchAndLoad();
  const { id: userId } = useSelector((state) => state.user.auth);
  const { agreement } = useSelector((state) => state.agreement);
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
        updateAgreementService(agreement?._id, update)
      );
      const { agreement: agreementUpdated } = agreementAdapter(updated);
      dispatch(updateAgreementAction(agreementUpdated));
      openNotice(message);
    }
  };

  const sendInvitation = async () => {
    const result = await callEndpoint(
      sendInvitationUserService(userId, agreement?.occupant)
    );
    const { message, user } = userAdapter(result);

    openNotice(message);
  };

  const deleteInvitation = async () => {
    if (!agreement?.occupant?.active) {
      //
      const invited = await callEndpoint(
        deleteUserService(agreement?.occupant?._id)
      );

      const { success, message } = userAdapter(invited);
      if (success) openNotice(message);
    }

    const result = await callEndpoint(
      updateAgreementService(agreement?._id, { occupant: null })
    );
    const { agreement: agreementUpdated } = agreementAdapter(result);
    dispatch(updateAgreementAction(agreementUpdated));
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

  return (
    <div>
      {!agreement?.occupant ? (
        invitationForm
      ) : (
        <>
          <div>
            <div className="item-label">
              {!agreement?.occupant?.active && "Invitado"}
            </div>
            <Avatar
              name={agreement?.occupant?.name}
              img={agreement?.occupant?.image?.thumb}
            />
            {agreement?.occupant?.email}
          </div>

          <div>
            {!agreement?.occupant?.active ? (
              btnsInvitation
            ) : (
              <>{!agreement?.status?.signed && deleteOccupant}</>
            )}
          </div>
        </>
      )}
    </div>
  );
};
