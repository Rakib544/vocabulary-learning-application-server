import { type Tutorial } from '@prisma/client';

import prisma from '@/lib/prisma';

export default class TutorialRepository {
  public async addTutorial(tutorial: Tutorial) {
    return await prisma.tutorial.create({
      data: { title: tutorial.title, url: tutorial.url },
    });
  }

  public async getTutorials() {
    return await prisma.tutorial.findMany({
      select: { id: true, title: true, url: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  public async getTutorial(id: string) {
    return await prisma.tutorial.findUnique({ where: { id } });
  }

  public async updateTutorial(id: string, updatedData: Tutorial) {
    const newData = {} as any;

    if (updatedData.title) {
      newData.title = updatedData.title;
    }

    if (updatedData.url) {
      newData.url = updatedData.url;
    }
    return await prisma.tutorial.update({
      where: { id },
      data: { ...updatedData },
    });
  }

  public async deleteTutorial(id: string) {
    return await prisma.tutorial.delete({ where: { id } });
  }
}
