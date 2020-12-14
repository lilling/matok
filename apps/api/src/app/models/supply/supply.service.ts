import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  Supply,
  SupplyWhereUniqueInput,
  SupplyUpdateInput,
  SupplyWhereInput,
  SupplyUpdateManyMutationInput,
  SupplyOrderByInput,
  SupplyCreateInput,
} from '@prisma/client';

@Injectable()
export class SupplyService {
  constructor(private prisma: PrismaService) {}

  supply(userWhereUniqueInput: SupplyWhereUniqueInput): Promise<Supply | null> {
    return this.prisma.supply.findOne({
      where: userWhereUniqueInput,
    });
  }

  supplies(params: {
    skip?: number;
    take?: number;
    cursor?: SupplyWhereUniqueInput;
    where?: SupplyWhereInput;
    orderBy?: SupplyOrderByInput;
  }): Promise<Supply[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.supply.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  createSupply(data: SupplyCreateInput): Promise<Supply> {
    return this.prisma.supply.create({ data });
  }

  updateSupply(where: SupplyWhereUniqueInput, data: SupplyUpdateInput): Promise<Supply> {
    return this.prisma.supply.update({ data, where });
  }

  updateSupplies(where: SupplyWhereUniqueInput, data: SupplyUpdateManyMutationInput) {
    return this.prisma.supply.updateMany({ data, where });
  }

  deleteSupply(where: SupplyWhereUniqueInput): Promise<Supply> {
    return this.prisma.supply.delete({ where });
  }

  deleteSupplies(where: SupplyWhereInput) {
    return this.prisma.supply.deleteMany({ where });
  }
}
