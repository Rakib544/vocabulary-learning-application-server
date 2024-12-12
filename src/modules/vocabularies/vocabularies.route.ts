import { Router } from 'express';

import VocabularyController from './vocabularies.controller';

import { CreateVocabularyDto, UpdateVocabularyDto } from '@/dto/vocabulary.dto';
import { verifyAdmin, verifyAuthToken } from '@/middlewares/auth';
import RequestValidator from '@/middlewares/request-validator';

const vocabularies: Router = Router();
const vocabularyController = new VocabularyController();

vocabularies.post(
  '/',
  verifyAuthToken,
  verifyAdmin,
  RequestValidator.validate(CreateVocabularyDto),
  vocabularyController.addVocabulary
);
vocabularies.get(
  '/',
  verifyAuthToken,
  verifyAdmin,
  vocabularyController.getVocabularies
);

vocabularies.get(
  '/:id',
  verifyAuthToken,
  verifyAdmin,
  RequestValidator.isValidObjectId(),
  vocabularyController.getVocabulary
);

vocabularies.put(
  '/:id',
  verifyAuthToken,
  verifyAdmin,
  RequestValidator.isValidObjectId(),
  RequestValidator.validate(UpdateVocabularyDto),
  vocabularyController.updateVocabulary
);
vocabularies.delete(
  '/:id',
  verifyAuthToken,
  verifyAdmin,
  RequestValidator.isValidObjectId(),
  vocabularyController.deleteVocabulary
);

export default vocabularies;
