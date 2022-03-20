export class LocalStorageHelper {
  static isLocalStorageFulfilled = (lastWordIndex: string): boolean => {
    return (
      localStorage.getItem("words") !== null &&
      lastWordIndex === localStorage.getItem("lastWordIndex")
    );
  };

  static initializeLocalStorage = (): void => {
    localStorage.setItem("words", JSON.stringify([]));

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

    localStorage.setItem("isGameFinished", "false");
    localStorage.setItem("isGameWon", "false");
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

  static getIsGameFinished = (): boolean => {
    const isGameFinished = localStorage.getItem("isGameFinished");

    return isGameFinished === "true" ? true : false;
  };

  static getIsGameWon = (): boolean => {
    return localStorage.getItem("isGameWon") === "true" ? true : false;
  };

  static getWinStreak = (): string => {
    const winStreak = localStorage.getItem("winStreak");
    if (!winStreak) return "0";
    return winStreak;
  };

  static getBestWinStreak = (): string => {
    const bestWinStreak = localStorage.getItem("bestWinStreak");
    if (!bestWinStreak) return "0";
    return bestWinStreak;
  };

  static getWins = (): number => {
    const wins = localStorage.getItem("wins");
    if (!wins) return 0;
    return +wins;
  }

  static getLoses = (): number => {
    const loses = localStorage.getItem("loses");
    if (!loses) return 0;
    return +loses;
  }

  static getWordsToWinDistribution = () => {
    const distribution = localStorage.getItem("wordsToWinDistribution");
    if (!distribution) return '0';
    return JSON.parse(distribution);
  }

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
    localStorage.setItem("isGameWon", "false");
    localStorage.setItem("isGameFinished", "true");
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
    localStorage.setItem("isGameFinished", "true");
  };
}
