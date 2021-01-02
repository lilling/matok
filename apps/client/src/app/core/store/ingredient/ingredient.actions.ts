import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Ingredient } from '@prisma/client';

export const IngredientsActionTypes = {
  loadIngredientsStarted: '[Ingredient/API] Load Ingredients Started',
  loadIngredients: '[Ingredient/API] Load Ingredients',
  addIngredientStarted: '[Ingredient/API] Add Ingredient Started',
  addIngredient: '[Ingredient/API] Add Ingredient',
  upsertIngredient: '[Ingredient/API] Upsert Ingredient',
  addIngredients: '[Ingredient/API] Add Ingredients',
  upsertIngredients: '[Ingredient/API] Upsert Ingredients',
  updateIngredientStarted: '[Ingredient/API] Update Ingredient Started',
  updateIngredient: '[Ingredient/API] Update Ingredient',
  updateIngredients: '[Ingredient/API] Update Ingredients',
  deleteIngredientStarted: '[Ingredient/API] Delete Ingredient Started',
  deleteIngredient: '[Ingredient/API] Delete Ingredient',
  deleteIngredients: '[Ingredient/API] Delete Ingredients',
  clearIngredients: '[Ingredient/API] Clear Ingredients',
};

export const loadIngredientsStarted = createAction(IngredientsActionTypes.loadIngredientsStarted);

export const loadIngredients = createAction(
  IngredientsActionTypes.loadIngredients,
  props<{ ingredients: Ingredient[] }>()
);

export const addIngredientStarted = createAction(
  IngredientsActionTypes.addIngredientStarted,
  props<{ ingredient: Ingredient }>()
);
export const addIngredient = createAction(IngredientsActionTypes.addIngredient, props<{ ingredient: Ingredient }>());

export const upsertIngredient = createAction(
  IngredientsActionTypes.upsertIngredient,
  props<{ ingredient: Ingredient }>()
);

export const addIngredients = createAction(
  IngredientsActionTypes.addIngredients,
  props<{ ingredients: Ingredient[] }>()
);

export const upsertIngredients = createAction(
  IngredientsActionTypes.upsertIngredients,
  props<{ ingredients: Ingredient[] }>()
);

export const updateIngredientStarted = createAction(
  IngredientsActionTypes.updateIngredientStarted,
  props<{ id: string; ingredient: Ingredient }>()
);

export const updateIngredient = createAction(
  IngredientsActionTypes.updateIngredient,
  props<{ ingredient: Update<Ingredient> }>()
);

export const updateIngredients = createAction(
  IngredientsActionTypes.updateIngredients,
  props<{ ingredients: Update<Ingredient>[] }>()
);

export const deleteIngredientStarted = createAction(
  IngredientsActionTypes.deleteIngredientStarted,
  props<{ id: string }>()
);

export const deleteIngredient = createAction(IngredientsActionTypes.deleteIngredient, props<{ id: string }>());

export const deleteIngredients = createAction(IngredientsActionTypes.deleteIngredients, props<{ ids: string[] }>());

export const clearIngredients = createAction(IngredientsActionTypes.clearIngredients);
