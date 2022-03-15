export enum LetterStatus {
  Correct = 1,
  Wrong = 2,
  Missplaced = 3,
  Waiting = 4,
}

export const getBackgroundColorFromLetterStatus = (
  letterStatus: LetterStatus
): string => {
  const statusMap = new Map<LetterStatus, string>([
    [LetterStatus.Correct, "success.main"],
    [LetterStatus.Wrong, "#000000"],
    [LetterStatus.Missplaced, "warning.main"],
    [LetterStatus.Waiting, "secondary.main"],
  ]);

  return statusMap.get(letterStatus) ?? "primary";
};
