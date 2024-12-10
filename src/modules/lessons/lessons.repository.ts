import { type Lesson } from '@prisma/client';

import prisma from '@/lib/prisma';

export default class LessonRepository {
  public async createLesson({
    name,
    lessonNo,
  }: Pick<Lesson, 'lessonNo' | 'name'>) {
    const newLesson = await prisma.lesson.create({ data: { name, lessonNo } });
    return newLesson;
  }

  public async getLessons() {
    const lessons = await prisma.lesson.findMany({
      include: { _count: { select: { vocabularies: true } } },
    });

    return lessons;
  }

  public async getLesson(id: string) {
    return await prisma.lesson.findUnique({ where: { id } });
  }

  public async getLessonByLessonNumber(lessonNo: number) {
    return await prisma.lesson.findUnique({ where: { lessonNo } });
  }

  public async getLessonWithVocabularies(lessonNo: number) {
    return await prisma.lesson.findUnique({
      where: { lessonNo },
      select: {
        id: true,
        lessonNo: true,
        name: true,
        vocabularies: {
          select: {
            id: true,
            word: true,
            whenToSay: true,
            pronunciation: true,
            meaning: true,
          },
        },
      },
    });
  }

  public async updateLesson(id: string, updatedData: Lesson) {
    const newData = {} as any;
    if (updatedData.name) {
      newData.name = updatedData.name;
    }
    if (updatedData.lessonNo) {
      newData.lessonNo = updatedData.lessonNo;
    }
    return await prisma.lesson.update({ where: { id }, data: { ...newData } });
  }

  public async deleteLesson(id: string) {
    const lesson = await prisma.lesson.delete({ where: { id } });
    return lesson;
  }
}
