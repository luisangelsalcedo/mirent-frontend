import { useEffect } from "react";
import ReactDOM from "react-dom";
import "./scss/modal.scss";
import { Btn } from "../Btn/Btn";
import { ReduxStoreProvider } from "../../../redux";
import { ColorModeProvider } from "../ToggleMode";

/**
 * ## Modal component
 * * Custom Modal component
 * **Use:**
 * ```
 * <Modal show={Boolean} close={Function}>
 * ```
 * @param {object} props
 * @returns {jsx} JSX
 */
export const Modal = ({ children, show, close }) => {
  const portalNode = document.createElement("div");

  useEffect(() => {
    document.body.appendChild(portalNode);
    return () => {
      portalNode.remove();
    };
  }, [portalNode]);

  return ReactDOM.createPortal(
    <div className="modal-container">
      <ColorModeProvider>
        <ReduxStoreProvider>
          <div className={`modal ${show ? "show" : ""}`}>
            <Btn onClick={close} />
            <div className="modal-content">
              <Btn
                fa="times"
                btn="circle"
                onClick={close}
                className="closeBtn"
              />
              <div className="form-content">{children}</div>
            </div>
          </div>
        </ReduxStoreProvider>
      </ColorModeProvider>
    </div>,
    portalNode
  );
};
