import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesIngredientsComponent } from './recipes-ingredients.component';
import { RecipesIngredientsRoutingModule } from './recipes-ingredients-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RecipesIngredientsComponent],
  imports: [CommonModule, SharedModule, RecipesIngredientsRoutingModule],
})
export class RecipesIngredientsModule {}
