import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, map, startWith, switchMap, take } from 'rxjs/operators';
import { AddIngredientDialogComponent } from './add-ingredient-dialog/add-ingredient-dialog.component';
import { Ingredient } from '@prisma/client';
import { IngredientService } from '../../shared/ingredient.service';
import { BehaviorSubject, combineLatest, iif, of } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'matok-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientListComponent {
  displayedColumns: string[] = ['name', 'weight', 'price', 'actions'];
  refresh = new BehaviorSubject<boolean>(true);
  filterCtrl = new FormControl();
  filter$ = this.filterCtrl.valueChanges.pipe(
    debounceTime(500),
    startWith(''),
    map(a => '' + a)
  );
  refreshAsObservable = this.refresh.asObservable();
  dataSource$ = combineLatest([this.refreshAsObservable, this.filter$]).pipe(
    switchMap(([refreshNeeded, filter]) => iif(() => refreshNeeded, this.ingredientService.get(filter), of([])))
  );

  constructor(private dialog: MatDialog, private ingredientService: IngredientService) {}

  openDialog(data?: Ingredient) {
    const ref = this.dialog.open<AddIngredientDialogComponent, Ingredient, { value: Ingredient; addOther: boolean }>(
      AddIngredientDialogComponent,
      { data }
    );

    ref
      .afterClosed()
      .pipe(take(1))
      .subscribe(res => {
        if (res.addOther) {
          this.openDialog();
        }
        const observer = data
          ? this.ingredientService.update(data.id, res.value)
          : this.ingredientService.add(res.value);
        observer.pipe(take(1)).subscribe(() => this.refresh.next(true));
      });
  }

  delete(id: string) {
    this.ingredientService
      .delete(id)
      .pipe(take(1))
      .subscribe(() => this.refresh.next(true));
  }
}
