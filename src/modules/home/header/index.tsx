import { IconButton, Stack } from "@mui/material";
import logo from "../../../common/images/letreiro-logo.gif";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import { useState } from "react";
import HelperModal from "./components/helper-modal/helper-modal";
import GitHubIcon from "@mui/icons-material/GitHub";

export const Header = (): JSX.Element => {
  const [helperOpen, setHelperOpen] = useState<boolean>(false);
  return (
    <>
      <Stack direction="row" spacing={30}>
        <Stack direction="row" spacing={0.1}>
          <IconButton
            onClick={() => setHelperOpen(!helperOpen)}
          >
            <HelpOutlineOutlinedIcon style={{ color: "white", fontSize: "inherit" }} />
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
            <InsertChartOutlinedIcon
              style={{ color: "white", padding: "0px" }}
            />
          </IconButton>
          <IconButton>
            <SettingsApplicationsOutlinedIcon
              style={{ color: "white", padding: "0px" }}
            />
          </IconButton>
        </Stack>
      </Stack>
      <HelperModal open={helperOpen} setIsOpen={setHelperOpen} />
    </>
  );
};
