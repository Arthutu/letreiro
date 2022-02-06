import { LetterStatus } from "../enum/letter-status.enum";

export interface Letter {
  value: string;
  status: LetterStatus;
}
