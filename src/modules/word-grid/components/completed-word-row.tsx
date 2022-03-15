import { Stack } from "@mui/material";
import { Letter } from "common/components/letter";
import { LetterStatus } from "common/enum/letter-status.enum";
import { compareWords } from "common/utils/word.util";
import styles from "./styles.module.css";

interface Props {
  word: string;
  dailyWord: string;
  shouldAnimate: boolean;
}

export const CompletedRow = ({ word, dailyWord, shouldAnimate }: Props) => {
  const wordStatus = compareWords(dailyWord, word);

  const getAnimationClassName = (index: number): string => {
    if (wordStatus[index] === LetterStatus.Correct) {
      return styles.revealCorrect;
    } else if (wordStatus[index] === LetterStatus.Missplaced) {
      return styles.revealMissplaced;
    } else {
      return styles.revealWrong;
    }
  };

  const getBackgroundClassName = (index: number): string => {
    if (wordStatus[index] === LetterStatus.Correct) {
      return styles.colorCorrect;
    } else if (wordStatus[index] === LetterStatus.Missplaced) {
      return styles.colorMissplaced;
    } else {
      return styles.colorWrong;
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      {word.split("").map((letter, index) => (
        <Letter
          keyValue={index}
          key={index}
          letter={letter}
          themeColor={"secondary.main"}
          className={
            shouldAnimate
              ? getAnimationClassName(index)
              : getBackgroundClassName(index)
          }
        />
      ))}
    </Stack>
  );
};
