import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { SupplyService } from './supply.service';
import {
  Supply,
  SupplyCreateInput,
  SupplyOrderByInput,
  SupplyUpdateInput,
  SupplyUpdateManyMutationInput,
  SupplyWhereInput,
  SupplyWhereUniqueInput,
} from '@prisma/client';

@Controller('supplies')
export class SupplyController {
  constructor(private readonly supplyService: SupplyService) {}

  @Post()
  getAllSupplies(
    @Body()
    params: {
      skip?: number;
      take?: number;
      cursor?: SupplyWhereUniqueInput;
      where?: SupplyWhereInput;
      orderBy?: SupplyOrderByInput;
    }
  ) {
    return this.supplyService.supplies(params);
  }

  @Get(':id')
  getIngredient(@Param('id') id: string) {
    return this.supplyService.supply({ id });
  }

  @Post('add')
  addIngredient(@Body() data: SupplyCreateInput): Promise<Supply> {
    return this.supplyService.createSupply(data);
  }

  @Delete(':id')
  deleteIngredient(@Param('id') id: string) {
    return this.supplyService.deleteSupply({ id });
  }

  @Delete()
  deleteIngredients(@Body() ids: string[]) {
    return this.supplyService.deleteSupplies({ id: { in: ids } });
  }

  @Put(':id')
  updateIngredient(@Param('id') id: string, @Body() data: SupplyUpdateInput) {
    return this.supplyService.updateSupply({ id }, data);
  }

  @Put()
  updateIngredients(
    @Body()
    params: {
      where: SupplyWhereUniqueInput;
      data: SupplyUpdateManyMutationInput;
    }
  ) {
    return this.supplyService.updateSupplies(params.where, params.data);
  }
}
