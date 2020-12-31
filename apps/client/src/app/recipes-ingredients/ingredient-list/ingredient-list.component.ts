import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, startWith, take } from 'rxjs/operators';
import { AddIngredientDialogComponent } from './add-ingredient-dialog/add-ingredient-dialog.component';
import { Ingredient } from '@prisma/client';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as fromIngredient from '../../core/store/ingredient/ingredient.reducer';
import * as actions from '../../core/store/ingredient/ingredient.actions';

@Component({
  selector: 'matok-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientListComponent implements OnDestroy {
  displayedColumns: string[] = ['name', 'weight', 'price', 'actions'];
  filterCtrl = new FormControl();
  data$ = this.store.pipe(select(fromIngredient.selectAll));
  sub: Subscription;

  constructor(private dialog: MatDialog, private store: Store<fromIngredient.State>) {
    this.sub = this.filterCtrl.valueChanges
      .pipe(debounceTime(500), startWith(''))
      .subscribe((filter: string) => this.store.dispatch(actions.loadIngredientsStarted({ filter })));
  }

  openDialog(data?: Ingredient) {
    this.dialog
      .open<AddIngredientDialogComponent, Ingredient, { value: Ingredient; addOther: boolean }>(
        AddIngredientDialogComponent,
        { data }
      )
      .afterClosed()
      .pipe(take(1))
      .subscribe(res => {
        if (res.addOther) {
          this.openDialog();
        }

        this.store.dispatch(
          data
            ? actions.updateIngredientStarted({ id: data.id, ingredient: res.value })
            : actions.addIngredientStarted({ ingredient: res.value })
        );
      });
  }

  delete(id: string) {
    this.store.dispatch(actions.deleteIngredientStarted({ id }));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
