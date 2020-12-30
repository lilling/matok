import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  Ingredient,
  IngredientWhereUniqueInput,
  IngredientUpdateInput,
  IngredientWhereInput,
  IngredientUpdateManyMutationInput,
  IngredientOrderByInput,
  IngredientCreateInput,
} from '@prisma/client';

@Injectable()
export class IngredientService {
  constructor(private prisma: PrismaService) {}

  get(id: string): Promise<Ingredient | null> {
    return this.prisma.ingredient.findOne({ where: { id } });
  }

  getMany(params: {
    skip?: number;
    take?: number;
    cursor?: IngredientWhereUniqueInput;
    where?: IngredientWhereInput;
    orderBy?: IngredientOrderByInput;
  }): Promise<Ingredient[]> {
    return this.prisma.ingredient.findMany({ ...params });
  }

  create(data: IngredientCreateInput): Promise<Ingredient> {
    return this.prisma.ingredient.create({ data });
  }

  update(where: IngredientWhereUniqueInput, data: IngredientUpdateInput): Promise<Ingredient> {
    return this.prisma.ingredient.update({ data, where });
  }

  updateMany(where: IngredientWhereUniqueInput, data: IngredientUpdateManyMutationInput) {
    return this.prisma.ingredient.updateMany({ data, where });
  }

  async delete(id: string): Promise<Ingredient> {
    await this.prisma.ingredientAmount.deleteMany({ where: { ingredientId: { equals: id } } });
    return this.prisma.ingredient.delete({ where: { id } });
  }

  async deleteMany(ids: string[]) {
    await this.prisma.ingredientAmount.deleteMany({ where: { ingredientId: { in: ids } } });
    return this.prisma.ingredient.deleteMany({ where: { id: { in: ids } } });
  }
}
