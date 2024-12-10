import { Router } from 'express';

import TutorialController from './tutorials.controller';

import { CreateTutorialDto, UpdateTutorialDto } from '@/dto/tutorial.dto';
import RequestValidator from '@/middlewares/request-validator';

const tutorial: Router = Router();
const tutorialController = new TutorialController();

tutorial.post(
  '/',
  RequestValidator.validate(CreateTutorialDto),
  tutorialController.addTutorial
);
tutorial.get('/', tutorialController.getTutorials);
tutorial.put(
  '/:id',
  RequestValidator.isValidObjectId(),
  RequestValidator.validate(UpdateTutorialDto),
  tutorialController.updateTutorial
);
tutorial.delete(
  '/:id',
  RequestValidator.isValidObjectId(),
  tutorialController.deleteTutorial
);

export default tutorial;
