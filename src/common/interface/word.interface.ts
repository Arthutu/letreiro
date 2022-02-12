import { WordRowPosition } from "common/enum/word-row-position.enum";
import { WordRowStatus } from "common/enum/word-row-status.enum";
import { Letter } from "./letter.interface";

export interface Word {
  letters: Letter[];
  status: WordRowStatus;
  position: WordRowPosition;
}
