import { PaletteMode, ThemeOptions } from "@mui/material";

export const getThemeAccordingToMode = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#eeeeee",
          },
          secondary: {
            main: "#a6a6a6",
          },
          success: {
            main: "#328432",
          },
          warning: {
            main: "#c6a53d",
          },
          error: {
            main: "#aa2e25",
          },
        }
      : {
          primary: {
            main: "#373737",
          },
          secondary: {
            main: "#797979",
          },
          success: {
            main: "#328432",
          },
          warning: {
            main: "#c6a53d",
          },
          error: {
            main: "#aa2e25",
          },
        }),
  },
});
