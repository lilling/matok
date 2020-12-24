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
  getMany(
    @Body()
    params: {
      skip?: number;
      take?: number;
      cursor?: SupplyWhereUniqueInput;
      where?: SupplyWhereInput;
      orderBy?: SupplyOrderByInput;
    }
  ) {
    return this.supplyService.getMany(params);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.supplyService.get({ id });
  }

  @Post('add')
  add(@Body() data: SupplyCreateInput): Promise<Supply> {
    return this.supplyService.create(data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.supplyService.delete({ id });
  }

  @Delete()
  deleteMany(@Body() ids: string[]) {
    return this.supplyService.deleteMany(ids);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: SupplyUpdateInput) {
    return this.supplyService.update({ id }, data);
  }

  @Put()
  updateMany(
    @Body()
    params: {
      where: SupplyWhereUniqueInput;
      data: SupplyUpdateManyMutationInput;
    }
  ) {
    return this.supplyService.updateMany(params.where, params.data);
  }
}
