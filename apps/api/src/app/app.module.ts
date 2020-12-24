import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngredientModule } from './models/ingredient/ingredient.module';
import { SupplyModule } from './models/supply/supply.module';
import { RecipeModule } from './models/recipe/recipe.module';

@Module({
  imports: [IngredientModule, SupplyModule, RecipeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
