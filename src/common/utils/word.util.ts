import { deburr } from "lodash";
import { wordList } from "../../assets/words";
import { validWords } from "../../assets/valid-words";
import { LetterStatus } from "../enum/letter-status.enum";

const countLettersInDailyWord = (
  todaysWord: string,
  word: string,
  index: number
): number => {
  return todaysWord
    .split("")
    .filter((todaysWordLetter) => todaysWordLetter === word.split("")[index])
    .length;
};

const countLettersInCurrentWord = (
  currentWord: string,
  letter: string
): number => {
  return currentWord
    .split("")
    .filter((currentWordLetter) => currentWordLetter === letter).length;
};

export const getKeyboardStatuses = (
  words: string[],
  dailyWord: string
): Record<string, LetterStatus> => {
  const keyboardStatuses: Record<string, LetterStatus> = {};

  words.forEach((word) => {
    word.split("").forEach((letter, index) => {
      if (!dailyWord.includes(letter)) {
        keyboardStatuses[letter] = LetterStatus.Wrong;
      } else if (dailyWord[index] === letter) {
        keyboardStatuses[letter] = LetterStatus.Correct;
      } else {
        keyboardStatuses[letter] = LetterStatus.Missplaced;
      }
    });
  });

  return keyboardStatuses;
};

export const compareWords = (
  dailyWord: string,
  word: string
): LetterStatus[] => {
  const letterStatus: LetterStatus[] = [];

  word.split("").forEach((letter, index) => {
    const todaysWordLetterQuantity = countLettersInDailyWord(
      dailyWord,
      word,
      index
    );

    const currentWordLetterQuantity = countLettersInCurrentWord(word, letter);

    if (dailyWord.includes(letter)) {
      if (dailyWord[index] === word[index]) {
        letterStatus.push(LetterStatus.Correct);
      } else if (
        todaysWordLetterQuantity < 2 &&
        currentWordLetterQuantity >= 2
      ) {
        word
          .split("")
          .filter((extraLetters) => extraLetters === letter)
          .forEach((_, i) => {
            if (i < 1) {
              letterStatus.push(LetterStatus.Missplaced);
            } else {
              letterStatus.push(LetterStatus.Wrong);
            }
          });
      } else {
        letterStatus.push(LetterStatus.Missplaced);
      }
    } else {
      letterStatus.push(LetterStatus.Wrong);
    }
  });

  return letterStatus;
};

export const getTodaysWord = (): string => {
  const epochMs = new Date("January 1, 2022 00:00:00").valueOf();
  const now = Date.now();
  const msInDay = 86400000;
  const index = Math.floor((now - epochMs) / msInDay);
  return deburr(wordList[index]).toUpperCase();
};

export const isValidWord = (word: string): boolean => {
  return validWords.includes(word.toUpperCase());
};
