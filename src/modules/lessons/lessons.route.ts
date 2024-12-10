import { Router } from 'express';

import LessonController from './lessons.controller';

import { CreateLessonDto, UpdateLessonDto } from '@/dto/lesson.dto';
import RequestValidator from '@/middlewares/request-validator';

const lesson: Router = Router();
const lessonController = new LessonController();

lesson.post(
  '/',
  RequestValidator.validate(CreateLessonDto),
  lessonController.createLesson
);
lesson.get('/', lessonController.getLessons);
lesson.get('/:lessonNo', lessonController.getLesson);
lesson.put(
  '/:id',
  RequestValidator.isValidObjectId(),
  RequestValidator.validate(UpdateLessonDto),
  lessonController.updateLesson
);
lesson.delete(
  '/:id',
  RequestValidator.isValidObjectId(),
  lessonController.deleteLesson
);

export default lesson;
