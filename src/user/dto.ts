import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegistorDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  constructor(d: RegistorDto) {
    this.username = d.username;
    this.email = d.email;
    this.password = d.password;
  }
}

export class LoginDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  constructor(d: LoginDto) {
    this.email = d.email;
    this.password = d.password;
  }
}
