import { ApiProperty } from '@nestjs/swagger';

export class Auth {
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  token: string;
}
