import { Box } from "@mui/material";
import { ANIMATION_DELAY } from "common/constants/game.constants";

interface Props {
  letter: string;
  colorHex?: string;
  className?: string;
  keyValue?: number;
}

export const Letter = ({
  letter,
  colorHex,
  className,
  keyValue,
}: Props): JSX.Element => {
  return (
    <Box
      sx={{
        width: "3.5em",
        height: "3.5em",
        backgroundColor: colorHex || "#4c4c70",
        borderRadius: "4px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        animationDelay: `${keyValue ? ANIMATION_DELAY[keyValue] : 0}s`,
      }}
      className={className}
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
  );
};
