import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

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
  ],
  exports: [RouterModule],
})
export class CoreModule {}
