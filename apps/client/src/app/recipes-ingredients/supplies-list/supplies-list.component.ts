import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, startWith, take } from 'rxjs/operators';
import { Supply } from '@prisma/client';
import { MatDialog } from '@angular/material/dialog';
import { AddSupplyDialogComponent } from './add-supply-dialog/add-supply-dialog.component';
import * as actions from '../../core/store/supply/supply.actions';
import { select, Store } from '@ngrx/store';
import * as fromSupply from '../../core/store/supply/supply.reducer';

@Component({
  selector: 'matok-supplies-list',
  templateUrl: './supplies-list.component.html',
  styleUrls: ['./supplies-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuppliesListComponent implements OnDestroy {
  displayedColumns: string[] = ['name', 'price', 'actions'];
  filterCtrl = new FormControl();
  data$ = this.store.pipe(select(fromSupply.selectAll));
  sub: Subscription;

  constructor(private dialog: MatDialog, private store: Store<fromSupply.State>) {
    this.sub = this.filterCtrl.valueChanges
      .pipe(debounceTime(500), startWith(''))
      .subscribe((filter: string) => this.store.dispatch(actions.loadSuppliesStarted({ filter })));
  }

  openDialog(data?: Supply) {
    this.dialog
      .open<AddSupplyDialogComponent, Supply, { value: Supply; addOther: boolean }>(AddSupplyDialogComponent, { data })
      .afterClosed()
      .pipe(take(1))
      .subscribe(res => {
        if (res.addOther) {
          this.openDialog();
        }

        this.store.dispatch(
          data
            ? actions.updateSupplyStarted({ id: data.id, supply: res.value })
            : actions.addSupplyStarted({ supply: res.value })
        );
      });
  }

  delete(id: string) {
    this.store.dispatch(actions.deleteSupplyStarted({ id }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
