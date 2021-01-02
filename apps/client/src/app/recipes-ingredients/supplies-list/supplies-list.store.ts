import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Supply } from '@prisma/client';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromSupply from '../../core/store/supply/supply.reducer';

export interface SuppliesList {
  filter: string;
}

@Injectable()
export class SuppliesListStore extends ComponentStore<SuppliesList> {
  constructor(private store: Store<fromSupply.State>) {
    super({ filter: '' });
  }

  readonly filter$ = this.select(state => state.filter);

  readonly filteredSupplies$: Observable<Supply[]> = this.select(
    this.filter$,
    this.store.select(fromSupply.selectAll),
    (filter, supplies) => (filter ? supplies.filter(i => i.name.includes(filter)) : supplies)
  );

  readonly changeFilter = this.updater((state, filter: string) => ({ filter }));
}
