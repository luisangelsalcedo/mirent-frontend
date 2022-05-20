import ReactDOM from "react-dom";
import { useEffect, useRef } from "react";
import "./scss/notificaction.scss";

export const Notificaction = ({
  children,
  handleClose,
  fa,
  type,
  res = null,
}) => {
  const portalNode = document.createElement("div");
  const timer = useRef();

  useEffect(() => {
    document.body.appendChild(portalNode);

    if (children) {
      timer.current = setTimeout(() => {
        handleClose();
        res();
      }, 3000);
    }

    return () => {
      clearTimeout(timer.current);
      portalNode.remove();
    };
  }, [res]);

  return ReactDOM.createPortal(
    <div className={`notificaction-box ${children ? "active" : ""}`}>
      {children ? (
        <div className={type}>
          {fa && <i className={`fa fa-${fa}`} aria-hidden="true" />}
          <span>{children}</span>
        </div>
      ) : (
        ""
      )}
    </div>,
    portalNode
  );
};
