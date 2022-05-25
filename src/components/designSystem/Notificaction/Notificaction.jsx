import ReactDOM from "react-dom";
import { useEffect, useRef } from "react";
import { config } from "../../../config";
import "./scss/notificaction.scss";

/**
 * ## Notificaction component
 * * Custom Notificaction component
 * **Use:**
 * ```
 * <Notificaction handleClose={Function} type={String} fa={String} res={Promise resolve} time={Number}/>
 * ```
 * @param {object} props
 * @returns {jsx} JSX
 */
export const Notificaction = ({
  children,
  handleClose,
  fa,
  type,
  time,
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
      }, time || config.notification.duration);
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
