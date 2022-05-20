import { ReactComponent as SVG } from "./svg/logo-mirent.svg";
import "./scss/logo.scss";

export const Logo = ({ handler }) => (
  <button className="logo" type="button" onClick={handler}>
    <SVG />
  </button>
);
