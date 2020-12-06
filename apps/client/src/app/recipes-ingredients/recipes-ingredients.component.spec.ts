import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesIngredientsComponent } from './recipes-ingredients.component';

describe('RecipesIngredientsComponent', () => {
  let component: RecipesIngredientsComponent;
  let fixture: ComponentFixture<RecipesIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipesIngredientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
