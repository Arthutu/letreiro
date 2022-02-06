import { Grid } from "@mui/material";
import { observer } from "mobx-react";
import { useState } from "react";
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
import { compareWords, getTodaysWord } from "../../common/utils/word.util";

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
    if (verifyWord()) {
      console.log("oi");
    }

    setWords((words) => [...words, currentWord]);

    INITIAL_WORD.position = getNextWordRow(INITIAL_WORD.position);
    setCurrentWord(INITIAL_WORD);
  };

  const onBackspacePress = (): void => {
    setCurrentWord({
      ...currentWord,
      letters: currentWord.letters.slice(0, currentWord.letters.length - 1),
    });
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
      return true;
    } else {
      return false;
    }
  };

  return (
    <Grid container justifyContent="center" spacing={10}>
      <Grid item>
        <img alt={"Letreiro's Logo"} src={logo} />
      </Grid>
      <Grid item>
        <InputCardGrid currentWord={currentWord} words={words} />
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
