import { BrowserRouter } from "react-router-dom";
import { MainRouter } from "../routes";
import {
  ColorModeProvider,
  ModalProvider,
  NotificationProvider,
} from "../components/designSystem";
import "../assets/scss/main.scss";
import "font-awesome/css/font-awesome.min.css";
import { ReduxStoreProvider } from "../redux";

export const App = () => (
  <ColorModeProvider>
    <NotificationProvider>
      <ModalProvider>
        <ReduxStoreProvider>
          <BrowserRouter>
            <MainRouter />
          </BrowserRouter>
        </ReduxStoreProvider>
      </ModalProvider>
    </NotificationProvider>
  </ColorModeProvider>
);
