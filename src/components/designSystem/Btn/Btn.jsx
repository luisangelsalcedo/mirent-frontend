import React, { useEffect, useRef, useState } from "react";
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
  const { label, fa, btn, className, ...res } = props;
  const [classBtn, setClassBtn] = useState("btn");

  useEffect(() => {
    if (btn) setClassBtn((c) => `${c} btn-${btn}`);
    if (fa) setClassBtn((c) => `${c} btn-icon`);
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      className={`${classBtn} ${className}`}
      {...res}
    >
      {fa && <i className={`fa fa-${fa}`} aria-hidden="true" />}
      {label && <span>{label}</span>}
    </button>
  );
});
