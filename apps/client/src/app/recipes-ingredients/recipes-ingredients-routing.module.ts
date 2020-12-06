import { NgModule } from '@angular/core';
import { RecipesIngredientsComponent } from './recipes-ingredients.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RecipesIngredientsComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesIngredientsRoutingModule {}
