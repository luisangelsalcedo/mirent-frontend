import React from "react";
import { useLinkClickHandler } from "react-router-dom";
import {
  Btn,
  Logo,
  TitleField,
  ToggleMode,
} from "../../components/designSystem";
import "./not-found.scss";

export const NotfoundPage = () => {
  const toHome = useLinkClickHandler("/", { replace: true });
  return (
    <div className="auth">
      <ToggleMode />
      <div className="box">
        <Logo onClick={toHome} />
        <br />
        <br />
        <TitleField
          text=" Página no encontrada"
          center
          fa="hand-paper-o "
          fasize={2.5}
        />
        <Btn label="Volver al inicio" btn="main" fa="home" onClick={toHome} />
      </div>
    </div>
  );
};
