import { Stack } from "@mui/material";
import React from "react";
import { MAX_WORDS } from "../../common/constants/game.constants";
import { CompletedRow } from "./components/completed-word-row";
import { CurrentWordRow } from "./components/current-word-row";
import { EmptyWordRow } from "./components/empty-word-row";

interface Props {
  words: string[];
  currentWord: string;
  dailyWord: string;
  isGameWon: boolean;
}

export const WordsGrid = ({
  words,
  currentWord,
  dailyWord,
  isGameWon,
}: Props): JSX.Element => {
  const emptyWords =
    words.length < MAX_WORDS - 1
      ? Array.from(Array(MAX_WORDS - 1 - words.length))
      : [];

  return (
    <Stack direction="column" spacing={1}>
      {words.map((word) => (
        <CompletedRow word={word} dailyWord={dailyWord} />
      ))}

      {words.length < MAX_WORDS && (
        <CurrentWordRow currentWord={currentWord} isGameWon={isGameWon} />
      )}

      {emptyWords.map((_) => (
        <EmptyWordRow />
      ))}
    </Stack>
  );
};
