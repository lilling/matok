import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { IngredientService } from '../core/services/ingredient.service';
import { HttpClientModule } from '@angular/common/http';
import { SupplyService } from '../core/services/supply.service';
import { RecipeService } from '../core/services/recipe.service';

@NgModule({
  declarations: [],
  imports: [TranslateModule, CommonModule, MatDialogModule, HttpClientModule],
  exports: [TranslateModule, MatDialogModule, HttpClientModule],
})
export class SharedModule {}
