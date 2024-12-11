import { IsOptional, IsString } from 'class-validator';

export class CreateTutorialDto {
  @IsString()
  title: string;

  @IsString()
  url: string;
}

export class UpdateTutorialDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  url: string;
}
