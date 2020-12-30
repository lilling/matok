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
  getMany(
    @Body()
    params: {
      skip?: number;
      take?: number;
      cursor?: IngredientWhereUniqueInput;
      where?: IngredientWhereInput;
      orderBy?: IngredientOrderByInput;
    }
  ) {
    return this.ingredientService.getMany(params);
  }

  @Get(':id')
  getIngredient(@Param('id') id: string) {
    return this.ingredientService.get(id);
  }

  @Post('add')
  addIngredient(@Body() ingredientData: IngredientCreateInput): Promise<IngredientModel> {
    return this.ingredientService.create(ingredientData);
  }

  @Delete(':id')
  deleteIngredient(@Param('id') id: string) {
    return this.ingredientService.delete(id);
  }

  @Delete()
  deleteMany(@Body() ids: string[]) {
    return this.ingredientService.deleteMany(ids);
  }

  @Put(':id')
  updateIngredient(@Param('id') id: string, @Body() data: IngredientUpdateInput) {
    return this.ingredientService.update({ id }, data);
  }

  @Put()
  updateMany(
    @Body()
    params: {
      where: IngredientWhereUniqueInput;
      data: IngredientUpdateManyMutationInput;
    }
  ) {
    return this.ingredientService.updateMany(params.where, params.data);
  }
}
