import { createFeatureSelector, createReducer, on } from '@ngrx/store';
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
  on(SupplyActions.addSupplies, (state, action) => adapter.addMany(action.supplies, state)),
  on(SupplyActions.upsertSupplies, (state, action) => adapter.upsertMany(action.supplies, state)),
  on(SupplyActions.updateSupply, (state, action) => adapter.updateOne(action.supply, state)),
  on(SupplyActions.updateSupplies, (state, action) => adapter.updateMany(action.supplies, state)),
  on(SupplyActions.deleteSupply, (state, action) => adapter.removeOne(action.id, state)),
  on(SupplyActions.deleteSupplies, (state, action) => adapter.removeMany(action.ids, state)),
  on(SupplyActions.loadSupplies, (state, action) => adapter.setAll(action.supplies, state)),
  on(SupplyActions.clearSupplies, state => adapter.removeAll(state))
);
export const selectSupplyState = createFeatureSelector<State>(suppliesFeatureKey);
export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors(selectSupplyState);
