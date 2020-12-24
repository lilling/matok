import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  Recipe,
  RecipeWhereUniqueInput,
  RecipeUpdateInput,
  RecipeWhereInput,
  RecipeUpdateManyMutationInput,
  RecipeOrderByInput,
  IngredientAmount,
  SupplyAmount,
} from '@prisma/client';

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}

  get(where: RecipeWhereUniqueInput): Promise<Recipe | null> {
    return this.prisma.recipe.findOne({
      where,
      include: {
        IngredientAmount: { include: { Ingredient: true } },
        SupplyAmount: { include: { Supply: true } },
      },
    });
  }

  getMany(params: {
    skip?: number;
    take?: number;
    cursor?: RecipeWhereUniqueInput;
    where?: RecipeWhereInput;
    orderBy?: RecipeOrderByInput;
  }): Promise<Recipe[]> {
    return this.prisma.recipe.findMany({
      ...params,
      include: {
        IngredientAmount: { include: { Ingredient: true } },
        SupplyAmount: { include: { Supply: true } },
      },
    });
  }

  create(item: Recipe, ingredientAmounts: IngredientAmount[], supplyAmounts: SupplyAmount[]): Promise<Recipe> {
    return this.prisma.recipe.create({
      data: {
        id: item.id,
        name: item.name,
        SupplyAmount: {
          create: supplyAmounts.map(s => ({
            id: s.id,
            amount: s.amount,
            Supply: { connect: { id: s.supplyId } },
          })),
        },
        IngredientAmount: {
          create: ingredientAmounts.map(s => ({
            id: s.id,
            amount: s.amount,
            Ingredient: { connect: { id: s.ingredientId } },
          })),
        },
      },
    });
  }

  update(where: RecipeWhereUniqueInput, data: RecipeUpdateInput): Promise<Recipe> {
    return this.prisma.recipe.update({ data, where });
  }

  updateMany(where: RecipeWhereUniqueInput, data: RecipeUpdateManyMutationInput) {
    return this.prisma.recipe.updateMany({ data, where });
  }

  async delete(id: string): Promise<Recipe> {
    await this.deleteFromOtherTables({ recipeId: { equals: id } });
    return this.prisma.recipe.delete({ where: { id } });
  }

  async deleteMany(ids: string[]) {
    await this.deleteFromOtherTables({ recipeId: { in: ids } });
    return this.prisma.recipe.deleteMany({ where: { id: { in: ids } } });
  }

  private async deleteFromOtherTables(where) {
    await this.prisma.ingredientAmount.deleteMany({ where });
    await this.prisma.supplyAmount.deleteMany({ where });
  }
}
