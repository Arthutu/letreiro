import { Box, Grid } from "@mui/material";
import React from "react";
import { InputCardRow } from "../card-row";

export const InputCardGrid = (): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <InputCardRow />
        <InputCardRow />
        <InputCardRow />
        <InputCardRow />
        <InputCardRow />
        <InputCardRow />
      </Grid>
    </Box>
  );
};
