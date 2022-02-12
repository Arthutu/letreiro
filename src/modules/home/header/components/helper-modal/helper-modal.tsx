import { Box, Divider, Modal, Stack, Typography } from "@mui/material";
import { HelperModalContent } from "./content";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HelperModal = ({ open, setIsOpen }: Props): JSX.Element => {
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
          backgroundColor: "#262638",
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
              sx={{ textAlign: "center" }}
            >
              Como jogar
            </Typography>
            <CloseIcon onClick={() => setIsOpen(false)} />
          </Stack>
          <Divider color="white" />

          <HelperModalContent />
        </Stack>
      </Box>
    </Modal>
  );
};
