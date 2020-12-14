import { TestBed } from '@angular/core/testing';

import { IngredientService } from './ingredient.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('IngredientService', () => {
  let service: IngredientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IngredientService],
    });
    service = TestBed.inject(IngredientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getIngredients', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const spy = spyOn(service.http, 'post').and.callThrough();
    service.getIngredients('sda');
    expect(spy).toBeCalled();
  });

  it('should call add', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const spy = spyOn(service.http, 'post').and.callThrough();
    service.addIngredient({ price: 3, weight: 34, name: 'sda' } as any);
    expect(spy).toBeCalled();
  });

  it('should call update', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const spy = spyOn(service.http, 'put').and.callThrough();
    service.updateIngredient('das', { price: 3, weight: 34, name: 'sda' } as any);
    expect(spy).toBeCalled();
  });

  it('should call delete', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const spy = spyOn(service.http, 'delete').and.callThrough();
    service.deleteIngredient('sda');
    expect(spy).toBeCalled();
  });
});
