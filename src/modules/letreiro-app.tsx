import {
  PaletteMode,
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { ColorModeContext } from "common/contexts/color-theme-context";
import { getThemeAccordingToMode } from "common/components/theme";
import { Home } from "modules/home";
import React, { useEffect, useState } from "react";

export const LetreiroApp = (): JSX.Element => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = React.useState<PaletteMode>("dark");
  const [colorBlind, setColorBlind] = React.useState<boolean>(false);

  useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  const colorMode = React.useMemo(
    () => () => {
      setMode((prevMode: PaletteMode) =>
        prevMode === "light" ? "dark" : "light"
      );
    },
    []
  );

  const colorBlindMode = React.useMemo(
    () => () => {
      setColorBlind((prevMode: boolean) => !prevMode);
    },
    []
  );

  const theme = React.useMemo(
    () => createTheme(getThemeAccordingToMode(mode, colorBlind)),
    [mode, colorBlind]
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
