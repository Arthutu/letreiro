import { Stack } from "@mui/material";
import { Letter } from "../../../common/components/letter";
import { LetterStatus } from "../../../common/enum/letter-status.enum";
import { compareWords } from "../../../common/utils/word.util";

interface Props {
  word: string;
  dailyWord: string;
}

export const CompletedRow = ({ word, dailyWord }: Props) => {
  const wordStatus = compareWords(dailyWord, word);

  const getBackgroundColor = (index: number): string => {
    if (wordStatus[index] === LetterStatus.Correct) {
      return "#006600";
    } else if (wordStatus[index] === LetterStatus.Missplaced) {
      return "#c09b28";
    } else {
      return "#000000";
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      {word.split("").map((letter, index) => (
        <Letter
          key={index}
          letter={letter}
          colorHex={getBackgroundColor(index)}
        />
      ))}
    </Stack>
  );
};
