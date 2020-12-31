import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Supply } from '@prisma/client';

import * as SupplyActions from './supply.actions';

export const suppliesFeatureKey = 'supplies';

export interface State extends EntityState<Supply> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Supply> = createEntityAdapter<Supply>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(SupplyActions.addSupply, (state, action) => adapter.addOne(action.supply, state)),
  on(SupplyActions.upsertSupply, (state, action) => adapter.upsertOne(action.supply, state)),
  on(SupplyActions.addSupplys, (state, action) => adapter.addMany(action.supplys, state)),
  on(SupplyActions.upsertSupplys, (state, action) => adapter.upsertMany(action.supplys, state)),
  on(SupplyActions.updateSupply, (state, action) => adapter.updateOne(action.supply, state)),
  on(SupplyActions.updateSupplys, (state, action) => adapter.updateMany(action.supplys, state)),
  on(SupplyActions.deleteSupply, (state, action) => adapter.removeOne(action.id, state)),
  on(SupplyActions.deleteSupplys, (state, action) => adapter.removeMany(action.ids, state)),
  on(SupplyActions.loadSupplys, (state, action) => adapter.setAll(action.supplys, state)),
  on(SupplyActions.clearSupplys, state => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
