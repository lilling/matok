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

  get(userWhereUniqueInput: SupplyWhereUniqueInput): Promise<Supply | null> {
    return this.prisma.supply.findOne({
      where: userWhereUniqueInput,
    });
  }

  getMany(params: {
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

  create(data: SupplyCreateInput): Promise<Supply> {
    return this.prisma.supply.create({ data });
  }

  update(where: SupplyWhereUniqueInput, data: SupplyUpdateInput): Promise<Supply> {
    return this.prisma.supply.update({ data, where });
  }

  updateMany(where: SupplyWhereUniqueInput, data: SupplyUpdateManyMutationInput) {
    return this.prisma.supply.updateMany({ data, where });
  }

  async delete(where: SupplyWhereUniqueInput): Promise<Supply> {
    await this.prisma.supplyAmount.deleteMany({
      where: { supplyId: { equals: where.id } },
    });
    return this.prisma.supply.delete({ where });
  }

  async deleteMany(ids: string[]) {
    await this.prisma.supplyAmount.deleteMany({
      where: { supplyId: { in: ids } },
    });
    return this.prisma.supply.deleteMany({ where: { id: { in: ids } } });
  }
}
