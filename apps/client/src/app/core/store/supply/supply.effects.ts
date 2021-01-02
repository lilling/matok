import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SupplyService } from '../../services/supply.service';
import { map, switchMap } from 'rxjs/operators';
import { TypedAction } from '@ngrx/store/src/models';
import { Supply } from '@prisma/client';
import { addSupply, deleteSupply, loadSupplies, SuppliesActionTypes, updateSupply } from './supply.actions';

@Injectable()
export class SupplyEffects {
  loadSupplies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuppliesActionTypes.loadSuppliesStarted),
      switchMap(() => this.service.get().pipe(map(supplies => loadSupplies({ supplies }))))
    )
  );

  addSupply$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuppliesActionTypes.addSupplyStarted),
      switchMap((action: { supply: Supply } & TypedAction<string>) =>
        this.service.add(action.supply).pipe(map(supply => addSupply({ supply })))
      )
    )
  );

  updateSupply$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuppliesActionTypes.updateSupplyStarted),
      switchMap((action: { supply: Supply; id: string } & TypedAction<string>) =>
        this.service
          .update(action.id, action.supply)
          .pipe(map(Supply => updateSupply({ supply: { id: action.id, changes: Supply } })))
      )
    )
  );

  deleteSupply$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuppliesActionTypes.deleteSupplyStarted),
      switchMap((action: { id: string } & TypedAction<string>) =>
        this.service.delete(action.id).pipe(map(deleted => deleteSupply({ id: deleted.id })))
      )
    )
  );

  constructor(private actions$: Actions, private service: SupplyService) {}
}
