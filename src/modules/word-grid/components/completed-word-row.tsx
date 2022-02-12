import { Stack } from "@mui/material";
import { Letter } from "common/components/letter";
import { LetterStatus } from "common/enum/letter-status.enum";
import { compareWords } from "common/utils/word.util";
import styles from "./styles.module.css";

interface Props {
  word: string;
  dailyWord: string;
}

export const CompletedRow = ({ word, dailyWord }: Props) => {
  const wordStatus = compareWords(dailyWord, word);

  const getClassName = (index: number): string => {
    if (wordStatus[index] === LetterStatus.Correct) {
      return styles.revealCorrect;
    } else if (wordStatus[index] === LetterStatus.Missplaced) {
      return styles.revealMissplaced;
    } else {
      return styles.revealWrong;
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      {word.split("").map((letter, index) => (
        <Letter
          keyValue={index}
          key={index}
          letter={letter}
          className={getClassName(index)}
        />
      ))}
    </Stack>
  );
};
