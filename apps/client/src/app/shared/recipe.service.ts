import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Recipe } from '@prisma/client';

@Injectable()
export class RecipeService extends BaseService<Recipe> {
  constructor(http: HttpClient) {
    super(http, 'api/recipes');
  }
}
