import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDTO } from 'src/dto/quiz.dto';
import { UpdateQuizDTO } from 'src/dto/updateQuiz.dto';

@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) { }

    @Post()
    create(@Body() createQuizDTO: CreateQuizDTO) {
        return this.quizService.createQuiz(createQuizDTO);
    }
    @Get('all')
    findAll() {
        return this.quizService.getAllQuizzes();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.quizService.getQuizById(id);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        return this.quizService.deleteQuiz(id)
    }
    


    @Put(':id')
    updateOne(@Param('id') id: string, @Body() data: UpdateQuizDTO) {
        return this.quizService.updateQuiz(id, data)
    }

}
