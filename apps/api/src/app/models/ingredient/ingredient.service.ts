import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
@Injectable()
export class IngredientService {
  constructor(private prisma: PrismaService) {}

  get(userWhereUniqueInput: IngredientWhereUniqueInput): Promise<Ingredient | null> {
    return this.prisma.ingredient.findOne({
      where: userWhereUniqueInput,
    });
  }

  getMany(params: {
    skip?: number;
    take?: number;
    cursor?: IngredientWhereUniqueInput;
    where?: IngredientWhereInput;
    orderBy?: IngredientOrderByInput;
  }): Promise<Ingredient[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.ingredient.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
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

  async delete(where: IngredientWhereUniqueInput): Promise<Ingredient> {
    await this.prisma.ingredientAmount.deleteMany({
      where: { ingredientId: { equals: where.id } },
    });
    return this.prisma.ingredient.delete({ where });
  }

  async deleteMany(ids: string[]) {
    await this.prisma.ingredientAmount.deleteMany({
      where: { ingredientId: { in: ids } },
    });
    return this.prisma.ingredient.deleteMany({ where: { id: { in: ids } } });
  }
}

import {
  Ingredient,
  IngredientWhereUniqueInput,
  IngredientUpdateInput,
  IngredientWhereInput,
  IngredientUpdateManyMutationInput,
  IngredientOrderByInput,
  IngredientCreateInput,
} from '@prisma/client';
