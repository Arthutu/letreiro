import { Box, Divider, Modal, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SettingsModalContent } from "./content";

interface Props {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SettingsModal = ({ open, setIsOpen }: Props): JSX.Element => {
  return (
    <Modal
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={open}
      onClose={() => setIsOpen(false)}
    >
      <Box
        sx={{
          backgroundColor: "primary.main",
          borderRadius: "8px",
          width: "30em",
          maxHeight: "95vh",
          maxWidth: "90vw",
        }}
      >
        <Stack direction="column" spacing={0.5} sx={{ margin: "1em" }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="h6"
              component="h2"
              color="primary.contrastText"
              sx={{ textAlign: "center" }}
            >
              Configurações
            </Typography>
            <CloseIcon onClick={() => setIsOpen(false)} />
          </Stack>
          <Divider color="white" />

          <SettingsModalContent />
        </Stack>
      </Box>
    </Modal>
  );
};
