import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import {
  Ingredient as IngredientModel,
  IngredientCreateInput,
  IngredientUpdateInput,
  IngredientOrderByInput,
  IngredientWhereInput,
  IngredientWhereUniqueInput,
  IngredientUpdateManyMutationInput,
} from '@prisma/client';

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  getAllIngredients(
    @Body()
    params: {
      skip?: number;
      take?: number;
      cursor?: IngredientWhereUniqueInput;
      where?: IngredientWhereInput;
      orderBy?: IngredientOrderByInput;
    }
  ) {
    return this.ingredientService.ingredients(params);
  }

  @Get(':id')
  getIngredient(@Param('id') id: string) {
    return this.ingredientService.ingredient({ id });
  }

  @Post('add')
  addIngredient(@Body() ingredientData: IngredientCreateInput): Promise<IngredientModel> {
    return this.ingredientService.createIngredient(ingredientData);
  }

  @Delete(':id')
  deleteIngredient(@Param('id') id: string) {
    return this.ingredientService.deleteIngredient({ id });
  }

  @Delete()
  deleteIngredients(@Body() ids: string[]) {
    return this.ingredientService.deleteIngredients({ id: { in: ids } });
  }

  @Put(':id')
  updateIngredient(@Param('id') id: string, @Body() data: IngredientUpdateInput) {
    return this.ingredientService.updateIngredient({ id }, data);
  }

  @Put()
  updateIngredients(
    @Body()
    params: {
      where: IngredientWhereUniqueInput;
      data: IngredientUpdateManyMutationInput;
    }
  ) {
    return this.ingredientService.updateIngredients(params.where, params.data);
  }
}
