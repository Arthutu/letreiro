import { Alert, Button, Grid, Grow, IconButton } from "@mui/material";
import { observer } from "mobx-react";
import { useState } from "react";
import { LetterStatus } from "../../common/enum/letter-status.enum";
import {
  getNextWordRow,
  WordRowPosition,
} from "../../common/enum/word-row-position.enum";
import { Keyboard } from "../keyboard";
import { InputCardGrid } from "../word-grid";
import { Word } from "../../common/interface/word.interface";
import { WordRowStatus } from "../../common/enum/word-row-status.enum";
import { Letter } from "../../common/interface/letter.interface";
import {
  compareWords,
  getTodaysWord,
  isValidWord,
} from "../../common/utils/word.util";
import CloseIcon from "@mui/icons-material/Close";
import { Header } from "./header";

const MAX_WORD_LENGHT = 5;
const INITIAL_WORD: Word = {
  letters: [],
  status: WordRowStatus.Inactive,
  position: WordRowPosition.FirstRow,
};

const _Home = (): JSX.Element => {
  const [currentWord, setCurrentWord] = useState<Word>(INITIAL_WORD);
  const [words, setWords] = useState<Word[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [winnerWordRow, setWinnerWordRow] = useState<WordRowPosition>(
    WordRowPosition.FirstRow
  );
  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const todaysWord = getTodaysWord();

  const onLetterPress = (letter: string): void => {
    const newLetter: Letter = {
      value: letter,
      status: LetterStatus.Waiting,
    };

    setCurrentWord({
      ...currentWord,
      letters: [...currentWord.letters, newLetter],
    });
  };

  const onEnterPress = (): void => {
    if (!isGameWon) {
      if (isValidWord(currentWord.letters)) {
        setWords((words) => [...words, currentWord]);

        if (verifyWord()) {
          setWinnerWordRow(currentWord.position);
        } else {
          INITIAL_WORD.position = getNextWordRow(currentWord.position);
          setWinnerWordRow(INITIAL_WORD.position);
          setCurrentWord(INITIAL_WORD);
        }
      } else {
        setShowAlert(true);
      }
    }
  };

  const onBackspacePress = (): void => {
    if (!isGameWon) {
      setShowAlert(false);
      setCurrentWord({
        ...currentWord,
        letters: currentWord.letters.slice(0, currentWord.letters.length - 1),
      });
    }
  };

  const verifyWord = (): boolean => {
    const comparedWords = compareWords(todaysWord, currentWord);

    setCurrentWord({
      ...comparedWords,
      status: WordRowStatus.Finished,
      position: getNextWordRow(currentWord.position),
    });

    let newWrongLetters: string[] = [];

    comparedWords.letters.forEach((letter) => {
      if (letter.status === LetterStatus.Wrong)
        newWrongLetters.push(letter.value);
    });

    setWrongLetters((wrongLetters) => [...wrongLetters, ...newWrongLetters]);

    if (
      currentWord.letters.filter(
        (letter) => letter.status === LetterStatus.Correct
      ).length === MAX_WORD_LENGHT
    ) {
      setIsGameWon(true);
      alert("Você ganhou!");

      return true;
    } else {
      return false;
    }
  };

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
        <InputCardGrid
          currentWord={currentWord}
          words={words}
          winnerWordRow={winnerWordRow}
        />
      </Grid>
      <Grid item>
        <Keyboard
          wrongLetters={wrongLetters}
          areLettersDisalabled={currentWord.letters.length >= 5}
          onBackspacePress={onBackspacePress}
          onLetterPress={onLetterPress}
          onEnterPress={onEnterPress}
        />
      </Grid>
    </Grid>
  );
};

export const Home = observer(_Home);
