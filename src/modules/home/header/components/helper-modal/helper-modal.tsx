import { Box, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import HelperModalContent from "./content";

interface Props {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#000033",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "4px",
  p: 4,
};

export default function HelperModal({ open, setIsOpen }: Props) {
  return (
    <>
      <Modal
        open={open}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <Stack direction="column" spacing={2}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            Como jogar
          </Typography>
          <HelperModalContent/>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
