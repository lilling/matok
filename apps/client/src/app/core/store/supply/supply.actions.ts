import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Supply } from '@prisma/client';

export const loadSupplys = createAction('[Supply/API] Load Supplys', props<{ supplys: Supply[] }>());

export const addSupply = createAction('[Supply/API] Add Supply', props<{ supply: Supply }>());

export const upsertSupply = createAction('[Supply/API] Upsert Supply', props<{ supply: Supply }>());

export const addSupplys = createAction('[Supply/API] Add Supplys', props<{ supplys: Supply[] }>());

export const upsertSupplys = createAction('[Supply/API] Upsert Supplys', props<{ supplys: Supply[] }>());

export const updateSupply = createAction('[Supply/API] Update Supply', props<{ supply: Update<Supply> }>());

export const updateSupplys = createAction('[Supply/API] Update Supplys', props<{ supplys: Update<Supply>[] }>());

export const deleteSupply = createAction('[Supply/API] Delete Supply', props<{ id: string }>());

export const deleteSupplys = createAction('[Supply/API] Delete Supplys', props<{ ids: string[] }>());

export const clearSupplys = createAction('[Supply/API] Clear Supplys');
