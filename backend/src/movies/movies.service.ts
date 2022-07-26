import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}
  // create(createMovieDto: CreateMovieDto) {
  //   return 'This action adds a new movie';
  // }

  findAllMovie() {
    return this.prisma.movie.findMany();
  }

  addFavMovie(favoriteMovieDto) {
    return this.prisma.favoriteMovie.create({
      data: favoriteMovieDto,
    });
  }

  removeFavMovie(id) {
    return this.prisma.favoriteMovie.delete({
      where: { movieId_userId: id },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} movie`;
  // }

  // update(id: number, updateMovieDto: UpdateMovieDto) {
  //   return `This action updates a #${id} movie`;
  // }
}
