import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { AddIngredientDialogComponent } from './add-ingredient-dialog/add-ingredient-dialog.component';
import { Ingredient } from '@matok/data';

@Component({
  selector: 'matok-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss'],
})
export class IngredientListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'weight', 'price'];
  dataSource = [
    { id: 1234, name: 'Hydrogen', weight: 1.0079, price: 'H' },
    { id: 126734, name: 'Helium', weight: 4.0026, price: 'He' },
    { id: 1232134, name: 'Lithium', weight: 6.941, price: 'Li' },
    { id: 126634, name: 'Neon', weight: 20.1797, price: 'Ne' },
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openAddDialog() {
    const ref = this.dialog.open<any, any, Ingredient>(
      AddIngredientDialogComponent
    );

    ref
      .afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res);
      });
  }

  addItem() {}
}
