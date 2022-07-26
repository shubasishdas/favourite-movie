import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiTags } from '@nestjs/swagger';
import { FavoriteMovieDto } from './dto/favourite-movie.dto';

@Controller('movies')
@ApiTags('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // @Post()
  // create(@Body() createMovieDto: CreateMovieDto) {
  //   return this.moviesService.create(createMovieDto);
  // }

  @Get()
  findAllMovie() {
    return this.moviesService.findAllMovie();
  }

  @Post('favourite')
  addFavMovie(@Body() favoriteMovieDto: FavoriteMovieDto) {
    return this.moviesService.addFavMovie(favoriteMovieDto);
  }

  @Delete(':id')
  removeFavMovie(@Param('id') id: string) {
    return this.moviesService.removeFavMovie(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.moviesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
  //   return this.moviesService.update(+id, updateMovieDto);
  // }
}
