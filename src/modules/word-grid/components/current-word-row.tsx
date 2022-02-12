import { Stack } from "@mui/material";
import { Letter } from "common/components/letter";
import { MAX_LETTERS } from "common/constants/game.constants";
import { getBackgroundColorFromLetterStatus, LetterStatus } from "common/enum/letter-status.enum";
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
          themeColor={
            isGameWon
              ? "secondary.dark"
              : getBackgroundColorFromLetterStatus(LetterStatus.Waiting)
          }
          className={getClassName(index, false)}
        />
      ))}
      {emptyCells.map((_, index) => (
        <Letter
          key={index}
          letter={""}
          themeColor={
            isGameWon
              ? "secondary.dark"
              : getBackgroundColorFromLetterStatus(LetterStatus.Waiting)
          }
          className={getClassName(index, true)}
        />
      ))}
    </Stack>
  );
};
