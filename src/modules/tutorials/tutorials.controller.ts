import { type Tutorial } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import { type NextFunction, type Request, type Response } from 'express';

import TutorialService from './tutorials.service';

import Api from '@/lib/api';
import { type CustomResponse } from '@/types/common.type';

export default class TutorialController extends Api {
  private readonly tutorialService = new TutorialService();

  public addTutorial = async (
    req: Request,
    res: CustomResponse<Tutorial>,
    next: NextFunction
  ) => {
    try {
      const tutorial = await this.tutorialService.addTutorial(req.body);
      this.send(
        res,
        tutorial,
        HttpStatusCode.Created,
        'Tutorial created successfully'
      );
    } catch (e) {
      next(e);
    }
  };

  public getTutorials = async (_, res: Response, next: NextFunction) => {
    try {
      const tutorials = await this.tutorialService.getTutorials();
      this.send(res, tutorials, HttpStatusCode.Ok, 'Tutorial get successfully');
    } catch (e) {
      next(e);
    }
  };

  public updateTutorial = async (
    req: Request,
    res: CustomResponse<Tutorial>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const tutorial = await this.tutorialService.updateTutorial(id, req.body);
      this.send(
        res,
        tutorial,
        HttpStatusCode.Ok,
        'Tutorial updated successfully'
      );
    } catch (e) {
      next(e);
    }
  };

  public deleteTutorial = async (
    req: Request,
    res: CustomResponse<Tutorial>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const tutorial = await this.tutorialService.deleteTutorial(id);
      this.send(
        res,
        tutorial,
        HttpStatusCode.Ok,
        'Tutorial deleted successfully'
      );
    } catch (e) {
      next(e);
    }
  };
}
