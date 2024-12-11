import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateVocabularyDto {
  @IsString()
  meaning: string;

  @IsString()
  pronunciation: string;

  @IsString()
  word: string;

  @IsString()
  whenToSay: string;

  @IsString()
  @MinLength(24)
  lessonId: string;
}

export class UpdateVocabularyDto {
  @IsOptional()
  @IsString()
  meaning: string;

  @IsOptional()
  @IsString()
  pronunciation: string;

  @IsOptional()
  @IsString()
  word: string;

  @IsOptional()
  @IsString()
  whenToSay: string;

  @IsOptional()
  @IsString()
  @MinLength(24)
  lessonId: string;
}
