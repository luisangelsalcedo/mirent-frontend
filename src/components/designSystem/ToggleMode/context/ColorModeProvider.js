import { createContext, useMemo, useState } from "react";

export const ColorModeContext = createContext({});

export const ColorModeProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState(() => {
    const darkMode = JSON.parse(localStorage.getItem("dark-mode"));
    return darkMode;
  });

  const changeColorMode = () => {
    setColorMode((mode) => {
      localStorage.setItem("dark-mode", !mode);
      return !mode;
    });
  };

  const valueMemo = useMemo(
    () => ({
      colorMode,
      changeColorMode,
    }),
    [colorMode]
  );

  return (
    <ColorModeContext.Provider value={valueMemo}>
      <main className={colorMode ? "dark" : ""}>{children}</main>
    </ColorModeContext.Provider>
  );
};
