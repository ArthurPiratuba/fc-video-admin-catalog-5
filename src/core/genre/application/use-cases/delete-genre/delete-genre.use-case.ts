import { UseCase } from '../../../../shared/application/use-case.interface';
import { IUnitOfWork } from '../../../../shared/domain/repository/unit-of-work.interface';
import { GenreId } from '../../../domain/genre.aggregate';
import { GenreRepository } from '../../../domain/genre.repository';

export class DeleteGenreUseCase
    implements UseCase<DeleteGenreInput, DeleteGenreOutput> {
    constructor(
        private uow: IUnitOfWork,
        private genreRepo: GenreRepository,
    ) { }

    async execute(input: DeleteGenreInput): Promise<DeleteGenreOutput> {
        const genreId = new GenreId(input.id);
        return this.uow.do(async () => {
            return this.genreRepo.delete(genreId);
        });
    }
}

export type DeleteGenreInput = {
    id: string;
};

type DeleteGenreOutput = void;
