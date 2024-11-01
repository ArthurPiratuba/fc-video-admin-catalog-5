import { NotFoundError } from "@core/shared/domain/errors/not-found.error";
import { UseCase } from "../../../../shared/application/use-case.interface";
import { Category, CategoryId } from "../../../domain/category.aggregate";
import { CategoryRepository } from "../../../domain/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../common/category-output";

export class GetCategoryUseCase
  implements UseCase<GetCategoryInput, GetCategoryOutput> {
  constructor(private categoryRepo: CategoryRepository) { }

  async execute(input: GetCategoryInput): Promise<GetCategoryOutput> {
    const categoryId = new CategoryId(input.id);
    const category = await this.categoryRepo.findById(categoryId);
    if (!category) {
      throw new NotFoundError(input.id, Category);
    }

    return CategoryOutputMapper.toOutput(category);
  }
}

export type GetCategoryInput = {
  id: string;
};

export type GetCategoryOutput = CategoryOutput;
