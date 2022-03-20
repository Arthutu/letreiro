import {
  Alert,
  Box,
  Button,
  Collapse,
  Grow,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TimeLeft } from "./interfaces/time-left-interface";
import ShareIcon from "@mui/icons-material/Share";
import { LocalStorageHelper } from "common/utils/localStorage.utils";
import { compareWords, getTodaysWord } from "common/utils/word.util";
import { getEmojiStringFromLetterStatus } from "common/enum/letter-status.enum";
import LinearProgress from "@mui/material/LinearProgress";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";

export const StatsModalContent = (): JSX.Element => {
  const newWordTimeLeft = (): TimeLeft => {
    let nextDay = new Date(new Date().setHours(24, 0, 0, 0));
    const difference = +nextDay - +new Date();

    if (difference > 0) {
      const timeLeft: TimeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
      return timeLeft;
    }

    return { hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(newWordTimeLeft());
  const [isMessageCopied, setIsMessageCopied] = useState<boolean>(false);
  const dailyWord = getTodaysWord();
  const isGameWon = LocalStorageHelper.getIsGameWon();
  const gamesPlayed =
    LocalStorageHelper.getWins() + LocalStorageHelper.getLoses();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(newWordTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [setTimeLeft]);

  useEffect(() => {
    if (isMessageCopied) {
      const showTime = setInterval(() => {
        setIsMessageCopied(false);
      }, 2500);
      return () => clearInterval(showTime);
    }
  }, [isMessageCopied]);

  const getWinningPercentage = (): string => {
    return (
      ((LocalStorageHelper.getWins() / gamesPlayed) * 100).toString() + "%"
    );
  };

  const getShareableMessage = () => {
    let statusEmojis = Array(Array<string>());
    let message: string = "Letreiro - www.letreiro.com.br (URL aqui) \n";
    const words = LocalStorageHelper.getWords();
    const wordsStatuses = words.map((word) => compareWords(dailyWord, word));
    wordsStatuses.forEach((wordStatus) => {
      statusEmojis.push(
        wordStatus.map((status) => getEmojiStringFromLetterStatus(status))
      );
    });
    for (let i = 0; i <= words.length; i++) {
      const line = statusEmojis[i].join("");
      message += line + "\n";
    }
    message += "\n" + (isGameWon ? words.length.toString() : "X") + "/6";
    return message;
  };

  const copyShareMessage = () => {
    console.log(LocalStorageHelper.getWordsToWinDistribution());
    const message = getShareableMessage();
    navigator.clipboard.writeText(message);
    setIsMessageCopied(true);
  };

  return (
    <Stack direction="column" spacing={3} style={{ margin: "1em" }}>
      {/* <Typography
        variant="h6"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Progresso
      </Typography> */}
      <Stack direction="row" justifyContent="space-between">
        <Stack
          direction="column"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <h1>{gamesPlayed}</h1>
          <Typography
            variant="body1"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            Jogos
          </Typography>
        </Stack>
        <Stack
          direction="column"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <h1>{getWinningPercentage()}</h1>
          <Typography
            variant="body1"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            de vitórias
          </Typography>
        </Stack>
        <Stack
          direction="column"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <h1>{LocalStorageHelper.getWinStreak()}</h1>
          <Typography
            variant="body1"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            sequência de vitórias
          </Typography>
        </Stack>
        <Stack
          direction="column"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <h1>{LocalStorageHelper.getBestWinStreak()}</h1>
          <Typography
            variant="body1"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            melhor sequência
          </Typography>
        </Stack>
      </Stack>
      {/* <Typography
        variant="h6"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Distribuição das tentativas
      </Typography> */}
      {Array.from({ length: 7 }, (_, index) => index + 1).map((i) => {
        const numberOfTries =
          LocalStorageHelper.getWordsToWinDistribution()[i] / gamesPlayed;
        return (
          <Box sx={{ display: "flex", alignItems: "center" }} key={i}>
            <Box sx={{ minWidth: 35 }}>
              {i === 7 ? (
                <DoDisturbIcon />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {i}
                </Typography>
              )}
            </Box>
            <Box sx={{ width: "100%", mr: 1 }}>
              <LinearProgress
                sx={{ height: 10 }}
                color="secondary"
                variant="determinate"
                value={numberOfTries * 100}
              />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">
                {numberOfTries}
              </Typography>
            </Box>
          </Box>
        );
      })}
      <Collapse in={isMessageCopied}>
        <Alert variant="filled" severity="info">
          Desempenho copiado para o Ctrl+V
        </Alert>
      </Collapse>
      <Grow in={LocalStorageHelper.getIsGameFinished()}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="column" justifyContent={"center"}>
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              Próxima palavra em:
            </Typography>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              variant="h4"
            >
              {`${timeLeft.hours.toLocaleString("pt-BR", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}:${timeLeft.minutes.toLocaleString("pt-BR", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}:${timeLeft.seconds.toLocaleString("pt-BR", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}`}
            </Typography>
          </Stack>
          <Button
            variant="contained"
            endIcon={<ShareIcon />}
            color="success"
            onClick={copyShareMessage}
          >
            Compartilhar
          </Button>
        </Stack>
      </Grow>
    </Stack>
  );
};
