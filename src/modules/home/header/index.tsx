import BarChartIcon from "@mui/icons-material/BarChart";
import GitHubIcon from "@mui/icons-material/GitHub";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton, Stack } from "@mui/material";
import logo from "common/images/letreiro-logo.gif";
import { useState } from "react";
import { HelperModal } from "./components/helper-modal/helper-modal";

export const Header = (): JSX.Element => {
  const [helperOpen, setHelperOpen] = useState<boolean>(false);
  return (
    <>
      <Stack direction="row" spacing={30}>
        <Stack direction="row" spacing={0.1}>
          <IconButton onClick={() => setHelperOpen(true)}>
            <InfoOutlinedIcon style={{ color: "white", fontSize: "inherit" }} />
          </IconButton>
          <IconButton
            href="https://github.com/Arthutu/wordle-copy"
            target="_blank"
          >
            <GitHubIcon style={{ color: "white", fontSize: "inherit" }} />
          </IconButton>
        </Stack>
        <img alt={"Letreiro's Logo"} src={logo} />
        <Stack direction="row" spacing={0.1}>
          <IconButton>
            <BarChartIcon style={{ color: "white", padding: "0px" }} />
          </IconButton>
          <IconButton>
            <SettingsIcon style={{ color: "white", padding: "0px" }} />
          </IconButton>
        </Stack>
      </Stack>
      <HelperModal open={helperOpen} setIsOpen={setHelperOpen} />
    </>
  );
};
