import { Body, Param, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import GenreService from './genre.service';
import CreateGenreDto from './dto/create-genre.dto';
import UpdateGenreDto from './dto/update-genre.dto';

@Controller('genre')
export default class GenreController {
  constructor(private readonly genreServices: GenreService) {}

  @Post('post')
  postGenre( @Body() genre: CreateGenreDto) {
    return this.genreServices.insert(genre);
  }

  @Get()
  getAll() {
    return this.genreServices.getAllGenre();
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.genreServices.deleteGenre(+id);
  }
  
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreServices.updateGenre(+id, updateGenreDto);
  }

}