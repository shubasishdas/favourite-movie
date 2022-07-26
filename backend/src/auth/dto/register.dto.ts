import { ApiProperty } from '@nestjs/swagger';
import { hash, verify } from 'argon2';

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  validate,
  Validate,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  // @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {
  //   message: "Password is too weak",
  // })
  @ApiProperty()
  password: string;
}
