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
      throw new HttpBadRequestError('User id is required', [
        `The 'userId' parameter is required to add a vocabulary.`,
      ]);
    }

    const [lesson, user] = await Promise.all([
      this.lessonRepository.getLesson(lessonId as string),
      this.userRepository.getUser(userId),
    ]);
    if (!lesson) {
      throw new HttpNotFoundError('Lesson not found', [
        'The lesson with the given ID does not exist.',
      ]);
    }
    if (!user) {
      throw new HttpNotFoundError('User not found', [
        'The user with the given ID does not exist.',
      ]);
    }
    return await this.vocabularyRepository.addVocabulary(userId, vocabulary);
  }

  public async getVocabularies() {
    return await this.vocabularyRepository.getVocabularies();
  }

  public async getVocabulary(id: string) {
    const vocabulary = await this.vocabularyRepository.getVocabulary(id);

    if (!vocabulary) {
      throw new HttpNotFoundError('Vocabulary not found', [
        'The vocabulary with the given ID does not exists',
      ]);
    }

    return vocabulary;
  }

  public async updateVocabulary(id: string, updatedData: Partial<Vocabulary>) {
    const vocabulary = await this.vocabularyRepository.getVocabulary(id);
    if (!vocabulary) {
      throw new HttpNotFoundError('Vocabulary not found', [
        'The vocabulary with the given ID does not exists',
      ]);
    }
    return await this.vocabularyRepository.updateVocabulary(id, updatedData);
  }

  public async deleteVocabulary(id: string) {
    const vocabulary = await this.vocabularyRepository.getVocabulary(id);
    if (!vocabulary) {
      throw new HttpNotFoundError('Vocabulary not found', [
        'The vocabulary with the given ID does not exists',
      ]);
    }
    return await this.vocabularyRepository.deleteVocabulary(id);
  }
}
