import { NgModule } from '@angular/core';
import { RecipesIngredientsComponent } from './recipes-ingredients.component';
import { RouterModule, Routes } from '@angular/router';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';

const routes: Routes = [
  { path: '', component: RecipesIngredientsComponent },
  { path: 'ingredients', component: IngredientListComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesIngredientsRoutingModule {}
