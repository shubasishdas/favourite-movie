import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';

class Favorite {
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @ApiProperty()
  movieId: string;
}

export class FavoriteMovieDto {
  @ValidateNested({ each: true })
  @ApiProperty()
  movies: Favorite[];
  //   movies: {
  //     userId: string;
  //     movieId: string;
  //   };
}
