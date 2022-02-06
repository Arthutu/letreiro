import { Box, Grid } from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import { WordRowPosition } from "../../common/enum/word-row-position.enum";
import { WordRowStatus } from "../../common/enum/word-row-status.enum";
import { Word } from "../../common/interface/word.interface";
import { WordRow } from "./components/word-row";

interface Props {
  currentWord: Word;
  words: Word[];
  winnerWordRow: WordRowPosition;
}

const _InputCardGrid = ({
  currentWord,
  words,
  winnerWordRow,
}: Props): JSX.Element => {
  const getWordRowStatus = (
    wordRowPosition: WordRowPosition
  ): WordRowStatus => {
    if (winnerWordRow && wordRowPosition < winnerWordRow) {
      return WordRowStatus.Finished;
    } else if (winnerWordRow && wordRowPosition > winnerWordRow) {
      return WordRowStatus.Inactive;
    } else if (currentWord.position === wordRowPosition) {
      return WordRowStatus.Active;
    } else {
      if (currentWord.position < wordRowPosition) {
        return WordRowStatus.Inactive;
      } else {
        return WordRowStatus.Finished;
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <WordRow
          word={
            getWordRowStatus(WordRowPosition.FirstRow) ===
            WordRowStatus.Finished
              ? words[0]
              : currentWord
          }
          wordRowStatus={getWordRowStatus(WordRowPosition.FirstRow)}
        />
        <WordRow
          word={
            getWordRowStatus(WordRowPosition.SecondRow) ===
            WordRowStatus.Finished
              ? words[1]
              : currentWord
          }
          wordRowStatus={getWordRowStatus(WordRowPosition.SecondRow)}
        />
        <WordRow
          word={
            getWordRowStatus(WordRowPosition.ThirdRow) ===
            WordRowStatus.Finished
              ? words[2]
              : currentWord
          }
          wordRowStatus={getWordRowStatus(WordRowPosition.ThirdRow)}
        />
        <WordRow
          word={
            getWordRowStatus(WordRowPosition.FourthRow) ===
            WordRowStatus.Finished
              ? words[3]
              : currentWord
          }
          wordRowStatus={getWordRowStatus(WordRowPosition.FourthRow)}
        />
        <WordRow
          word={
            getWordRowStatus(WordRowPosition.FifthRow) ===
            WordRowStatus.Finished
              ? words[4]
              : currentWord
          }
          wordRowStatus={getWordRowStatus(WordRowPosition.FifthRow)}
        />
        <WordRow
          word={
            getWordRowStatus(WordRowPosition.SixthRow) ===
            WordRowStatus.Finished
              ? words[5]
              : currentWord
          }
          wordRowStatus={getWordRowStatus(WordRowPosition.SixthRow)}
        />
      </Grid>
    </Box>
  );
};

export const InputCardGrid = observer(_InputCardGrid);
