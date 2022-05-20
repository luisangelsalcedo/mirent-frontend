import React from "react";
import "./scss/inputForm.scss";

/**
 * ## InputForm component
 * * Custom input component
 * **Use:**
 * ```
 * <InputForm fa={String} ...props />
 * ```
 * @param {object} props
 * @returns {jsx} JSX
 */
export const InputForm = React.forwardRef((props, ref) => {
  const { fa } = props;

  return (
    <div className="input-form">
      {fa && <i className={`fa fa-${fa}`} aria-hidden="true" />}
      <input ref={ref} {...props} />
    </div>
  );
});
