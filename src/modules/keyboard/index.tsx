import { Button, Stack } from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import React from "react";
import { getKeyboardStatuses } from "../../common/utils/word.util";
import { LetterStatus } from "../../common/enum/letter-status.enum";

interface Props {
  onLetterPress: (letter: string) => void;
  onEnterPress: () => void;
  onBackspacePress: () => void;
  areLettersDisalabled: boolean;
  words: string[];
  dailyWord: string;
}

export const Keyboard = ({
  onLetterPress,
  onEnterPress,
  onBackspacePress,
  areLettersDisalabled,
  words,
  dailyWord,
}: Props): JSX.Element => {
  const firstRowKeyboard = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const secondRowKeyboard = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const thirdRowKeyboard = ["Z", "X", "C", "V", "B", "N", "M"];
  const keyboardStatuses = getKeyboardStatuses(words, dailyWord);

  const isLetterDisabled = (): boolean => {
    return areLettersDisalabled;
  };

  const getBackgroundColor = (letter: string): string => {
    if (keyboardStatuses[letter] === LetterStatus.Correct) {
      return "#006600";
    } else if (keyboardStatuses[letter] === LetterStatus.Missplaced) {
      return "#c09b28";
    } else if (keyboardStatuses[letter] === LetterStatus.Wrong) {
      return "#000000";
    } else {
      return "#4c4c70";
    }
  };

  return (
    <Stack direction="column" spacing={0.5}>
      <Stack direction="row" spacing={0.5}>
        {firstRowKeyboard.map((letter, index) => (
          <Button
            variant="outlined"
            sx={{
              width: "3.5em",
              height: "5.5em",
              borderRadius: "4px",
            }}
            style={{
              backgroundColor: getBackgroundColor(letter),
              borderColor: "#000033",
            }}
            onClick={() => onLetterPress(letter)}
            key={index}
            disabled={isLetterDisabled()}
          >
            <span
              style={{ color: "white", fontSize: "2em", fontWeight: "600" }}
            >
              {letter}
            </span>
          </Button>
        ))}
      </Stack>

      <Stack direction="row" spacing={0.5} style={{ marginLeft: "1.5em" }}>
        {secondRowKeyboard.map((letter, index) => (
          <Button
            variant="outlined"
            sx={{
              width: "3.5em",
              height: "5.5em",
              borderRadius: "4px",
            }}
            style={{
              backgroundColor: getBackgroundColor(letter),
              borderColor: "#000033",
            }}
            onClick={() => onLetterPress(letter)}
            key={index}
            disabled={isLetterDisabled()}
          >
            <span
              style={{ color: "white", fontSize: "2em", fontWeight: "600" }}
            >
              {letter}
            </span>
          </Button>
        ))}

        <Button
          variant="outlined"
          sx={{
            width: "3.5em",
            height: "5.5em",
            backgroundColor: "#4c4c70",
            borderRadius: "4px",
            borderColor: "#000033",
          }}
          style={{
            marginLeft: "2em",
            backgroundColor: "#4c4c70",
            borderColor: "#000033",
          }}
          onClick={onBackspacePress}
        >
          <BackspaceIcon style={{ color: "white" }} />
        </Button>
      </Stack>

      <Stack direction="row" spacing={0.5} style={{ marginLeft: "3em" }}>
        {thirdRowKeyboard.map((letter, index) => (
          <Button
            variant="outlined"
            sx={{
              width: "3.5em",
              height: "5.5em",
              borderRadius: "4px",
            }}
            style={{
              backgroundColor: getBackgroundColor(letter),
              borderColor: "#000033",
            }}
            onClick={() => onLetterPress(letter)}
            key={index}
            disabled={isLetterDisabled()}
          >
            <span
              style={{ color: "white", fontSize: "2em", fontWeight: "600" }}
            >
              {letter}
            </span>
          </Button>
        ))}

        <Button
          variant="outlined"
          sx={{
            width: "12.7em",
            height: "5.5em",
            borderRadius: "4px",
          }}
          style={{
            marginLeft: "2em",
            backgroundColor: "#4c4c70",
            borderColor: "#000033",
          }}
          onClick={onEnterPress}
        >
          <span style={{ color: "white", fontSize: "2em", fontWeight: "600" }}>
            Enter
          </span>
        </Button>
      </Stack>
    </Stack>
  );
};
