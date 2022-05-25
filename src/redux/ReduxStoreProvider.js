import { Provider } from "react-redux";
import store from "./store/store";

export const ReduxStoreProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
