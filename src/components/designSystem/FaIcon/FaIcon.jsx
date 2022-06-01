import React, { useEffect, useRef, useState } from "react";
import "./scss/faicon.scss";

/**
 * ## Btn component
 * * Custom button component
 * **Use:**
 * ```
 * <FaIcon  fa={String} btn={String} size={Number} ...props />
 * ```
 * @param {object} props
 * @returns {jsx} JSX
 */
export const FaIcon = React.forwardRef((props, ref) => {
  const { label, fa, color, className, size, ...res } = props;
  const [classBtn, setClassBtn] = useState("faicon");

  useEffect(() => {
    if (color) setClassBtn((c) => `${c} faicon-${color}`);
    if (fa) setClassBtn((c) => `${c} faicon-icon`);
  }, []);

  return (
    <div ref={ref} className={`${classBtn} ${className}`} {...res}>
      {fa && (
        <i
          className={`fa fa-${fa}`}
          aria-hidden="true"
          style={{ fontSize: `${size}rem` }}
        />
      )}
    </div>
  );
});
