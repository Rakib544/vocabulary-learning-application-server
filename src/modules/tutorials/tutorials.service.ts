import { type Tutorial } from '@prisma/client';

import TutorialRepository from './tutorials.repository';

import { HttpNotFoundError } from '@/lib/errors';

export default class TutorialService {
  private readonly tutorialRepository = new TutorialRepository();

  public async addTutorial(tutorial: Tutorial) {
    return await this.tutorialRepository.addTutorial(tutorial);
  }

  public async getTutorials() {
    return await this.tutorialRepository.getTutorials();
  }

  public async updateTutorial(id: string, updatedData: Tutorial) {
    const tutorial = await this.tutorialRepository.getTutorial(id);
    if (!tutorial) {
      throw new HttpNotFoundError('Tutorial not found with this id');
    }
    const updatedTutorial = await this.tutorialRepository.updateTutorial(
      id,
      updatedData
    );
    return updatedTutorial;
  }

  public async deleteTutorial(id: string) {
    const tutorial = await this.tutorialRepository.getTutorial(id);
    if (!tutorial) {
      throw new HttpNotFoundError('Tutorial not found with this id');
    }
    const deletedTutorial = await this.tutorialRepository.deleteTutorial(id);
    return deletedTutorial;
  }
}
