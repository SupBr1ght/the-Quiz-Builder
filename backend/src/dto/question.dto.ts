import { CreateAnswerDto } from './answer.dto';
import { Type } from 'class-transformer';
import { ValidateNested, IsArray } from 'class-validator';

export class CreateQuestionDto {
  text: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[];
}
