import { UseCase } from '../../../../shared/application/use-case.interface';
import { CastMemberId } from '../../../domain/cast-member.aggregate';
import { CastMemberRepository } from '../../../domain/cast-member.repository';

export class DeleteCastMemberUseCase implements UseCase<DeleteCastMemberInput, DeleteCastMemberOutput> {

    constructor(private castMemberRepository: CastMemberRepository) { }

    async execute(input: DeleteCastMemberInput): Promise<DeleteCastMemberOutput> {
        const castMemberId = new CastMemberId(input.id);
        await this.castMemberRepository.delete(castMemberId);
    }
}

export type DeleteCastMemberInput = {
    id: string;
};

type DeleteCastMemberOutput = void;
