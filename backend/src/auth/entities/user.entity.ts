import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  token: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);

    // short for
    // this.id = partial.id;
  }
}
