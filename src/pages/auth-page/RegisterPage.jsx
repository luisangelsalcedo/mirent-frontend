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

export const RegisterPage = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const btnRef = useRef();

  const toHome = useLinkClickHandler("/");

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
    const user = {
      name: nameRef.current.value,
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
            label="Registrate"
            btn="main"
            className="btn-block"
            disabled
          />
        </form>
        <div className="opcion-foot">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
};
