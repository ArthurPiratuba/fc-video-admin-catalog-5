import { NotFoundError } from "@core/shared/domain/errors/not-found.error";
import { UseCase } from "../../../../shared/application/use-case.interface";
import { EntityValidationError } from "../../../../shared/domain/validators/validation.error";
import { Category, CategoryId } from "../../../domain/category.aggregate";
import { CategoryRepository } from "../../../domain/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../common/category-output";
import { UpdateCategoryInput } from "./update-category.input";

export class UpdateCategoryUseCase implements UseCase<UpdateCategoryInput, UpdateCategoryOutput> {
  constructor(private categoryRepo: CategoryRepository) { }

  async execute(input: UpdateCategoryInput): Promise<UpdateCategoryOutput> {
    const categoryId = new CategoryId(input.id);
    const category = await this.categoryRepo.findById(categoryId);

    if (!category) {
      throw new NotFoundError(input.id, Category);
    }

    input.name && category.changeName(input.name);

    if (input.description !== undefined) {
      category.changeDescription(input.description);
    }

    if (input.is_active === true) {
      category.activate();
    }

    if (input.is_active === false) {
      category.deactivate();
    }

    if (category.notification.hasErrors()) {
      throw new EntityValidationError(category.notification.toJSON());
    }

    await this.categoryRepo.update(category);

    return CategoryOutputMapper.toOutput(category);
  }
}

export type UpdateCategoryOutput = CategoryOutput;