import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RecipeService } from '../../services/recipe.service';
import { map, switchMap } from 'rxjs/operators';
import { addRecipe, deleteRecipe, RecipesActionTypes, loadRecipes, updateRecipe } from './recipe.actions';
import { TypedAction } from '@ngrx/store/src/models';
import { RecipeClient } from '../../models/recipe.model';

@Injectable()
export class RecipeEffects {
  loadRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActionTypes.loadRecipesStarted),
      switchMap(() => this.service.get().pipe(map(recipes => loadRecipes({ recipes }))))
    )
  );

  addRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActionTypes.addRecipeStarted),
      switchMap((action: { recipe: RecipeClient } & TypedAction<string>) =>
        this.service.add(action.recipe).pipe(map(recipe => addRecipe({ recipe })))
      )
    )
  );

  updateRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActionTypes.updateRecipeStarted),
      switchMap((action: { recipe: RecipeClient; id: string } & TypedAction<string>) =>
        this.service
          .update(action.id, action.recipe)
          .pipe(map(recipe => updateRecipe({ recipe: { id: action.id, changes: recipe } })))
      )
    )
  );

  deleteRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActionTypes.deleteRecipeStarted),
      switchMap((action: { id: string } & TypedAction<string>) =>
        this.service.delete(action.id).pipe(map(deleted => deleteRecipe({ id: deleted.id })))
      )
    )
  );

  constructor(private actions$: Actions, private service: RecipeService) {}
}
