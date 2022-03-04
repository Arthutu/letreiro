import { Box } from "@mui/material";
import { ANIMATION_DELAY } from "common/constants/game.constants";

interface Props {
  letter: string;
  themeColor?: string;
  className?: string;
  keyValue?: number;
}

export const Letter = ({
  letter,
  themeColor,
  className,
  keyValue,
}: Props): JSX.Element => {
  return (
    <Box
      sx={{
        width: "3em",
        height: "3em",
        backgroundColor: themeColor,
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
