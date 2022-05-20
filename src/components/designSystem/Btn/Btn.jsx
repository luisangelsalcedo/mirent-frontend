import React, { useEffect, useRef } from "react";
import "./scss/btn.scss";

/**
 * ## Btn component
 * * Custom button component
 * **Use:**
 * ```
 * <Btn label={String} fa={String} btn={String} ...props />
 * ```
 * @param {object} props
 * @returns {jsx} JSX
 */
export const Btn = React.forwardRef((props, ref) => {
  const { label, fa, btn, className } = props;

  const classRef = useRef("btn");

  if (btn) classRef.current += ` btn-${btn}`;
  if (fa) classRef.current += " btn-icon";

  useEffect(() => {}, []);

  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className={`${classRef.current} ${className}`}
    >
      {fa && <i className={`fa fa-${fa}`} aria-hidden="true" />}
      {label && <span>{label}</span>}
    </button>
  );
});
