import GitHubIcon from "@mui/icons-material/GitHub";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import {
  IconButton,
  Link,
  Stack,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import { ColorModeContext } from "common/contexts/color-theme-context";
import React from "react";

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
      <Stack direction="row" spacing={0.7}>
        <Typography>Letereiro é baseado em</Typography>

        <Link
          color="#0b63e3"
          href="https://www.nytimes.com/games/wordle/index.html"
        >
          Wordle
        </Link>
      </Stack>
      <Stack direction="row" spacing={0.7}>
        <Typography>Desenvolvido por</Typography>

        <Link color="#0b63e3" href="https://twitter.com/arthurlrodolfo">
          Arthur Rodolfo
        </Link>

        <Typography>e</Typography>

        <Link color="#0b63e3" href="https://www.instagram.com/vitor_mrp/">
          Vitor Pereira
        </Link>
      </Stack>
      <Stack direction="row">
        <IconButton href="https://github.com/Arthutu/letreiro">
          <GitHubIcon></GitHubIcon>
        </IconButton>
        <IconButton href="https://www.backloggd.com/u/Arthutu/">
          <VideogameAssetIcon></VideogameAssetIcon>
        </IconButton>
      </Stack>
    </Stack>
  );
};
