import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { RecipeClient } from '../../models/recipe.model';

export const RecipesActionTypes = {
  loadRecipesStarted: '[Recipe/API] Load Recipes Started',
  loadRecipes: '[Recipe/API] Load Recipes',
  addRecipeStarted: '[Recipe/API] Add Recipe Started',
  addRecipe: '[Recipe/API] Add Recipe',
  upsertRecipe: '[Recipe/API] Upsert Recipe',
  addRecipes: '[Recipe/API] Add Recipes',
  upsertRecipes: '[Recipe/API] Upsert Recipes',
  updateRecipeStarted: '[Recipe/API] Update Recipe Started',
  updateRecipe: '[Recipe/API] Update Recipe',
  updateRecipes: '[Recipe/API] Update Recipes',
  deleteRecipeStarted: '[Recipe/API] Delete Recipe Started',
  deleteRecipe: '[Recipe/API] Delete Recipe',
  deleteRecipes: '[Recipe/API] Delete Recipes',
  clearRecipes: '[Recipe/API] Clear Recipes',
};

export const loadRecipesStarted = createAction(RecipesActionTypes.loadRecipesStarted);

export const loadRecipes = createAction(RecipesActionTypes.loadRecipes, props<{ recipes: RecipeClient[] }>());

export const addRecipeStarted = createAction(RecipesActionTypes.addRecipeStarted, props<{ recipe: RecipeClient }>());

export const addRecipe = createAction(RecipesActionTypes.addRecipe, props<{ recipe: RecipeClient }>());

export const upsertRecipe = createAction(RecipesActionTypes.upsertRecipe, props<{ recipe: RecipeClient }>());

export const addRecipes = createAction(RecipesActionTypes.addRecipes, props<{ recipes: RecipeClient[] }>());

export const upsertRecipes = createAction(RecipesActionTypes.upsertRecipes, props<{ recipes: RecipeClient[] }>());

export const updateRecipeStarted = createAction(
  RecipesActionTypes.updateRecipeStarted,
  props<{ id: string; recipe: RecipeClient }>()
);

export const updateRecipe = createAction(RecipesActionTypes.updateRecipe, props<{ recipe: Update<RecipeClient> }>());

export const updateRecipes = createAction(
  RecipesActionTypes.updateRecipes,
  props<{ recipes: Update<RecipeClient>[] }>()
);

export const deleteRecipeStarted = createAction(RecipesActionTypes.deleteRecipeStarted, props<{ id: string }>());

export const deleteRecipe = createAction(RecipesActionTypes.deleteRecipe, props<{ id: string }>());

export const deleteRecipes = createAction(RecipesActionTypes.deleteRecipes, props<{ ids: string[] }>());

export const clearRecipes = createAction(RecipesActionTypes.clearRecipes);
