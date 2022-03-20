import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Divider,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: JSX.Element;
}

export const CustomModal = ({
  open,
  setIsOpen,
  title,
  children,
}: Props): JSX.Element => {
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
              {title}
            </Typography>
            <IconButton onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider color="white" />
          {children}
        </Stack>
      </Box>
    </Modal>
  );
};
