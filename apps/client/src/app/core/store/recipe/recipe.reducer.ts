import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Recipe } from '@prisma/client';
import * as RecipeActions from './recipe.actions';

export const recipesFeatureKey = 'recipes';

export interface State extends EntityState<Recipe> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Recipe> = createEntityAdapter<Recipe>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(RecipeActions.addRecipe, (state, action) => adapter.addOne(action.recipe, state)),
  on(RecipeActions.upsertRecipe, (state, action) => adapter.upsertOne(action.recipe, state)),
  on(RecipeActions.addRecipes, (state, action) => adapter.addMany(action.recipes, state)),
  on(RecipeActions.upsertRecipes, (state, action) => adapter.upsertMany(action.recipes, state)),
  on(RecipeActions.updateRecipe, (state, action) => adapter.updateOne(action.recipe, state)),
  on(RecipeActions.updateRecipes, (state, action) => adapter.updateMany(action.recipes, state)),
  on(RecipeActions.deleteRecipe, (state, action) => adapter.removeOne(action.id, state)),
  on(RecipeActions.deleteRecipes, (state, action) => adapter.removeMany(action.ids, state)),
  on(RecipeActions.loadRecipes, (state, action) => adapter.setAll(action.recipes, state)),
  on(RecipeActions.clearRecipes, state => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
