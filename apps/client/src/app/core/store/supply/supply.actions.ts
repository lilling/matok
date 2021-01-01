import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Ingredient, Supply } from '@prisma/client';

export const SuppliesActionTypes = {
  loadSuppliesStarted: '[Supply/API] Load Supplies Started',
  loadSupplies: '[Supply/API] Load Supplies',
  addSupplyStarted: '[Supply/API] Add Supply Started',
  addSupply: '[Supply/API] Add Supply',
  upsertSupply: '[Supply/API] Upsert Supply',
  addSupplies: '[Supply/API] Add Supplies',
  upsertSupplies: '[Supply/API] Upsert Supplies',
  updateSupplyStarted: '[Supply/API] Update Supply Started',
  updateSupply: '[Supply/API] Update Supply',
  updateSupplies: '[Supply/API] Update Supplies',
  deleteSuppliesStarted: '[Supply/API] Delete Supply Started',
  deleteSupplyStarted: '[Supply/API] Delete Supply Started',
  deleteSupply: '[Supply/API] Delete Supply',
  deleteSupplies: '[Supply/API] Delete Supplies',
  clearSupplies: '[Supply/API] Clear Supplies',
};

export const loadSuppliesStarted = createAction(SuppliesActionTypes.loadSuppliesStarted, props<{ filter: string }>());

export const loadSupplies = createAction(SuppliesActionTypes.loadSupplies, props<{ supplies: Supply[] }>());

export const addSupplyStarted = createAction(SuppliesActionTypes.addSupplyStarted, props<{ supply: Supply }>());

export const addSupply = createAction(SuppliesActionTypes.addSupply, props<{ supply: Supply }>());

export const upsertSupply = createAction(SuppliesActionTypes.upsertSupply, props<{ supply: Supply }>());

export const addSupplies = createAction(SuppliesActionTypes.addSupplies, props<{ supplies: Supply[] }>());

export const upsertSupplies = createAction(SuppliesActionTypes.upsertSupplies, props<{ supplies: Supply[] }>());

export const updateSupplyStarted = createAction(
  SuppliesActionTypes.updateSupplyStarted,
  props<{ id: string; supply: Supply }>()
);

export const updateSupply = createAction(SuppliesActionTypes.updateSupply, props<{ supply: Update<Supply> }>());

export const updateSupplies = createAction(SuppliesActionTypes.updateSupplies, props<{ supplies: Update<Supply>[] }>());

export const deleteSupplyStarted = createAction(SuppliesActionTypes.deleteSupplyStarted, props<{ id: string }>());

export const deleteSupply = createAction(SuppliesActionTypes.deleteSupply, props<{ id: string }>());

export const deleteSupplies = createAction(SuppliesActionTypes.deleteSupplies, props<{ ids: string[] }>());

export const clearSupplies = createAction(SuppliesActionTypes.clearSupplies);
