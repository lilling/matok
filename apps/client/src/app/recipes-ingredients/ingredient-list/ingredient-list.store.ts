import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Ingredient } from '@prisma/client';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromIngredient from '../../core/store/ingredient/ingredient.reducer';

export interface IngredientList {
  filter: string;
}

@Injectable()
export class IngredientListStore extends ComponentStore<IngredientList> {
  constructor(private store: Store<fromIngredient.State>) {
    super({ filter: '' });
  }

  readonly filter$ = this.select(state => state.filter);

  readonly filteredIngredients$: Observable<Ingredient[]> = this.select(
    this.filter$,
    this.store.select(fromIngredient.selectAll),
    (filter, ingredients) => (filter ? ingredients.filter(i => i.name.includes(filter)) : ingredients)
  );

  readonly changeFilter = this.updater((state, filter: string) => ({ filter }));
}
