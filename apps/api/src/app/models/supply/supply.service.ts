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

  get(id: string): Promise<Supply | null> {
    return this.prisma.supply.findOne({ where: { id } });
  }

  getMany(params: {
    skip?: number;
    take?: number;
    cursor?: SupplyWhereUniqueInput;
    where?: SupplyWhereInput;
    orderBy?: SupplyOrderByInput;
  }): Promise<Supply[]> {
    return this.prisma.supply.findMany({ ...params });
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

  async delete(id: string): Promise<Supply> {
    await this.prisma.supplyAmount.deleteMany({ where: { supplyId: { equals: id } } });
    return this.prisma.supply.delete({ where: { id } });
  }

  async deleteMany(ids: string[]) {
    await this.prisma.supplyAmount.deleteMany({ where: { supplyId: { in: ids } } });
    return this.prisma.supply.deleteMany({ where: { id: { in: ids } } });
  }
}
