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

  public async getTutorial(id: string) {
    const tutorial = await this.tutorialRepository.getTutorial(id);

    if (!tutorial) {
      throw new HttpNotFoundError('Tutorial not found', [
        'The tutorial with the given ID does not exists',
      ]);
    }
    return tutorial;
  }

  public async updateTutorial(id: string, updatedData: Tutorial) {
    const tutorial = await this.tutorialRepository.getTutorial(id);
    if (!tutorial) {
      throw new HttpNotFoundError('Tutorial not found', [
        'The tutorial with the given ID does not exists',
      ]);
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
      throw new HttpNotFoundError('Tutorial not found', [
        'The tutorial with the given ID does not exists',
      ]);
    }
    const deletedTutorial = await this.tutorialRepository.deleteTutorial(id);
    return deletedTutorial;
  }
}
