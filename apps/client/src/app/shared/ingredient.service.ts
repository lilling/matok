import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '@prisma/client';
import * as uuid from 'uuid';

@Injectable()
export class IngredientService {
  readonly urlPart = 'api/ingredients';
  constructor(private http: HttpClient) {}
  getIngredients(filter?: string) {
    return this.http.post<Ingredient[]>(this.urlPart, { where: { name: { contains: filter } } });
  }

  addIngredient(item: Ingredient) {
    return this.http.post(`${this.urlPart}/add`, { ...item, id: uuid.v4() });
  }

  deleteIngredient(id: string) {
    return this.http.delete(`${this.urlPart}/${id}`);
  }

  updateIngredient(id: string, item: Ingredient) {
    return this.http.put(`${this.urlPart}/${id}`, item);
  }
}
