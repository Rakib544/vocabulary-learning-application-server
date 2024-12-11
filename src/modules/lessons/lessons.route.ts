import { Router } from 'express';

import LessonController from './lessons.controller';

import { CreateLessonDto, UpdateLessonDto } from '@/dto/lesson.dto';
import { verifyAdmin, verifyAuthToken } from '@/middlewares/auth';
import RequestValidator from '@/middlewares/request-validator';

const lesson: Router = Router();
const lessonController = new LessonController();

lesson.post(
  '/',
  verifyAuthToken,
  verifyAdmin,
  RequestValidator.validate(CreateLessonDto),
  lessonController.createLesson
);
lesson.get('/', verifyAuthToken, lessonController.getLessons);
lesson.get('/:lessonNo', verifyAuthToken, lessonController.getLesson);
lesson.put(
  '/:id',
  verifyAuthToken,
  verifyAdmin,
  RequestValidator.isValidObjectId(),
  RequestValidator.validate(UpdateLessonDto),
  lessonController.updateLesson
);
lesson.delete(
  '/:id',
  verifyAuthToken,
  verifyAdmin,
  RequestValidator.isValidObjectId(),
  lessonController.deleteLesson
);

export default lesson;
