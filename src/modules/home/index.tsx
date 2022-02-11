import { Alert, Grid, Grow, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Keyboard } from "../keyboard";
import { WordsGrid } from "../word-grid";
import { getTodaysWord, isValidWord } from "../../common/utils/word.util";
import CloseIcon from "@mui/icons-material/Close";
import { Header } from "./header";
import {
  KEY_BACKSPACE,
  KEY_ENTER,
  KEY_LETTERS,
  MAX_LETTERS,
} from "../../common/constants/game.constants";

export const Home = (): JSX.Element => {
  const [currentWord, setCurrentWord] = useState<string>("");
  const [words, setWords] = useState<string[]>([]);
  const [lettersTryed, setLettersTryed] = useState<string[]>([]);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const dailyWord = getTodaysWord();

  const onLetterPress = (letter: string): void => {
    if (currentWord.length < MAX_LETTERS) {
      setCurrentWord(currentWord.concat(letter));
      setLettersTryed([...lettersTryed, letter]);
    }
  };

  const onEnterPress = (): void => {
    if (!isGameWon) {
      if (isValidWord(currentWord)) {
        setWords((words) => [...words, currentWord]);
        setCurrentWord("");

        if (currentWord === dailyWord) {
          setIsGameWon(true);
          alert("Você ganhou!");
        }
      } else {
        setShowAlert(true);
      }
    }
  };

  const onBackspacePress = (): void => {
    if (!isGameWon) {
      setShowAlert(false);
      setCurrentWord(currentWord.slice(0, -1));
    }
  };

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === KEY_BACKSPACE) {
      onBackspacePress();
    }

    if (event.key === KEY_ENTER) {
      onEnterPress();
    }

    if (KEY_LETTERS.includes(event.key)) {
      onLetterPress(event.key.toUpperCase());
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing={5}
    >
      <Grid item>
        <Header />
      </Grid>
      <Grid item>
        <Grow in={showAlert}>
          <Alert
            severity="error"
            variant="filled"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setShowAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            A palavra não é válida
          </Alert>
        </Grow>
      </Grid>
      <Grid item>
        <WordsGrid
          currentWord={currentWord}
          words={words}
          dailyWord={dailyWord}
          isGameWon={isGameWon}
        />
      </Grid>
      <Grid item>
        <Keyboard
          onBackspacePress={onBackspacePress}
          onLetterPress={onLetterPress}
          onEnterPress={onEnterPress}
          areLettersDisalabled={currentWord.length >= 5}
          words={words}
          dailyWord={dailyWord}
        />
      </Grid>
    </Grid>
  );
};
