import { type Lesson } from '@prisma/client';

import LessonRepository from './lessons.repository';

import { HttpBadRequestError, HttpNotFoundError } from '@/lib/errors';

export default class LessonService {
  private readonly lessonRepository = new LessonRepository();

  public async createLesson(lesson: Lesson): Promise<Lesson> {
    const isLessonExists = await this.lessonRepository.getLessonByLessonNumber(
      lesson.lessonNo
    );

    if (isLessonExists) {
      throw new HttpBadRequestError(
        'A lesson is already exists with this lesson number. Please try again with another lesson number',
        []
      );
    }
    return await this.lessonRepository.createLesson(lesson);
  }

  public async getLessons(): Promise<Lesson[]> {
    const lessons = await this.lessonRepository.getLessons();
    return lessons;
  }

  public async getLesson(lessonNo: number) {
    if (!lessonNo) {
      throw new HttpBadRequestError('Invalid lesson number', []);
    }
    const lesson = await this.lessonRepository.getLessonWithVocabularies(
      lessonNo
    );
    if (!lesson) {
      throw new HttpNotFoundError('Lesson not found with this lessonNo');
    }
    return lesson;
  }

  public async updateLesson(id: string, updatedData: Lesson): Promise<Lesson> {
    const lesson = await this.lessonRepository.getLesson(id);

    if (!lesson) {
      throw new HttpNotFoundError('Lesson not found with this id');
    }

    if (updatedData.lessonNo) {
      const isLessonExists =
        await this.lessonRepository.getLessonByLessonNumber(
          updatedData.lessonNo
        );

      if (isLessonExists && lesson.id !== isLessonExists.id) {
        throw new HttpBadRequestError(
          'Another lesson exists with this lessonNo. ',
          []
        );
      }
    }
    const updatedLesson = await this.lessonRepository.updateLesson(
      id,
      updatedData
    );
    return updatedLesson;
  }

  public async deleteLesson(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.getLesson(id);

    if (!lesson) {
      throw new HttpNotFoundError('Lesson not found with this id');
    }
    const deletedLesson = await this.lessonRepository.deleteLesson(id);
    return deletedLesson;
  }
}
