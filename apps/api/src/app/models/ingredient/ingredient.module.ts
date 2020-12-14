import { Module } from '@nestjs/common';

import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [IngredientController],
  providers: [IngredientService, PrismaService],
})
export class IngredientModule {}
