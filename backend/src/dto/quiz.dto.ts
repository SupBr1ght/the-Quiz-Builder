import { CreateQuestionDto } from "./question.dto";

export class CreateQuizDTO {
  title: string;
  description?: string;
  questions: CreateQuestionDto[];
}
