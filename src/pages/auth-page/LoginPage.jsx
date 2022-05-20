import React, { useEffect, useRef } from "react";
import { Link, useLinkClickHandler } from "react-router-dom";
import {
  Btn,
  Logo,
  TitleField,
  ToggleMode,
  InputForm,
} from "../../components/designSystem";
import "./auth-page.scss";

export const LoginPage = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const btnRef = useRef();

  const toHome = useLinkClickHandler("/");

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
    const user = {
      email: emailRef.current.value.trim().toLowerCase(),
      password: passRef.current.value,
    };
    console.log(user);
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
            label="Inicia sesión"
            btn="main"
            className="btn-block"
            disabled
          />
        </form>
        <div className="opcion-foot">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </div>
      </div>
    </div>
  );
};
