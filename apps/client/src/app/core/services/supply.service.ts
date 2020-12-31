import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Supply } from '@prisma/client';

@Injectable()
export class SupplyService extends BaseService<Supply> {
  constructor(http: HttpClient) {
    super(http, 'api/supplies');
  }
}
