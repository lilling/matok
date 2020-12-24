import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import {
  IngredientAmount,
  Recipe,
  RecipeCreateInput,
  RecipeOrderByInput,
  RecipeUpdateInput,
  RecipeUpdateManyMutationInput,
  RecipeWhereInput,
  RecipeWhereUniqueInput,
  SupplyAmount,
} from '@prisma/client';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  getMany(
    @Body()
    params: {
      skip?: number;
      take?: number;
      cursor?: RecipeWhereUniqueInput;
      where?: RecipeWhereInput;
      orderBy?: RecipeOrderByInput;
    }
  ) {
    return this.recipeService.getMany(params);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.recipeService.get({ id });
  }

  @Post('add')
  add(
    @Body() data: { item: Recipe; ingredientAmounts: IngredientAmount[]; supplyAmounts: SupplyAmount[] }
  ): Promise<Recipe> {
    const { item, ingredientAmounts, supplyAmounts } = data;
    return this.recipeService.create(item, ingredientAmounts, supplyAmounts);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.recipeService.delete(id);
  }

  @Delete()
  deleteMany(@Body() ids: string[]) {
    return this.recipeService.deleteMany(ids);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: RecipeUpdateInput) {
    return this.recipeService.update({ id }, data);
  }

  @Put()
  updateMany(
    @Body()
    params: {
      where: RecipeWhereUniqueInput;
      data: RecipeUpdateManyMutationInput;
    }
  ) {
    return this.recipeService.updateMany(params.where, params.data);
  }
}
