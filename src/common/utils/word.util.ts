import { validWords } from "assets/valid-words";
import { wordList } from "assets/words";
import { LetterStatus } from "common/enum/letter-status.enum";
import { deburr } from "lodash";

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
  const splitDailyWord = dailyWord.split("");
  const splitWord = word.split("");

  const dailyWordCharsTaken = splitDailyWord.map((_) => false);

  const statuses: LetterStatus[] = Array.from(Array(splitWord.length));

  splitWord.forEach((letter, i) => {
    if (letter === splitDailyWord[i]) {
      statuses[i] = LetterStatus.Correct;
      dailyWordCharsTaken[i] = true;
      return;
    }
  });

  splitWord.forEach((letter, i) => {
    if (statuses[i]) return;

    if (!splitDailyWord.includes(letter)) {
      statuses[i] = LetterStatus.Wrong;
      return;
    }

    const indexOfPresentChar = splitDailyWord.findIndex(
      (x, index) => x === letter && !dailyWordCharsTaken[index]
    );

    if (indexOfPresentChar > -1) {
      statuses[i] = LetterStatus.Missplaced;
      dailyWordCharsTaken[indexOfPresentChar] = true;
      return;
    } else {
      statuses[i] = LetterStatus.Wrong;
      return;
    }
  });

  return statuses;
};

export const getTodaysWord = (): string => {
  const index = getWordIndex();
  return deburr(wordList[index]).toUpperCase();
};

export const isValidWord = (word: string): boolean => {
  return validWords.includes(word.toUpperCase());
};
export const getWordIndex = (): number => {
  const epochMs = new Date("January 1, 2022 00:00:00").valueOf();
  const now = Date.now();
  const msInDay = 86400000;
  const index = Math.floor((now - epochMs) / msInDay);
  return index;
};
