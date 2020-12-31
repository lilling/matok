import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '@prisma/client';
import { BaseService } from './base.service';

@Injectable()
export class IngredientService extends BaseService<Ingredient> {
  constructor(http: HttpClient) {
    super(http, 'api/ingredients');
  }
}
