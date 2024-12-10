import { type Lesson } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import { type NextFunction, type Request } from 'express';

import LessonService from './lessons.service';

import Api from '@/lib/api';
import { type CustomResponse } from '@/types/common.type';

export default class LessonController extends Api {
  private readonly lessonService = new LessonService();

  public createLesson = async (
    req: Request,
    res: CustomResponse<Lesson>,
    next: NextFunction
  ) => {
    try {
      const lesson = await this.lessonService.createLesson(req.body);
      this.send(res, lesson, HttpStatusCode.Created, 'createLesson');
    } catch (e) {
      next(e);
    }
  };

  public getLessons = async (
    _,
    res: CustomResponse<Lesson>,
    next: NextFunction
  ) => {
    try {
      const lessons = await this.lessonService.getLessons();
      this.send(res, lessons, HttpStatusCode.Ok, 'getLessons');
    } catch (e) {
      next(e);
    }
  };

  public getLesson = async (
    req: Request,
    res: CustomResponse<Lesson>,
    next: NextFunction
  ) => {
    try {
      const lessonNo = Number(req.params.lessonNo);
      const lesson = await this.lessonService.getLesson(lessonNo);
      this.send(res, lesson, HttpStatusCode.Ok, 'getLesson');
    } catch (e) {
      next(e);
    }
  };

  public updateLesson = async (
    req: Request,
    res: CustomResponse<Lesson>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      const lesson = await this.lessonService.updateLesson(id, updatedData);
      this.send(res, lesson, HttpStatusCode.Ok, 'Lesson successfully updated');
    } catch (e) {
      next(e);
    }
  };

  public deleteLesson = async (
    req: Request,
    res: CustomResponse<Lesson>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const lesson = await this.lessonService.deleteLesson(id);
      this.send(res, lesson, HttpStatusCode.Ok, 'Lesson successfully deleted');
    } catch (e) {
      next(e);
    }
  };
}
