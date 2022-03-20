import BarChartIcon from "@mui/icons-material/BarChart";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { Grid, IconButton, Typography, useTheme } from "@mui/material";
import { ColorModeContext } from "common/contexts/color-theme-context";
import LightLogo from "common/images/letreiro-light.gif";
import DarkLogo from "common/images/letreiro-dark.gif";
import React, { useState } from "react";
import { HelperModal } from "./components/helper-modal/helper-modal";
import { SettingsModal } from "./components/settings-modal/settings-modal";
import { StatsModal } from "./components/stats-modal/stats-modal";
import styles from "./styles.module.css";

export const Header = (): JSX.Element => {
  const colorMode = React.useContext(ColorModeContext);
  const theme = useTheme();
  const [helperOpen, setHelperOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [statsOpen, setStatsOpen] = useState<boolean>(false);

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs display="flex" justifyContent="flex-start">
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
        <Grid item display="flex" justifyContent="center">
          <Typography variant="h2" className={styles.neonText}>
            L
          </Typography>
          <Typography variant="h2" className={styles.bungeeFont}>
            etreiro
          </Typography>
        </Grid>
        <Grid item xs display="flex" justifyContent="flex-end">
          <IconButton onClick={() => setStatsOpen(true)} color="inherit">
            <BarChartIcon sx={{ fontSize: "inherit" }} />
          </IconButton>
          <IconButton onClick={() => setSettingsOpen(true)} color="inherit">
            <SettingsIcon sx={{ fontSize: "inherit" }} />
          </IconButton>
        </Grid>
      </Grid>
      <HelperModal
        open={helperOpen}
        setIsOpen={setHelperOpen}
        title={"Como jogar"}
      />
      <SettingsModal
        open={settingsOpen}
        setIsOpen={setSettingsOpen}
        title={"Configurações"}
      />
      <StatsModal
        open={statsOpen}
        setIsOpen={setStatsOpen}
        title={"Estatísticas"}
      />
    </>
  );
};
