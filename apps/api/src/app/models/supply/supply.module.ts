import { Module } from '@nestjs/common';

import { SupplyService } from './supply.service';
import { SupplyController } from './supply.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [SupplyController],
  providers: [SupplyService, PrismaService],
})
export class SupplyModule {}
