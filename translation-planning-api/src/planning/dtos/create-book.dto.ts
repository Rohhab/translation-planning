import { IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  contractor: string;

  @IsNumber()
  pageCount: number;
}
