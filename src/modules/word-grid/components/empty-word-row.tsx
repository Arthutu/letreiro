import { Stack } from "@mui/material";
import { Letter } from "common/components/letter";
import { MAX_LETTERS } from "common/constants/game.constants";

export const EmptyWordRow = () => {
  const emptyLetters = Array.from(Array(MAX_LETTERS));

  return (
    <Stack direction="row" spacing={1}>
      {emptyLetters.map((_, index) => (
        <Letter letter={""} key={index} colorHex={"#191947"} />
      ))}
    </Stack>
  );
};
