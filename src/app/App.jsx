import { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import {
  ColorModeProvider,
  LoadingMain,
  ModalProvider,
  NotificationProvider,
} from "../components/designSystem";
import "../assets/scss/main.scss";
import "font-awesome/css/font-awesome.min.css";
import { ReduxStoreProvider } from "../redux";

const MainRouter = lazy(() => import("../routes"));

export const App = () => (
  <ColorModeProvider>
    <NotificationProvider>
      <ModalProvider>
        <ReduxStoreProvider>
          <BrowserRouter>
            <Suspense fallback={<LoadingMain />}>
              <MainRouter />
            </Suspense>
          </BrowserRouter>
        </ReduxStoreProvider>
      </ModalProvider>
    </NotificationProvider>
  </ColorModeProvider>
);
