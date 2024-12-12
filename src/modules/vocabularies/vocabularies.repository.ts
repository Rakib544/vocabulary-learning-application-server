import { type Vocabulary } from '@prisma/client';

import prisma from '@/lib/prisma';

export default class VocabularyRepository {
  public async addVocabulary(userId: string, vocabulary: Vocabulary) {
    const { meaning, pronunciation, word, whenToSay, lessonId } = vocabulary;
    const newVocabulary = await prisma.vocabulary.create({
      data: {
        meaning,
        pronunciation,
        word,
        whenToSay,
        userId,
        lessonId,
      },
    });
    return newVocabulary;
  }

  public async getVocabularies() {
    return await prisma.vocabulary.findMany({
      select: {
        id: true,
        word: true,
        meaning: true,
        whenToSay: true,
        pronunciation: true,
        lesson: { select: { lessonNo: true } },
      },
    });
  }

  public async getVocabulary(id: string) {
    return await prisma.vocabulary.findUnique({
      where: { id },
      select: {
        id: true,
        word: true,
        meaning: true,
        pronunciation: true,
        whenToSay: true,
        lessonId: true,
      },
    });
  }

  public async updateVocabulary(id: string, updatedData: Partial<Vocabulary>) {
    const allowedFields = new Set<keyof Vocabulary>([
      'word',
      'pronunciation',
      'meaning',
      'whenToSay',
      'lessonId',
    ]);

    const newData: Partial<Omit<Vocabulary, 'createdAt' | 'updatedAt'>> = {};

    Object.entries(updatedData).forEach(([key, value]) => {
      if (allowedFields.has(key as keyof Vocabulary) && value !== undefined) {
        newData[key as keyof Vocabulary] = value;
      }
    });

    return await prisma.vocabulary.update({
      where: { id },
      data: { ...newData },
    });
  }

  public async deleteVocabulary(id: string) {
    return await prisma.vocabulary.delete({ where: { id } });
  }
}
