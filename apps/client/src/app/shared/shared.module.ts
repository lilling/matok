import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { IngredientService } from './ingredient.service';
import { HttpClientModule } from '@angular/common/http';
import { SupplyService } from './supply.service';
import { RecipeService } from './recipe.service';

@NgModule({
  declarations: [],
  providers: [IngredientService, SupplyService, RecipeService],
  imports: [TranslateModule, CommonModule, MatDialogModule, HttpClientModule],
  exports: [TranslateModule, MatDialogModule, HttpClientModule],
})
export class SharedModule {}
