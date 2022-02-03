import { Grid } from "@mui/material";
import React from "react";
import { InputCard } from "../input-card";

export const InputCardRow = (): JSX.Element => {
  return (
    <Grid
      container
      item
      spacing={1}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <InputCard />
      </Grid>
      <Grid item>
        <InputCard />
      </Grid>
      <Grid item>
        <InputCard />
      </Grid>
      <Grid item>
        <InputCard />
      </Grid>
      <Grid item>
        <InputCard />
      </Grid>
    </Grid>
  );
};
