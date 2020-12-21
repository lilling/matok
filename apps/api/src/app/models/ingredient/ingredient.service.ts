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

  delete(where: IngredientWhereUniqueInput): Promise<Ingredient> {
    return this.prisma.ingredient.delete({ where });
  }

  deleteMany(where: IngredientWhereInput) {
    return this.prisma.ingredient.deleteMany({ where });
  }
}
