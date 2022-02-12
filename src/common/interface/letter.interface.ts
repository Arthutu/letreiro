import { LetterStatus } from "common/enum/letter-status.enum";

export interface Letter {
  value: string;
  status: LetterStatus;
}
