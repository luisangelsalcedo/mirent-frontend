import React, { useContext, useEffect, useRef } from "react";
import { Link, useLinkClickHandler } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Btn,
  Logo,
  TitleField,
  ToggleMode,
  InputForm,
  NotificationContext,
} from "../../components/designSystem";
import "./auth-page.scss";
import { useFetchAndLoad } from "../../hooks";
import { loginService, validateTokenService } from "../../services";
import { payloadAuthAdapter, tokenAdapter } from "../../adapters";
import { loginAction } from "../../redux/actions";

export const LoginPage = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const btnRef = useRef();
  const toHome = useLinkClickHandler("/");
  const { loading, callEndpoint } = useFetchAndLoad();
  const { openNotice } = useContext(NotificationContext);
  const dispatch = useDispatch();

  const handleChange = () => {
    emailRef.current.value = emailRef.current.value.trim();

    const emailVal = emailRef.current.value.length;
    const passVal = passRef.current.value.length;
    let isDisable = true;
    if (emailVal + passVal) isDisable = false;
    btnRef.current.disabled = isDisable;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userlogin = {
      email: emailRef.current.value.trim().toLowerCase(),
      password: passRef.current.value,
    };
    const { token } = tokenAdapter(await callEndpoint(loginService(userlogin)));
    if (!token) return;

    const { payload } = payloadAuthAdapter(
      await callEndpoint(validateTokenService(token))
    );
    if (!payload) return;

    dispatch(loginAction({ ...payload, token }));
    await openNotice(`Welcome ${payload.name}`);
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <div className="auth">
      <ToggleMode />
      <div className="box">
        <Logo onClick={toHome} />

        <TitleField text="Inicia sesión para continuar" center size={1.2} />
        <form onSubmit={handleSubmit}>
          <InputForm
            ref={emailRef}
            placeholder="Correo Electrónico"
            fa="envelope"
            onChange={handleChange}
          />
          <InputForm
            ref={passRef}
            type="password"
            placeholder="Contraseña"
            fa="lock"
            onChange={handleChange}
          />
          <Btn
            ref={btnRef}
            type="submit"
            fa={loading ? "circle-o-notch fa-spin fa-fw" : ""}
            label={loading ? "Cargando..." : "Inicia sesión"}
            btn="main"
            className="btn-block"
            disabled={loading}
          />
        </form>
        <div className="opcion-foot">
          <Link to="/recover">¿Ha olvidado su contraseña?</Link>
        </div>
        <div className="opcion-foot">
          ¿Aún no tienes un cuenta? <Link to="/register">Únete</Link>
        </div>
      </div>
    </div>
  );
};
