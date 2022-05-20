import { BrowserRouter } from "react-router-dom";
import { MainRouter } from "../routes";
import { ColorModeProvider } from "../components/designSystem";
import "../assets/scss/main.scss";
import "font-awesome/css/font-awesome.min.css";

export const App = () => (
  <ColorModeProvider>
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  </ColorModeProvider>
);
