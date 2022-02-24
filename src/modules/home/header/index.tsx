import BarChartIcon from "@mui/icons-material/BarChart";
import GitHubIcon from "@mui/icons-material/GitHub";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { Grid, IconButton, useTheme } from "@mui/material";
import { ColorModeContext } from "common/contexts/color-theme-context";
import logo from "common/images/letreiro-logo.gif";
import React from "react";
import { useState } from "react";
import { HelperModal } from "./components/helper-modal/helper-modal";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";

export const Header = (): JSX.Element => {
  const colorMode = React.useContext(ColorModeContext);
  const theme = useTheme();
  const [helperOpen, setHelperOpen] = useState<boolean>(false);
  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs display="flex" justifyContent="flex-end">
          <IconButton onClick={() => setHelperOpen(true)} color="inherit">
            <InfoOutlinedIcon sx={{ fontSize: "inherit" }} />
          </IconButton>
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon sx={{ fontSize: "inherit" }} />
            ) : (
              <Brightness4Icon sx={{ fontSize: "inherit" }} />
            )}
          </IconButton>
        </Grid>
        <Grid item xs={4} display="flex" justifyContent="center">
          <img alt={"Letreiro's Logo"} src={logo} />
        </Grid>
        <Grid item xs display="flex" justifyContent="flex-start">
          <IconButton color="inherit">
            <BarChartIcon sx={{ fontSize: "inherit" }} />
          </IconButton>
          <IconButton color="inherit">
            <SettingsIcon sx={{ fontSize: "inherit" }} />
          </IconButton>
        </Grid>
      </Grid>
      <HelperModal open={helperOpen} setIsOpen={setHelperOpen} />
    </>
  );
};
