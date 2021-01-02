import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeClient } from '../models/recipe.model';

@Injectable()
export class RecipeService {
  urlPart = 'api/recipes';
  constructor(private http: HttpClient) {}

  get(filter?: string) {
    return this.http.post<RecipeClient[]>(this.urlPart, { where: { name: { contains: filter } } });
  }

  add(item: RecipeClient) {
    return this.http.post<RecipeClient>(`${this.urlPart}/add`, item);
  }

  update(id: string, item: RecipeClient) {
    return this.http.put<RecipeClient>(`${this.urlPart}/${id}`, item);
  }

  delete(id: string) {
    return this.http.delete<RecipeClient>(`${this.urlPart}/${id}`);
  }
}
