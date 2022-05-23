import React, { useContext, useEffect, useRef } from "react";
import { Link, useLinkClickHandler, useNavigate } from "react-router-dom";
import {
  Btn,
  Logo,
  TitleField,
  ToggleMode,
  InputForm,
  NotificationContext,
} from "../../components/designSystem";
import { useFetchAndLoad } from "../../hooks";
import { registerUserService } from "../../services";
import { userAdapter } from "../../adapters";
import "./auth-page.scss";

export const RegisterPage = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const btnRef = useRef();
  const goToLoginPage = "/login";
  const navigate = useNavigate();

  const toHome = useLinkClickHandler("/");
  const { openNotice } = useContext(NotificationContext);
  const { loading, callEndpoint } = useFetchAndLoad();

  const handleChange = () => {
    emailRef.current.value = emailRef.current.value.trim();

    const nameVal = nameRef.current.value.length;
    const emailVal = emailRef.current.value.length;
    const passVal = passRef.current.value.length;
    let isDisable = true;
    if (nameVal + emailVal + passVal) isDisable = false;
    btnRef.current.disabled = isDisable;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name: nameRef.current.value,
      email: emailRef.current.value.trim().toLowerCase(),
      password: passRef.current.value,
    };
    const { user } = userAdapter(
      await callEndpoint(registerUserService(newUser))
    );
    if (!user) return;

    navigate(goToLoginPage, { replace: true });
    await openNotice(`sign in with ${user.email}`);
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <div className="auth">
      <ToggleMode />
      <div className="box">
        <Logo onClick={toHome} />

        <TitleField text="Crea tu cuenta para continuar" center size={1.2} />
        <form onSubmit={handleSubmit}>
          <InputForm
            ref={nameRef}
            placeholder="Ingresa tu Nombre"
            fa="user"
            onChange={handleChange}
          />
          <InputForm
            ref={emailRef}
            placeholder="Ingresa un Correo Electrónico"
            fa="envelope"
            onChange={handleChange}
          />
          <InputForm
            ref={passRef}
            placeholder="Ingresa una Contraseña"
            fa="lock"
            onChange={handleChange}
          />
          <Btn
            ref={btnRef}
            type="submit"
            fa={loading ? "circle-o-notch fa-spin fa-fw" : ""}
            label={loading ? "Cargando..." : "Registrate"}
            btn="main"
            className="btn-block"
            disabled={loading}
          />
        </form>
        <div className="opcion-foot">
          ¿Ya tienes un cuenta? <Link to="/login">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
};
