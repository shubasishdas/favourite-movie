import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CurrentUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;
}
