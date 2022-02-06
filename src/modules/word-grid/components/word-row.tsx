import { Grid } from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import { WordRowStatus } from "../../../common/enum/word-row-status.enum";
import { Word } from "../../../common/interface/word.interface";
import { LetterInput } from "./letter-input";

interface Props {
  wordRowStatus: WordRowStatus;
  word: Word;
}

const _WordRow = ({ wordRowStatus, word }: Props): JSX.Element => {
  return (
    <Grid
      container
      item
      spacing={1}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <LetterInput
          letter={word?.letters[0]?.value || ""}
          wordRowStatus={wordRowStatus}
          status={word?.letters[0]?.status}
        />
      </Grid>
      <Grid item>
        <LetterInput
          letter={word?.letters[1]?.value || ""}
          wordRowStatus={wordRowStatus}
          status={word?.letters[1]?.status}
        />
      </Grid>
      <Grid item>
        <LetterInput
          letter={word?.letters[2]?.value || ""}
          wordRowStatus={wordRowStatus}
          status={word?.letters[2]?.status}
        />
      </Grid>
      <Grid item>
        <LetterInput
          letter={word?.letters[3]?.value || ""}
          wordRowStatus={wordRowStatus}
          status={word?.letters[3]?.status}
        />
      </Grid>
      <Grid item>
        <LetterInput
          letter={word?.letters[4]?.value || ""}
          wordRowStatus={wordRowStatus}
          status={word?.letters[4]?.status}
        />
      </Grid>
    </Grid>
  );
};

export const WordRow = observer(_WordRow);
