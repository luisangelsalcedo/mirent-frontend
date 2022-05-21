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
import { payloadAuthAdapter, tokenAdapter, userAdapter } from "../../adapters";

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

    await openNotice(message);
    await openNotice("Sign back in");
    navigate("/login", { replace: true });
  };

  const handleValidate = async () => {
    const { success, message, payload } = payloadAuthAdapter(
      await callEndpoint(validateTokenService(token))
    );
    if (success) {
      setValidate(success);
      setId(payload.id);
      openNotice(message);
      localStorage.setItem("auth", JSON.stringify({ token }));
    }
  };

  useEffect(() => {
    handleValidate();
  }, []);

  return (
    <div className="auth">
      <ToggleMode />
      <div className="box">
        <Logo onClick={toHome} />
        {validate && (
          <>
            <TitleField text="Cambio de contraseña" center size={1.5} />
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
                label="Cambiar contraseña"
                btn="main"
                className="btn-block"
                disabled
              />
            </form>
          </>
        )}

        {/* <div className="opcion-foot">
          <Link to="/recover">¿Ha olvidado su contraseña?</Link>
        </div>
        <div className="opcion-foot">
          ¿Aún no tienes un cuenta? <Link to="/register">Únete</Link>
        </div> */}
      </div>
    </div>
  );
};
