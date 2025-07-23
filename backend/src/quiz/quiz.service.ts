import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma/prisma.service';
import { CreateQuizDTO } from 'src/dto/quiz.dto';
import { UpdateQuizDTO } from 'src/dto/updateQuiz.dto';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) { }

  async createQuiz(data: CreateQuizDTO) {
    return this.prisma.quiz.create({
      data: {
        title: data.title,
        description: data.description,
        questions: {
          create: data.questions.map(question => ({
            text: question.text,
            answers: {
              create: question.answers.map(answer => ({
                text: answer.text,
                isCorrect: answer.isCorrect,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });
  }

  async getAllQuizzes() {
  return this.prisma.quiz.findMany({
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
    },
  });
}


  async getQuizById(id: string) {

    const quizId = parseInt(id, 10);
    console.log('Looking for quiz with id:', quizId);

    if (isNaN(quizId)) {
      throw new BadRequestException('Invalid quiz ID');
    }

    return this.prisma.quiz.findUnique({
      where: { id: Number(quizId) },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

  }

  async deleteQuiz(id: string) {
    return this.prisma.quiz.delete({
      where: { id: Number(id) },
    });
  }

 async updateQuiz(id: string, data: UpdateQuizDTO) {
  const { title, description, questions } = data;

  return this.prisma.quiz.update({
    where: { id: Number(id) },
    data: {
      title,
      description,
      ...(questions
        ? {
            questions: {
              deleteMany: {}, // видаляємо всі старі питання (якщо хочеш іншу логіку — скажи)
              create: questions.map(q => ({
                text: q.text,
                answers: {
                  create: q.answers?.map(a => ({
                    text: a.text,
                    isCorrect: a.isCorrect,
                  })) || [],
                },
              })),
            },
          }
        : {}),
    },
    include: {
      questions: {
        include: { answers: true },
      },
    },
  });
}
}
