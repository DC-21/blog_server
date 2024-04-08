import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  readonly userId: number;

  constructor(d: CreatePostDto) {
    this.title = d.title;
    this.description = d.title;
    this.userId = d.userId;
  }
}
