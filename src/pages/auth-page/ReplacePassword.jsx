import React, { useContext, useEffect, useRef, useState } from "react";
import { useLinkClickHandler, useNavigate, useParams } from "react-router-dom";
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
import { updateUserService, validateTokenService } from "../../services";
import { payloadAuthAdapter, userAdapter } from "../../adapters";

export const ReplacePassword = () => {
  const copyRef = useRef();
  const passRef = useRef();
  const btnRef = useRef();
  const toHome = useLinkClickHandler("/");
  const [validate, setValidate] = useState(false);
  const [id, setId] = useState("");
  const { loading, callEndpoint } = useFetchAndLoad();
  const { openAlert, openNotice } = useContext(NotificationContext);
  const { token } = useParams();
  const goToLoginPage = "/login";
  const navigate = useNavigate();

  const handleChange = () => {
    const passVal = passRef.current.value;

    let disableInput = true;
    let disableBtn = true;

    if (passVal.length && passVal.length > 5) {
      disableInput = false;
      disableBtn = false;
    } else copyRef.current.value = "";

    copyRef.current.disabled = disableInput;
    btnRef.current.disabled = disableBtn;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passVal = passRef.current.value;
    const copyVal = copyRef.current.value;

    if (passVal !== copyVal) {
      openAlert("passwords do not match");
      return;
    }
    const updated = { password: passRef.current.value };
    const { message, user } = userAdapter(
      await callEndpoint(updateUserService(id, updated))
    );
    if (!user) return;

    await openNotice(message);
    await openNotice("Sign back in");
    navigate(goToLoginPage, { replace: true });
  };

  const handleValidate = async () => {
    const result = await callEndpoint(validateTokenService(token));
    const { success, message, payload } = payloadAuthAdapter(result);
    if (success) {
      setValidate(success);
      setId(payload.id);
      openNotice(message);
      localStorage.setItem("auth", JSON.stringify({ token }));
    }
  };

  useEffect(() => {
    if (!validate) handleValidate();
  }, []);

  return (
    <div className="auth">
      <ToggleMode />
      <div className="box">
        <Logo onClick={toHome} />
        {validate ? (
          <>
            <TitleField text="Cambio de contraseña" center />
            <p>Usa mínimo 6 caracteres</p>

            <form onSubmit={handleSubmit}>
              <InputForm
                ref={passRef}
                type="password"
                placeholder="Ingresa una Contraseña"
                fa="lock"
                onChange={handleChange}
              />
              <InputForm
                ref={copyRef}
                type="password"
                placeholder="Repite la Contraseña"
                fa="lock"
                onChange={handleChange}
                disabled
              />
              <Btn
                ref={btnRef}
                type="submit"
                fa={loading ? "circle-o-notch fa-spin fa-fw" : ""}
                label={loading ? "Enviando cambios..." : "Cambiar contraseña"}
                btn="main"
                className="btn-block"
                disabled
              />
            </form>
          </>
        ) : (
          <TitleField text=" Página caducáda" center fa="ban" fasize={2.5} />
        )}
      </div>
    </div>
  );
};
