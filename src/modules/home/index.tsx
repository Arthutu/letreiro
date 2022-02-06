import { Alert, Grid, Grow, IconButton } from "@mui/material";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { LetterStatus } from "../../common/enum/letter-status.enum";
import {
  getNextWordRow,
  WordRowPosition,
} from "../../common/enum/word-row-position.enum";
import { Keyboard } from "../keyboard";
import { InputCardGrid } from "../word-grid";
import logo from "../../common/images/letreiro-logo.gif";
import { Word } from "../../common/interface/word.interface";
import { WordRowStatus } from "../../common/enum/word-row-status.enum";
import { Letter } from "../../common/interface/letter.interface";
import {
  compareWords,
  getTodaysWord,
  isValidWord,
} from "../../common/utils/word.util";
import CloseIcon from "@mui/icons-material/Close";

const MAX_WORD_LENGHT = 5;
const INITIAL_WORD: Word = {
  letters: [],
  status: WordRowStatus.Inactive,
  position: WordRowPosition.FirstRow,
};

const KEY_BACKSPACE = "Backspace";
const KEY_ENTER = "Enter";
const KEY_LETTERS = "abcdefghijklmnopqrstuvwxyz";

const _Home = (): JSX.Element => {
  const [currentWord, setCurrentWord] = useState<Word>(INITIAL_WORD);
  const [words, setWords] = useState<Word[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [misplacedLetters, setMisplacedLetters] = useState<string[]>([]);
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
    let newCorrectLetters: string[] = [];
    let newMisplacedLetters: string[] = [];

    comparedWords.letters.forEach((letter) => {
      if (letter.status === LetterStatus.Wrong) {
        newWrongLetters.push(letter.value);
      } else if (letter.status === LetterStatus.Correct) {
        newCorrectLetters.push(letter.value);
      } else {
        newMisplacedLetters.push(letter.value);
      }
    });

    setWrongLetters((wrongLetters) => [...wrongLetters, ...newWrongLetters]);
    setCorrectLetters((correctLetters) => [
      ...correctLetters,
      ...newCorrectLetters,
    ]);
    setMisplacedLetters((misplacedLetters) => [
      ...misplacedLetters,
      ...newMisplacedLetters,
    ]);

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

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === KEY_BACKSPACE) {
      onBackspacePress();
    }

    if (event.key === KEY_ENTER) {
      onEnterPress();
    }

    if (
      KEY_LETTERS.includes(event.key) &&
      !wrongLetters.includes(event.key.toUpperCase())
    ) {
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
        <img alt={"Letreiro's Logo"} src={logo} />
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
          correctLetters={correctLetters}
          misplacedLetters={misplacedLetters}
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
