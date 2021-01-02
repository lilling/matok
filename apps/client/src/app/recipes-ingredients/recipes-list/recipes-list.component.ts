import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, startWith, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { IngredientAmount, Recipe, SupplyAmount } from '@prisma/client';
import { AddRecipeDialogComponent } from './add-recipe-dialog/add-recipe-dialog.component';
import { RecipesListStore } from './recipes-list.store';
import * as actions from '../../core/store/recipe/recipe.actions';
import { Store } from '@ngrx/store';
import * as fromRecipe from '../../core/store/recipe/recipe.reducer';
import { RecipeClient } from '../../core/models/recipe.model';

@Component({
  selector: 'matok-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  providers: [RecipesListStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesListComponent implements OnDestroy {
  displayedColumns: string[] = ['name', 'actions'];
  filterCtrl = new FormControl();
  data$ = this.cStore.filteredRecipes$;
  sub: Subscription;

  constructor(private dialog: MatDialog, private cStore: RecipesListStore, private store: Store<fromRecipe.State>) {
    this.sub = this.filterCtrl.valueChanges
      .pipe(debounceTime(500), startWith(''))
      .subscribe((filter: string) => this.cStore.changeFilter(filter));
  }

  openDialog(data?: Recipe) {
    const ref = this.dialog.open<AddRecipeDialogComponent, Recipe, { value: RecipeClient; addOther: boolean }>(
      AddRecipeDialogComponent,
      { data }
    );

    ref
      .afterClosed()
      .pipe(take(1))
      .subscribe(res => {
        if (res.addOther) {
          this.openDialog();
        }

        this.store.dispatch(
          data
            ? actions.updateRecipeStarted({ id: data.id, recipe: res.value })
            : actions.addRecipeStarted({ recipe: res.value })
        );
      });
  }

  delete(id: string) {
    this.store.dispatch(actions.deleteRecipeStarted({ id }));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
