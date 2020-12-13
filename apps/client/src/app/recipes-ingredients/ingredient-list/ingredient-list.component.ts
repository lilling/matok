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
  refreshIngredients = new BehaviorSubject<boolean>(true);
  filterCtrl = new FormControl();
  filter$ = this.filterCtrl.valueChanges.pipe(
    debounceTime(500),
    startWith(''),
    map((a) => '' + a)
  );
  refreshIngredientsAsObservable = this.refreshIngredients.asObservable();
  dataSource$ = combineLatest([this.refreshIngredientsAsObservable, this.filter$]).pipe(
    switchMap(([refreshNeeded, filter]) =>
      iif(() => refreshNeeded, this.ingredientService.getIngredients(filter), of([]))
    )
  );

  constructor(public dialog: MatDialog, private ingredientService: IngredientService) {}

  OpenIngredientDialog(item?: Ingredient) {
    const ref = this.dialog.open<AddIngredientDialogComponent, Ingredient, Ingredient>(AddIngredientDialogComponent, {
      data: item,
    });

    ref
      .afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        const observer = item
          ? this.ingredientService.updateIngredient(item.id, res)
          : this.ingredientService.addIngredient(res);

        observer.pipe(take(1)).subscribe(() => this.refreshIngredients.next(true));
      });
  }

  delete(item: Ingredient) {
    this.ingredientService
      .deleteIngredient(item)
      .pipe(take(1))
      .subscribe(() => this.refreshIngredients.next(true));
  }
}
