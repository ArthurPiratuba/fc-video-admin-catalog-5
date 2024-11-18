import { CategoryRepository } from '../../../../category/domain/category.repository';
import { UseCase } from '../../../../shared/application/use-case.interface';
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error';
import { Genre, GenreId } from '../../../domain/genre.aggregate';
import { GenreRepository } from '../../../domain/genre.repository';
import { GenreOutput, GenreOutputMapper } from '../common/genre-output';

export class GetGenreUseCase
  implements UseCase<GetGenreInput, GetGenreOutput>
{
  constructor(
    private genreRepo: GenreRepository,
    private categoryRepo: CategoryRepository,
  ) {}

  async execute(input: GetGenreInput): Promise<GetGenreOutput> {
    const genreId = new GenreId(input.id);
    const genre = await this.genreRepo.findById(genreId);
    if (!genre) {
      throw new NotFoundError(input.id, Genre);
    }
    const categories = await this.categoryRepo.findByIds([
      ...genre.categories_id.values(),
    ]);
    return GenreOutputMapper.toOutput(genre, categories);
  }
}

export type GetGenreInput = {
  id: string;
};

export type GetGenreOutput = GenreOutput;
