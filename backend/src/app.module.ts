import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizService } from './quiz/quiz.service';
import { QuizController } from './quiz/quiz.controller';
import { QuizModule } from './quiz/quiz.module';
import { PrismaModule } from 'prisma/prisma/prisma.module';

@Module({
  imports: [QuizModule, PrismaModule],
  controllers: [AppController, QuizController],
  providers: [AppService, QuizService],
})
export class AppModule {}
