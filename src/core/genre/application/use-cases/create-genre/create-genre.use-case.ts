import { UseCase } from '@core/shared/application/use-case.interface';
import { IUnitOfWork } from '../../../../shared/domain/repository/unit-of-work.interface';
import { EntityValidationError } from '../../../../shared/domain/validators/validation.error';
import { Genre } from '../../../domain/genre.aggregate';
import { GenreRepository } from '../../../domain/genre.repository';
import { GenreOutput, GenreOutputMapper } from '../common/genre-output';
import { CreateGenreInput } from './create-genre.input';
import { CategoryRepository } from '@core/category/domain/category.repository';
import { CategoriesIdExistsInStorageValidator } from '@core/category/application/validators/categories-ids-exists-in-storage.validator';

export class CreateGenreUseCase
    implements UseCase<CreateGenreInput, CreateGenreOutput> {
    constructor(
        private uow: IUnitOfWork,
        private genreRepo: GenreRepository,
        private categoryRepo: CategoryRepository,
        private categoriesIdExistsInStorage: CategoriesIdExistsInStorageValidator,
    ) { }

    async execute(input: CreateGenreInput): Promise<CreateGenreOutput> {
        const [categoriesId, errorsCategoriesIds] = (
            await this.categoriesIdExistsInStorage.validate(input.categories_id)
        ).asArray();

        const { name, is_active } = input;

        const entity = Genre.create({
            name,
            categories_id: errorsCategoriesIds ? [] : categoriesId,
            is_active,
        });

        const notification = entity.notification;

        if (errorsCategoriesIds) {
            notification.setError(
                errorsCategoriesIds.map((e) => e.message),
                'categories_id',
            );
        }

        if (notification.hasErrors()) {
            throw new EntityValidationError(notification.toJSON());
        }

        await this.uow.do(async () => {
            return this.genreRepo.insert(entity);
        });

        const categories = await this.categoryRepo.findByIds(
            Array.from(entity.categories_id.values()),
        );

        return GenreOutputMapper.toOutput(entity, categories);
    }
}

export type CreateGenreOutput = GenreOutput;
