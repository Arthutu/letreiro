export enum WordRowPosition {
  FirstRow = 1,
  SecondRow = 2,
  ThirdRow = 3,
  FourthRow = 4,
  FifthRow = 5,
  SixthRow = 6,
  GhostRow = 7,
}

export const getNextWordRow = (
  currentWordRow: WordRowPosition
): WordRowPosition => {
  const nextWordRow = new Map<WordRowPosition, WordRowPosition>([
    [WordRowPosition.FirstRow, WordRowPosition.SecondRow],
    [WordRowPosition.SecondRow, WordRowPosition.ThirdRow],
    [WordRowPosition.ThirdRow, WordRowPosition.FourthRow],
    [WordRowPosition.FourthRow, WordRowPosition.FifthRow],
    [WordRowPosition.FifthRow, WordRowPosition.SixthRow],
    [WordRowPosition.SixthRow, WordRowPosition.GhostRow],
  ]).get(currentWordRow);

  return nextWordRow ? nextWordRow : WordRowPosition.FirstRow;
};
