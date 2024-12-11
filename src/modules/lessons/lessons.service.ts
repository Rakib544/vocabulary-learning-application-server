import { type Lesson } from '@prisma/client';

import LessonRepository from './lessons.repository';

import {
  HttpBadRequestError,
  HttpConflictError,
  HttpNotFoundError,
} from '@/lib/errors';

export default class LessonService {
  private readonly lessonRepository = new LessonRepository();

  public async addLesson(lesson: Lesson): Promise<Lesson> {
    const isLessonExists = await this.lessonRepository.getLessonByLessonNumber(
      lesson.lessonNo
    );

    if (isLessonExists) {
      throw new HttpConflictError('Lesson number already exists', [
        'A lesson with this lesson number already exists',
      ]);
    }
    return await this.lessonRepository.addLesson(lesson);
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
      throw new HttpNotFoundError('Lesson not found', [
        'The lesson with the given Lesson Number does not exists',
      ]);
    }
    return lesson;
  }

  public async updateLesson(id: string, updatedData: Lesson): Promise<Lesson> {
    const lesson = await this.lessonRepository.getLesson(id);

    if (!lesson) {
      throw new HttpNotFoundError('Lesson not found', [
        'The lesson with the given ID does not exists',
      ]);
    }

    if (updatedData.lessonNo) {
      const isLessonExists =
        await this.lessonRepository.getLessonByLessonNumber(
          updatedData.lessonNo
        );

      if (isLessonExists && lesson.id !== isLessonExists.id) {
        throw new HttpConflictError('Lesson number already exists', [
          'A lesson with this lesson number already exists',
        ]);
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
      throw new HttpNotFoundError('Lesson not found', [
        'The lesson with the given ID does not exists',
      ]);
    }
    const deletedLesson = await this.lessonRepository.deleteLesson(id);
    return deletedLesson;
  }
}
