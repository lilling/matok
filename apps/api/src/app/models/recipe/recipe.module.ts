import { Module } from '@nestjs/common';

import { RecipeService } from './recipe.service';
import { PrismaService } from '../prisma.service';
import { RecipeController } from './recipe.controller';

@Module({
  imports: [],
  controllers: [RecipeController],
  providers: [RecipeService, PrismaService],
})
export class RecipeModule {}
