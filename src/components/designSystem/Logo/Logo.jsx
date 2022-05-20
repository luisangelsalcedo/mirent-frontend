import React from "react";
import { ReactComponent as SVG } from "./svg/logo-mirent.svg";
import "./scss/logo.scss";

export const Logo = React.forwardRef((props, ref) => (
  <button className="logo" type="button" {...props}>
    <SVG />
  </button>
));
