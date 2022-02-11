import { Stack } from "@mui/material";
import { Letter } from "../../../common/components/letter";
import { MAX_LETTERS } from "../../../common/constants/game.constants";

interface Props {
  currentWord: string;
  isGameWon: boolean;
}

export const CurrentWordRow = ({ currentWord, isGameWon }: Props) => {
  const letters = currentWord.split("");
  const emptyCells = Array.from(Array(MAX_LETTERS - letters.length));

  return (
    <Stack direction="row" spacing={1}>
      {letters.map((letter, i) => (
        <Letter letter={letter} colorHex={isGameWon ? "#191947" : "#4c4c70"} />
      ))}
      {emptyCells.map((_, i) => (
        <Letter letter={""} colorHex={isGameWon ? "#191947" : "#4c4c70"} />
      ))}
    </Stack>
  );
};
