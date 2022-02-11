import { Box } from "@mui/material";

interface Props {
  letter: string;
  colorHex: string;
  className?: string;
}

export const Letter = ({ letter, colorHex, className }: Props): JSX.Element => {
  return (
    <Box
      sx={{
        width: "3.5em",
        height: "3.5em",
        backgroundColor: colorHex,
        borderRadius: "4px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
