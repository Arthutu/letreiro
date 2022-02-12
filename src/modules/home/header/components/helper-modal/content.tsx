import { Stack, Typography } from "@mui/material";
import { Letter } from "common/components/letter";

const FIRST_WORD_EXAMPLE = "VASCO";
const SECOND_WORD_EXAMPLE = "BARCO";
const THIRD_WORD_EXAMPLE = "MAIOR";

const getBackgroundColor = (
  exampleWord: string,
  letterIndex: number
): string => {
  switch (exampleWord) {
    case FIRST_WORD_EXAMPLE:
      if (letterIndex === 0) return "#006600";
      return "#4c4c70";
    case SECOND_WORD_EXAMPLE:
      if (letterIndex === 2) return "#acb200";
      return "#4c4c70";
    case THIRD_WORD_EXAMPLE:
      if (letterIndex === 3) return "#000000";
      return "#4c4c70";
    default:
      return "#4c4c70";
  }
};

const getColoredExampleWord = (exampleWord: string): JSX.Element => {
  return (
    <Stack direction="row" spacing={0.5}>
      {exampleWord.split("").map((letter, index) => (
        <Letter
          letter={letter}
          colorHex={getBackgroundColor(exampleWord, index)}
          key={index}
        />
      ))}
    </Stack>
  );
};

export const HelperModalContent = (): JSX.Element => {
  return (
    <Stack direction="column" spacing={3} style={{ margin: "1em" }}>
      <Typography sx={{ fontSize: "13px" }}>
        Para vencer o Letreiro, você precisa acertar a secreta palava do dia, de
        5 letras, em até 6 tentativas. Após cada tentativa as caixinhas mostram
        quão perto foi a sua tentativa.
      </Typography>
      {getColoredExampleWord(FIRST_WORD_EXAMPLE)}
      <Stack direction="row" spacing={1}>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          A letra
        </Typography>
        <Letter letter={FIRST_WORD_EXAMPLE[0]} colorHex={"#006600"} />
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            fontSize: "13px",
          }}
        >
          faz parte da palavra e está na posição correta.
        </Typography>
      </Stack>
      {getColoredExampleWord(SECOND_WORD_EXAMPLE)}
      <Stack direction="row" spacing={1}>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            fontSize: "13px",
          }}
        >
          A letra
        </Typography>
        <Letter letter={SECOND_WORD_EXAMPLE[2]} colorHex={"#acb200"} />
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            fontSize: "13px",
          }}
        >
          faz parte da palavra mas está em outra posição.
        </Typography>
      </Stack>
      {getColoredExampleWord(THIRD_WORD_EXAMPLE)}
      <Stack direction="row" spacing={1}>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            fontSize: "13px",
          }}
        >
          A letra
        </Typography>
        <Letter letter={THIRD_WORD_EXAMPLE[3]} colorHex={"#000000"} />
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            fontSize: "13px",
          }}
        >
          não faz parte da palavra.
        </Typography>
      </Stack>
    </Stack>
  );
};
