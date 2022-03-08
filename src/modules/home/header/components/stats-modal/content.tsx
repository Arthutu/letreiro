import {
  Alert,
  Button,
  Collapse,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TimeLeft } from "./interfaces/time-left-interface";
import ShareIcon from "@mui/icons-material/Share";

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

  const copyShareMessage = () => {
    navigator.clipboard.writeText("Teste");
    setIsMessageCopied(true);
  };

  return (
    <Stack direction="column" spacing={3} style={{ margin: "1em" }}>
      <Collapse in={isMessageCopied}>
        <Alert variant="filled" severity="info">
          Desempenho copiado para o Ctrl+V
        </Alert>
      </Collapse>
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
    </Stack>
  );
};
