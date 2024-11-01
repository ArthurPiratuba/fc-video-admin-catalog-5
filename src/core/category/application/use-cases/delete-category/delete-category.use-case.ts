import { UseCase } from "../../../../shared/application/use-case.interface";
import { CategoryId } from "../../../domain/category.aggregate";
import { CategoryRepository } from "../../../domain/category.repository";

export class DeleteCategoryUseCase
  implements UseCase<DeleteCategoryInput, DeleteCategoryOutput> {
  constructor(private categoryRepo: CategoryRepository) { }

  async execute(input: DeleteCategoryInput): Promise<DeleteCategoryOutput> {
    const categoryId = new CategoryId(input.id);
    await this.categoryRepo.delete(categoryId);
  }
}

export type DeleteCategoryInput = {
  id: string;
};

type DeleteCategoryOutput = void;
