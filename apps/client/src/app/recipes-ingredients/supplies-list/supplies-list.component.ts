import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, iif, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, map, startWith, switchMap, take } from 'rxjs/operators';
import { SupplyService } from '../../shared/supply.service';
import { Supply } from '@prisma/client';
import { MatDialog } from '@angular/material/dialog';
import { AddSupplyDialogComponent } from './add-supply-dialog/add-supply-dialog.component';

@Component({
  selector: 'matok-supplies-list',
  templateUrl: './supplies-list.component.html',
  styleUrls: ['./supplies-list.component.scss'],
})
export class SuppliesListComponent {
  displayedColumns: string[] = ['name', 'price', 'actions'];
  refreshIngredients = new BehaviorSubject<boolean>(true);
  filterCtrl = new FormControl();
  filter$ = this.filterCtrl.valueChanges.pipe(
    debounceTime(500),
    startWith(''),
    map(a => '' + a)
  );
  refreshIngredientsAsObservable = this.refreshIngredients.asObservable();
  dataSource$ = combineLatest([this.refreshIngredientsAsObservable, this.filter$]).pipe(
    switchMap(([refreshNeeded, filter]) => iif(() => refreshNeeded, this.supplyService.get(filter), of([])))
  );
  constructor(private dialog: MatDialog, private supplyService: SupplyService) {}

  openDialog(data?: Supply) {
    const ref = this.dialog.open<AddSupplyDialogComponent, Supply, Supply>(AddSupplyDialogComponent, { data });

    ref
      .afterClosed()
      .pipe(take(1))
      .subscribe(res => {
        const observer = data ? this.supplyService.update(data.id, res) : this.supplyService.add(res);
        observer.pipe(take(1)).subscribe(() => this.refreshIngredients.next(true));
      });
  }

  delete(id: string) {
    this.supplyService
      .delete(id)
      .pipe(take(1))
      .subscribe(() => this.refreshIngredients.next(true));
  }
}