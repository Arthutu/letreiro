import { Box } from "@mui/material";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { LetterStatus } from "../../../common/enum/letter-status.enum";
import { WordRowStatus } from "../../../common/enum/word-row-status.enum";

interface Props {
  letter: string;
  wordRowStatus: WordRowStatus;
  status: LetterStatus;
}

const _LetterInput = ({
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
        return "#acb200";
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

  return (
    <Box
      sx={{
        width: "3.5em",
        height: "3.5em",
        backgroundColor: getBackgroundColor(),
        borderRadius: "4px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span
        style={{
          color: "white",
          fontSize: "2em",
          fontWeight: "600",
        }}
      >
        {currentLetter}
      </span>
    </Box>
  );
};

export const LetterInput = observer(_LetterInput);
