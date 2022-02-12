import CloseIcon from "@mui/icons-material/Close";
import { Alert, Grid, Grow, IconButton } from "@mui/material";
import {
  KEY_BACKSPACE,
  KEY_ENTER,
  KEY_LETTERS,
  MAX_LETTERS,
} from "common/constants/game.constants";
import { getTodaysWord, isValidWord } from "common/utils/word.util";
import { Keyboard } from "modules/keyboard";
import { WordsGrid } from "modules/word-grid";
import { useEffect, useState } from "react";
import { Header } from "./header";

export const Home = (): JSX.Element => {
  const [currentWord, setCurrentWord] = useState<string>("");
  const [words, setWords] = useState<string[]>([]);
  const [lettersTryed, setLettersTryed] = useState<string[]>([]);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [isWrongWord, setIsWrongWord] = useState<boolean>(false);
  const [backSpacePressed, setBackSpacePressed] = useState<boolean>(false);

  const dailyWord = getTodaysWord();

  const onLetterPress = (letter: string): void => {
    if (currentWord.length < MAX_LETTERS) {
      setCurrentWord(currentWord.concat(letter));
      setLettersTryed([...lettersTryed, letter]);
    }

    setIsWrongWord(false);
    setBackSpacePressed(false);
  };

  const onEnterPress = (): void => {
    if (!isGameWon) {
      if (isValidWord(currentWord)) {
        setWords((words) => [...words, currentWord]);
        setCurrentWord("");
        setBackSpacePressed(false);

        if (currentWord === dailyWord) {
          setIsGameWon(true);
          alert("Você ganhou!");
        }
      } else {
        setIsWrongWord(true);
      }
    }
  };

  const onBackspacePress = (): void => {
    if (!isGameWon) {
      setBackSpacePressed(true);
      setIsWrongWord(false);
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
        <Grow in={isWrongWord}>
          <Alert
            severity="error"
            variant="filled"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setIsWrongWord(false);
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
          isWrongWord={isWrongWord}
          backSpacePressed={backSpacePressed}
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
