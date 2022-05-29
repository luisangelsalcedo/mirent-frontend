import "./scss/check.scss";

/**
 * ## Check component
 * **Use:**
 * ```
 * <Check id={String} check={Boolean} changeMode={Function}/>
 * ```
 * @param {object} props
 * @returns {jsx} JSX
 */
export const Check = ({ id, check = false, changeMode }) => (
  <div className={`check ${check ? "active" : ""}`}>
    <div>
      <input type="checkbox" id={id} onChange={changeMode} />
      <label htmlFor={id} />
    </div>
  </div>
);
