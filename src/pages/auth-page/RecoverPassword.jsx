import React, { useContext, useEffect, useRef } from "react";
import { Link, useLinkClickHandler, useNavigate } from "react-router-dom";
import {
  Btn,
  Logo,
  TitleField,
  ToggleMode,
  InputForm,
  NotificationContext,
  Preloading,
} from "../../components/designSystem";
import "./auth-page.scss";
import { useFetchAndLoad } from "../../hooks";
import { recoverPasswordService } from "../../services";
import { tokenAdapter } from "../../adapters";

export const RecoverPassword = () => {
  const emailRef = useRef();
  const btnRef = useRef();
  const toHome = useLinkClickHandler("/");
  const { loading, callEndpoint } = useFetchAndLoad();
  const { openNotice } = useContext(NotificationContext);
  const navigate = useNavigate();

  const handleChange = () => {
    emailRef.current.value = emailRef.current.value.trim();
    const emailVal = emailRef.current.value.length;
    let isDisable = true;
    if (emailVal) isDisable = false;
    btnRef.current.disabled = isDisable;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = {
      email: emailRef.current.value.trim().toLowerCase(),
    };
    const { success } = tokenAdapter(
      await callEndpoint(recoverPasswordService(username))
    );

    if (success) {
      await openNotice("link valid for 5 minutes", 2000);
      await openNotice("check your inbox for the reset link");
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <div className="auth">
      <ToggleMode />
      <div className="box">
        <Logo onClick={toHome} />
        {loading ? (
          <>
            <Preloading />
            enviando correo...
          </>
        ) : (
          <>
            <TitleField text="Restablecer la contraseña" center size={1.5} />
            <p className="center">
              Ingrese la dirección de correo electrónico que usa para iniciar
              sesión.
            </p>
            <form onSubmit={handleSubmit}>
              <InputForm
                ref={emailRef}
                placeholder="Correo Electrónico"
                fa="envelope"
                onChange={handleChange}
                type="email"
              />

              <Btn
                ref={btnRef}
                type="submit"
                label="Obtener el enlace de restablecimiento"
                btn="main"
                className="btn-block"
                disabled
              />
            </form>
          </>
        )}
        <div className="opcion-foot">
          ¡Olvídalo! <Link to="/login">Regreso a iniciar sesión</Link>
        </div>
      </div>
    </div>
  );
};
