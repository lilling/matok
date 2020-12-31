import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IngredientService } from '../../services/ingredient.service';
import { map, switchMap } from 'rxjs/operators';
import {
  addIngredient,
  deleteIngredient,
  IngredientsActionTypes,
  loadIngredients,
  updateIngredient,
} from './ingredient.actions';
import { TypedAction } from '@ngrx/store/src/models';
import { Ingredient } from '@prisma/client';

@Injectable()
export class IngredientEffects {
  loadIngredients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IngredientsActionTypes.loadIngredientsStarted),
      switchMap((action: { filter: string } & TypedAction<string>) =>
        this.service.get(action.filter).pipe(map(ingredients => loadIngredients({ ingredients })))
      )
    )
  );

  addIngredient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IngredientsActionTypes.addIngredientStarted),
      switchMap((action: { ingredient: Ingredient } & TypedAction<string>) =>
        this.service.add(action.ingredient).pipe(map(ingredient => addIngredient({ ingredient })))
      )
    )
  );

  updateIngredients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IngredientsActionTypes.updateIngredientStarted),
      switchMap((action: { ingredient: Ingredient; id: string } & TypedAction<string>) =>
        this.service
          .update(action.id, action.ingredient)
          .pipe(map(ingredient => updateIngredient({ ingredient: { id: action.id, changes: ingredient } })))
      )
    )
  );

  deleteIngredient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IngredientsActionTypes.deleteIngredientStarted),
      switchMap((action: { id: string } & TypedAction<string>) =>
        this.service.delete(action.id).pipe(map(deleted => deleteIngredient({ id: deleted.id })))
      )
    )
  );

  constructor(private actions$: Actions, private service: IngredientService) {}
}
