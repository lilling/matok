import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Recipe } from '@prisma/client';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRecipe from '../../core/store/recipe/recipe.reducer';

export interface RecipesList {
  filter: string;
}

@Injectable()
export class RecipesListStore extends ComponentStore<RecipesList> {
  constructor(private store: Store<fromRecipe.State>) {
    super({ filter: '' });
  }

  readonly filter$ = this.select(state => state.filter);

  readonly filteredRecipes$: Observable<Recipe[]> = this.select(
    this.filter$,
    this.store.select(fromRecipe.selectAll),
    (filter, recipes) => (filter ? recipes.filter(i => i.name.includes(filter)) : recipes)
  );

  readonly changeFilter = this.updater((state, filter: string) => ({ filter }));
}
