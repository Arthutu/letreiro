import { Grid, Stack } from "@mui/material";
import { MAX_WORDS } from "common/constants/game.constants";
import { CompletedRow } from "./components/completed-word-row";
import { CurrentWordRow } from "./components/current-word-row";
import { EmptyWordRow } from "./components/empty-word-row";

interface Props {
  words: string[];
  currentWord: string;
  dailyWord: string;
  isGameWon: boolean;
  isWrongWord: boolean;
  backSpacePressed: boolean;
  isLoadFromLocalStorage: boolean;
}

export const WordsGrid = ({
  words,
  currentWord,
  dailyWord,
  isGameWon,
  isWrongWord,
  backSpacePressed,
  isLoadFromLocalStorage,
}: Props): JSX.Element => {
  const emptyWords =
    words.length < MAX_WORDS - 1
      ? Array.from(Array(MAX_WORDS - 1 - words.length))
      : [];

  if (isGameWon) {
    emptyWords.push([]);
  }

  return (
    <Grid container justifyContent="center">
      <Stack spacing={1}>
        {words.map((word, index) => (
          <CompletedRow
            key={index}
            word={word}
            dailyWord={dailyWord}
            isLoadFromLocalStorage={isLoadFromLocalStorage}
          />
        ))}
        {words.length < MAX_WORDS && !isGameWon && (
          <CurrentWordRow
            currentWord={currentWord}
            isGameWon={isGameWon}
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
