import BarChartIcon from "@mui/icons-material/BarChart";
import GitHubIcon from "@mui/icons-material/GitHub";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { Grid, IconButton } from "@mui/material";
import LightLogo from "common/images/letreiro-light.gif";
import DarkLogo from "common/images/letreiro-dark.gif";
import { useState } from "react";
import { HelperModal } from "./components/helper-modal/helper-modal";

export const Header = (): JSX.Element => {
  const [helperOpen, setHelperOpen] = useState<boolean>(false);
  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs display="flex" justifyContent="flex-start">
          <IconButton onClick={() => setHelperOpen(true)}>
            <InfoOutlinedIcon style={{ color: "white", fontSize: "inherit" }} />
          </IconButton>
          <IconButton
            href="https://github.com/Arthutu/letreiro"
            target="_blank"
          >
            <GitHubIcon style={{ color: "white", fontSize: "inherit" }} />
          </IconButton>
        </Grid>
        <Grid item xs={4} display="flex" justifyContent="center">
          <img alt={"Letreiro's Logo"} src={LightLogo} />
        </Grid>
        <Grid item xs display="flex" justifyContent="flex-end">
          <IconButton>
            <BarChartIcon style={{ color: "white", padding: "0px" }} />
          </IconButton>
          <IconButton>
            <SettingsIcon style={{ color: "white", padding: "0px" }} />
          </IconButton>
        </Grid>
      </Grid>
      <HelperModal open={helperOpen} setIsOpen={setHelperOpen} />
    </>
  );
};
