import React from "react";
import { Link, useLinkClickHandler } from "react-router-dom";
import {
  ToggleMode,
  Logo,
  TitleField,
  Btn,
} from "../../components/designSystem";
import "./home-page.scss";

export const HomePage = () => {
  const toLogin = useLinkClickHandler("/login");

  return (
    <div className="home">
      <div className="home-left" />
      <div className="home-right">
        <div className="container">
          <div>
            <ToggleMode />
            <Logo />
            <TitleField
              text="Inicia sessión y manten al día tus pagos con mirent"
              center
              size={1.2}
            />
            <Btn
              label="Iniciar sesión"
              btn="main"
              className="btn-block"
              onClick={toLogin}
            />
            <div className="opcion-foot">
              ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
