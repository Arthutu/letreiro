import { Grid, Stack } from "@mui/material";
import { MAX_WORDS } from "common/constants/game.constants";
import { CompletedRow } from "./components/completed-word-row";
import { CurrentWordRow } from "./components/current-word-row";
import { EmptyWordRow } from "./components/empty-word-row";

interface Props {
  words: string[];
  currentWord: string;
  dailyWord: string;
  isGameFinished: boolean;
  isWrongWord: boolean;
  backSpacePressed: boolean;
  isLoadFromLocalStorage: boolean;
}

export const WordsGrid = ({
  words,
  currentWord,
  dailyWord,
  isGameFinished,
  isWrongWord,
  backSpacePressed,
  isLoadFromLocalStorage,
}: Props): JSX.Element => {
  const emptyWords =
    words.length < MAX_WORDS - 1
      ? Array.from(Array(MAX_WORDS - 1 - words.length))
      : [];

  return (
    <Grid container justifyContent="center">
      <Stack spacing={1}>
        {words.map((word, index) => (
          <CompletedRow
            key={index}
            word={word}
            dailyWord={dailyWord}
            shouldAnimate={
              words.length - 1 === index && !isLoadFromLocalStorage
            }
          />
        ))}
        {words.length < MAX_WORDS && (
          <CurrentWordRow
            currentWord={currentWord}
            isGameFinished={isGameFinished}
            isWrongWord={isWrongWord}
            backSpacePressed={backSpacePressed}
          />
        )}

        {emptyWords.map((_, index) => (
          <EmptyWordRow key={index} />
        ))}
      </Stack>
    </Grid>
  );
};
