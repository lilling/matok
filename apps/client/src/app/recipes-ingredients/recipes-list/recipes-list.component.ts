import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, iif, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, map, startWith, switchMap, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Recipe } from '@prisma/client';
import { AddRecipeDialogComponent } from './add-recipe-dialog/add-recipe-dialog.component';
import { RecipeService } from '../../shared/recipe.service';

@Component({
  selector: 'matok-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent {
  displayedColumns: string[] = ['name', 'actions'];
  refresh = new BehaviorSubject<boolean>(true);
  filterCtrl = new FormControl();
  filter$ = this.filterCtrl.valueChanges.pipe(
    debounceTime(500),
    startWith(''),
    map(a => '' + a)
  );
  refreshAsObservable = this.refresh.asObservable();
  dataSource$ = combineLatest([this.refreshAsObservable, this.filter$]).pipe(
    switchMap(([refreshNeeded, filter]) => iif(() => refreshNeeded, this.recipeService.get(filter), of([])))
  );
  constructor(private dialog: MatDialog, private recipeService: RecipeService) {}

  openDialog(data?: Recipe) {
    const ref = this.dialog.open<AddRecipeDialogComponent, Recipe, Recipe>(AddRecipeDialogComponent, { data });

    ref
      .afterClosed()
      .pipe(take(1))
      .subscribe(res => {
        const observer = data ? this.recipeService.update(data.id, res) : this.recipeService.add(res);
        observer.pipe(take(1)).subscribe(() => this.refresh.next(true));
      });
  }

  delete(id: string) {
    this.recipeService
      .delete(id)
      .pipe(take(1))
      .subscribe(() => this.refresh.next(true));
  }
}
