import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  name: string;

  @IsInt()
  lessonNo: number;
}

export class UpdateLessonDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  lessonNo: number;
}
