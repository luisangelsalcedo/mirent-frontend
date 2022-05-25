import "./scss/toggleMode.scss";
import { useContext } from "react";
import { ColorModeContext } from "./context/ColorModeProvider";

/**
 * ## ToggleMode component
 * * Dark mode controller component
 * * Works with ColorModeContext and ColorModeProvider context
 * **Use:**
 * ```
 * <ToggleMode />
 * ```
 * @param {object} props
 * @returns {jsx} JSX
 */
export const ToggleMode = () => {
  const { colorMode, changeColorMode } = useContext(ColorModeContext);

  return (
    <div className={`toggle-mode ${colorMode ? "active" : ""}`}>
      <div>
        <input type="checkbox" id="colorModeID" onChange={changeColorMode} />
        <label htmlFor="colorModeID" />
      </div>
    </div>
  );
};
