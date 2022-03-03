import { Stack, Switch, Typography, useTheme } from "@mui/material";
import React from "react";
import { ColorModeContext } from "common/contexts/color-theme-context";

export const SettingsModalContent = (): JSX.Element => {
  const colorMode = React.useContext(ColorModeContext);
  const theme = useTheme();

  return (
    <Stack direction="column" spacing={3} style={{ margin: "1em" }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Modo de alto contraste
        </Typography>
        <Switch
          checked={theme.palette.success.main === "#0197f6"}
          onChange={colorMode.toggleColorBlindMode}
          color="success"
        />
      </Stack>
    </Stack>
  );
};
