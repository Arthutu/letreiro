import CloseIcon from "@mui/icons-material/Close";
import { Alert, Container, Grid, Grow, IconButton } from "@mui/material";
import {
  KEY_BACKSPACE,
  KEY_ENTER,
  KEY_LETTERS,
  MAX_LETTERS,
  MAX_WORDS,
} from "common/constants/game.constants";
import { LocalStorageHelper } from "common/utils/localStorage.utils";
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
  const [isLoadFromLocalStorage, setIsLoadFromLocalStorage] =
    useState<boolean>(false);

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
        const newWords = [...words, currentWord];
        setWords(newWords);
        setCurrentWord("");
        setBackSpacePressed(false);

        LocalStorageHelper.updateWords(newWords);

        if (currentWord === dailyWord) {
          setIsGameWon(true);
          LocalStorageHelper.updateGameWin(newWords.length);
          alert("Você ganhou!");
        } else if (newWords.length >= MAX_WORDS) {
          LocalStorageHelper.updateGameLose();
          alert("Você perdeu!");
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

  useEffect(() => {
    if (LocalStorageHelper.isLocalStorageFulfilled()) {
      const tries = LocalStorageHelper.getWords();
      setIsLoadFromLocalStorage(true);
      setWords(tries);
      setIsGameWon(LocalStorageHelper.getIsGameWon());
    } else {
      LocalStorageHelper.initializeLocalStorage();
    }
  }, []);

  return (
    <Container maxWidth="md" sx={{ height: " 100vh" }}>
      <Grid container direction="column" sx={{ height: " 100vh" }}>
        <Grid item xs sx={{ maxHeight: "10vh" }}>
          <Header />
        </Grid>
        <Grid
          item
          display="flex"
          justifyContent="center"
          marginBottom="1em"
          marginTop="1em"
        >
          <Grow in={isWrongWord}>
            <Alert
              severity="error"
              variant="filled"
              sx={{ width: "20em" }}
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
        <Grid item xs>
          <WordsGrid
            currentWord={currentWord}
            words={words}
            dailyWord={dailyWord}
            isGameWon={isGameWon}
            isWrongWord={isWrongWord}
            backSpacePressed={backSpacePressed}
            isLoadFromLocalStorage={isLoadFromLocalStorage}
          />
        </Grid>
        <Grid item xs display="flex" alignItems="center">
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
    </Container>
  );
};
