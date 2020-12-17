import { Injectable } from '@nestjs/common';
import CreateGenreDto from './dto/create-genre.dto';
import UpdateGenreDto from './dto/update-genre.dto';
import GenreEntity from '../db/genre.entity';

@Injectable()
export default class GenreService {
  async insert(genreDetails: CreateGenreDto): Promise<GenreEntity> {

    const genreEntity: GenreEntity = GenreEntity.create();
    const {type} = genreDetails;

    genreEntity.type = type;
    await GenreEntity.save(genreEntity);
    return genreEntity;
  }

  async getAllGenre(): Promise<GenreEntity[]> {
    return await GenreEntity.find();
  }

  async deleteGenre(genreID: number): Promise<any> {
    return await GenreEntity.delete(genreID);
  }

  async updateGenre(genreID: number, genreDetails: UpdateGenreDto): Promise<GenreEntity> {
    const genreEntity: GenreEntity = await GenreEntity.findOne({where: {id: genreID}});
    const {type } = genreDetails;
    genreEntity.type = type;
    await GenreEntity.update(genreID, genreEntity);
    return genreEntity;
  }

}