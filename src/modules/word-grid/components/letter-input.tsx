import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Letter } from "../../../common/components/letter";
import { LetterStatus } from "../../../common/enum/letter-status.enum";
import { WordRowStatus } from "../../../common/enum/word-row-status.enum";

interface Props {
  letter: string;
  wordRowStatus: WordRowStatus;
  status: LetterStatus;
}

export const LetterInput = ({
  letter,
  wordRowStatus,
  status,
}: Props): JSX.Element => {
  const [currentLetter, setCurrentLetter] = useState<string>("");
  const [currentStatus, setCurrentStatus] = useState<LetterStatus>(
    LetterStatus.Waiting
  );

  useEffect(() => {
    if (wordRowStatus === WordRowStatus.Active) {
      setCurrentLetter(letter);
    }
  }, [currentLetter, wordRowStatus, letter]);

  useEffect(() => {
    if (status && wordRowStatus === WordRowStatus.Finished) {
      setCurrentStatus(status);
    }
  }, [letter, status, wordRowStatus]);

  const getBackgroundColor = (): string => {
    if (wordRowStatus === WordRowStatus.Finished) {
      if (currentStatus === LetterStatus.Correct) {
        return "#006600";
      } else if (currentStatus === LetterStatus.Missplaced) {
        return "#c09b28";
      } else if (currentStatus === LetterStatus.Wrong) {
        return "#000000";
      } else {
        return "#4c4c70";
      }
    } else {
      if (wordRowStatus === WordRowStatus.Active) {
        return "#4c4c70";
      } else {
        return "#191947";
      }
    }
  };

  return <Letter letter={currentLetter} colorHex={getBackgroundColor()} />;
};
