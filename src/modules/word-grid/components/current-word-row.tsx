import { Stack } from "@mui/material";
import { Letter } from "common/components/letter";
import { MAX_LETTERS } from "common/constants/game.constants";
import styles from "./styles.module.css";

interface Props {
  currentWord: string;
  isGameWon: boolean;
  isWrongWord: boolean;
  backSpacePressed: boolean;
}

export const CurrentWordRow = ({
  currentWord,
  isGameWon,
  isWrongWord,
  backSpacePressed,
}: Props) => {
  const letters = currentWord.split("");
  const emptyCells = Array.from(Array(MAX_LETTERS - letters.length));

  const getClassName = (index: number, isEmpty: boolean): string => {
    if (isWrongWord) {
      return styles.wrongWord;
    } else if (
      index === currentWord.length - 1 &&
      !isEmpty &&
      !backSpacePressed
    ) {
      return styles.typeLetter;
    } else {
      return "";
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      {letters.map((letter, index) => (
        <Letter
          key={index}
          letter={letter}
          colorHex={isGameWon ? "#191947" : "#4c4c70"}
          className={getClassName(index, false)}
        />
      ))}
      {emptyCells.map((_, index) => (
        <Letter
          key={index}
          letter={""}
          colorHex={isGameWon ? "#191947" : "#4c4c70"}
          className={getClassName(index, true)}
        />
      ))}
    </Stack>
  );
};
