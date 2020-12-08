import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesIngredientsComponent } from './recipes-ingredients.component';
import { RecipesIngredientsRoutingModule } from './recipes-ingredients-routing.module';
import { SharedModule } from '../shared/shared.module';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddIngredientDialogComponent } from './ingredient-list/add-ingredient-dialog/add-ingredient-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RecipesIngredientsComponent,
    IngredientListComponent,
    AddIngredientDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RecipesIngredientsRoutingModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class RecipesIngredientsModule {}
