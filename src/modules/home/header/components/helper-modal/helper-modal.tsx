import { Box, Drawer, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import { HelperModalContent } from "./content";

interface Props {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HelperModal = ({ open, setIsOpen }: Props): JSX.Element => {
  return (
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "pink",
          },
        }}
        anchor={"left"}
        open={open}
        onClose={() => setIsOpen(false)}
      >
        <Box sx={{ width: 500, margin: "10px" }} role="presentation">
          <Stack direction="column" spacing={2}>
            <Typography
              variant="h6"
              component="h2"
              sx={{ textAlign: "center" }}
            >
              Como jogar
            </Typography>
            <HelperModalContent />
          </Stack>
        </Box>
      </Drawer>
  );
};
