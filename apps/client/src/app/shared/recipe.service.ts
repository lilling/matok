import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IngredientAmount, Recipe, SupplyAmount } from '@prisma/client';

@Injectable()
export class RecipeService {
  urlPart = 'api/recipes';
  constructor(private http: HttpClient) {}

  get(filter?: string) {
    return this.http.post<Recipe[]>(this.urlPart, { where: { name: { contains: filter } } });
  }

  add(data: { item: Recipe; ingredientsAmount: IngredientAmount[]; supplyAmounts: SupplyAmount[] }) {
    return this.http.post<Recipe[]>(`${this.urlPart}/add`, data);
  }

  update(id: string, data: { item: Recipe; ingredientsAmount: IngredientAmount[]; supplyAmounts: SupplyAmount[] }) {
    return this.http.put<Recipe[]>(`${this.urlPart}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.urlPart}/${id}`);
  }
}
