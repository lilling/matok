import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  {
    path: '',
    redirectTo: '/recipes-ingredients',
    pathMatch: 'full',
  },
  {
    path: 'recipes-ingredients',
    loadChildren: () =>
      import('./recipes-ingredients/recipes-ingredients.module').then(
        (j) => j.RecipesIngredientsModule
      ),
  },
  {
    path: 'calendar',
    loadChildren: () =>
      import('./calendar/calendar.module').then((c) => c.CalendarModule),
  },
];
