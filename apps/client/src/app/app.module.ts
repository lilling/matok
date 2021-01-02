import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatSelectModule } from '@angular/material/select';
import { CoreModule } from './core/core.module';
import { loadRecipesStarted } from './core/store/recipe/recipe.actions';
import { loadIngredientsStarted } from './core/store/ingredient/ingredient.actions';
import { loadSuppliesStarted } from './core/store/supply/supply.actions';
import { Store } from '@ngrx/store';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function initApplication(store: Store) {
  store.dispatch(loadRecipesStarted());
  store.dispatch(loadIngredientsStarted());
  store.dispatch(loadSuppliesStarted());
  return () => new Promise(resolve => resolve(true));
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] },
      defaultLanguage: 'he',
    }),
    MatSelectModule,
  ],
  providers: [{ provide: APP_INITIALIZER, useFactory: initApplication, deps: [Store], multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
