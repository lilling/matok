import { IngredientAmount, Recipe, SupplyAmount } from '@prisma/client';

export interface RecipeClient extends Recipe {
  ingredientsAmount: IngredientAmount[];
  supplyAmounts: SupplyAmount[];
}
