import { Stack, Typography } from "@mui/material";
import { Letter } from "common/components/letter";

const FIRST_WORD_EXAMPLE = "MAIOR";
const SECOND_WORD_EXAMPLE = "RATOS";
const THIRD_WORD_EXAMPLE = "PULGA";

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
    <>
      <Stack direction="column" spacing={3}>
        <Typography>
          O jogo consiste em acertar a palavra de 5 letras em até 6 tentativas.
          Depois de cada chute as peças mostram o quão perto você está da
          solução.
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
            }}
          >
            não faz parte da palavra.
          </Typography>
        </Stack>
        <Typography>
          Acentos são preenchidos automaticamente e as palavras podem ter letras
          repetidas.
        </Typography>
      </Stack>
    </>
  );
};
