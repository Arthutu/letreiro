import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { InputCardGrid } from "./components/card-grid";
import { Grid } from "@mui/material";

ReactDOM.render(
  <React.StrictMode>
    <Grid container justifyContent="center" spacing={10}>
      <Grid item>
        <h2>WORDLE COPY</h2>
      </Grid>
      <Grid item>
        <InputCardGrid />
      </Grid>
    </Grid>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
