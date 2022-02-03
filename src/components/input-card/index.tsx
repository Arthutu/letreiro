import { TextField } from "@mui/material";
import React from "react";

export const InputCard = (): JSX.Element => {
  return (
    <TextField
      variant="outlined"
      sx={{ width: "3.5em", backgroundColor: "#4c4c70", borderRadius: "4px" }}
    />
  );
};
