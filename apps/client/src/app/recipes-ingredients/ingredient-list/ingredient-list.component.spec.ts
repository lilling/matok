import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { IngredientListComponent } from './ingredient-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IngredientService } from '../../shared/ingredient.service';
import { of } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import Spy = jasmine.Spy;

describe('IngredientListComponent', () => {
  let component: IngredientListComponent;
  let fixture: ComponentFixture<IngredientListComponent>;
  let refreshSpy: Spy;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, TranslateModule.forRoot(), MatTableModule, MatIconModule],
      declarations: [IngredientListComponent],
      providers: [
        {
          provide: IngredientService,
          useValue: {
            addIngredient: () => of('stam'),
            updateIngredient: () => of('stam'),
            deleteIngredient: () => of('stam'),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    refreshSpy = spyOn(component.refreshIngredients, 'next');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('OpenIngredientDialog', () => {
    it('should add ingredient when item is not passed', () => {
      const spy = spyOn(TestBed.inject(IngredientService), 'add');
      spyOn(TestBed.inject(MatDialog), 'open').and.returnValue({
        afterClosed: () => of({ data: null }),
      });
      component.openDialog();
      expect(spy).toBeCalledTimes(1);
    });
    it('should edit ingredient when item is passed', () => {
      const spy = spyOn(TestBed.inject(IngredientService), 'update');
      spyOn(TestBed.inject(MatDialog), 'open').and.returnValue({
        afterClosed: () => of({ data: null }),
      });
      component.openDialog({} as any);
      expect(spy).toBeCalledTimes(1);
    });
  });

  it('should refresh when deleting item', fakeAsync(() => {
    spyOn(TestBed.inject(IngredientService), 'delete').and.callThrough();
    component.delete({} as any);
    tick();
    expect(refreshSpy).toBeCalledTimes(1);
    expect(refreshSpy).toBeCalledWith(true);
  }));
});
