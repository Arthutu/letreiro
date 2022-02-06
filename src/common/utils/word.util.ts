import { deburr } from "lodash";
import { wordList } from "../../assets/words";
import { validWords } from "../../assets/valid-words";
import { LetterStatus } from "../enum/letter-status.enum";
import { Word } from "../interface/word.interface";
import { Letter } from "../interface/letter.interface";

const countLettersInTodaysWord = (
  todaysWord: string,
  currentWord: Word,
  index: number
): number => {
  return todaysWord
    .split("")
    .filter(
      (todaysWordLetter) =>
        todaysWordLetter === currentWord.letters[index].value
    ).length;
};

const countLettersInCurrentWord = (
  currentWord: Word,
  letter: Letter
): number => {
  return currentWord.letters.filter(
    (currentWordLetter) => currentWordLetter.value === letter.value
  ).length;
};

export const compareWords = (todaysWord: string, currentWord: Word): Word => {
  const updatedWord = currentWord;

  updatedWord.letters.forEach((letter, index) => {
    const todaysWordLetterQuantity = countLettersInTodaysWord(
      todaysWord,
      currentWord,
      index
    );

    const currentWordLetterQuantity = countLettersInCurrentWord(
      currentWord,
      letter
    );

    if (todaysWord.includes(letter.value)) {
      if (todaysWord[index] === currentWord.letters[index].value) {
        updatedWord.letters[index].status = LetterStatus.Correct;
      } else if (
        todaysWordLetterQuantity < 2 &&
        currentWordLetterQuantity >= 2
      ) {
        updatedWord.letters
          .filter((extrasLetters) => extrasLetters.value === letter.value)
          .forEach((letter) => {
            if (index < 1) {
              letter.status = LetterStatus.Missplaced;
            } else {
              letter.status = LetterStatus.Wrong;
            }
          });
      } else {
        updatedWord.letters[index].status = LetterStatus.Missplaced;
      }
    } else {
      updatedWord.letters[index].status = LetterStatus.Wrong;
    }
  });

  return updatedWord;
};

export const getTodaysWord = (): string => {
  const epochMs = new Date("January 1, 2022 00:00:00").valueOf();
  const now = Date.now();
  const msInDay = 86400000;
  const index = Math.floor((now - epochMs) / msInDay);
  return deburr(wordList[index]).toUpperCase();
};

export const isValidWord = (letters: Letter[]): boolean => {
  let word = "";
  letters.forEach((letter) => (word = word + letter.value));

  return validWords.includes(word.toUpperCase());
};

export const groupLetters = (letters: string[]): string => {
  return letters.join("").replace(/,/g, "");
};
