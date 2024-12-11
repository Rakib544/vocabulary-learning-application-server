import { type Vocabulary } from '@prisma/client';

import LessonRepository from '../lessons/lessons.repository';
import UserRepository from '../users/users.repository';
import VocabularyRepository from './vocabularies.repository';

import { HttpBadRequestError, HttpNotFoundError } from '@/lib/errors';

export default class VocabularyService {
  private readonly vocabularyRepository = new VocabularyRepository();
  private readonly lessonRepository = new LessonRepository();
  private readonly userRepository = new UserRepository();

  public async addVocabulary(userId: string, vocabulary: Vocabulary) {
    const { lessonId } = vocabulary;

    if (!userId) {
      throw new HttpBadRequestError('User id required', []);
    }

    const [lesson, user] = await Promise.all([
      this.lessonRepository.getLesson(lessonId as string),
      this.userRepository.getUser(userId),
    ]);
    if (!lesson) {
      throw new HttpBadRequestError('Invalid lesson number', []);
    }
    if (!user) {
      throw new HttpBadRequestError('User id required', []);
    }
    return await this.vocabularyRepository.addVocabulary(userId, vocabulary);
  }

  public async getVocabularies() {
    return await this.vocabularyRepository.getVocabularies();
  }

  public async updateVocabulary(id: string, updatedData: Partial<Vocabulary>) {
    const vocabulary = await this.vocabularyRepository.getVocabulary(id);
    if (!vocabulary) {
      throw new HttpNotFoundError('No vocabulary found with this id');
    }
    return await this.vocabularyRepository.updateVocabulary(id, updatedData);
  }

  public async deleteVocabulary(id: string) {
    return await this.vocabularyRepository.deleteVocabulary(id);
  }
}
