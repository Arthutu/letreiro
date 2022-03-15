import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { ColorModeContext } from "common/contexts/color-theme-context";
import { getThemeAccordingToMode } from "common/utils/theme.util";
import { Home } from "modules/home";
import React, { useEffect, useMemo, useState } from "react";

export const LetreiroApp = (): JSX.Element => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [paletteMode, setPaletteMode] = useState<PaletteMode>("dark");
  const [colorBlind, setColorBlind] = useState<boolean>(false);

  useEffect(() => {
    setPaletteMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  const colorMode = useMemo(
    () => () => {
      setPaletteMode((prevMode: PaletteMode) =>
        prevMode === "light" ? "dark" : "light"
      );
    },
    []
  );

  const colorBlindMode = useMemo(
    () => () => {
      setColorBlind((prevMode: boolean) => !prevMode);
    },
    []
  );

  const theme = useMemo(
    () => createTheme(getThemeAccordingToMode(paletteMode, colorBlind)),
    [paletteMode, colorBlind]
  );

  return (
    <ColorModeContext.Provider
      value={{
        toggleColorMode: colorMode,
        toggleColorBlindMode: colorBlindMode,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Home />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
