import { NgModule } from '@angular/core';
import { RecipesIngredientsComponent } from './recipes-ingredients.component';
import { RouterModule, Routes } from '@angular/router';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { SuppliesListComponent } from './supplies-list/supplies-list.component';

const routes: Routes = [
  { path: '', component: RecipesIngredientsComponent },
  { path: 'ingredients', component: IngredientListComponent },
  { path: 'supplies', component: SuppliesListComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesIngredientsRoutingModule {}
