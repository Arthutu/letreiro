export class LocalStorageHelper {
  static isLocalStorageFulfilled = (lastWordIndex: string): boolean => {
    return (
      localStorage.getItem("words") !== null &&
      lastWordIndex === localStorage.getItem("lastWordIndex")
    );
  };

  static initializeLocalStorage = (): void => {
    if (!localStorage.getItem("words")) {
      localStorage.setItem("words", JSON.stringify([]));
    }

    if (!localStorage.getItem("wordsToWinDistribution")) {
      localStorage.setItem(
        "wordsToWinDistribution",
        JSON.stringify({
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
        })
      );
    }

    if (!localStorage.getItem("loses")) {
      localStorage.setItem("loses", "0");
    }

    if (!localStorage.getItem("wins")) {
      localStorage.setItem("wins", "0");
    }

    if (!localStorage.getItem("winStreak")) {
      localStorage.setItem("winStreak", "0");
    }

    if (!localStorage.getItem("bestWinStreak")) {
      localStorage.setItem("bestWinStreak", "0");
    }

    if (!localStorage.getItem("isGameWon")) {
      localStorage.setItem("isGameWon", "false");
    }

    if (!localStorage.getItem("lastWordIndex")) {
      localStorage.setItem("lastWordIndex", "");
    }
  };

  static getLastWordIndex = (): string => {
    const lastWord = localStorage.getItem("lastWordIndex");

    return lastWord ? lastWord : "0";
  };

  static updateLastWordIndex = (lastWordIndex: string): void => {
    localStorage.setItem("lastWordIndex", lastWordIndex);
  };

  static getWords = (): string[] => {
    const words = localStorage.getItem("words");

    return words ? JSON.parse(words) : "";
  };

  static getIsGameWon = (): boolean => {
    const isGameWon = localStorage.getItem("isGameWon");

    return isGameWon === "true" ? true : false;
  };

  static updateWords = (words: string[]): void => {
    localStorage.setItem("words", JSON.stringify(words));
  };

  static updateGameLose = (): void => {
    const currentLoses = localStorage.getItem("loses");
    const wordsToWinDistribution = localStorage.getItem(
      "wordsToWinDistribution"
    );

    if (currentLoses) {
      localStorage.setItem("loses", (Number(currentLoses) + 1).toString());
    }

    if (wordsToWinDistribution) {
      const wordsToWinParsed = JSON.parse(wordsToWinDistribution);
      wordsToWinParsed[7] = wordsToWinParsed[7] + 1;
      localStorage.setItem(
        "wordsToWinDistribution",
        JSON.stringify(wordsToWinParsed)
      );
    }

    localStorage.setItem("winStreak", "0");
  };

  static updateGameWin = (wordColumn: number): void => {
    const currentWins = localStorage.getItem("wins");
    const bestWinStreak = Number(localStorage.getItem("bestWinStreak"));
    const wordsToWinDistribution = localStorage.getItem(
      "wordsToWinDistribution"
    );

    if (wordsToWinDistribution) {
      const wordsToWinParsed = JSON.parse(wordsToWinDistribution);
      wordsToWinParsed[wordColumn] = wordsToWinParsed[wordColumn] + 1;
      localStorage.setItem(
        "wordsToWinDistribution",
        JSON.stringify(wordsToWinParsed)
      );
    }

    const totalWins = Number(currentWins) + 1;

    if (currentWins) {
      localStorage.setItem("wins", totalWins.toString());
    }

    localStorage.setItem("winStreak", totalWins.toString());

    if (totalWins > bestWinStreak) {
      localStorage.setItem("bestWinStreak", totalWins.toString());
    }

    localStorage.setItem("isGameWon", "true");
  };
}
