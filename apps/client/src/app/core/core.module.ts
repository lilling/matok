import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { ROUTES } from '../app.routes';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import * as fromIngredient from './store/ingredient/ingredient.reducer';
import * as fromRecipe from './store/recipe/recipe.reducer';
import * as fromSupply from './store/supply/supply.reducer';
import { IngredientEffects } from './store/ingredient/ingredient.effects';
import { IngredientService } from './services/ingredient.service';
import { SupplyService } from './services/supply.service';
import { RecipeService } from './services/recipe.service';
import { SupplyEffects } from './store/supply/supply.effects';
import { RecipeEffects } from './store/recipe/recipe.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreDevtoolsModule.instrument({ maxAge: 100, logOnly: environment.production }),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
          strictActionTypeUniqueness: true,
          strictStateSerializability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    RouterModule.forRoot(ROUTES, { useHash: true }),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forFeature(fromIngredient.ingredientsFeatureKey, fromIngredient.reducer),
    StoreModule.forFeature(fromRecipe.recipesFeatureKey, fromRecipe.reducer),
    StoreModule.forFeature(fromSupply.suppliesFeatureKey, fromSupply.reducer),
    EffectsModule.forFeature([IngredientEffects, SupplyEffects, RecipeEffects]),
  ],
  providers: [IngredientService, SupplyService, RecipeService],
  exports: [RouterModule],
})
export class CoreModule {}
