import BackspaceIcon from "@mui/icons-material/Backspace";
import { Button, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { LetterStatus } from "common/enum/letter-status.enum";
import { getKeyboardStatuses } from "common/utils/word.util";

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
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isLetterDisabled = (): boolean => {
    return areLettersDisalabled;
  };

  const getBackgroundColor = (letter: string): string => {
    if (keyboardStatuses[letter] === LetterStatus.Correct) {
      return "success.main";
    } else if (keyboardStatuses[letter] === LetterStatus.Missplaced) {
      return "warning.main";
    } else if (keyboardStatuses[letter] === LetterStatus.Wrong) {
      return "#000000";
    } else {
      return "secondary.main";
    }
  };

  return (
    <Grid container justifyContent="center">
      <Stack direction="column">
        <Stack direction="row" spacing={0.5}>
          {firstRowKeyboard.map((letter, index) => (
            <Button
              variant="outlined"
              sx={{
                width: isMobile ? "2em" : "3em",
                height: isMobile ? "3em" : "4em",
                borderRadius: "4px",
                backgroundColor: getBackgroundColor(letter),
                borderColor: "#000033",
                minWidth: isMobile ? "unset" : "",
              }}
              onClick={() => onLetterPress(letter)}
              key={index}
              disabled={isLetterDisabled()}
            >
              <Typography
                style={{
                  color: "white",
                  fontWeight: "600",
                }}
                variant={isMobile ? "body1" : "h5"}
              >
                {letter}
              </Typography>
            </Button>
          ))}
        </Stack>

        <Stack direction="row" spacing={0.5}>
          {secondRowKeyboard.map((letter, index) => (
            <Button
              variant="outlined"
              sx={{
                width: isMobile ? "2em" : "3em",
                height: isMobile ? "3em" : "4em",
                borderRadius: "4px",
                backgroundColor: getBackgroundColor(letter),
                borderColor: "#000033",
                minWidth: isMobile ? "unset" : "",
              }}
              onClick={() => onLetterPress(letter)}
              key={index}
              disabled={isLetterDisabled()}
            >
              <Typography
                style={{
                  color: "white",
                  fontWeight: "600",
                }}
                variant={isMobile ? "body1" : "h5"}
              >
                {letter}
              </Typography>
            </Button>
          ))}

          <Button
            variant="outlined"
            sx={{
              width: isMobile ? "2em" : "3em",
              height: isMobile ? "3em" : "4em",
              borderRadius: "4px",
              backgroundColor: "secondary.main",
              borderColor: "#000033",
              minWidth: isMobile ? "unset" : "",
            }}
            onClick={onBackspacePress}
          >
            <Typography
              style={{
                color: "white",
              }}
              display="flex"
            >
              <BackspaceIcon style={{ fontSize: isMobile ? "1em" : "1.5em" }} />
            </Typography>
          </Button>
        </Stack>

        <Stack direction="row" spacing={0.5}>
          {thirdRowKeyboard.map((letter, index) => (
            <Button
              variant="outlined"
              sx={{
                width: isMobile ? "2em" : "3em",
                height: isMobile ? "3em" : "4em",
                borderRadius: "4px",
                minWidth: isMobile ? "unset" : "",
                backgroundColor: getBackgroundColor(letter),
                borderColor: "#000033",
              }}
              onClick={() => onLetterPress(letter)}
              key={index}
              disabled={isLetterDisabled()}
            >
              <Typography
                style={{
                  color: "white",
                  fontWeight: "600",
                }}
                variant={isMobile ? "body1" : "h5"}
              >
                {letter}
              </Typography>
            </Button>
          ))}

          <Button
            variant="outlined"
            sx={{
              width: isMobile ? "7.4em" : "9.6em",
              height: isMobile ? "3em" : "4em",
              borderRadius: "4px",
              minWidth: isMobile ? "unset" : "",
              backgroundColor: "secondary.main",
              borderColor: "#000033",
            }}
            onClick={onEnterPress}
          >
            <Typography
              style={{
                color: "white",
                fontWeight: "600",
              }}
              variant={isMobile ? "body1" : "h5"}
            >
              Enter
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
};
