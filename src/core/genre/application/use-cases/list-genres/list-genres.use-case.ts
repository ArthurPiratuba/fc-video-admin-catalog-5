import { GenreOutput, GenreOutputMapper } from '../common/genre-output';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '../../../../shared/application/pagination-output';
import {
  GenreRepository,
  GenreSearchParams,
  GenreSearchResult,
} from '../../../domain/genre.repository';
import { CategoryRepository } from '../../../../category/domain/category.repository';
import { ListGenresInput } from './list-genres.input';
import { UseCase } from '../../../../shared/application/use-case.interface';
import { CategoryId } from '../../../../category/domain/category.aggregate';

export class ListGenresUseCase
  implements UseCase<ListGenresInput, ListGenresOutput> {
  constructor(
    private genreRepo: GenreRepository,
    private categoryRepo: CategoryRepository,
  ) { }

  async execute(input: ListGenresInput): Promise<ListGenresOutput> {
    const params = GenreSearchParams.create(input);
    const searchResult = await this.genreRepo.search(params);
    return this.toOutput(searchResult);
  }

  private async toOutput(
    searchResult: GenreSearchResult,
  ): Promise<ListGenresOutput> {
    const { items: _items } = searchResult;

    const categoriesIdRelated = searchResult.items.reduce<CategoryId[]>(
      (acc, item) => {
        return acc.concat([...item.categories_id.values()]);
      },
      [],
    );
    //TODO - retirar duplicados
    const categoriesRelated =
      await this.categoryRepo.findByIds(categoriesIdRelated);

    const items = _items.map((i) => {
      const categoriesOfGenre = categoriesRelated.filter((c) =>
        i.categories_id.has(c.category_id.id),
      );
      return GenreOutputMapper.toOutput(i, categoriesOfGenre);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}

export type ListGenresOutput = PaginationOutput<GenreOutput>;
