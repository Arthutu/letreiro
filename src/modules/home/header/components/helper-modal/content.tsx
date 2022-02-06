import { Box, Stack, Typography } from "@mui/material";

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
        <Box
          sx={{
            width: "3.5em",
            height: "3.5em",
            backgroundColor: getBackgroundColor(exampleWord, index),
            borderRadius: "4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          key={index}
        >
          <span
            style={{
              color: "white",
              fontSize: "2em",
              fontWeight: "600",
            }}
          >
            {letter}
          </span>
        </Box>
      ))}
    </Stack>
  );
};

export default function HelperModalContent() {
  return (
    <>
      <Stack direction="column" spacing={3}>
        <Typography>
          Descubra a palavra certa em 6 tentativas. Depois de cada tentativa, as
          peças mostram o quão perto você está da solução.
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
          <Box
            sx={{
              width: "3.5em",
              height: "3.5em",
              backgroundColor: "#006600",
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
              {FIRST_WORD_EXAMPLE.split("")[0]}
            </span>
          </Box>
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
          <Box
            sx={{
              width: "3.5em",
              height: "3.5em",
              backgroundColor: "#acb200",
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
              {SECOND_WORD_EXAMPLE.split("")[2]}
            </span>
          </Box>
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
          <Box
            sx={{
              width: "3.5em",
              height: "3.5em",
              backgroundColor: "#006600",
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
              {THIRD_WORD_EXAMPLE.split("")[3]}
            </span>
          </Box>
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
}
