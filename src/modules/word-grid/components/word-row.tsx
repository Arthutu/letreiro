import { Stack } from "@mui/material";
import React from "react";
import { WordRowStatus } from "../../../common/enum/word-row-status.enum";
import { Word } from "../../../common/interface/word.interface";
import { LetterInput } from "./letter-input";

interface Props {
  wordRowStatus: WordRowStatus;
  word: Word;
}

export const WordRow = ({ wordRowStatus, word }: Props): JSX.Element => {
  return (
    <Stack direction="row" spacing={1}>
      <Stack>
        <LetterInput
          letter={word?.letters[0]?.value || ""}
          wordRowStatus={wordRowStatus}
          status={word?.letters[0]?.status}
        />
      </Stack>
      <Stack>
        <LetterInput
          letter={word?.letters[1]?.value || ""}
          wordRowStatus={wordRowStatus}
          status={word?.letters[1]?.status}
        />
      </Stack>
      <Stack>
        <LetterInput
          letter={word?.letters[2]?.value || ""}
          wordRowStatus={wordRowStatus}
          status={word?.letters[2]?.status}
        />
      </Stack>
      <Stack>
        <LetterInput
          letter={word?.letters[3]?.value || ""}
          wordRowStatus={wordRowStatus}
          status={word?.letters[3]?.status}
        />
      </Stack>
      <Stack>
        <LetterInput
          letter={word?.letters[4]?.value || ""}
          wordRowStatus={wordRowStatus}
          status={word?.letters[4]?.status}
        />
      </Stack>
    </Stack>
  );
};
