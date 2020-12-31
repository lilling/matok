import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Recipe } from '@prisma/client';

export const loadRecipesStarted = createAction('[Recipe/API] Load Recipes Started', props<{ filter: string }>());

export const loadRecipes = createAction('[Recipe/API] Load Recipes', props<{ recipes: Recipe[] }>());

export const addRecipe = createAction('[Recipe/API] Add Recipe', props<{ recipe: Recipe }>());

export const upsertRecipe = createAction('[Recipe/API] Upsert Recipe', props<{ recipe: Recipe }>());

export const addRecipes = createAction('[Recipe/API] Add Recipes', props<{ recipes: Recipe[] }>());

export const upsertRecipes = createAction('[Recipe/API] Upsert Recipes', props<{ recipes: Recipe[] }>());

export const updateRecipe = createAction('[Recipe/API] Update Recipe', props<{ recipe: Update<Recipe> }>());

export const updateRecipes = createAction('[Recipe/API] Update Recipes', props<{ recipes: Update<Recipe>[] }>());

export const deleteRecipe = createAction('[Recipe/API] Delete Recipe', props<{ id: string }>());

export const deleteRecipes = createAction('[Recipe/API] Delete Recipes', props<{ ids: string[] }>());

export const clearRecipes = createAction('[Recipe/API] Clear Recipes');
