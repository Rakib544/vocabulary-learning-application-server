import { type Vocabulary } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import { type NextFunction, type Request } from 'express';

import VocabularyService from './vocabularies.service';

import Api from '@/lib/api';
import { type CustomResponse } from '@/types/common.type';

export default class VocabularyController extends Api {
  private readonly vocabularyService = new VocabularyService();

  public addVocabulary = async (
    req: Request,
    res: CustomResponse<Vocabulary>,
    next: NextFunction
  ) => {
    try {
      const vocabulary = await this.vocabularyService.addVocabulary(
        req.body?.user?.userId || req.body.userId,
        req.body
      );
      this.send(
        res,
        vocabulary,
        HttpStatusCode.Created,
        'Vocabulary added successfully'
      );
    } catch (e) {
      next(e);
    }
  };

  public getVocabularies = async (
    _,
    res: CustomResponse<Vocabulary>,
    next: NextFunction
  ) => {
    try {
      const vocabularies = await this.vocabularyService.getVocabularies();
      this.send(
        res,
        vocabularies,
        HttpStatusCode.Ok,
        'Vocabularies fetched successfully'
      );
    } catch (e) {
      next(e);
    }
  };

  public getVocabulary = async (
    req: Request,
    res: CustomResponse<Vocabulary>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const vocabulary = await this.vocabularyService.getVocabulary(id);
      this.send(
        res,
        vocabulary,
        HttpStatusCode.Ok,
        'Vocabulary fetched successfully'
      );
    } catch (e) {
      next(e);
    }
  };

  public updateVocabulary = async (
    req: Request,
    res: CustomResponse<Vocabulary>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const vocabulary = await this.vocabularyService.updateVocabulary(
        id,
        req.body
      );
      this.send(
        res,
        vocabulary,
        HttpStatusCode.Ok,
        'Vocabulary updated successfully'
      );
    } catch (e) {
      next(e);
    }
  };

  public deleteVocabulary = async (
    req: Request,
    res: CustomResponse<Vocabulary>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const vocabulary = await this.vocabularyService.deleteVocabulary(id);
      this.send(
        res,
        vocabulary,
        HttpStatusCode.Ok,
        'Vocabulary deleted successfully'
      );
    } catch (e) {
      next(e);
    }
  };
}
