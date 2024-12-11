import { Router } from 'express';

import VocabularyController from './vocabularies.controller';

import { CreateVocabularyDto, UpdateVocabularyDto } from '@/dto/vocabulary.dto';
import RequestValidator from '@/middlewares/request-validator';

const vocabularies: Router = Router();
const vocabularyController = new VocabularyController();

vocabularies.post(
  '/',
  RequestValidator.validate(CreateVocabularyDto),
  vocabularyController.addVocabulary
);
vocabularies.get('/', vocabularyController.getVocabularies);
vocabularies.put(
  '/:id',
  RequestValidator.isValidObjectId(),
  RequestValidator.validate(UpdateVocabularyDto),
  vocabularyController.updateVocabulary
);
vocabularies.delete(
  '/:id',
  RequestValidator.isValidObjectId(),
  vocabularyController.deleteVocabulary
);

export default vocabularies;
