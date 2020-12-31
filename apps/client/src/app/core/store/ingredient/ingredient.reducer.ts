import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as IngredientActions from './ingredient.actions';
import { Ingredient } from '@prisma/client';

export const ingredientsFeatureKey = 'ingredients';

export interface State extends EntityState<Ingredient> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Ingredient> = createEntityAdapter<Ingredient>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(IngredientActions.addIngredient, (state, action) => adapter.addOne(action.ingredient, state)),
  on(IngredientActions.upsertIngredient, (state, action) => adapter.upsertOne(action.ingredient, state)),
  on(IngredientActions.addIngredients, (state, action) => adapter.addMany(action.ingredients, state)),
  on(IngredientActions.upsertIngredients, (state, action) => adapter.upsertMany(action.ingredients, state)),
  on(IngredientActions.updateIngredient, (state, action) => adapter.updateOne(action.ingredient, state)),
  on(IngredientActions.updateIngredients, (state, action) => adapter.updateMany(action.ingredients, state)),
  on(IngredientActions.deleteIngredient, (state, action) => adapter.removeOne(action.id, state)),
  on(IngredientActions.deleteIngredients, (state, action) => adapter.removeMany(action.ids, state)),
  on(IngredientActions.loadIngredients, (state, action) => adapter.setAll(action.ingredients, state)),
  on(IngredientActions.clearIngredients, state => adapter.removeAll(state))
);

export const selectIngredientsState = createFeatureSelector<State>(ingredientsFeatureKey);
export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors(selectIngredientsState);
