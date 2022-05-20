import { BrowserRouter } from "react-router-dom";
import { MainRouter } from "../routes";
import { ColorModeProvider } from "../components/designSystem";
import "../assets/scss/main.scss";

export const App = () => (
  <ColorModeProvider>
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  </ColorModeProvider>
);
