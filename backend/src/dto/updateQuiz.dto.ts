import { UpdateQuestionDto } from "./updateQuestion.dto";

export class UpdateQuizDTO {
  title!: string;
  description!: string;
  questions!: UpdateQuestionDto[];
}