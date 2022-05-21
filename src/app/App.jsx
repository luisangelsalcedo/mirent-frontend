import { BrowserRouter } from "react-router-dom";
import { MainRouter } from "../routes";
import {
  ColorModeProvider,
  NotificationProvider,
} from "../components/designSystem";
import "../assets/scss/main.scss";
import "font-awesome/css/font-awesome.min.css";

export const App = () => (
  <ColorModeProvider>
    <NotificationProvider>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </NotificationProvider>
  </ColorModeProvider>
);
