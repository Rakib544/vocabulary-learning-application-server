import { Router } from 'express';

import TutorialController from './tutorials.controller';

import { CreateTutorialDto, UpdateTutorialDto } from '@/dto/tutorial.dto';
import { verifyAdmin, verifyAuthToken } from '@/middlewares/auth';
import RequestValidator from '@/middlewares/request-validator';

const tutorial: Router = Router();
const tutorialController = new TutorialController();

tutorial.post(
  '/',
  verifyAuthToken,
  verifyAdmin,
  RequestValidator.validate(CreateTutorialDto),
  tutorialController.addTutorial
);
tutorial.get('/', verifyAuthToken, tutorialController.getTutorials);
tutorial.get(
  '/:id',
  verifyAuthToken,
  verifyAdmin,
  tutorialController.getTutorial
);
tutorial.put(
  '/:id',
  verifyAuthToken,
  verifyAdmin,
  RequestValidator.isValidObjectId(),
  RequestValidator.validate(UpdateTutorialDto),
  tutorialController.updateTutorial
);
tutorial.delete(
  '/:id',
  verifyAuthToken,
  verifyAdmin,
  RequestValidator.isValidObjectId(),
  tutorialController.deleteTutorial
);

export default tutorial;
