import { UpdateAnswerDto } from "./updateAnswer.dto";

export class UpdateQuestionDto {
  text!: string;
  id: number;  // для оновлення існуючого питання
  answers!: UpdateAnswerDto[];
}