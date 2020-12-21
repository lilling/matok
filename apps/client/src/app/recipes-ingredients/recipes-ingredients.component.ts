import { Component } from '@angular/core';

@Component({
  selector: 'matok-recipes-ingredients',
  templateUrl: './recipes-ingredients.component.html',
  styleUrls: ['./recipes-ingredients.component.scss'],
})
export class RecipesIngredientsComponent {
  cards = [
    {
      route: './ingredients',
      name: 'ingredientsList',
      img: 'assets/ingredients.svg',
      description: 'ingredientsExample',
    },
    {
      route: './supplies',
      name: 'suppliesList',
      img: 'assets/cake-box.svg',
      description: 'suppliesExample',
    },
    {
      route: './recipes',
      name: 'recipes',
      img: 'assets/recipe-book.svg',
      description: 'recipesExample',
    },
  ];
}
