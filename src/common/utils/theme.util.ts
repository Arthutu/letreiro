import { PaletteMode, ThemeOptions } from "@mui/material";

export const getThemeAccordingToMode = (
  mode: PaletteMode,
  isColorBlind: boolean
): ThemeOptions => {
  const themeOptions = {
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
              main: isColorBlind ? "#0197f6" : "#328432",
            },
            warning: {
              main: isColorBlind ? "#e36322" : "#c6a53d",
            },
            error: {
              main: "#aa2e25",
            }
          }
        : {
            primary: {
              main: "#373737",
            },
            secondary: {
              main: "#797979",
            },
            success: {
              main: isColorBlind ? "#0197f6" : "#328432",
            },
            warning: {
              main: isColorBlind ? "#e36322" : "#c6a53d",
            },
            error: {
              main: "#aa2e25",
            },
          }),
    },
    typography: {
      h2: {
        fontSize: "1.5rem",
        "@media (min-width:680px)": {
          fontSize: "3.5rem",
        },
      },
    },
  };

  document.documentElement.style.setProperty(
    "--success-color",
    themeOptions.palette.success.main
  );
  document.documentElement.style.setProperty(
    "--warning-color",
    themeOptions.palette.warning.main
  );
  document.documentElement.style.setProperty(
    "--secondary-color",
    themeOptions.palette.secondary.main
  );

  return themeOptions;
};
