import { WordRowStatus } from "../enum/word-row-status.enum";
import { WordRowPosition } from "../enum/word-row-position.enum";
import { Letter } from "./letter.interface";

export interface Word {
  letters: Letter[];
  status: WordRowStatus;
  position: WordRowPosition;
}
